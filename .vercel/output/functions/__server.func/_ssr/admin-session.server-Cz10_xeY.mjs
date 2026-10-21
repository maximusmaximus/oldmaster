import { a as getRequestHeader, o as setResponseHeader } from "./ssr.mjs";
import { a as safeEqual, i as adminToken, n as ADMIN_PASS, r as ADMIN_USER, t as ADMIN_COOKIE } from "./admin-secrets.server-ClVT0lhz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-session.server-Cz10_xeY.js
var WEEK = 604800;
function readCookie(name) {
	const match = (getRequestHeader("cookie") ?? "").match(new RegExp(`(?:^|; )${name}=([^;]*)`));
	return match?.[1] ? decodeURIComponent(match[1]) : "";
}
async function isAdminRequest() {
	const got = readCookie(ADMIN_COOKIE);
	if (!got) return false;
	return safeEqual(got, adminToken());
}
function loginAdmin(username, password) {
	const userOk = safeEqual(username.trim(), ADMIN_USER);
	const passOk = safeEqual(password, ADMIN_PASS);
	if (!userOk || !passOk) return false;
	setResponseHeader("set-cookie", `${ADMIN_COOKIE}=${adminToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${WEEK}`);
	return true;
}
function logoutAdmin() {
	setResponseHeader("set-cookie", `${ADMIN_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}
//#endregion
export { isAdminRequest, loginAdmin, logoutAdmin };
