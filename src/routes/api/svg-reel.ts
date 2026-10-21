import { createFileRoute } from "@tanstack/react-router";
import {
  loadSvgFile,
  loadSvgFramesJson,
  loadSvgPosterBytes,
  SVG_ID_RE,
} from "@/lib/svg-reels";

export const Route = createFileRoute("/api/svg-reel")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const src = new URL(request.url);
        const id = src.searchParams.get("id") ?? "";
        const kind = src.searchParams.get("k") ?? "file";
        if (!SVG_ID_RE.test(id)) return new Response("Bad id", { status: 400 });
        if (kind === "poster") {
          const bytes = await loadSvgPosterBytes(id);
          if (!bytes) return new Response("Not found", { status: 404 });
          return new Response(new Uint8Array(bytes), {
            status: 200,
            headers: {
              "content-type": "image/jpeg",
              "cache-control": "public, max-age=86400",
            },
          });
        }
        if (kind === "frames") {
          const json = await loadSvgFramesJson(id);
          if (!json) return new Response("Not found", { status: 404 });
          return new Response(json, {
            status: 200,
            headers: {
              "content-type": "application/json; charset=utf-8",
              "cache-control": "public, max-age=86400",
            },
          });
        }
        const svg = await loadSvgFile(id);
        if (!svg) return new Response("Not found", { status: 404 });
        return new Response(svg, {
          status: 200,
          headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
