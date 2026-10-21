/**
 * Server-only store env. Never import from client code, never log values.
 * Names only are listed in README.md.
 */
import { RPI_DEFAULT_BASE_URL } from "./config.ts";

function read(name: string): string {
  const v = typeof process !== "undefined" ? process.env[name] : undefined;
  return v?.trim() ?? "";
}

export const STORE_ENV_NAMES = [
  "PUBLIC_BASE_URL",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RPI_API_AUTH",
  "RPI_WEBHOOK_SECRET",
  "CRON_SECRET",
] as const;

export const storeEnv = {
  publicBaseUrl: () => (read("PUBLIC_BASE_URL") || "https://emoji.grok.me").replace(/\/+$/, ""),
  stripeSecretKey: () => read("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: () => read("STRIPE_WEBHOOK_SECRET"),
  rpiBaseUrl: () => read("RPI_BASE_URL") || RPI_DEFAULT_BASE_URL,
  rpiApiAuth: () => read("RPI_API_AUTH"),
  rpiWebhookSecret: () => read("RPI_WEBHOOK_SECRET"),
  cronSecret: () => read("CRON_SECRET"),
};

/** Booleans only: which names are set. */
export function storeEnvStatus(): Record<string, boolean> {
  return Object.fromEntries(STORE_ENV_NAMES.map((n) => [n, read(n) !== ""]));
}
