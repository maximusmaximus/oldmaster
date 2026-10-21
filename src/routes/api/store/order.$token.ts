import { createFileRoute } from "@tanstack/react-router";
import { customerCanCancel } from "@/lib/store/rules";
import { getStore, json } from "@/lib/store/store.server";

/** Public order status by unguessable token. Shows no address beyond city/country. */
export const Route = createFileRoute("/api/store/order/$token")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const store = await getStore();
        const o = await store.getOrder(params.token);
        if (!o || o.state === "CHECKOUT_OPEN" || o.state === "EXPIRED") return json({ error: "not_found" }, 404);
        const addr = JSON.parse(o.address_json ?? "{}") as { city?: string; country?: string };
        const deadline = o.cancel_deadline_utc ? new Date(o.cancel_deadline_utc) : null;
        return json({
          state: o.state,
          tier: o.ship_tier,
          shipTo: [addr.city, addr.country].filter(Boolean).join(", "),
          totalCents: o.amount_total_cents,
          cancelDeadline: deadline?.toISOString() ?? null,
          canCancel: customerCanCancel(o.state, deadline, new Date()),
          tracking: o.tracking_json ? JSON.parse(o.tracking_json) : [],
          canRequestReprint: o.state === "SHIPPED",
        });
      },
      POST: async ({ params, request }) => {
        const body = (await request.json().catch(() => ({}))) as { action?: string; description?: string };
        const store = await getStore();
        if (body.action === "cancel") {
          const r = await store.customerCancel(params.token);
          return json(r, r.ok ? 200 : 409);
        }
        if (body.action === "reprint" && typeof body.description === "string" && body.description.trim().length >= 10) {
          const r = await store.requestReprint(params.token, body.description.trim());
          return json(r, r.ok ? 200 : 409);
        }
        return json({ error: "bad_request" }, 400);
      },
    },
  },
});
