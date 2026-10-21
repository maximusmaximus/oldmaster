import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";
import {
  ADMIN_COOKIE,
  adminToken,
  adminUser,
  passwordMatches,
  safeEqual,
} from "./admin-secrets.server";

const WEEK = 60 * 60 * 24 * 7;

function readCookie(name: string): string {
  const raw = getRequestHeader("cookie") ?? "";
  const match = raw.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : "";
}

export async function isAdminRequest(): Promise<boolean> {
  const got = readCookie(ADMIN_COOKIE);
  if (!got) return false;
  return safeEqual(got, adminToken());
}

export function loginAdmin(username: string, password: string): boolean {
  const userOk = safeEqual(username.trim(), adminUser());
  const passOk = passwordMatches(password);
  if (!userOk || !passOk) return false;
  setResponseHeader(
    "set-cookie",
    `${ADMIN_COOKIE}=${adminToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${WEEK}`,
  );
  return true;
}

export function logoutAdmin() {
  setResponseHeader(
    "set-cookie",
    `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
}
