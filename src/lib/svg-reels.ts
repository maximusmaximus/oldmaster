import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { IpfsPins } from "@/lib/ipfs";
import { hasPins } from "@/lib/ipfs";
import { asStamp } from "@/lib/fan-feed";
import { isEmojiProcessed } from "@/lib/emoji-processed";
import { glyphsToText } from "@/lib/mosaic/engine";
import {
  framesFromSvgMarkup,
  packReelFrames,
  stillFromEmojiText,
  SVG_FPS,
  unpackReelFrames,
} from "@/lib/svg-reel";

export const SVG_ID_RE = /^svg-[a-f0-9]{12}$/;

export type SvgReelMeta = {
  id: string;
  title: string;
  cols: number;
  rows: number;
  fps: number;
  frameCount: number;
  createdAt: string;
  ipfs?: IpfsPins | null;
};

export type SvgReel = SvgReelMeta & {
  emojiText: string;
  svg?: string | null;
  framesJson?: string | null;
};

export function svgPosterSrc(id: string): string {
  return `/api/svg-reel?id=${encodeURIComponent(id)}&k=poster`;
}

export function svgFileSrc(id: string): string {
  return `/api/svg-reel?id=${encodeURIComponent(id)}&k=file`;
}

function newId(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return `svg-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}

function mapPins(row: {
  pinata_svg_cid?: string | null;
  pinata_emoji_cid?: string | null;
  pinata_jpeg_cid?: string | null;
  pinata_frames_cid?: string | null;
}): IpfsPins | null {
  const pins: IpfsPins = {
    svgCid: row.pinata_svg_cid || undefined,
    emojiCid: row.pinata_emoji_cid || undefined,
    jpegCid: row.pinata_jpeg_cid || undefined,
    framesCid: row.pinata_frames_cid || undefined,
  };
  return hasPins(pins) ? pins : null;
}

async function ensureTable(sql: {
  query: (text: string, params?: unknown[]) => Promise<unknown>;
}) {
  await sql.query(`
    create table if not exists svg_reels (
      id text primary key,
      title text not null,
      cols integer not null,
      rows integer not null,
      fps integer not null default 8,
      frame_count integer not null default 0,
      emoji_text text not null default '',
      poster_jpeg text,
      svg_text text,
      frames_json text,
      pinata_svg_cid text,
      pinata_emoji_cid text,
      pinata_jpeg_cid text,
      pinata_frames_cid text,
      created_at timestamptz not null default now()
    )
  `);
}

let svgBackfill: Promise<void> | null = null;

export async function pinAllSvgReels(): Promise<number> {
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  await ensureTable(sql);
  const rows = await sql<{
    id: string;
    title: string;
    emoji_text: string;
    poster_jpeg: string | null;
    svg_text: string | null;
    frames_json: string | null;
    pinata_svg_cid: string | null;
    pinata_emoji_cid: string | null;
    pinata_jpeg_cid: string | null;
  }>`
    select id, title, emoji_text, poster_jpeg, svg_text, frames_json,
           pinata_svg_cid, pinata_emoji_cid, pinata_jpeg_cid
    from svg_reels
  `;
  let pinned = 0;
  for (const row of rows) {
    if (row.pinata_svg_cid && row.pinata_jpeg_cid) continue;
    if (!isEmojiProcessed(row.emoji_text) || !row.poster_jpeg || !row.svg_text) continue;
    try {
      const { pinSvgReel } = await import("@/lib/pinata");
      const pinata = await pinSvgReel({
        id: row.id,
        title: row.title,
        emojiText: row.emoji_text,
        jpeg: Buffer.from(row.poster_jpeg, "base64"),
        svg: Buffer.from(row.svg_text, "utf8"),
        frames: row.frames_json ? Buffer.from(row.frames_json, "utf8") : undefined,
      });
      if (!pinata) continue;
      await sql`
        update svg_reels
        set pinata_svg_cid = ${pinata.svgCid ?? null},
            pinata_emoji_cid = ${pinata.emojiCid ?? null},
            pinata_jpeg_cid = ${pinata.jpegCid ?? null},
            pinata_frames_cid = ${pinata.framesCid ?? null}
        where id = ${row.id}
      `;
      pinned += 1;
    } catch {
      /* keep going */
    }
  }
  return pinned;
}

function kickSvgPinBackfill() {
  if (svgBackfill) return;
  svgBackfill = pinAllSvgReels()
    .then(() => undefined)
    .catch(() => undefined)
    .finally(() => {
      svgBackfill = null;
    });
}

export const listSvgReels = createServerFn({ method: "GET" }).handler(async () => {
  kickSvgPinBackfill();
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await ensureTable(sql);
    const rows = await sql<{
      id: string;
      title: string;
      cols: number;
      rows: number;
      fps: number;
      frame_count: number;
      created_at: string;
      pinata_svg_cid?: string | null;
      pinata_emoji_cid?: string | null;
      pinata_jpeg_cid?: string | null;
      pinata_frames_cid?: string | null;
    }>`
      select id, title, cols, rows, fps, frame_count, created_at,
             pinata_svg_cid, pinata_emoji_cid, pinata_jpeg_cid, pinata_frames_cid
      from svg_reels
      order by created_at desc
      limit 120
    `;
    return rows.map(
      (row) =>
        ({
          id: row.id,
          title: row.title,
          cols: row.cols,
          rows: row.rows,
          fps: row.fps || SVG_FPS,
          frameCount: row.frame_count,
          createdAt: asStamp(row.created_at),
          ipfs: mapPins(row),
        }) satisfies SvgReelMeta,
    );
  } catch {
    return [];
  }
});

export const getSvgReel = createServerFn({ method: "GET" })
  .validator(z.object({ id: z.string() }))
  .handler(async ({ data }) => {
    if (!SVG_ID_RE.test(data.id)) return null;
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    const rows = await sql<{
      id: string;
      title: string;
      cols: number;
      rows: number;
      fps: number;
      frame_count: number;
      created_at: string;
      emoji_text: string;
      svg_text?: string | null;
      frames_json?: string | null;
      pinata_svg_cid?: string | null;
      pinata_emoji_cid?: string | null;
      pinata_jpeg_cid?: string | null;
      pinata_frames_cid?: string | null;
    }>`
      select id, title, cols, rows, fps, frame_count, created_at, emoji_text,
             svg_text, frames_json, pinata_svg_cid, pinata_emoji_cid,
             pinata_jpeg_cid, pinata_frames_cid
      from svg_reels
      where id = ${data.id}
      limit 1
    `;
    const row = rows[0];
    if (!row) return null;
    return {
      id: row.id,
      title: row.title,
      cols: row.cols,
      rows: row.rows,
      fps: row.fps || SVG_FPS,
      frameCount: row.frame_count,
      createdAt: asStamp(row.created_at),
      emojiText: row.emoji_text,
      svg: row.svg_text || null,
      framesJson: row.frames_json || null,
      ipfs: mapPins(row),
    } satisfies SvgReel;
  });

export async function loadSvgPosterBytes(id: string): Promise<Buffer | null> {
  if (!SVG_ID_RE.test(id)) return null;
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{ poster_jpeg: string | null; pinata_jpeg_cid?: string | null }>`
    select poster_jpeg, pinata_jpeg_cid from svg_reels where id = ${id} limit 1
  `;
  const row = rows[0];
  if (row?.poster_jpeg) return Buffer.from(row.poster_jpeg, "base64");
  if (row?.pinata_jpeg_cid) {
    const { fetchPinataBytes } = await import("@/lib/pinata");
    return fetchPinataBytes(row.pinata_jpeg_cid);
  }
  return null;
}

export async function loadSvgFile(id: string): Promise<string | null> {
  if (!SVG_ID_RE.test(id)) return null;
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{ svg_text: string | null; pinata_svg_cid?: string | null }>`
    select svg_text, pinata_svg_cid from svg_reels where id = ${id} limit 1
  `;
  const row = rows[0];
  if (row?.svg_text) return row.svg_text;
  if (row?.pinata_svg_cid) {
    const { fetchPinataBytes } = await import("@/lib/pinata");
    const bytes = await fetchPinataBytes(row.pinata_svg_cid);
    if (bytes) return bytes.toString("utf8");
  }
  return null;
}

export async function loadSvgFramesJson(id: string): Promise<string | null> {
  if (!SVG_ID_RE.test(id)) return null;
  const { getSql } = await import("@/lib/db");
  const sql = await getSql();
  const rows = await sql<{
    frames_json: string | null;
    pinata_frames_cid?: string | null;
    svg_text?: string | null;
    pinata_svg_cid?: string | null;
    emoji_text?: string | null;
    cols?: number;
    rows?: number;
    fps?: number;
  }>`
    select frames_json, pinata_frames_cid, svg_text, pinata_svg_cid, emoji_text, cols, rows, fps
    from svg_reels where id = ${id} limit 1
  `;
  const row = rows[0];
  if (!row) return null;

  const asJson = (raw: string | null | undefined): string | null => {
    if (!raw) return null;
    const trim = raw.trim();
    if (!trim) return null;
    if (trim.startsWith("{")) {
      const pack = unpackReelFrames(trim);
      if (pack.frames.length) return trim;
    }
    const fromSvg = framesFromSvgMarkup(trim);
    if (fromSvg?.frames.length) return packReelFrames(fromSvg.frames, fromSvg.fps);
    return null;
  };

  const local = asJson(row.frames_json);
  if (local) return local;

  if (row.pinata_frames_cid) {
    try {
      const { fetchPinataBytes } = await import("@/lib/pinata");
      const bytes = await fetchPinataBytes(row.pinata_frames_cid);
      const packed = asJson(bytes ? bytes.toString("utf8") : null);
      if (packed) return rememberFrames(id, packed);
    } catch {
      /* svg / emoji next */
    }
  }

  const svgLocal = asJson(row.svg_text);
  if (svgLocal) return rememberFrames(id, svgLocal);
  if (row.pinata_svg_cid) {
    try {
      const { fetchPinataBytes } = await import("@/lib/pinata");
      const bytes = await fetchPinataBytes(row.pinata_svg_cid);
      const packed = asJson(bytes ? bytes.toString("utf8") : null);
      if (packed) return rememberFrames(id, packed);
    } catch {
      /* emoji still next */
    }
  }

  if (row.emoji_text && row.cols && row.rows) {
    const still = stillFromEmojiText(row.emoji_text, Number(row.cols), Number(row.rows));
    return rememberFrames(id, packReelFrames([still], Number(row.fps) || SVG_FPS));
  }
  return null;
}

async function rememberFrames(id: string, json: string | null) {
  if (!json || json.length > 8_000_000) return json;
  try {
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await sql`update svg_reels set frames_json = ${json} where id = ${id} and (frames_json is null or length(frames_json) < 32)`;
  } catch {
    /* cache best-effort */
  }
  return json;
}

export const publishSvgReel = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().max(80).optional(),
      cols: z.number().int().min(2).max(256),
      rows: z.number().int().min(2).max(256),
      fps: z.number().int().min(2).max(24).optional(),
      frameCount: z.number().int().min(2).max(240).optional(),
      emojiText: z.string().min(1).max(900_000),
      imageJpeg: z.string().min(32).max(6_500_000),
      svg: z.string().min(32).max(16_000_000),
      framesJson: z.string().min(2).max(16_000_000).optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (!isEmojiProcessed(data.emojiText)) {
      throw new Error("Only emoji mosaics can be saved.");
    }
    const id = newId();
    const title = (data.title?.trim() || "SVG reel").slice(0, 80);
    const createdAt = new Date().toISOString();
    const fps = data.fps || SVG_FPS;
    const frameCount = data.frameCount || 2;
    const { getSql } = await import("@/lib/db");
    const sql = await getSql();
    await ensureTable(sql);
    const storeSvg = data.svg.length <= 8_000_000 ? data.svg : null;
    const storeFrames =
      data.framesJson && data.framesJson.length <= 8_000_000 ? data.framesJson : null;
    await sql`
      insert into svg_reels (
        id, title, cols, rows, fps, frame_count, emoji_text, poster_jpeg, svg_text, frames_json, created_at
      )
      values (
        ${id},
        ${title},
        ${data.cols},
        ${data.rows},
        ${fps},
        ${frameCount},
        ${data.emojiText},
        ${data.imageJpeg},
        ${storeSvg},
        ${storeFrames},
        ${createdAt}::timestamptz
      )
    `;
    let pinata: IpfsPins | null = null;
    try {
      const { pinSvgReel } = await import("@/lib/pinata");
      pinata = await pinSvgReel({
        id,
        title,
        emojiText: data.emojiText,
        jpeg: Buffer.from(data.imageJpeg, "base64"),
        svg: Buffer.from(data.svg, "utf8"),
        frames: data.framesJson ? Buffer.from(data.framesJson, "utf8") : undefined,
      });
    } catch {
      pinata = null;
    }
    if (pinata) {
      await sql`
        update svg_reels
        set pinata_svg_cid = ${pinata.svgCid ?? null},
            pinata_emoji_cid = ${pinata.emojiCid ?? null},
            pinata_jpeg_cid = ${pinata.jpegCid ?? null},
            pinata_frames_cid = ${pinata.framesCid ?? null}
        where id = ${id}
      `;
    }
    void pinAllSvgReels();
    try {
      const { pinAllUnpinned } = await import("@/lib/fan-works");
      void pinAllUnpinned();
    } catch {
      /* fans optional */
    }
    return { id, title, ipfs: pinata };
  });

export function reelEmojiText(glyphs: string[], cols: number): string {
  return glyphsToText(glyphs, cols);
}