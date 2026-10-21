import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getStore, json } from "@/lib/store/store.server";

const AddressSchema = z.object({
  name: z.string().trim().min(1).max(200),
  address1: z.string().trim().min(1).max(200),
  address2: z.string().trim().max(200).optional().default(""),
  city: z.string().trim().min(1).max(100),
  region: z.string().trim().min(1).max(50),
  postal: z.string().trim().min(2).max(20),
  country: z.string().trim().length(2),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().default(""),
});

export const Route = createFileRoute("/api/store/quote")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return json({ error: "Invalid request." }, 400);
        }
        const parsed = AddressSchema.safeParse(body);
        if (!parsed.success) return json({ error: "Please check the address fields." }, 400);
        const store = await getStore();
        const r = await store.quote(parsed.data);
        if (!r.ok) return json({ error: r.error, ...(r.reason ? { reason: r.reason } : {}) }, r.status);
        return json({ quoteId: r.quoteId, options: r.options });
      },
    },
  },
});
