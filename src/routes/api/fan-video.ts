import { createFileRoute } from "@tanstack/react-router";
import { FAN_ID_RE, loadFanVideoBytes } from "@/lib/fan-works";

export const Route = createFileRoute("/api/fan-video")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!FAN_ID_RE.test(id)) {
          return new Response("Bad id", { status: 400 });
        }
        const clip = await loadFanVideoBytes(id);
        if (!clip) return new Response("Not found", { status: 404 });
        return new Response(new Uint8Array(clip.bytes), {
          status: 200,
          headers: {
            "content-type": clip.mime,
            "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
          },
        });
      },
    },
  },
});
