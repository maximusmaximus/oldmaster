import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { isAdminRequestFrom, notFound } from "@/lib/store/admin-auth.server";
import { writeSavedSecrets } from "@/lib/store/saved-secrets.server";
import { getStore, json } from "@/lib/store/store.server";

const Body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("setSales"), enabled: z.boolean() }),
  z.object({ action: z.literal("setCaps"), maxOrders: z.number().int().min(0).max(100), maxExposureUsd: z.number().min(0).max(20000) }),
  z.object({ action: z.literal("release"), orderId: z.string().min(10) }),
  z.object({ action: z.literal("cancelRefund"), orderId: z.string().min(10) }),
  z.object({ action: z.literal("resolveAlert"), alertId: z.number().int() }),
  z.object({ action: z.literal("decideReprint"), requestId: z.string().min(10), decision: z.enum(["approved", "declined"]) }),
  z.object({
    action: z.literal("installKeys"),
    stripeSecretKey: z.string().max(300).optional(),
    stripeWebhookSecret: z.string().max(200).optional(),
    rpiApiAuth: z.string().max(500).optional(),
    rpiWebhookSecret: z.string().max(200).optional(),
    cronSecret: z.string().max(200).optional(),
  }),
]);

export const Route = createFileRoute("/api/store/admin/action")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAdminRequestFrom(request)) return notFound();
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return json({ error: "bad_request" }, 400);
        const store = await getStore();
        const sql = await getSql();
        const b = parsed.data;
        switch (b.action) {
          case "setSales":
            await store.setSetting("ORDERS_ENABLED", b.enabled ? "true" : "false");
            if (b.enabled) await store.setSetting("KILL_REASON", "");
            await store.alert("info", `Sales turned ${b.enabled ? "ON" : "OFF"} by admin`);
            return json({ ok: true });
          case "setCaps":
            await store.setSetting("MAX_RPI_ORDERS_PER_DAY", String(b.maxOrders));
            await store.setSetting("MAX_RPI_EXPOSURE_USD_PER_DAY", String(b.maxExposureUsd));
            return json({ ok: true });
          case "release":
            return json(await store.adminRelease(b.orderId));
          case "cancelRefund":
            return json(await store.adminCancelRefund(b.orderId));
          case "resolveAlert":
            await sql.query("update store_alerts set resolved = true where id = $1", [b.alertId]);
            return json({ ok: true });
          case "decideReprint":
            await sql.query("update store_reprint_requests set decision = $2, decided_at = now() where id = $1", [b.requestId, b.decision]);
            return json({ ok: true });
          case "installKeys":
            await writeSavedSecrets(sql, {
              STRIPE_SECRET_KEY: b.stripeSecretKey,
              STRIPE_WEBHOOK_SECRET: b.stripeWebhookSecret,
              RPI_API_AUTH: b.rpiApiAuth,
              RPI_WEBHOOK_SECRET: b.rpiWebhookSecret,
              CRON_SECRET: b.cronSecret,
            });
            return json({ ok: true });
        }
      },
    },
  },
});
