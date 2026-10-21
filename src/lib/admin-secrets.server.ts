import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";

/** Used only when the host has no ADMIN_PASS. Not the password. */
const FALLBACK_USER = "emojifun";
const FALLBACK_PASS_SHA256 = "235efdc0de643c2ae767713dbe1dcee275479e37a788263ae56c7e9143855282";

function readSecret(name: string): string {
  const fromEnv = process.env[name]?.trim() ?? "";
  if (fromEnv) return fromEnv;
  const file = name === "ADMIN_USER" ? "admin-user" : name === "ADMIN_PASS" ? "admin-pass" : "";
  if (!file) return "";
  try {
    return readFileSync(`/workspace/.grok/secrets/${file}`, "utf8").trim();
  } catch {
    return "";
  }
}

export function adminUser(): string {
  return readSecret("ADMIN_USER") || FALLBACK_USER;
}

export function adminPass(): string {
  return readSecret("ADMIN_PASS");
}

export function passwordMatches(password: string): boolean {
  const expected = adminPass();
  if (expected) return safeEqual(password, expected);
  const digest = createHash("sha256").update(password).digest("hex");
  return safeEqual(digest, FALLBACK_PASS_SHA256);
}

export const ADMIN_COOKIE = "eom_admin";

export function adminToken(): string {
  const key = adminPass() || FALLBACK_PASS_SHA256;
  return createHmac("sha256", key).update(adminUser()).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
