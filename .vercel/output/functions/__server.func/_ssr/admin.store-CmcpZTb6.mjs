import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as Input } from "./input-B6LEBlYf.mjs";
import { t as AdminLogin } from "./admin-login-4DWjKonx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.store-CmcpZTb6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminStore() {
	const [data, setData] = (0, import_react.useState)(null);
	const [health, setHealth] = (0, import_react.useState)(null);
	const [denied, setDenied] = (0, import_react.useState)(false);
	const [caps, setCaps] = (0, import_react.useState)({
		maxOrders: "",
		maxExposureUsd: ""
	});
	const load = (0, import_react.useCallback)(async () => {
		const r = await fetch("/api/store/admin/overview");
		if (!r.ok) return setDenied(true);
		const d = await r.json();
		setDenied(false);
		setData(d);
		setCaps({
			maxOrders: String(d.maxOrdersPerDay),
			maxExposureUsd: String(d.maxExposureUsdPerDay)
		});
	}, []);
	(0, import_react.useEffect)(() => void load(), [load]);
	const act = async (body, confirmText) => {
		if (confirmText && !confirm(confirmText)) return;
		const r = await fetch("/api/store/admin/action", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(body)
		});
		const d = await r.json().catch(() => ({}));
		if (!r.ok || d.ok === false) alert(`Failed: ${d.error ?? r.status}`);
		load();
	};
	if (denied) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md px-6 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-muted",
				children: "Sign in as admin to manage the store."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLogin, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4",
				variant: "outline",
				onClick: () => void load(),
				children: "Reload"
			})
		]
	});
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "p-10 text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl space-y-8 px-4 py-10 text-sm text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Store admin"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-lg",
						children: [
							"Sales are ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: data.ordersEnabled ? "ON" : "OFF" }),
							data.killReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-red-400",
								children: [
									" (auto-off: ",
									data.killReason,
									")"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "mt-2",
						onClick: () => void act({
							action: "setSales",
							enabled: !data.ordersEnabled
						}, data.ordersEnabled ? "Turn sales OFF?" : "Turn sales ON? Real customers will be charged and real RPI orders created."),
						children: ["Turn sales ", data.ordersEnabled ? "OFF" : "ON"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted",
						children: [
							"Today (since midnight PT, incl. open checkouts): ",
							data.ordersToday,
							" copies, $",
							data.exposureTodayUsd.toFixed(2),
							" exposure. ",
							data.availability ? `Edition: ${data.availability.editionRemaining} of ${data.availability.editionSize} left. ` : "",
							"Next RPI id: emoji-old-masters-440pp-gls-",
							data.nextOrderSeq.padStart(3, "0")
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Max orders/day ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-24",
								value: caps.maxOrders,
								onChange: (e) => setCaps({
									...caps,
									maxOrders: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Alert above $/day (not a cap) ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "w-28",
								value: caps.maxExposureUsd,
								onChange: (e) => setCaps({
									...caps,
									maxExposureUsd: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => void act({
									action: "setCaps",
									maxOrders: Number(caps.maxOrders),
									maxExposureUsd: Number(caps.maxExposureUsd)
								}),
								children: "Save caps"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Alerts"
			}), data.alerts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "None."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1",
				children: data.alerts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 rounded bg-surface p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: a.level }),
						" ",
						a.message,
						" ",
						a.order_id ? `(order ${a.order_id.slice(0, 8)})` : "",
						" · ",
						new Date(a.at).toLocaleString()
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => void act({
							action: "resolveAlert",
							alertId: a.id
						}),
						children: "Dismiss"
					})]
				}, a.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Orders"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Id" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "State" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "RPI id" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "RPI status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Ship" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Error" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: data.orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(o.short) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(o.state) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(o.customer_order_id ?? "") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(o.rpi_status ?? "") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: String(o.ship_tier ?? "") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: o.amount_total_cents != null ? `$${(Number(o.amount_total_cents) / 100).toFixed(2)}` : "" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "max-w-48 truncate",
							children: String(o.last_error ?? "")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "space-x-1 whitespace-nowrap",
							children: [o.state === "HELD" || o.state === "NEEDS_ATTENTION" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => void act({
									action: "release",
									orderId: o.id
								}, "Send this order to RPI now?"),
								children: "Release"
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => void act({
									action: "cancelRefund",
									orderId: o.id
								}, "Cancel at RPI (if possible) and refund in full?"),
								children: "Cancel+Refund"
							})]
						})
					]
				}, String(o.id))) })]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-semibold",
				children: "Reprint requests"
			}), data.reprints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "None."
			}) : data.reprints.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 rounded bg-surface p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Order ",
						r.order_id.slice(0, 8),
						": ",
						r.description
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: [
							"Decision: ",
							r.decision ?? "pending",
							" (file the reprint claim with RPI support manually)"
						]
					}),
					!r.decision ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "space-x-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => void act({
								action: "decideReprint",
								requestId: r.id,
								decision: "approved"
							}),
							children: "Approve"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => void act({
								action: "decideReprint",
								requestId: r.id,
								decision: "declined"
							}),
							children: "Decline"
						})]
					}) : null
				]
			}, r.id))] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Health"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => void fetch("/api/store/admin/health").then((r) => r.json()).then(setHealth),
					children: "Run health check"
				}),
				health ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "mt-2 overflow-x-auto rounded bg-surface p-2",
					children: JSON.stringify(health, null, 2)
				}) : null
			] })
		]
	});
}
//#endregion
export { AdminStore as component };
