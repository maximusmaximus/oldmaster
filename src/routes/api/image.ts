import { createFileRoute } from "@tanstack/react-router";

const UA =
  "EmojiOldMasters/1.0 (https://grok.com; educational public-domain mosaic gallery)";
const ALLOWED_HOSTS = new Set([
  "upload.wikimedia.org",
  "thumb.wikimedia.org",
  "commons.wikimedia.org",
]);
const MAX_WIDTH = 1600;
const MIN_WIDTH = 80;

function clampWidth(raw: string | null): number {
  const n = Number(raw ?? "800");
  if (!Number.isFinite(n)) return 800;
  return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, Math.round(n)));
}

function validFilename(file: string): boolean {
  if (!file || file.length > 240) return false;
  if (file.includes("/") || file.includes("\\") || file.includes("\0")) return false;
  if (file.includes("..")) return false;
  return true;
}

async function fetchUpstream(url: string): Promise<Response> {
  return fetch(url, {
    headers: { "user-agent": UA, accept: "image/*,*/*;q=0.8" },
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
}

export const Route = createFileRoute("/api/image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const src = new URL(request.url);
        const width = clampWidth(src.searchParams.get("w"));
        const file = src.searchParams.get("f");
        const direct = src.searchParams.get("u");

        let upstreamUrl: string | null = null;
        if (file) {
          if (!validFilename(file)) {
            return new Response("Bad filename", { status: 400 });
          }
          upstreamUrl = `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(file)}&w=${width}`;
        } else if (direct) {
          let parsed: URL;
          try {
            parsed = new URL(direct);
          } catch {
            return new Response("Bad url", { status: 400 });
          }
          if (parsed.protocol !== "https:" || !ALLOWED_HOSTS.has(parsed.hostname)) {
            return new Response("Host not allowed", { status: 400 });
          }
          upstreamUrl = parsed.toString();
        } else {
          return new Response("Missing f or u", { status: 400 });
        }

        try {
          const up = await fetchUpstream(upstreamUrl);
          if (!up.ok) {
            return new Response("Upstream error", { status: 502 });
          }
          const type = up.headers.get("content-type") || "image/jpeg";
          if (!type.startsWith("image/")) {
            return new Response("Not an image", { status: 502 });
          }
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
          return new Response("Fetch failed", { status: 502 });
        }
      },
    },
  },
});