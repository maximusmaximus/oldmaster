import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { IpfsPins } from "@/lib/ipfs";
import { hasPins, mergePins } from "@/lib/ipfs";
import { isEmojiProcessed } from "@/lib/emoji-processed";

export { isEmojiProcessed } from "@/lib/emoji-processed";

export type FanWorkMeta = {
  id: string;
  title: string;
  cols: number;
  rows: number;
  createdAt: string;
  kind: "still" | "clip";
  hidden?: boolean;
  ipfs?: IpfsPins | null;
  pins?: IpfsPins | null;
};

export type FanWork = FanWorkMeta & {
  emojiText: string;
  ipfs?: IpfsPins | null;
};

const GH_OWNER = "maximusmaximus";
const GH_REPO = "oldmaster";
export const FANS_REPO_URL = `https://github.com/${GH_OWNER}/${GH_REPO}`;
export const GH_RAW = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main`;

export const FAN_ID_RE = /^fan-[a-f0-9]{12}$/;

export function fanImageSrc(id: string): string {
  return `/api/fan-image?id=${encodeURIComponent(id)}`;
}

export function fanVideoSrc(id: string): string {
  return `/api/fan-video?id=${encodeURIComponent(id)}`;
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
  kind?: "still" | "clip";
};

async function publishToGithub(
  work: FanWork,
  imageJpeg: string,
  video?: { b64: string; mime: string },
): Promise<boolean> {
  try {
    const meta = JSON.stringify(
      {
        id: work.id,
        title: work.title,
        cols: work.cols,
        rows: work.rows,
        createdAt: work.createdAt,
        kind: work.kind,
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
    let okVid = true;
    if (video && video.b64.length < 900_000) {
      const ext = video.mime.includes("mp4") ? "mp4" : "webm";
      okVid = await ghPut(
        `fans/${work.id}/clip.${ext}`,
        video.b64,
        `fan: ${work.id} clip`,
      );
    }
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
        kind: work.kind,
      });
    }
    const okIdx = await ghPut(
      "fans/index.json",
      utf8ToB64(JSON.stringify(list, null, 2)),
      `fan: index ${work.id}`,
      existing?.sha,
    );
    return okTxt && okMeta && okJpg && okVid && okIdx;
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
  kind?: string | null;
  hidden?: boolean | number | null;
  pinata_emoji_cid?: string | null;
  pinata_jpeg_cid?: string | null;
  pinata_video_cid?: string | null;
}): FanWorkMeta {
  const ipfs = mapPins(row);
  return {
    id: row.id,
    title: row.title,
    cols: Number(row.cols),
    rows: Number(row.rows),
    createdAt: String(row.created_at),
    kind: row.kind === "clip" ? "clip" : "still",
    hidden: Boolean(row.hidden),
    ipfs,
    pins: ipfs,
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
        kind: e.kind === "clip" ? "clip" : "still",
      }));
  } catch {
    return [];
  }
}

export async function loadFanJpegBytes(id: string): Promise<Buffer | null> {
  if (!FAN_ID_RE.test(id)) return null;
  const { fetchPinataBytes } = await import("@/lib/pinata");
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ image_jpeg: string | null; pinata_jpeg_cid: string | null }>`
      select image_jpeg, pinata_jpeg_cid from fan_works where id = ${id} limit 1
    `;
    const row = rows[0];
    if (row?.image_jpeg && row.image_jpeg.length > 2000) {
      const bytes = Buffer.from(row.image_jpeg, "base64");
      if (bytes.length > 2048 && bytes[0] === 0xff && bytes[1] === 0xd8) return bytes;
    }
    if (row?.pinata_jpeg_cid) {
      const pinned = await fetchPinataBytes(row.pinata_jpeg_cid);
      if (pinned && pinned.length > 2048) return pinned;
    }
  } catch {
    /* GitHub / Pinata */
  }
  try {
    const res = await fetch(`${GH_RAW}/fans/${id}/mosaic.jpg`, { cache: "force-cache" });
    if (res.ok) {
      const bytes = Buffer.from(await res.arrayBuffer());
      if (bytes.length > 2048) return bytes;
    }
  } catch {
    /* Pinata fallback */
  }
  try {
    const pinRes = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
    if (pinRes.ok) {
      const pin = (await pinRes.json()) as { jpegCid?: string };
      if (pin.jpegCid) return await fetchPinataBytes(pin.jpegCid);
    }
  } catch {
    return null;
  }
  return null;
}

export async function loadFanVideoBytes(id: string): Promise<{ bytes: Buffer; mime: string } | null> {
  if (!FAN_ID_RE.test(id)) return null;
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{ video_b64: string | null; video_mime: string | null; kind: string | null }>`
      select video_b64, video_mime, kind from fan_works where id = ${id} limit 1
    `;
    if (rows[0]?.video_b64) {
      return {
        bytes: Buffer.from(rows[0].video_b64, "base64"),
        mime: rows[0].video_mime || "video/webm",
      };
    }
  } catch {
    /* GitHub / Pinata */
  }
  try {
    for (const name of [`clip.webm`, `clip.mp4`]) {
      const res = await fetch(`${GH_RAW}/fans/${id}/${name}`, { cache: "force-cache" });
      if (res.ok) {
        return {
          bytes: Buffer.from(await res.arrayBuffer()),
          mime: name.endsWith("mp4") ? "video/mp4" : "video/webm",
        };
      }
    }
  } catch {
    /* Pinata */
  }
  try {
    const pinRes = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
    if (pinRes.ok) {
      const pin = (await pinRes.json()) as { videoCid?: string };
      if (pin.videoCid) {
        const { fetchPinataBytes } = await import("@/lib/pinata");
        const bytes = await fetchPinataBytes(pin.videoCid);
        if (bytes) return { bytes, mime: "video/webm" };
      }
    }
  } catch {
    return null;
  }
  return null;
}

export async function extractVideoMiddleFrame(
  bytes: Buffer,
  mime = "video/webm",
): Promise<Buffer | null> {
  const { spawn } = await import("node:child_process");
  const { mkdtemp, readFile, rm, writeFile } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join } = await import("node:path");
  const ext = mime.includes("mp4") ? "mp4" : "webm";
  const dir = await mkdtemp(join(tmpdir(), "eom-frame-"));
  const src = join(dir, `clip.${ext}`);
  const out = join(dir, "frame.jpg");

  const run = (args: string[]) =>
    new Promise<void>((resolve, reject) => {
      const child = spawn("ffmpeg", args, { stdio: "ignore" });
      child.on("error", reject);
      child.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error("ffmpeg frame failed"));
      });
    });

  const probeDuration = (): Promise<number> =>
    new Promise((resolve) => {
      const child = spawn(
        "ffprobe",
        ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", src],
        { stdio: ["ignore", "pipe", "ignore"] },
      );
      let outBuf = "";
      child.stdout.on("data", (chunk) => {
        outBuf += String(chunk);
      });
      child.on("error", () => resolve(0));
      child.on("exit", () => {
        const n = Number.parseFloat(outBuf.trim());
        resolve(Number.isFinite(n) && n > 0 ? n : 0);
      });
    });

  try {
    await writeFile(src, bytes);
    const duration = await probeDuration();
    const mid = duration > 0.2 ? duration / 2 : 0.5;
    const ss = mid.toFixed(2);
    try {
      await run(["-y", "-ss", ss, "-i", src, "-frames:v", "1", "-update", "1", "-q:v", "3", out]);
    } catch {
      await run(["-y", "-i", src, "-ss", ss, "-frames:v", "1", "-update", "1", "-q:v", "3", out]);
    }
    return await readFile(out);
  } catch {
    return null;
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => undefined);
  }
}

export async function loadFanOgJpegBytes(id: string): Promise<Buffer | null> {
  const { mkdir, readFile, writeFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  const cache = join(process.cwd(), ".data/og-fans", `${id}-mid.jpg`);
  try {
    return await readFile(cache);
  } catch {
    /* generate */
  }
  const video = await loadFanVideoBytes(id);
  if (video) {
    const frame = await extractVideoMiddleFrame(video.bytes, video.mime);
    if (frame) {
      await mkdir(join(process.cwd(), ".data/og-fans"), { recursive: true });
      await writeFile(cache, frame);
      return frame;
    }
  }
  return loadFanJpegBytes(id);
}

async function persistPins(
  sql: Awaited<ReturnType<typeof import("@/lib/db").getSql>>,
  id: string,
  pinata: { emojiCid?: string; jpegCid?: string; videoCid?: string },
) {
  try {
    await sql`
      update fan_works
      set pinata_emoji_cid = ${pinata.emojiCid ?? null},
          pinata_jpeg_cid = ${pinata.jpegCid ?? null},
          pinata_video_cid = ${pinata.videoCid ?? null}
      where id = ${id}
    `;
  } catch {
    /* column may not exist until migrate */
  }
  await ghPut(
    `fans/${id}/pinata.json`,
    utf8ToB64(JSON.stringify(pinata, null, 2)),
    `fan: ${id} pinata cids`,
  );
}

async function pinRow(row: {
  id: string;
  title: string;
  emoji_text: string;
  image_jpeg: string;
  kind?: string | null;
  video_b64?: string | null;
  video_mime?: string | null;
}): Promise<{ emojiCid?: string; jpegCid?: string; videoCid?: string } | null> {
  if (!row.image_jpeg) return null;
  if (row.kind !== "clip" && !isEmojiProcessed(row.emoji_text)) return null;
  const { pinFanArtwork } = await import("@/lib/pinata");
  const jpeg = Buffer.from(row.image_jpeg, "base64");
  if (jpeg.length < 32) return null;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const pinata = await pinFanArtwork({
        id: row.id,
        title: row.title,
        emojiText: isEmojiProcessed(row.emoji_text) ? row.emoji_text : "🎞️",
        jpeg,
        video: row.video_b64 ? Buffer.from(row.video_b64, "base64") : undefined,
        videoMime: row.video_mime || undefined,
      });
      if (pinata?.jpegCid || pinata?.emojiCid) return pinata;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  return null;
}

async function importGithubFans(
  sql: Awaited<ReturnType<typeof import("@/lib/db").getSql>>,
): Promise<number> {
  const token = await ghToken();
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/fans?ref=main`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          "User-Agent": "EmojiOldMasters",
        },
      },
    );
    if (!res.ok) return 0;
    const items = (await res.json()) as { type?: string; name?: string }[];
    if (!Array.isArray(items)) return 0;
    let added = 0;
    for (const item of items) {
      const id = item.name || "";
      if (item.type !== "dir" || !FAN_ID_RE.test(id)) continue;
      const existing = await sql<{ id: string }>`select id from fan_works where id = ${id} limit 1`;
      if (existing[0]) continue;
      const [txtRes, jpgRes, metaRes] = await Promise.all([
        fetch(`${GH_RAW}/fans/${id}/emoji.txt`, { cache: "no-store" }),
        fetch(`${GH_RAW}/fans/${id}/mosaic.jpg`, { cache: "no-store" }),
        fetch(`${GH_RAW}/fans/${id}/meta.json`, { cache: "no-store" }),
      ]);
      if (!jpgRes.ok) continue;
      const jpeg = Buffer.from(await jpgRes.arrayBuffer()).toString("base64");
      const emojiText = txtRes.ok ? await txtRes.text() : "⬜⬛";
      let title = "Emoji New Master";
      let cols = 8;
      let rows = 8;
      let createdAt = new Date().toISOString();
      let kind: "still" | "clip" = "still";
      if (metaRes.ok) {
        try {
          const meta = (await metaRes.json()) as {
            title?: string;
            cols?: number;
            rows?: number;
            createdAt?: string;
            kind?: string;
          };
          title = (meta.title || title).slice(0, 80);
          cols = Number(meta.cols) || cols;
          rows = Number(meta.rows) || rows;
          createdAt = meta.createdAt || createdAt;
          kind = meta.kind === "clip" ? "clip" : "still";
        } catch {
          /* defaults */
        }
      }
      await sql`
        insert into fan_works (
          id, title, cols, rows, emoji_text, image_jpeg, created_at, kind
        )
        values (
          ${id},
          ${title},
          ${cols},
          ${rows},
          ${emojiText},
          ${jpeg},
          ${createdAt}::timestamptz,
          ${kind}
        )
      `;
      added += 1;
    }
    return added;
  } catch {
    return 0;
  }
}

let backfillPromise: Promise<number> | null = null;

export async function backfillFanPins(): Promise<{
  total: number;
  pinned: number;
  skipped: number;
  failed: number;
  hydrated?: number;
}> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  let hydrated = 0;
  try {
    hydrated = await hydrateFromPinata(sql);
  } catch {
    hydrated = 0;
  }
  try {
    hydrated += await importGithubFans(sql);
  } catch {
    /* keep going */
  }
  const rows = await sql<{
    id: string;
    title: string;
    emoji_text: string;
    image_jpeg: string;
    kind: string | null;
    video_b64: string | null;
    video_mime: string | null;
    pinata_emoji_cid: string | null;
    pinata_jpeg_cid: string | null;
    pinata_video_cid: string | null;
  }>`
    select id, title, emoji_text, image_jpeg, kind, video_b64, video_mime,
           pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
    from fan_works
  `;
  let pinned = 0;
  let skipped = 0;
  let failed = 0;
  for (const row of rows) {
    const missing =
      !row.pinata_jpeg_cid ||
      !row.pinata_emoji_cid ||
      (row.kind === "clip" && !row.pinata_video_cid);
    if (!missing) {
      skipped += 1;
      continue;
    }
    if (!isEmojiProcessed(row.emoji_text) && row.kind !== "clip") {
      skipped += 1;
      continue;
    }
    if (!row.image_jpeg) {
      skipped += 1;
      continue;
    }
    try {
      const pinata = await pinRow(row);
      if (!pinata) {
        failed += 1;
        continue;
      }
      await persistPins(sql, row.id, pinata);
      pinned += 1;
    } catch {
      failed += 1;
    }
  }
  return { total: rows.length, pinned, skipped, failed, hydrated };
}

let backfillRunning = false;

function kickFanPinBackfill() {
  if (backfillRunning) return;
  backfillRunning = true;
  backfillPromise = backfillFanPins()
    .then((r) => r.pinned)
    .catch(() => 0)
    .finally(() => {
      backfillRunning = false;
    });
}

export async function pinAllUnpinned(): Promise<{
  total: number;
  pinned: number;
  skipped: number;
  failed: number;
  hydrated?: number;
}> {
  const result = await backfillFanPins();
  try {
    const { pinAllSvgReels } = await import("@/lib/svg-reels");
    await pinAllSvgReels();
  } catch {
    /* svg optional */
  }
  return result;
}

function mintFanId(seed: string): string {
  const hex = Array.from(seed)
    .reduce((h, ch) => ((h << 5) - h + ch.charCodeAt(0)) | 0, 0)
    .toString(16)
    .replace("-", "a")
    .padStart(12, "0")
    .slice(-12);
  return `fan-${hex}`;
}

async function hydrateFromPinata(
  sql: Awaited<ReturnType<typeof import("@/lib/db").getSql>>,
): Promise<number> {
  let jwt = "";
  try {
    const { readFile } = await import("node:fs/promises");
    jwt = (await readFile("/workspace/.grok/secrets/pinata-jwt", "utf8")).trim();
  } catch {
    jwt = "";
  }
  if (!jwt) jwt = process.env.PINATA_JWT || "";
  if (!jwt) return 0;
  return hydrateWithToken(sql, jwt);
}

async function hydrateWithToken(
  sql: Awaited<ReturnType<typeof import("@/lib/db").getSql>>,
  jwt: string,
): Promise<number> {
  const res = await fetch(
    "https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1000",
    { headers: { Authorization: `Bearer ${jwt}` } },
  );
  if (!res.ok) return 0;
  const json = (await res.json()) as {
    rows?: {
      ipfs_pin_hash?: string;
      date_pinned?: string;
      metadata?: { name?: string; keyvalues?: Record<string, string> };
    }[];
  };
  const groups = new Map<
    string,
    { jpegCid?: string; emojiCid?: string; videoCid?: string; title?: string; date?: string }
  >();
  for (const row of json.rows ?? []) {
    const name = row.metadata?.name || "";
    const kv = row.metadata?.keyvalues || {};
    const cid = row.ipfs_pin_hash;
    if (!cid) continue;
    let fanId = kv.fanId || "";
    const m = name.match(/^(fan-[a-z0-9]+)-(emoji\.txt|mosaic\.jpg|clip\.(webm|mp4))$/i);
    if (!fanId && m?.[1]) fanId = m[1];
    if (!fanId) continue;
    if (!FAN_ID_RE.test(fanId)) fanId = mintFanId(fanId);
    const g = groups.get(fanId) ?? {};
    if (kv.file === "jpeg" || name.endsWith("-mosaic.jpg")) g.jpegCid = cid;
    if (kv.file === "emoji" || name.endsWith("-emoji.txt")) g.emojiCid = cid;
    if (kv.file === "video" || /clip\.(webm|mp4)$/i.test(name)) g.videoCid = cid;
    if (kv.title) g.title = kv.title;
    g.date = g.date || row.date_pinned;
    groups.set(fanId, g);
  }
  let added = 0;
  const { fetchPinataBytes } = await import("@/lib/pinata");
  for (const [id, g] of groups) {
    if (!g.jpegCid && !g.emojiCid) continue;
    const existing = await sql<{ id: string }>`select id from fan_works where id = ${id} limit 1`;
    if (existing[0]) {
      await persistPins(sql, id, {
        emojiCid: g.emojiCid,
        jpegCid: g.jpegCid,
        videoCid: g.videoCid,
      });
      continue;
    }
    let emojiText = "⬜";
    let jpeg = "";
    if (g.emojiCid) {
      const bytes = await fetchPinataBytes(g.emojiCid);
      if (bytes) emojiText = bytes.toString("utf8");
    }
    if (g.jpegCid) {
      const bytes = await fetchPinataBytes(g.jpegCid);
      if (bytes) jpeg = bytes.toString("base64");
    }
    if (!isEmojiProcessed(emojiText) && !jpeg) continue;
    if (!isEmojiProcessed(emojiText)) emojiText = "⬜⬛";
    const cols = Math.max(2, emojiText.split("\n")[0]?.length || 8);
    const rows = Math.max(2, emojiText.split("\n").filter(Boolean).length);
    const createdAt = g.date || new Date().toISOString();
    const title = (g.title || "Emoji New Master").slice(0, 80);
    const kind = g.videoCid ? "clip" : "still";
    await sql`
      insert into fan_works (
        id, title, cols, rows, emoji_text, image_jpeg, created_at, kind,
        pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
      )
      values (
        ${id},
        ${title},
        ${cols},
        ${rows},
        ${emojiText},
        ${jpeg || " "},
        ${createdAt}::timestamptz,
        ${kind},
        ${g.emojiCid ?? null},
        ${g.jpegCid ?? null},
        ${g.videoCid ?? null}
      )
    `;
    added += 1;
  }
  return added;
}

export const repinFanWorks = createServerFn({ method: "GET" }).handler(async () => {
  backfillPromise = null;
  backfillRunning = false;
  return pinAllUnpinned();
});

function mapPins(row: {
  pinata_emoji_cid?: string | null;
  pinata_jpeg_cid?: string | null;
  pinata_video_cid?: string | null;
}): IpfsPins | null {
  return mergePins({
    emojiCid: row.pinata_emoji_cid || undefined,
    jpegCid: row.pinata_jpeg_cid || undefined,
    videoCid: row.pinata_video_cid || undefined,
  });
}

async function pinsFromGithub(id: string): Promise<IpfsPins | null> {
  try {
    const res = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
    if (!res.ok) return null;
    const pin = (await res.json()) as {
      emojiCid?: string;
      jpegCid?: string;
      videoCid?: string;
    };
    if (!pin.emojiCid && !pin.jpegCid && !pin.videoCid) return null;
    return mergePins({
      emojiCid: pin.emojiCid,
      jpegCid: pin.jpegCid,
      videoCid: pin.videoCid,
    });
  } catch {
    return null;
  }
}

async function hiddenIds(sql: Awaited<ReturnType<typeof import("@/lib/db").getSql>>): Promise<Set<string>> {
  try {
    const rows = await sql<{ id: string }>`select id from fan_hidden`;
    return new Set(rows.map((row) => row.id));
  } catch {
    return new Set();
  }
}

export const listFanWorks = createServerFn({ method: "GET" }).handler(async () => {
  kickFanPinBackfill();
  const { isAdminRequest } = await import("@/lib/admin-session.server");
  const admin = await isAdminRequest();
  let fromDb: FanWorkMeta[] = [];
  let banned = new Set<string>();
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    banned = await hiddenIds(sql);
    const rows = await sql<{
      id: string;
      title: string;
      cols: number;
      rows: number;
      created_at: string;
      kind: string | null;
      hidden: boolean | null;
      pinata_emoji_cid?: string | null;
      pinata_jpeg_cid?: string | null;
      pinata_video_cid?: string | null;
    }>`select id, title, cols, rows, created_at, kind, hidden, pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid from fan_works order by created_at desc limit 200`;
    fromDb = rows.map(mapMeta);
  } catch {
    fromDb = [];
  }
  const fromGh = await listFromGithub();
  const seen = new Set(fromDb.map((r) => r.id));
  const extras = fromGh.filter((g) => !seen.has(g.id));
  const extrasWithPins = await Promise.all(
    extras.map(async (g) => ({
      ...g,
      hidden: banned.has(g.id),
      ipfs: g.ipfs ?? (await pinsFromGithub(g.id)),
    })),
  );
  const merged = [...fromDb, ...extrasWithPins].map((work) => ({
    ...work,
    hidden: Boolean(work.hidden || banned.has(work.id)),
  }));
  const filled = await Promise.all(
    merged.map(async (work) => {
      let ipfs = work.ipfs;
      if (!(hasPins(ipfs) && (work.kind !== "clip" || ipfs.videoCid))) {
        ipfs = mergePins(ipfs, await pinsFromGithub(work.id));
      }
      return { ...work, ipfs, pins: ipfs };
    }),
  );
  if (admin) return filled;
  return filled.filter((work) => !work.hidden);
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
        kind: string | null;
        hidden?: boolean | number | null;
        pinata_emoji_cid?: string | null;
        pinata_jpeg_cid?: string | null;
        pinata_video_cid?: string | null;
      }>`select id, title, cols, rows, emoji_text, created_at, kind, hidden, pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid from fan_works where id = ${data.id} limit 1`;
      if (rows[0]) {
        const work = {
          ...mapMeta(rows[0]),
          emojiText: rows[0].emoji_text,
          ipfs: mergePins(mapPins(rows[0]), await pinsFromGithub(data.id)),
        } satisfies FanWork;
        work.pins = work.ipfs;
        if (work.hidden) {
          const { isAdminRequest } = await import("@/lib/admin-session.server");
          if (!(await isAdminRequest())) return null;
        }
        return work;
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
        kind?: string;
      };
      let hidden = false;
      try {
        const { getSql } = await import("@/lib/db");
        const sql = await getSql();
        const banned = await hiddenIds(sql);
        hidden = banned.has(meta.id);
      } catch {
        hidden = false;
      }
      if (hidden) {
        const { isAdminRequest } = await import("@/lib/admin-session.server");
        if (!(await isAdminRequest())) return null;
      }
      return {
        id: meta.id,
        title: meta.title,
        cols: meta.cols,
        rows: meta.rows,
        emojiText: await txtRes.text(),
        createdAt: meta.createdAt,
        kind: meta.kind === "clip" ? "clip" : "still",
        hidden,
        ipfs: await pinsFromGithub(data.id),
      } satisfies FanWork;
    } catch {
      return null;
    }
  });

export const publishFanWork = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().max(80).optional(),
      cols: z.number().int().min(2).max(256),
      rows: z.number().int().min(2).max(256),
      emojiText: z.string().min(1).max(900_000),
      imageJpeg: z.string().min(32).max(6_500_000),
      kind: z.enum(["still", "clip"]).optional(),
      videoBase64: z.string().min(32).max(40_000_000).optional(),
      videoMime: z.string().max(80).optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (!isEmojiProcessed(data.emojiText)) {
      throw new Error("Only emoji mosaics can be saved to Fans.");
    }
    const id = newId();
    const title = (data.title?.trim() || "Emoji New Master").slice(0, 80);
    const createdAt = new Date().toISOString();
    const kind = data.kind === "clip" || data.videoBase64 ? "clip" : "still";
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`
      insert into fan_works (id, title, cols, rows, emoji_text, image_jpeg, created_at, kind, video_b64, video_mime)
      values (
        ${id},
        ${title},
        ${data.cols},
        ${data.rows},
        ${data.emojiText},
        ${data.imageJpeg},
        ${createdAt}::timestamptz,
        ${kind},
        ${data.videoBase64 ?? null},
        ${data.videoMime ?? null}
      )
    `;
    const work: FanWork = {
      id,
      title,
      cols: data.cols,
      rows: data.rows,
      emojiText: data.emojiText,
      createdAt,
      kind,
    };
    const video =
      data.videoBase64 && data.videoMime
        ? { b64: data.videoBase64, mime: data.videoMime }
        : undefined;
    const github = await publishToGithub(work, data.imageJpeg, video);
    let pinata: { emojiCid?: string; jpegCid?: string; videoCid?: string } | null = null;
    pinata = await pinRow({
      id,
      title,
      emoji_text: data.emojiText,
      image_jpeg: data.imageJpeg,
      kind,
      video_b64: data.videoBase64 ?? null,
      video_mime: data.videoMime ?? null,
    });
    if (pinata) {
      await persistPins(sql, id, pinata);
    }
    void pinAllUnpinned();
    return { id, github, pinata };
  });

export const ensureFanPinned = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.string().regex(FAN_ID_RE) }))
  .handler(async ({ data }) => {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      title: string;
      emoji_text: string;
      image_jpeg: string;
      kind: string | null;
      video_b64: string | null;
      video_mime: string | null;
      pinata_emoji_cid: string | null;
      pinata_jpeg_cid: string | null;
      pinata_video_cid: string | null;
    }>`
      select id, title, emoji_text, image_jpeg, kind, video_b64, video_mime,
             pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
      from fan_works where id = ${data.id} limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    const existing = mapPins(row);
    if (hasPins(existing) && (row.kind !== "clip" || existing.videoCid)) {
      return existing;
    }
    const pinata = await pinRow(row);
    if (!pinata) return existing;
    await persistPins(sql, data.id, pinata);
    return mergePins(existing, pinata);
  });

export const setFanHidden = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().regex(FAN_ID_RE),
      hidden: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const { isAdminRequest } = await import("@/lib/admin-session.server");
    if (!(await isAdminRequest())) {
      throw new Error("Staff only");
    }
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    if (data.hidden) {
      await sql`insert into fan_hidden (id) values (${data.id}) on conflict (id) do nothing`;
      await sql`update fan_works set hidden = true where id = ${data.id}`;
    } else {
      await sql`delete from fan_hidden where id = ${data.id}`;
      await sql`update fan_works set hidden = false where id = ${data.id}`;
    }
    return { id: data.id, hidden: data.hidden };
  });

