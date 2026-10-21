import { getRequest } from "@tanstack/react-start/server";

export function siteOrigin(): string {
  try {
    const req = getRequest();
    const forwardedHost = req.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host = (forwardedHost || req.headers.get("host") || "").trim();
    if (!host) return "";
    const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const proto =
      forwardedProto ||
      (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    return `${proto}://${host}`;
  } catch {
    return "";
  }
}
