import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type FanWorkMeta = {
  id: string;
  title: string;
  cols: number;
  rows: number;
  createdAt: string;
};

export type FanWork = FanWorkMeta & {
  emojiText: string;
};

const GH_OWNER = "maximusmaximus";
const GH_REPO = "oldmaster";
export const FANS_REPO_URL = `https://github.com/${GH_OWNER}/${GH_REPO}`;
export const GH_RAW = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main`;

export const FAN_ID_RE = /^fan-[a-f0-9]{12}$/;

export function fanImageSrc(id: string): string {
  return `/api/fan-image?id=${encodeURIComponent(id)}`;
}

function newId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return `fan-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}

let cachedToken: string | null | undefined;

function isPat(token: string): boolean {
  return token.startsWith("github_pat_") || token.startsWith("ghp_");
}

async function tokenFromSecretsFile(): Promise<string> {
  if (typeof window !== "undefined") return "";
  try {
    const { readFile } = await import("node:fs/promises");
    const raw = await readFile("/workspace/.grok/secrets/github-token", "utf8");
    return raw.trim();
  } catch {
    return "";
  }
}

async function ghToken(): Promise<string> {
  if (cachedToken !== undefined) return cachedToken ?? "";
  const fileTok = await tokenFromSecretsFile();
  if (fileTok) {
    cachedToken = fileTok;
    return fileTok;
  }
  const env =
    (typeof process !== "undefined" && (process.env.GH_TOKEN || process.env.GITHUB_TOKEN)) ||
    "";
  if (env && isPat(env)) {
    cachedToken = env;
    return env;
  }
  if (typeof window !== "undefined") {
    cachedToken = "";
    return "";
  }
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    const { stdout } = await execFileAsync("gh", ["auth", "token"], { timeout: 8000 });
    const cli = stdout.trim();
    if (cli && (isPat(cli) || !env)) {
      cachedToken = cli;
      return cli;
    }
  } catch {
    /* fall through */
  }
  if (env) {
    cachedToken = env;
    return env;
  }
  cachedToken = "";
  return "";
}

async function ghGet(path: string): Promise<{ sha: string; content: string } | null> {
  const token = await ghToken();
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}?ref=main`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "User-Agent": "EmojiOldMasters",
      },
    },
  );
  if (!res.ok) return null;
  const json = (await res.json()) as { sha?: string; content?: string; encoding?: string };
  if (!json.sha || !json.content) return null;
  const content = json.encoding === "base64" ? json.content.replace(/\n/g, "") : json.content;
  return { sha: json.sha, content };
}

async function ghPut(
  path: string,
  contentB64: string,
  message: string,
  sha?: string,
): Promise<boolean> {
  const token = await ghToken();
  if (!token) return false;
  const body: Record<string, unknown> = {
    message,
    content: contentB64,
    branch: "main",
  };
  if (sha) body.sha = sha;
  const res = await fetch(
    `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "EmojiOldMasters",
      },
      body: JSON.stringify(body),
    },
  );
  return res.ok;
}

function utf8ToB64(text: string): string {
  return Buffer.from(text, "utf8").toString("base64");
}

type IndexEntry = {
  id: string;
  title: string;
  cols: number;
  rows: number;
  createdAt: string;
};

async function publishToGithub(work: FanWork, imageJpeg: string): Promise<boolean> {
  try {
    const meta = JSON.stringify(
      {
        id: work.id,
        title: work.title,
        cols: work.cols,
        rows: work.rows,
        createdAt: work.createdAt,
      },
      null,
      2,
    );
    const okTxt = await ghPut(
      `fans/${work.id}/emoji.txt`,
      utf8ToB64(work.emojiText),
      `fan: ${work.id} emoji text`,
    );
    const okMeta = await ghPut(
      `fans/${work.id}/meta.json`,
      utf8ToB64(meta),
      `fan: ${work.id} meta`,
    );
    const okJpg = await ghPut(
      `fans/${work.id}/mosaic.jpg`,
      imageJpeg,
      `fan: ${work.id} mosaic jpg`,
    );
    const existing = await ghGet("fans/index.json");
    let list: IndexEntry[] = [];
    if (existing) {
      try {
        list = JSON.parse(Buffer.from(existing.content, "base64").toString("utf8")) as IndexEntry[];
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }
    }
    if (!list.some((e) => e.id === work.id)) {
      list.unshift({
        id: work.id,
        title: work.title,
        cols: work.cols,
        rows: work.rows,
        createdAt: work.createdAt,
      });
    }
    const okIdx = await ghPut(
      "fans/index.json",
      utf8ToB64(JSON.stringify(list, null, 2)),
      `fan: index ${work.id}`,
      existing?.sha,
    );
    return okTxt && okMeta && okJpg && okIdx;
  } catch {
    return false;
  }
}

function mapMeta(row: {
  id: string;
  title: string;
  cols: number;
  rows: number;
  created_at: string;
}): FanWorkMeta {
  return {
    id: row.id,
    title: row.title,
    cols: Number(row.cols),
    rows: Number(row.rows),
    createdAt: String(row.created_at),
  };
}

async function listFromGithub(): Promise<FanWorkMeta[]> {
  try {
    const res = await fetch(`${GH_RAW}/fans/index.json`, { cache: "no-store" });
    if (!res.ok) return [];
    const list = (await res.json()) as IndexEntry[];
    if (!Array.isArray(list)) return [];
    return list
      .filter((e) => e && FAN_ID_RE.test(e.id))
      .map((e) => ({
        id: e.id,
        title: e.title || "Emoji New Master",
        cols: Number(e.cols) || 0,
        rows: Number(e.rows) || 0,
        createdAt: e.createdAt,
      }));
  } catch {
    return [];
  }
}

export async function loadFanJpegBytes(id: string): Promise<Buffer | null> {
  if (!FAN_ID_RE.test(id)) return null;
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ image_jpeg: string }>`
      select image_jpeg from fan_works where id = ${id} limit 1
    `;
    if (rows[0]?.image_jpeg) return Buffer.from(rows[0].image_jpeg, "base64");
  } catch {
    /* fall through to GitHub */
  }
  try {
    const res = await fetch(`${GH_RAW}/fans/${id}/mosaic.jpg`, { cache: "force-cache" });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

export const listFanWorks = createServerFn({ method: "GET" }).handler(async () => {
  let fromDb: FanWorkMeta[] = [];
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      title: string;
      cols: number;
      rows: number;
      created_at: string;
    }>`select id, title, cols, rows, created_at from fan_works order by created_at desc limit 200`;
    fromDb = rows.map(mapMeta);
  } catch {
    fromDb = [];
  }
  const fromGh = await listFromGithub();
  const seen = new Set(fromDb.map((r) => r.id));
  return [...fromDb, ...fromGh.filter((g) => !seen.has(g.id))];
});

export const getFanWork = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string().regex(FAN_ID_RE) }))
  .handler(async ({ data }) => {
    try {
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      const rows = await sql<{
        id: string;
        title: string;
        cols: number;
        rows: number;
        emoji_text: string;
        created_at: string;
      }>`select id, title, cols, rows, emoji_text, created_at from fan_works where id = ${data.id} limit 1`;
      if (rows[0]) {
        return {
          ...mapMeta(rows[0]),
          emojiText: rows[0].emoji_text,
        } satisfies FanWork;
      }
    } catch {
      /* GitHub fallback */
    }
    try {
      const metaRes = await fetch(`${GH_RAW}/fans/${data.id}/meta.json`);
      const txtRes = await fetch(`${GH_RAW}/fans/${data.id}/emoji.txt`);
      if (!metaRes.ok || !txtRes.ok) return null;
      const meta = (await metaRes.json()) as {
        id: string;
        title: string;
        cols: number;
        rows: number;
        createdAt: string;
      };
      return {
        id: meta.id,
        title: meta.title,
        cols: meta.cols,
        rows: meta.rows,
        emojiText: await txtRes.text(),
        createdAt: meta.createdAt,
      } satisfies FanWork;
    } catch {
      return null;
    }
  });

export const publishFanWork = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().max(80).optional(),
      cols: z.number().int().min(2).max(96),
      rows: z.number().int().min(2).max(96),
      emojiText: z.string().min(1).max(100_000),
      imageJpeg: z.string().min(32).max(1_500_000),
    }),
  )
  .handler(async ({ data }) => {
    const id = newId();
    const title = (data.title?.trim() || "Emoji New Master").slice(0, 80);
    const createdAt = new Date().toISOString();
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into fan_works (id, title, cols, rows, emoji_text, image_jpeg, created_at)
      values (${id}, ${title}, ${data.cols}, ${data.rows}, ${data.emojiText}, ${data.imageJpeg}, ${createdAt}::timestamptz)
    `;
    const work: FanWork = {
      id,
      title,
      cols: data.cols,
      rows: data.rows,
      emojiText: data.emojiText,
      createdAt,
    };
    const github = await publishToGithub(work, data.imageJpeg);
    return { id, github };
  });
