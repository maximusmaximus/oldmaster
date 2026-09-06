import { createFileRoute } from "@tanstack/react-router";
import { getPlate } from "@/lib/catalog";
import { FAN_ID_RE, loadFanJpegBytes } from "@/lib/fan-works";
import { commonsFilename } from "@/lib/wikimedia";

const UA =
  "EmojiOldMasters/1.0 (https://grok.com; educational public-domain mosaic gallery)";
const FAN_PATH = /^\/fan\/(fan-[a-f0-9]{12})$/;
const PLATE_PATH = /^\/plate\/([a-z0-9-]+)$/;

async function fetchPainting(sourceUrl: string, width = 1200): Promise<Response | null> {
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
    const body = await up.arrayBuffer();
    return new Response(body, {
      status: 200,
      headers: {
        "content-type": type,
        "cache-control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "access-control-allow-origin": "*",
      },
    });
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/api/og-preview")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const path = new URL(request.url).searchParams.get("p") ?? "";
        const fan = path.match(FAN_PATH);
        if (fan && FAN_ID_RE.test(fan[1])) {
          const bytes = await loadFanJpegBytes(fan[1]);
          if (!bytes) return new Response("Not found", { status: 404 });
          return new Response(new Uint8Array(bytes), {
            status: 200,
            headers: {
              "content-type": "image/jpeg",
              "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
              "access-control-allow-origin": "*",
            },
          });
        }
        const plateMatch = path.match(PLATE_PATH);
        if (plateMatch) {
          const plate = getPlate(plateMatch[1]);
          if (!plate) return new Response("Not found", { status: 404 });
          const img = await fetchPainting(plate.source_image_url);
          if (!img) return new Response("Upstream error", { status: 502 });
          return img;
        }
        return new Response("Bad path", { status: 400 });
      },
    },
  },
});
