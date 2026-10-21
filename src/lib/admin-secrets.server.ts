import { createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";

function readSecret(name: string): string {
  try {
    return readFileSync(`/workspace/.grok/secrets/${name}`, "utf8").trim();
  } catch {
    return "";
  }
}

export const ADMIN_USER = process.env.ADMIN_USER || readSecret("admin-user");
export const ADMIN_PASS = process.env.ADMIN_PASS || readSecret("admin-pass");
export const ADMIN_COOKIE = "eom_admin";

export function adminToken(): string {
  return createHmac("sha256", ADMIN_PASS).update(ADMIN_USER).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
