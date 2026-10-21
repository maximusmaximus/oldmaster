/** Wires the store service to the real DB, RPI and Stripe. Server-only. */
import { getSql } from "@/lib/db";
import { storeEnv } from "./env.server";
import { createRpiClient } from "./rpi";
import { createStore, type Store } from "./service";
import { createStripeClient } from "./stripe";

export async function getStore(): Promise<Store> {
  const sql = await getSql();
  const auth = storeEnv.rpiApiAuth();
  const key = storeEnv.stripeSecretKey();
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
