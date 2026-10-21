import { labDist, rgbToLab } from "./color";
import { EMOJI_FONT, EMOJI_GLYPHS } from "./palette";

const Q = 16;
const LUT_SIZE = Q * Q * Q;

export type Palette = {
  glyphs: string[];
  lut: Uint16Array;
};

let palettePromise: Promise<Palette> | null = null;

function uniqueGlyphs(list: string[]): string[] {
  return Array.from(new Set(list));
}

function sampleGlyph(glyph: string, size = 48): { r: number; g: number; b: number } | null {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.clearRect(0, 0, size, size);
  ctx.font = `${Math.floor(size * 0.82)}px ${EMOJI_FONT}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph, size / 2, size / 2 + 1);
  const { data } = ctx.getImageData(0, 0, size, size);
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 140) continue;
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    n++;
  }
  if (n < 8) return null;
  return { r: r / n, g: g / n, b: b / n };
}

function buildLut(labs: [number, number, number][]): Uint16Array {
  const lut = new Uint16Array(LUT_SIZE);
  const step = 256 / Q;
  for (let ri = 0; ri < Q; ri++) {
    const r = (ri + 0.5) * step;
    for (let gi = 0; gi < Q; gi++) {
      const g = (gi + 0.5) * step;
      for (let bi = 0; bi < Q; bi++) {
        const b = (bi + 0.5) * step;
        const lab = rgbToLab(r, g, b);
        let best = 0;
        let bestD = Infinity;
        for (let i = 0; i < labs.length; i++) {
          const d = labDist(lab, labs[i]);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        }
        lut[(ri << 8) | (gi << 4) | bi] = best;
      }
    }
  }
  return lut;
}

function shift(channel: number): number {
  return Math.min(Q - 1, channel >> 4);
}

export function lutIndex(r: number, g: number, b: number): number {
  return (shift(r) << 8) | (shift(g) << 4) | shift(b);
}

async function waitForEmojiFonts(): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.race([
      Promise.allSettled([
        document.fonts.load('48px "Noto Color Emoji"'),
        document.fonts.load('48px "Apple Color Emoji"'),
        document.fonts.load('48px "Segoe UI Emoji"'),
      ]),
      new Promise<void>((resolve) => setTimeout(resolve, 600)),
    ]);
  } catch {
    /* continue with whatever is installed */
  }
}

async function calibrate(): Promise<Palette> {
  await waitForEmojiFonts();
  const glyphs: string[] = [];
  const labs: [number, number, number][] = [];
  for (const glyph of uniqueGlyphs(EMOJI_GLYPHS)) {
    const rgb = sampleGlyph(glyph);
    if (!rgb) continue;
    glyphs.push(glyph);
    labs.push(rgbToLab(rgb.r, rgb.g, rgb.b));
  }
  if (glyphs.length < 8) {
    const fallback = ["🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "🟫", "⬛", "⬜"];
    for (const glyph of fallback) {
      glyphs.push(glyph);
      labs.push(rgbToLab(128, 128, 128));
    }
  }
  return { glyphs, lut: buildLut(labs) };
}

const PALETTE_CACHE_KEY = "eom-palette-v2";

function paletteFromCache(): Palette | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(PALETTE_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { n?: number; glyphs?: string[]; lut?: number[] };
    if (parsed.n !== EMOJI_GLYPHS.length || !Array.isArray(parsed.glyphs) || !Array.isArray(parsed.lut)) {
      return null;
    }
    if (parsed.lut.length !== LUT_SIZE || parsed.glyphs.length < 8) return null;
    return { glyphs: parsed.glyphs, lut: Uint16Array.from(parsed.lut) };
  } catch {
    return null;
  }
}

function paletteToCache(palette: Palette) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(
      PALETTE_CACHE_KEY,
      JSON.stringify({
        n: EMOJI_GLYPHS.length,
        glyphs: palette.glyphs,
        lut: Array.from(palette.lut),
      }),
    );
  } catch {
    /* quota */
  }
}

export function ensurePalette(): Promise<Palette> {
  if (!palettePromise) {
    palettePromise = (async () => {
      const cached = paletteFromCache();
      if (cached) {
        void waitForEmojiFonts();
        return cached;
      }
      const palette = await calibrate();
      paletteToCache(palette);
      return palette;
    })();
  }
  return palettePromise;
}

export function gridForImage(
  width: number,
  height: number,
  longSideCells: number,
): { cols: number; rows: number } {
  const long = Math.max(2, Math.round(longSideCells));
  if (width >= height) {
    const cols = long;
    const rows = Math.max(2, Math.round((long * height) / width));
    return { cols, rows };
  }
  const rows = long;
  const cols = Math.max(2, Math.round((long * width) / height));
  return { cols, rows };
}

export type MosaicResult = {
  cols: number;
  rows: number;
  cells: number;
  glyphs: string[];
  colors: Uint8ClampedArray;
};

export function glyphsToText(glyphs: string[], cols: number): string {
  const lines: string[] = [];
  for (let i = 0; i < glyphs.length; i += cols) {
    lines.push(glyphs.slice(i, i + cols).join(""));
  }
  return lines.join("\n");
}

export function splitGraphemes(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(text)].map(
      (p) => p.segment,
    );
  }
  return Array.from(text);
}

export function parseEmojiGrid(text: string): {
  glyphs: string[];
  cols: number;
  rows: number;
} {
  const lines = text.replace(/\n+$/, "").split("\n");
  const rows = Math.max(1, lines.length);
  const segs = lines.map(splitGraphemes);
  const cols = Math.max(1, ...segs.map((s) => s.length));
  const glyphs: string[] = [];
  for (const row of segs) {
    for (let i = 0; i < cols; i++) glyphs.push(row[i] ?? " ");
  }
  return { glyphs, cols, rows };
}

export function fileStem(name: string): string {
  return (
    name
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() || "mosaic"
  );
}

function escapeXml(value: string): string {
  const amp = String.fromCharCode(38);
  return value.replace(/[&<>]/g, (ch) => {
    if (ch === "&") return `${amp}amp;`;
    if (ch === "<") return `${amp}lt;`;
    return `${amp}gt;`;
  });
}

export function mosaicToSvg(
  glyphs: string[],
  cols: number,
  rows: number,
  colors?: ArrayLike<number> | null,
  cell = 28,
): string {
  const width = Math.max(1, cols * cell);
  const height = Math.max(1, rows * cell);
  const fontPx = Math.max(8, Math.floor(cell * 0.82));
  const parts: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
    `<rect width="100%" height="100%" fill="#0c0b0a"/>`,
    `<style>text{font-family:${EMOJI_FONT};font-size:${fontPx}px;text-anchor:middle;dominant-baseline:central}</style>`,
  ];
  const hasColor = Boolean(colors && colors.length >= glyphs.length * 3);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      const glyph = glyphs[i];
      if (!glyph) continue;
      const px = x * cell;
      const py = y * cell;
      if (hasColor && colors) {
        const r = colors[i * 3];
        const g = colors[i * 3 + 1];
        const b = colors[i * 3 + 2];
        parts.push(
          `<rect x="${px}" y="${py}" width="${cell + 0.5}" height="${cell + 0.5}" fill="rgb(${r},${g},${b})"/>`,
        );
      }
      parts.push(
        `<text x="${px + cell / 2}" y="${py + cell / 2}">${escapeXml(glyph)}</text>`,
      );
    }
  }
  parts.push(`</svg>`);
  return parts.join("");
}

export function downloadText(text: string, filename: string, mime: string) {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

let atlasCanvas: HTMLCanvasElement | null = null;
let atlasCtx: CanvasRenderingContext2D | null = null;
let atlasCell = 0;
let atlasCount = 0;

function glyphAtlas(palette: Palette, cell: number): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  if (!atlasCanvas) {
    atlasCanvas = document.createElement("canvas");
    atlasCtx = atlasCanvas.getContext("2d");
  }
  if (!atlasCtx) return null;
  if (atlasCell === cell && atlasCount === palette.glyphs.length) return atlasCanvas;
  const count = palette.glyphs.length;
  atlasCanvas.width = Math.max(1, count * cell);
  atlasCanvas.height = cell;
  atlasCtx.clearRect(0, 0, atlasCanvas.width, atlasCanvas.height);
  atlasCtx.font = `${Math.max(6, Math.floor(cell * 0.92))}px ${EMOJI_FONT}`;
  atlasCtx.textAlign = "center";
  atlasCtx.textBaseline = "middle";
  for (let i = 0; i < count; i++) {
    atlasCtx.fillText(palette.glyphs[i] ?? "⬜", i * cell + cell / 2, cell / 2);
  }
  atlasCell = cell;
  atlasCount = count;
  return atlasCanvas;
}

function blitMosaic(
  ctx: CanvasRenderingContext2D,
  sample: HTMLCanvasElement,
  pix: Uint8ClampedArray,
  cols: number,
  rows: number,
  palette: Palette,
  canvasW: number,
  canvasH: number,
  collect: boolean,
): { glyphs: string[]; colors: Uint8ClampedArray } {
  const cellW = canvasW / cols;
  const cellH = canvasH / rows;
  const cell = Math.max(6, Math.floor(Math.min(cellW, cellH)));
  const atlas = glyphAtlas(palette, cell);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sample, 0, 0, canvasW, canvasH);
  const glyphs = collect ? new Array<string>(cols * rows) : [];
  const colors = collect ? new Uint8ClampedArray(cols * rows * 3) : new Uint8ClampedArray(0);
  const { lut, glyphs: paletteGlyphs } = palette;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const gi = lut[lutIndex(pix[i]!, pix[i + 1]!, pix[i + 2]!)] ?? 0;
      if (atlas) {
        ctx.drawImage(
          atlas,
          gi * cell,
          0,
          cell,
          cell,
          x * cellW + (cellW - cell) / 2,
          y * cellH + (cellH - cell) / 2,
          cell,
          cell,
        );
      }
      if (collect) {
        const idx = y * cols + x;
        glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
        colors[idx * 3] = pix[i]!;
        colors[idx * 3 + 1] = pix[i + 1]!;
        colors[idx * 3 + 2] = pix[i + 2]!;
      }
    }
  }
  return { glyphs, colors };
}

export function renderMosaic(
  canvas: HTMLCanvasElement,
  source: CanvasImageSource & { width: number; height: number },
  longSideCells: number,
  palette: Palette,
  cssWidth: number,
): MosaicResult {
  const { cols, rows } = gridForImage(source.width, source.height, longSideCells);
  const empty: MosaicResult = {
    cols,
    rows,
    cells: cols * rows,
    glyphs: [],
    colors: new Uint8ClampedArray(0),
  };
  const dpr =
    typeof window === "undefined" ? 1 : Math.min(2, window.devicePixelRatio || 1);
  const cssH = cssWidth * (source.height / source.width);
  canvas.width = Math.max(1, Math.round(cssWidth * dpr));
  canvas.height = Math.max(1, Math.round(cssH * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssH}px`;

  const sample = document.createElement("canvas");
  sample.width = cols;
  sample.height = rows;
  const sctx = sample.getContext("2d", { willReadFrequently: true });
  const ctx = canvas.getContext("2d");
  if (!sctx || !ctx) return empty;

  sctx.imageSmoothingEnabled = true;
  sctx.drawImage(source, 0, 0, cols, rows);
  const pix = sctx.getImageData(0, 0, cols, rows).data;
  const painted = blitMosaic(
    ctx,
    sample,
    pix,
    cols,
    rows,
    palette,
    canvas.width,
    canvas.height,
    true,
  );
  return { cols, rows, cells: cols * rows, glyphs: painted.glyphs, colors: painted.colors };
}

export type LiveRenderer = {
  draw: (opts: {
    canvas: HTMLCanvasElement;
    video: HTMLVideoElement;
    wrapW: number;
    wrapH: number;
    density: number;
    palette: Palette;
    capture?: boolean;
  }) => MosaicResult;
};

function coverVideo(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  dw: number,
  dh: number,
) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return;
  const srcAspect = vw / vh;
  const dstAspect = dw / dh;
  let sx = 0;
  let sy = 0;
  let sw = vw;
  let sh = vh;
  if (srcAspect > dstAspect) {
    sw = vh * dstAspect;
    sx = (vw - sw) / 2;
  } else {
    sh = vw / dstAspect;
    sy = (vh - sh) / 2;
  }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, dw, dh);
}

export function createLiveRenderer(): LiveRenderer {
  const sample = document.createElement("canvas");
  const sctx = sample.getContext("2d", { willReadFrequently: true });
  const atlas = document.createElement("canvas");
  const actx = atlas.getContext("2d");
  let out: CanvasRenderingContext2D | null = null;
  let bound: HTMLCanvasElement | null = null;
  let atlasCell = 0;
  let atlasCount = 0;

  const rebuildAtlas = (palette: Palette, cell: number) => {
    if (!actx) return;
    const count = palette.glyphs.length;
    atlas.width = Math.max(1, count * cell);
    atlas.height = cell;
    actx.clearRect(0, 0, atlas.width, atlas.height);
    actx.font = `${Math.max(6, Math.floor(cell * 0.92))}px ${EMOJI_FONT}`;
    actx.textAlign = "center";
    actx.textBaseline = "middle";
    for (let i = 0; i < count; i++) {
      actx.fillText(palette.glyphs[i] ?? "⬜", i * cell + cell / 2, cell / 2);
    }
    atlasCell = cell;
    atlasCount = count;
  };

  return {
    draw({ canvas, video, wrapW, wrapH, density, palette, capture }) {
      const { cols, rows } = gridForImage(wrapW, wrapH, density);
      const empty: MosaicResult = {
        cols,
        rows,
        cells: cols * rows,
        glyphs: [],
        colors: new Uint8ClampedArray(0),
      };
      if (!sctx || !actx || !video.videoWidth) return empty;

      const cell = Math.max(6, Math.min(18, Math.floor(1536 / Math.max(cols, rows))));
      const outW = Math.max(1, cols * cell);
      const outH = Math.max(1, rows * cell);
      if (canvas.width !== outW || canvas.height !== outH) {
        canvas.width = outW;
        canvas.height = outH;
        out = null;
        bound = null;
      }
      if (bound !== canvas || !out) {
        out =
          canvas.getContext("2d", { alpha: false }) ?? canvas.getContext("2d");
        bound = canvas;
      }
      if (!out) return empty;

      if (atlasCell !== cell || atlasCount !== palette.glyphs.length) {
        rebuildAtlas(palette, cell);
      }

      if (sample.width !== cols || sample.height !== rows) {
        sample.width = cols;
        sample.height = rows;
      }
      sctx.imageSmoothingEnabled = true;
      coverVideo(sctx, video, cols, rows);
      const pix = sctx.getImageData(0, 0, cols, rows).data;

      out.imageSmoothingEnabled = false;
      out.drawImage(sample, 0, 0, outW, outH);

      const { lut, glyphs: paletteGlyphs } = palette;
      const glyphs = capture ? new Array<string>(cols * rows) : empty.glyphs;
      const colors = capture
        ? new Uint8ClampedArray(cols * rows * 3)
        : empty.colors;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const gi = lut[lutIndex(pix[i]!, pix[i + 1]!, pix[i + 2]!)] ?? 0;
          out.drawImage(atlas, gi * cell, 0, cell, cell, x * cell, y * cell, cell, cell);
          if (capture) {
            const idx = y * cols + x;
            glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
            colors[idx * 3] = pix[i]!;
            colors[idx * 3 + 1] = pix[i + 1]!;
            colors[idx * 3 + 2] = pix[i + 2]!;
          }
        }
      }

      return { cols, rows, cells: cols * rows, glyphs, colors };
    },
  };
}

export async function renderMosaicAsync(
  canvas: HTMLCanvasElement,
  source: CanvasImageSource & { width: number; height: number },
  longSideCells: number,
  palette: Palette,
  cssWidth: number,
  isCancelled?: () => boolean,
): Promise<MosaicResult> {
  const { cols, rows } = gridForImage(source.width, source.height, longSideCells);
  const empty: MosaicResult = {
    cols,
    rows,
    cells: cols * rows,
    glyphs: [],
    colors: new Uint8ClampedArray(0),
  };
  const dpr =
    typeof window === "undefined" ? 1 : Math.min(2, window.devicePixelRatio || 1);
  const cssH = cssWidth * (source.height / source.width);
  canvas.width = Math.max(1, Math.round(cssWidth * dpr));
  canvas.height = Math.max(1, Math.round(cssH * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssH}px`;

  const sample = document.createElement("canvas");
  sample.width = cols;
  sample.height = rows;
  const sctx = sample.getContext("2d", { willReadFrequently: true });
  const ctx = canvas.getContext("2d");
  if (!sctx || !ctx) return empty;

  sctx.imageSmoothingEnabled = true;
  sctx.drawImage(source, 0, 0, cols, rows);
  const pix = sctx.getImageData(0, 0, cols, rows).data;

  const cellW = canvas.width / cols;
  const cellH = canvas.height / rows;
  const cell = Math.max(6, Math.floor(Math.min(cellW, cellH)));
  const atlas = glyphAtlas(palette, cell);
  const { lut, glyphs: paletteGlyphs } = palette;
  const glyphs: string[] = new Array(cols * rows);
  const colors = new Uint8ClampedArray(cols * rows * 3);
  const yieldEvery = longSideCells <= 32 ? rows + 1 : Math.max(4, Math.ceil(rows / 12));
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(sample, 0, 0, canvas.width, canvas.height);
  for (let y = 0; y < rows; y++) {
    if (isCancelled?.()) return empty;
    for (let x = 0; x < cols; x++) {
      const i = (y * cols + x) * 4;
      const gi = lut[lutIndex(pix[i]!, pix[i + 1]!, pix[i + 2]!)] ?? 0;
      if (atlas) {
        ctx.drawImage(
          atlas,
          gi * cell,
          0,
          cell,
          cell,
          x * cellW + (cellW - cell) / 2,
          y * cellH + (cellH - cell) / 2,
          cell,
          cell,
        );
      }
      const idx = y * cols + x;
      glyphs[idx] = paletteGlyphs[gi] ?? "⬜";
      colors[idx * 3] = pix[i]!;
      colors[idx * 3 + 1] = pix[i + 1]!;
      colors[idx * 3 + 2] = pix[i + 2]!;
    }
    if (y % yieldEvery === yieldEvery - 1) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    }
  }

  return { cols, rows, cells: cols * rows, glyphs, colors };
}

export async function canvasToJpegBase64(
  canvas: HTMLCanvasElement,
  maxWidth = 1200,
  quality = 0.84,
): Promise<string> {
  const scale = Math.min(1, maxWidth / Math.max(1, canvas.width));
  const w = Math.max(1, Math.round(canvas.width * scale));
  const h = Math.max(1, Math.round(canvas.height * scale));
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  const ctx = out.getContext("2d");
  if (!ctx) throw new Error("Could not export JPEG");
  ctx.drawImage(canvas, 0, 0, w, h);
  const blob = await new Promise<Blob>((resolve, reject) => {
    out.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not export JPEG"))),
      "image/jpeg",
      quality,
    );
  });
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

export function downloadJpeg(base64: string, filename: string) {
  const a = document.createElement("a");
  a.href = `data:image/jpeg;base64,${base64}`;
  a.download = filename;
  a.click();
}

export const DENSITY_STEPS = [24, 32, 40, 48, 64, 80, 96, 128, 160] as const;
export const GALLERY_DENSITY = 20;
export const DEFAULT_PLATE_DENSITY = 64;