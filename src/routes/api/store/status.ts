import { createFileRoute } from "@tanstack/react-router";
import { getStore, json } from "@/lib/store/store.server";

export const Route = createFileRoute("/api/store/status")({
  server: {
    handlers: {
      GET: async () => {
        const store = await getStore();
        return json({ salesOpen: await store.salesOpen(), ...(await store.availability()) });
      },
    },
  },
});
