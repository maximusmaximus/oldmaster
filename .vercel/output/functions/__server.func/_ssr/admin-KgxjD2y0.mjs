import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-KgxjD2y0.js
var adminLogin = createServerFn({ method: "POST" }).validator(object({
	username: string().max(80),
	password: string().max(80)
})).handler(createSsrRpc("0d2581d106d22f43693715e215bb8d184bdab954775e63e3049c693499ef17bd"));
var adminLogout = createServerFn({ method: "POST" }).handler(createSsrRpc("dd7d3208672c98323e75d188eff463e589729fee8a4875e1f1dea8cad6fd906b"));
var adminStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("eeb77d3531d8be383e3bf6b64fd5b9016a561659ae731715616aad19b4d40fc9"));
//#endregion
export { adminLogout as n, adminStatus as r, adminLogin as t };
