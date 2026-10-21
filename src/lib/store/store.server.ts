/** Wires the store service to the real DB, RPI and Stripe. Server-only. */
import { getSql, type Sql } from "@/lib/db";
import { storeEnv } from "./env.server";
import { createRpiClient } from "./rpi";
import { readSavedSecrets, type SavedSecretName } from "./saved-secrets.server";
import { createStore, type Store } from "./service";
import { createStripeClient } from "./stripe";

export async function resolveSecrets(sql: Sql): Promise<Record<SavedSecretName, string>> {
  const saved = await readSavedSecrets(sql);
  const pick = (name: SavedSecretName, fromEnv: string) => fromEnv || saved[name] || "";
  return {
    STRIPE_SECRET_KEY: pick("STRIPE_SECRET_KEY", storeEnv.stripeSecretKey()),
    STRIPE_WEBHOOK_SECRET: pick("STRIPE_WEBHOOK_SECRET", storeEnv.stripeWebhookSecret()),
    RPI_API_AUTH: pick("RPI_API_AUTH", storeEnv.rpiApiAuth()),
    RPI_WEBHOOK_SECRET: pick("RPI_WEBHOOK_SECRET", storeEnv.rpiWebhookSecret()),
    CRON_SECRET: pick("CRON_SECRET", storeEnv.cronSecret()),
  };
}

export async function getStore(): Promise<Store> {
  const sql = await getSql();
  const secrets = await resolveSecrets(sql);
  const auth = secrets.RPI_API_AUTH;
  const key = secrets.STRIPE_SECRET_KEY;
  return createStore({
    sql,
    rpi: auth ? createRpiClient({ baseUrl: storeEnv.rpiBaseUrl(), auth }) : null,
    stripe: key ? createStripeClient({ secretKey: key }) : null,
    baseUrl: storeEnv.publicBaseUrl(),
  });
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}