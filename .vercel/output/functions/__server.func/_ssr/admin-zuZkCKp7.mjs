import { t as createServerFn } from "./ssr.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-zuZkCKp7.js
var adminLogin_createServerFn_handler = createServerRpc({
	id: "0d2581d106d22f43693715e215bb8d184bdab954775e63e3049c693499ef17bd",
	name: "adminLogin",
	filename: "src/lib/admin.ts"
}, (opts) => adminLogin.__executeServer(opts));
var adminLogin = createServerFn({ method: "POST" }).validator(object({
	username: string().max(80),
	password: string().max(80)
})).handler(adminLogin_createServerFn_handler, async ({ data }) => {
	const { loginAdmin } = await import("./admin-session.server-Cz10_xeY.mjs");
	return { ok: loginAdmin(data.username, data.password) };
});
var adminLogout_createServerFn_handler = createServerRpc({
	id: "dd7d3208672c98323e75d188eff463e589729fee8a4875e1f1dea8cad6fd906b",
	name: "adminLogout",
	filename: "src/lib/admin.ts"
}, (opts) => adminLogout.__executeServer(opts));
var adminLogout = createServerFn({ method: "POST" }).handler(adminLogout_createServerFn_handler, async () => {
	const { logoutAdmin } = await import("./admin-session.server-Cz10_xeY.mjs");
	logoutAdmin();
	return { ok: true };
});
var adminStatus_createServerFn_handler = createServerRpc({
	id: "eeb77d3531d8be383e3bf6b64fd5b9016a561659ae731715616aad19b4d40fc9",
	name: "adminStatus",
	filename: "src/lib/admin.ts"
}, (opts) => adminStatus.__executeServer(opts));
var adminStatus = createServerFn({ method: "GET" }).handler(adminStatus_createServerFn_handler, async () => {
	const { isAdminRequest } = await import("./admin-session.server-Cz10_xeY.mjs");
	return { admin: await isAdminRequest() };
});
//#endregion
export { adminLogin_createServerFn_handler, adminLogout_createServerFn_handler, adminStatus_createServerFn_handler };
