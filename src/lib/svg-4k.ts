import { downloadBlob, pickRecorderMime, videoExt } from "@/lib/camera";
import { fileStem } from "@/lib/mosaic/engine";
import { letterboxReelFrame, SVG_FPS, type SvgReelFrame } from "@/lib/svg-reel";

export const UHD_W = 3840;
export const UHD_H = 2160;
export const UHD8_W = 7680;
export const UHD8_H = 4320;

export type ReelVideoSize = "4k" | "8k";

const LONG_EDGE: Record<ReelVideoSize, number> = { "4k": 3840, "8k": 7680 };
const BITRATE: Record<ReelVideoSize, number> = { "4k": 24_000_000, "8k": 96_000_000 };

function wait(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

function even16(n: number): number {
  return Math.max(16, Math.round(n / 16) * 16);
}

export function reelVideoDimensions(
  frame: SvgReelFrame,
  size: ReelVideoSize,
): { w: number; h: number } {
  const long = LONG_EDGE[size];
  const cols = Math.max(1, frame.cols);
  const rows = Math.max(1, frame.rows);
  if (rows > cols) {
    return { w: even16(long * (cols / rows)), h: long };
  }
  if (cols > rows) {
    return { w: long, h: even16(long * (rows / cols)) };
  }
  return { w: long, h: long };
}

function makeCanvas(w: number, h: number): HTMLCanvasElement | null {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  if (canvas.width !== w || canvas.height !== h) return null;
  if (!canvas.getContext("2d")) return null;
  return canvas;
}

function sizeLadder(frame: SvgReelFrame, size: ReelVideoSize): { w: number; h: number }[] {
  const wanted = reelVideoDimensions(frame, size);
  const four = reelVideoDimensions(frame, "4k");
  const hdLong = 1920;
  const hd =
    frame.rows > frame.cols
      ? { w: even16(hdLong * (frame.cols / frame.rows)), h: hdLong }
      : { w: hdLong, h: even16(hdLong * (frame.rows / frame.cols)) };
  const seen = new Set<string>();
  const out: { w: number; h: number }[] = [];
  for (const dim of [wanted, four, hd]) {
    const key = `${dim.w}x${dim.h}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(dim);
  }
  return out;
}

async function encodeAt(
  frames: SvgReelFrame[],
  fps: number,
  w: number,
  h: number,
  bits: number,
): Promise<{ blob: Blob; mime: string }> {
  const canvas = makeCanvas(w, h);
  if (!canvas || typeof canvas.captureStream !== "function") {
    throw new Error("This browser can’t record that size");
  }
  letterboxReelFrame(canvas, frames[0]!, w, h);
  const stream = canvas.captureStream(Math.max(4, fps));
  const mime = pickRecorderMime() || "video/webm";
  let rec: MediaRecorder;
  try {
    rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: bits });
  } catch {
    rec = new MediaRecorder(stream);
  }
  const chunks: Blob[] = [];
  rec.ondataavailable = (event) => {
    if (event.data.size) chunks.push(event.data);
  };
  const stopped = new Promise<Blob>((resolve, reject) => {
    rec.onerror = () => reject(new Error("encode failed"));
    rec.onstop = () => {
      const type = rec.mimeType || mime;
      const blob = new Blob(chunks, { type });
      if (blob.size < 64) reject(new Error("encode was empty"));
      else resolve(blob);
    };
  });
  rec.start(200);
  const step = 1000 / Math.max(1, fps);
  for (let i = 0; i < frames.length; i++) {
    letterboxReelFrame(canvas, frames[i]!, w, h);
    await wait(step);
  }
  if (rec.state !== "inactive") rec.stop();
  const blob = await stopped;
  return { blob, mime: blob.type || mime };
}

export async function encodeReelVideo(
  frames: SvgReelFrame[],
  fps = SVG_FPS,
  size: ReelVideoSize = "4k",
): Promise<{ blob: Blob; mime: string; w: number; h: number }> {
  if (frames.length < 2) throw new Error("Need more frames");
  let last: Error | null = null;
  for (const dim of sizeLadder(frames[0]!, size)) {
    try {
      const bits = dim.w >= 7000 || dim.h >= 7000 ? BITRATE["8k"] : BITRATE["4k"];
      const encoded = await encodeAt(frames, fps, dim.w, dim.h, bits);
      return { ...encoded, w: dim.w, h: dim.h };
    } catch (err) {
      last = err instanceof Error ? err : new Error("encode failed");
    }
  }
  throw last ?? new Error("Could not encode video");
}

export async function encodeReel4k(frames: SvgReelFrame[], fps = SVG_FPS) {
  return encodeReelVideo(frames, fps, "4k");
}

export async function downloadReelVideo(
  frames: SvgReelFrame[],
  title: string,
  fps = SVG_FPS,
  size: ReelVideoSize = "4k",
) {
  const { blob, mime, w, h } = await encodeReelVideo(frames, fps, size);
  const label = size === "8k" ? "8k" : "4k";
  const orient = h > w ? "portrait" : w > h ? "landscape" : "square";
  downloadBlob(
    blob,
    `${fileStem(title || "emoji-svg-reel")}-${label}-${orient}.${videoExt(mime)}`,
  );
}

export async function downloadReel4k(
  frames: SvgReelFrame[],
  title: string,
  fps = SVG_FPS,
) {
  return downloadReelVideo(frames, title, fps, "4k");
}

export async function downloadReel8k(
  frames: SvgReelFrame[],
  title: string,
  fps = SVG_FPS,
) {
  return downloadReelVideo(frames, title, fps, "8k");
}
