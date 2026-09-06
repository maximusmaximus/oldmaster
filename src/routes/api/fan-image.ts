import { createFileRoute } from "@tanstack/react-router";
import { FAN_ID_RE, loadFanJpegBytes } from "@/lib/fan-works";

export const Route = createFileRoute("/api/fan-image")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const id = new URL(request.url).searchParams.get("id") ?? "";
        if (!FAN_ID_RE.test(id)) {
          return new Response("Bad id", { status: 400 });
        }
        const bytes = await loadFanJpegBytes(id);
        if (!bytes) return new Response("Not found", { status: 404 });
        return new Response(new Uint8Array(bytes), {
          status: 200,
          headers: {
            "content-type": "image/jpeg",
            "cache-control": "public, max-age=86400, stale-while-revalidate=604800",
          },
        });
      },
    },
  },
});
