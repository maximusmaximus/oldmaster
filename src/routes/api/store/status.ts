import { createFileRoute } from "@tanstack/react-router";
import { storeEnv } from "@/lib/store/env.server";
import { getStore, json } from "@/lib/store/store.server";

export const Route = createFileRoute("/api/store/status")({
  server: {
    handlers: {
      GET: async () => {
        const store = await getStore();
        return json({
          salesOpen: await store.salesOpen(),
          ...(await store.availability()),
          quotesConfigured: storeEnv.rpiApiAuth().startsWith("Basic "),
        });
      },
    },
  },
});
