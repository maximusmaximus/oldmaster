import { createFileRoute } from "@tanstack/react-router";
import { pinAllUnpinned } from "@/lib/fan-works";

export const Route = createFileRoute("/api/repin")({
  server: {
    handlers: {
      GET: async () => {
        const result = await pinAllUnpinned();
        return Response.json(result);
      },
    },
  },
});
