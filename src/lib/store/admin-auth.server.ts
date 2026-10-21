/** Admin check for API routes: the site's existing eom_admin cookie. */
import { ADMIN_COOKIE, adminToken, safeEqual } from "@/lib/admin-secrets.server";

export function isAdminRequestFrom(request: Request): boolean {
  const raw = request.headers.get("cookie") ?? "";
  const m = raw.match(new RegExp(`(?:^|; )${ADMIN_COOKIE}=([^;]*)`));
  const got = m?.[1] ? decodeURIComponent(m[1]) : "";
  return got !== "" && safeEqual(got, adminToken());
}

export function notFound(): Response {
  return new Response("Not Found", { status: 404, headers: { "cache-control": "no-store" } });
}
