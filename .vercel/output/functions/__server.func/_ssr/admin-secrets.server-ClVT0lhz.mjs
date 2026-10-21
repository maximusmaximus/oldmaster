import { createHmac, timingSafeEqual } from "node:crypto";
import { readFileSync } from "node:fs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-secrets.server-ClVT0lhz.js
function readSecret(name) {
	try {
		return readFileSync(`/workspace/.grok/secrets/${name}`, "utf8").trim();
	} catch {
		return "";
	}
}
var ADMIN_USER = process.env.ADMIN_USER || readSecret("admin-user");
var ADMIN_PASS = process.env.ADMIN_PASS || readSecret("admin-pass");
var ADMIN_COOKIE = "eom_admin";
function adminToken() {
	return createHmac("sha256", ADMIN_PASS).update(ADMIN_USER).digest("hex");
}
function safeEqual(a, b) {
	const left = Buffer.from(a);
	const right = Buffer.from(b);
	if (left.length !== right.length) return false;
	return timingSafeEqual(left, right);
}
//#endregion
export { safeEqual as a, adminToken as i, ADMIN_PASS as n, ADMIN_USER as r, ADMIN_COOKIE as t };
