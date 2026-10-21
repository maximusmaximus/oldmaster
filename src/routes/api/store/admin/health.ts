import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import { RPI_COVER_URL, RPI_INTERIOR_URL } from "@/lib/store/config";
import { isAdminRequestFrom, notFound } from "@/lib/store/admin-auth.server";
import { storeEnv, storeEnvStatus } from "@/lib/store/env.server";
import { createRpiClient } from "@/lib/store/rpi";
import { getStore, json } from "@/lib/store/store.server";

async function headOk(url: string): Promise<boolean> {
  try {
    const r = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
    return r.status === 200;
  } catch {
    return false;
  }
}

/** Booleans only. Never returns a key, token, email or address. */
export const Route = createFileRoute("/api/store/admin/health")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!isAdminRequestFrom(request)) return notFound();
        let dbReachable = false;
        try {
          await (await getSql()).query("select 1 from store_settings limit 1");
          dbReachable = true;
        } catch {
          dbReachable = false;
        }
        const store = await getStore();
        const key = storeEnv.stripeSecretKey();
        const auth = storeEnv.rpiApiAuth();
        const rpiPing = auth ? await createRpiClient({ baseUrl: storeEnv.rpiBaseUrl(), auth }).ping() : { ok: false };
        const [interiorOk, coverOk] = await Promise.all([headOk(RPI_INTERIOR_URL), headOk(RPI_COVER_URL)]);
        return json({
          secretsSet: storeEnvStatus(),
          databaseIsNeon: Boolean(process.env.DATABASE_URL?.trim()),
          dbReachable,
          stripeKeyIsLive: key.startsWith("sk_live_") || key.startsWith("rk_live_"),
          stripeWebhookSecretLooksValid: storeEnv.stripeWebhookSecret().startsWith("whsec_"),
          rpiPingOk: rpiPing.ok,
          rpiWebhookSecretSet: storeEnv.rpiWebhookSecret() !== "",
          printFilesOk: { interior: interiorOk, cover: coverOk },
          ordersEnabled: await store.salesOpen(),
          killReasonSet: (await store.getSetting("KILL_REASON")) !== "",
        });
      },
    },
  },
});
