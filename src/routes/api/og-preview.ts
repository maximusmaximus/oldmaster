import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { getPlate } from "@/lib/catalog";
import { FAN_ID_RE, loadFanOgJpegBytes } from "@/lib/fan-works";
import { loadSvgPosterBytes, SVG_ID_RE } from "@/lib/svg-reels";
import { commonsFilename } from "@/lib/wikimedia";

const UA =
  "EmojiOldMasters/1.0 (https://grok.com; educational public-domain mosaic gallery)";
const FAN_PATH = /^\/fan\/(fan-[a-f0-9]{12})$/;
const SVG_PATH = /^\/svg\/(svg-[a-f0-9]{12})$/;
const PLATE_PATH = /^\/plate\/([a-z0-9-]+)$/;
const CACHE_DIR = join(process.cwd(), ".data/og-plates");

async function letterboxOg(bytes: Buffer): Promise<Buffer> {
  const dir = await mkdtemp(join(tmpdir(), "eom-og-"));
  const src = join(dir, "in.jpg");
  const out = join(dir, "out.jpg");
  try {
    await writeFile(src, bytes);
    await new Promise<void>((resolve, reject) => {
      const child = spawn(
        "ffmpeg",
        [
          "-y",
          "-i",
          src,
          "-vf",
          "scale=1200:630:force_original_aspect_ratio=decrease,pad=1200:630:(ow-iw)/2:(oh-ih)/2:#0c0b0a",
          "-q:v",
          "4",
          out,
        ],
        { stdio: "ignore" },
      );
      child.on("error", reject);
      child.on("exit", (code) => {
        if (code === 0) resolve();
        else reject(new Error("ffmpeg failed"));
      });
    });
    return await readFile(out);
  } catch {
    return bytes;
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

function jpegResponse(bytes: Buffer): Response {
  return new Response(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "content-type": "image/jpeg",
      "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "access-control-allow-origin": "*",
    },
  });
}

async function fetchPainting(sourceUrl: string, width = 1200): Promise<Buffer | null> {
  const file = commonsFilename(sourceUrl);
  const upstream = file
    ? `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(file)}&w=${width}`
    : sourceUrl;
  try {
    const up = await fetch(upstream, {
      headers: { "user-agent": UA, accept: "image/*,*/*;q=0.8" },
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    if (!up.ok) return null;
    const type = up.headers.get("content-type") || "image/jpeg";
    if (!type.startsWith("image/")) return null;
    return Buffer.from(await up.arrayBuffer());
  } catch {
    return null;
  }
}

function runPython(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn("python3", args, {
      cwd: process.cwd(),
      stdio: ["ignore", "ignore", "pipe"],
    });
    let err = "";
    child.stderr.on("data", (chunk) => {
      err += String(chunk);
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(err.trim() || "og-mosaic failed"));
    });
  });
}

async function plateMosaicJpeg(slug: string, sourceUrl: string): Promise<Buffer | null> {
  const cached = join(CACHE_DIR, `${slug}.jpg`);
  try {
    return await readFile(cached);
  } catch {
    /* generate */
  }
  const painting = await fetchPainting(sourceUrl, 1200);
  if (!painting) return null;
  const dir = await mkdtemp(join(tmpdir(), "eom-plate-"));
  const src = join(dir, "in.jpg");
  const out = join(dir, "out.jpg");
  try {
    await writeFile(src, painting);
    await runPython([
      join(process.cwd(), "scripts/og-mosaic.py"),
      "--in",
      src,
      "--out",
      out,
      "--long",
      "36",
    ]);
    const mosaic = await readFile(out);
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cached, mosaic);
    return mosaic;
  } catch {
    return letterboxOg(painting);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

export const Route = createFileRoute("/api/og-preview")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const path = new URL(request.url).searchParams.get("p") ?? "";
        const fan = path.match(FAN_PATH);
        if (fan && FAN_ID_RE.test(fan[1])) {
          const bytes = await loadFanOgJpegBytes(fan[1]);
          if (!bytes) return new Response("Not found", { status: 404 });
          return jpegResponse(await letterboxOg(bytes));
        }
        const svg = path.match(SVG_PATH);
        if (svg && SVG_ID_RE.test(svg[1])) {
          const bytes = await loadSvgPosterBytes(svg[1]);
          if (!bytes) return new Response("Not found", { status: 404 });
          return jpegResponse(await letterboxOg(bytes));
        }
        const plateMatch = path.match(PLATE_PATH);
        if (plateMatch) {
          const plate = getPlate(plateMatch[1]);
          if (!plate) return new Response("Not found", { status: 404 });
          const img = await plateMosaicJpeg(plate.slug, plate.source_image_url);
          if (!img) return new Response("Upstream error", { status: 502 });
          return jpegResponse(img);
        }
        return new Response("Bad path", { status: 400 });
      },
    },
  },
});
