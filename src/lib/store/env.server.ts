/**
 * Server-only store env. Never import from client code, never log values.
 * Names only are listed in README.md.
 * Process env wins. Otherwise the value is read from `.grok/secrets/`, which
 * is gitignored and never shipped to the browser.
 */
import { readFileSync } from "node:fs";
import { BUNDLED_SECRETS } from "./bundled-secrets.server";
import { RPI_DEFAULT_BASE_URL } from "./config.ts";

const SECRET_FILES: Record<string, string> = {
  PUBLIC_BASE_URL: "public-base-url",
  STRIPE_SECRET_KEY: "stripe-secret-key",
  STRIPE_WEBHOOK_SECRET: "stripe-webhook-secret",
  RPI_API_AUTH: "rpi-api-auth",
  RPI_WEBHOOK_SECRET: "rpi-webhook-secret",
  CRON_SECRET: "cron-secret",
};

function readFileSecret(name: string): string {
  const file = SECRET_FILES[name];
  if (!file || typeof window !== "undefined") return "";
  try {
    return readFileSync(`/workspace/.grok/secrets/${file}`, "utf8").trim();
  } catch {
    return "";
  }
}

function read(name: string): string {
  const fromEnv = (typeof process !== "undefined" ? process.env[name] : undefined)?.trim() ?? "";
  if (fromEnv) return fromEnv;
  const bundled = BUNDLED_SECRETS[name]?.trim() ?? "";
  if (bundled) return bundled;
  return readFileSecret(name);
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
