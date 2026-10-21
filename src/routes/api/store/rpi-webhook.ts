import { createFileRoute } from "@tanstack/react-router";
import { storeEnv } from "@/lib/store/env.server";
import { verifyRpiSignature } from "@/lib/store/signatures";
import { getStore, json } from "@/lib/store/store.server";

export const Route = createFileRoute("/api/store/rpi-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const store = await getStore();
        if (!verifyRpiSignature(raw, request.headers.get("x-rpi-printapi-hmac-sha256"), storeEnv.rpiWebhookSecret())) {
          console.warn("[store] rpi signature failed");
          await store.noteBadSignature("rpi");
          return json({ error: "bad signature" }, 401);
        }
        try {
          const r = await store.handleRpiWebhook(raw, new URL(request.url).searchParams.get("o"));
          console.info(`[store] rpi webhook -> ${r.handled}`);
        } catch (err) {
          console.error(`[store] rpi webhook failed: ${(err as Error).message}`); // reconcile catches up
        }
        return json({ received: true });
      },
    },
  },
});
