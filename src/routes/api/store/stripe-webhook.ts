import { createFileRoute } from "@tanstack/react-router";
import { storeEnv } from "@/lib/store/env.server";
import { verifyStripeSignature } from "@/lib/store/signatures";
import { getStore, json } from "@/lib/store/store.server";

export const Route = createFileRoute("/api/store/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text(); // raw body, read once
        const store = await getStore();
        if (!verifyStripeSignature(raw, request.headers.get("stripe-signature"), storeEnv.stripeWebhookSecret())) {
          console.warn("[store] stripe signature failed");
          await store.noteBadSignature("stripe");
          return json({ error: "bad signature" }, 400);
        }
        const event = JSON.parse(raw) as { id: string; type: string; data: { object: Record<string, unknown> } };
        try {
          const r = await store.handleStripeEvent(event);
          console.info(`[store] stripe ${event.type} ${event.id} -> ${r.handled}`);
          return json({ received: true });
        } catch (err) {
          console.error(`[store] stripe ${event.type} ${event.id} failed: ${(err as Error).message}`);
          return json({ error: "retry" }, 500); // Stripe retries
        }
      },
    },
  },
});
