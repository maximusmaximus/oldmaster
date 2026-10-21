import { i as getRequest } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-origin.server-Bnr-V36N.js
function siteOrigin() {
	try {
		const req = getRequest();
		const host = (req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || req.headers.get("host") || "").trim();
		if (!host) return "";
		return `${req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https")}://${host}`;
	} catch {
		return "";
	}
}
//#endregion
export { siteOrigin };
