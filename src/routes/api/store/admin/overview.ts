import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import { isAdminRequestFrom, notFound } from "@/lib/store/admin-auth.server";
import { getStore, json, resolveSecrets } from "@/lib/store/store.server";

export const Route = createFileRoute("/api/store/admin/overview")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAdminRequestFrom(request)) return notFound();
        const store = await getStore();
        const sql = await getSql();
        const orders = await sql.query(
          "select id, state, ship_tier, customer_order_id, rpi_status, amount_total_cents, paid_at, cancel_deadline_utc, last_error, created_at from store_orders where state not in ('CHECKOUT_OPEN','EXPIRED') order by created_at desc limit 100",
        );
        const alerts = await sql.query("select id, level, message, order_id, at from store_alerts where resolved = false order by at desc limit 50");
        const reprints = await sql.query("select id, order_id, description, decision, created_at from store_reprint_requests order by created_at desc limit 50");
        const caps = await store.capStatus(0);
        const secrets = await resolveSecrets(sql);
        return json({
          ordersEnabled: await store.salesOpen(),
          stripeReady: secrets.STRIPE_SECRET_KEY.startsWith("rk_") || secrets.STRIPE_SECRET_KEY.startsWith("sk_"),
          killReason: await store.getSetting("KILL_REASON"),
          maxOrdersPerDay: caps.maxOrders,
          maxExposureUsdPerDay: caps.maxExposure,
          ordersToday: caps.ordersToday,
          exposureTodayUsd: caps.exposureTodayUsd,
          availability: await store.availability(),
          product: await store.catalog(),
          nextOrderSeq: await store.getSetting("NEXT_ORDER_SEQ"),
          orders: orders.map((o) => ({ ...o, short: String(o.id).slice(0, 8) })),
          alerts,
          reprints,
        });
      },
    },
  },
});
