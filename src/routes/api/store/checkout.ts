import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getStore, json } from "@/lib/store/store.server";

const Body = z.object({
  quoteId: z.string().min(10).max(64),
  tier: z.enum(["standard", "expedited", "rush"]),
});

export const Route = createFileRoute("/api/store/checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json({ error: "bad_request" }, 400);
        const store = await getStore();
        const r = await store.checkout(parsed.data.quoteId, parsed.data.tier);
        if (!r.ok) return json({ error: r.error }, r.status);
        return json({ url: r.url });
      },
    },
  },
});
