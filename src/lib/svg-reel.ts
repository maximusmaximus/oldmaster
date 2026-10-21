import { EMOJI_FONT } from "./mosaic/palette";

export const SVG_CLIP_MS = 24_000;
export const SVG_FPS = 8;
export const SVG_DENSITY_STEPS = [32, 48, 64, 80, 96] as const;
export const DEFAULT_SVG_DENSITY = 48;

export type SvgReelFrame = {
  cols: number;
  rows: number;
  glyphs: string[];
  colors: Uint8ClampedArray;
};

export function colorsToPngDataUrl(
  colors: ArrayLike<number>,
  cols: number,
  rows: number,
): string {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, cols);
  canvas.height = Math.max(1, rows);
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const img = ctx.createImageData(canvas.width, canvas.height);
  const n = cols * rows;
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    img.data[o] = colors[i * 3] ?? 0;
    img.data[o + 1] = colors[i * 3 + 1] ?? 0;
    img.data[o + 2] = colors[i * 3 + 2] ?? 0;
    img.data[o + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL("image/png");
}

function u8ToB64(bytes: Uint8Array | Uint8ClampedArray): string {
  const view =
    bytes instanceof Uint8Array
      ? bytes
      : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < view.length; i += chunk) {
    bin += String.fromCharCode(...view.subarray(i, i + chunk));
  }
  return btoa(bin);
}

function b64ToU8(b64: string): Uint8ClampedArray {
  const bin = atob(b64);
  const out = new Uint8ClampedArray(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function paletteFor(frames: SvgReelFrame[]): string[] {
  const seen = new Map<string, number>();
  const pal: string[] = [" "];
  seen.set(" ", 0);
  for (const frame of frames) {
    for (const glyph of frame.glyphs) {
      const g = glyph || " ";
      if (!seen.has(g)) {
        seen.set(g, pal.length);
        pal.push(g);
        if (pal.length >= 255) return pal;
      }
    }
  }
  return pal;
}

function indexBytes(frames: SvgReelFrame[], pal: string[]): Uint8Array {
  const map = new Map(pal.map((g, i) => [g, i]));
  const first = frames[0]!;
  const n = first.cols * first.rows;
  const out = new Uint8Array(n * frames.length);
  frames.forEach((frame, f) => {
    const o = f * n;
    for (let i = 0; i < n; i++) {
      out[o + i] = map.get(frame.glyphs[i] || " ") ?? 0;
    }
  });
  return out;
}

export function packReelFrames(frames: SvgReelFrame[], fps = SVG_FPS): string {
  const first = frames[0];
  if (!first) return "{}";
  const pal = paletteFor(frames);
  const rgb = new Uint8ClampedArray(first.cols * first.rows * 3 * frames.length);
  frames.forEach((frame, f) => {
    rgb.set(frame.colors, f * first.cols * first.rows * 3);
  });
  return JSON.stringify({
    v: 2,
    fps,
    cols: first.cols,
    rows: first.rows,
    pal,
    idx: u8ToB64(indexBytes(frames, pal)),
    rgb: u8ToB64(rgb),
  });
}

export function unpackReelFrames(raw: string): { frames: SvgReelFrame[]; fps: number } {
  let data: {
    v?: number;
    fps?: number;
    cols?: number;
    rows?: number;
    pal?: string[];
    idx?: string;
    rgb?: string;
    glyphs?: string[][];
    colors?: string[];
  };
  try {
    data = JSON.parse(raw) as typeof data;
  } catch {
    return { frames: [], fps: SVG_FPS };
  }
  const cols = Math.max(2, Number(data.cols) || 2);
  const rows = Math.max(2, Number(data.rows) || 2);
  const fps = Number(data.fps) || SVG_FPS;
  if (data.pal && data.idx) {
    const pal = data.pal;
    const idx = b64ToU8(data.idx);
    const rgb = data.rgb ? b64ToU8(data.rgb) : new Uint8ClampedArray(0);
    const n = cols * rows;
    const count = Math.max(1, Math.floor(idx.length / n) || 1);
    const frames: SvgReelFrame[] = [];
    for (let f = 0; f < count; f++) {
      const glyphs: string[] = [];
      const colors = new Uint8ClampedArray(n * 3);
      const o = f * n;
      for (let i = 0; i < n; i++) {
        glyphs.push(pal[idx[o + i] ?? 0] ?? " ");
      }
      if (rgb.length >= (f + 1) * n * 3) {
        colors.set(rgb.subarray(f * n * 3, (f + 1) * n * 3));
      }
      frames.push({ cols, rows, glyphs, colors });
    }
    return { frames, fps };
  }
  const glyphs = Array.isArray(data.glyphs) ? data.glyphs : [];
  const colors = Array.isArray(data.colors) ? data.colors : [];
  const frames: SvgReelFrame[] = glyphs.map((g, i) => ({
    cols,
    rows,
    glyphs: Array.isArray(g) ? g : [],
    colors: colors[i] ? b64ToU8(colors[i]!) : new Uint8ClampedArray(cols * rows * 3),
  }));
  return { frames, fps };
}

function splitLine(line: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(line)].map(
      (part) => part.segment,
    );
  }
  return Array.from(line);
}

export function stillFromEmojiText(text: string, cols: number, rows: number): SvgReelFrame {
  const lines = text.replace(/\r/g, "").split("\n");
  const glyphs: string[] = [];
  const width = Math.max(2, cols);
  const height = Math.max(2, rows);
  for (let y = 0; y < height; y++) {
    const row = splitLine(lines[y] || "");
    for (let x = 0; x < width; x++) glyphs.push(row[x] || " ");
  }
  return {
    cols: width,
    rows: height,
    glyphs,
    colors: new Uint8ClampedArray(width * height * 3),
  };
}

export function framesFromSvgMarkup(svg: string): { frames: SvgReelFrame[]; fps: number } | null {
  const trim = (svg || "").replace(/^\uFEFF/, "").trim();
  if (!trim) return null;
  const tryPack = (raw: string) => {
    const pack = unpackReelFrames(raw);
    return pack.frames.length ? pack : null;
  };
  if (trim.startsWith("{")) return tryPack(trim);
  const cdata = trim.match(/id=["']reel["'][^>]*>\s*<!\[CDATA\[([\s\S]*?)\]\]>/i);
  if (cdata?.[1]) return tryPack(cdata[1].trim());
  const script = trim.match(/id=["']reel["'][^>]*>([\s\S]*?)<\/script>/i);
  if (script?.[1]) return tryPack(script[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim());
  return null;
}

function escapeXml(value: string): string {
  const amp = String.fromCharCode(38);
  return value.replace(/[&<>]/g, (ch) => {
    if (ch === "&") return `${amp}amp;`;
    if (ch === "<") return `${amp}lt;`;
    return `${amp}gt;`;
  });
}

export function framesToAnimatedSvg(
  frames: SvgReelFrame[],
  fps = SVG_FPS,
  cell = 44,
): string {
  if (!frames.length) return "";
  const first = frames[0]!;
  const width = Math.max(1, first.cols * cell);
  const height = Math.max(1, first.rows * cell);
  const fontPx = Math.max(8, Math.floor(cell * 0.92));
  const n = frames.length;
  const pal = paletteFor(frames);
  const idx = u8ToB64(indexBytes(frames, pal));
  const rgb = new Uint8ClampedArray(first.cols * first.rows * 3 * n);
  frames.forEach((frame, f) => {
    rgb.set(frame.colors, f * first.cols * first.rows * 3);
  });
  const cells: string[] = [];
  for (let y = 0; y < first.rows; y++) {
    for (let x = 0; x < first.cols; x++) {
      const i = y * first.cols + x;
      const r = first.colors[i * 3] ?? 0;
      const g = first.colors[i * 3 + 1] ?? 0;
      const b = first.colors[i * 3 + 2] ?? 0;
      const px = x * cell;
      const py = y * cell;
      const glyph = first.glyphs[i] || " ";
      cells.push(
        `<rect id="r${i}" x="${px}" y="${py}" width="${cell + 0.35}" height="${cell + 0.35}" fill="rgb(${r},${g},${b})"/>`,
        `<text id="g${i}" x="${(px + cell / 2).toFixed(2)}" y="${(py + cell / 2).toFixed(2)}">${escapeXml(glyph)}</text>`,
      );
    }
  }
  const payload = JSON.stringify({
    pal,
    idx,
    rgb: u8ToB64(rgb),
    cols: first.cols,
    rows: first.rows,
    fps,
    n,
  }).replace(/]]>/g, "]]\\>");
  const script =
    "(function(){var el=document.getElementById(\"reel\");if(!el)return;var d=JSON.parse(el.textContent||\"{}\");var pal=d.pal||[\" \"];var cols=+d.cols||1,rows=+d.rows||1,fps=+d.fps||8;var n=cols*rows;var idx=atob(d.idx||\"\");var rgb=atob(d.rgb||\"\");var frames=Math.max(1,Math.floor(idx.length/n));var rects=[],glyphs=[];for(var i=0;i<n;i++){rects[i]=document.getElementById(\"r\"+i);glyphs[i]=document.getElementById(\"g\"+i);}function paint(f){var o=f*n;for(var i=0;i<n;i++){if(glyphs[i])glyphs[i].textContent=pal[idx.charCodeAt(o+i)]||\" \";if(rects[i]&&rgb.length){var k=(o+i)*3;rects[i].setAttribute(\"fill\",\"rgb(\"+rgb.charCodeAt(k)+\",\"+rgb.charCodeAt(k+1)+\",\"+rgb.charCodeAt(k+2)+\")\");}}}var f=0;paint(0);if(frames<2)return;setInterval(function(){f=(f+1)%frames;paint(f);},Math.max(40,1000/fps));}());";
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<title>Emoji SVG reel</title>`,
    `<rect width="100%" height="100%" fill="#0c0b0a"/>`,
    `<style>text{font-family:${EMOJI_FONT};font-size:${fontPx}px;text-anchor:middle;dominant-baseline:central}</style>`,
    `<g id="grid">${cells.join("")}</g>`,
    `<script type="application/json" id="reel"><![CDATA[${payload}]]></script>`,
    `<script type="text/ecmascript"><![CDATA[${script}]]></script>`,
    `</svg>`,
  ].join("");
}

export function toStandaloneSvg(raw: string, frames?: SvgReelFrame[], fps = SVG_FPS): string {
  const trim = (raw || "").replace(/^\uFEFF/, "").trim();
  if (frames && frames.length >= 2) {
    return framesToAnimatedSvg(frames, fps);
  }
  if (trim.startsWith("{")) {
    try {
      const unpacked = unpackReelFrames(trim);
      if (unpacked.frames.length) {
        return framesToAnimatedSvg(unpacked.frames, unpacked.fps);
      }
    } catch {
      /* not a reel pack */
    }
  }
  if (trim.startsWith("<?xml") || trim.startsWith("<svg")) {
    return trim.replace(/^<\?xml[^?]*\?>\s*/i, "");
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">`,
    `<rect width="100%" height="100%" fill="#0c0b0a"/>`,
    `<text x="32" y="34" text-anchor="middle" fill="#fff" font-size="12">svg</text>`,
    `</svg>`,
  ].join("");
}

export function svgToBlob(svg: string): Blob {
  const markup = toStandaloneSvg(svg);
  const bytes = new TextEncoder().encode(markup);
  return new Blob([bytes], { type: "image/svg+xml;charset=utf-8" });
}

export function downloadSvg(
  svg: string,
  filename: string,
  frames?: SvgReelFrame[],
  fps = SVG_FPS,
) {
  const markup = toStandaloneSvg(svg, frames, fps);
  const name = filename.toLowerCase().endsWith(".svg") ? filename : `${filename}.svg`;
  const bytes = new TextEncoder().encode(markup);
  const blob = new Blob([bytes], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 4000);
}

const frameCache = new Map<string, Promise<{ frames: SvgReelFrame[]; fps: number }>>();

export function loadReelFrames(id: string) {
  let hit = frameCache.get(id);
  if (!hit) {
    hit = (async () => {
      const framesUrl = `/api/svg-reel?id=${encodeURIComponent(id)}&k=frames`;
      try {
        const res = await fetch(framesUrl);
        if (res.ok) {
          const pack = unpackReelFrames(await res.text());
          if (pack.frames.length) return pack;
        }
      } catch {
        /* SVG file next */
      }
      const svgRes = await fetch(`/api/svg-reel?id=${encodeURIComponent(id)}&k=file`);
      if (svgRes.ok) {
        const pack = framesFromSvgMarkup(await svgRes.text());
        if (pack?.frames.length) return pack;
      }
      throw new Error("missing");
    })();
    frameCache.set(id, hit);
    hit.catch(() => {
      frameCache.delete(id);
    });
  }
  return hit;
}

export function paintReelFrame(
  ctx: CanvasRenderingContext2D,
  frame: SvgReelFrame,
  x: number,
  y: number,
  cell: number,
) {
  const w = Math.max(1, frame.cols * cell);
  const h = Math.max(1, frame.rows * cell);
  const sample = document.createElement("canvas");
  sample.width = frame.cols;
  sample.height = frame.rows;
  const sctx = sample.getContext("2d");
  if (sctx) {
    const img = sctx.createImageData(frame.cols, frame.rows);
    const n = frame.cols * frame.rows;
    for (let i = 0; i < n; i++) {
      img.data[i * 4] = frame.colors[i * 3] ?? 0;
      img.data[i * 4 + 1] = frame.colors[i * 3 + 1] ?? 0;
      img.data[i * 4 + 2] = frame.colors[i * 3 + 2] ?? 0;
      img.data[i * 4 + 3] = 255;
    }
    sctx.putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(sample, x, y, w, h);
  }
  const fontPx = Math.max(8, Math.floor(cell * 0.92));
  ctx.font = `${fontPx}px ${EMOJI_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  for (let row = 0; row < frame.rows; row++) {
    for (let col = 0; col < frame.cols; col++) {
      const glyph = frame.glyphs[row * frame.cols + col];
      if (!glyph) continue;
      ctx.fillText(glyph, x + (col + 0.5) * cell, y + (row + 0.5) * cell);
    }
  }
}

export function letterboxReelFrame(
  canvas: HTMLCanvasElement,
  frame: SvgReelFrame,
  outW: number,
  outH: number,
) {
  if (canvas.width !== outW || canvas.height !== outH) {
    canvas.width = outW;
    canvas.height = outH;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = "#0c0b0a";
  ctx.fillRect(0, 0, outW, outH);
  const cell = Math.max(1, Math.floor(Math.min(outW / frame.cols, outH / frame.rows)));
  const w = frame.cols * cell;
  const h = frame.rows * cell;
  paintReelFrame(ctx, frame, (outW - w) / 2, (outH - h) / 2, cell);
}