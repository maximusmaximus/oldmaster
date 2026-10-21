import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as Input } from "./input-B6LEBlYf.mjs";
import { n as adminLogout, r as adminStatus, t as adminLogin } from "./admin-KgxjD2y0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-login-4DWjKonx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminLogin() {
	const [admin, setAdmin] = (0, import_react.useState)(false);
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		adminStatus().then((status) => setAdmin(status.admin));
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (!(await adminLogin({ data: {
				username,
				password
			} })).ok) {
				setError("That login didn’t work.");
				return;
			}
			setAdmin(true);
			setPassword("");
			setUsername("");
		} catch {
			setError("That login didn’t work.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mt-24 border-t border-border pt-10",
		children: admin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Staff mode is on. Hidden fan works stay off the public Fans gallery."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { view: "fans" },
						children: "Review fans"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					onClick: () => {
						adminLogout().then(() => setAdmin(false));
					},
					children: "Sign out"
				})]
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => void onSubmit(e),
			className: "max-w-xs space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wide text-subtle uppercase",
					children: "Staff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "username",
					autoComplete: "username",
					placeholder: "Username",
					value: username,
					onChange: (e) => setUsername(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					name: "password",
					type: "password",
					autoComplete: "current-password",
					placeholder: "Password",
					value: password,
					onChange: (e) => setPassword(e.target.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "outline",
					disabled: busy,
					className: "w-full",
					children: busy ? "Checking…" : "Sign in"
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: error
				})
			]
		})
	});
}
//#endregion
export { AdminLogin as t };
