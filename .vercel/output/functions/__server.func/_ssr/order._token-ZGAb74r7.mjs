import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Route$12 } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order._token-ZGAb74r7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATE_TEXT = {
	PAID: "Payment received. Your book is queued for printing.",
	DEFERRED: "Payment received. Your book goes to the printer tonight.",
	HELD: "Payment received. We're reviewing your order before printing.",
	RPI_CREATING: "Sending your book to the printer.",
	RPI_CREATED: "At the printer, being checked before printing.",
	CANCEL_WINDOW: "At the printer, waiting to print.",
	CANCEL_REQUESTED: "Cancellation requested. We'll refund you as soon as the printer confirms.",
	LOCKED: "Printing. It can no longer be cancelled.",
	SHIPPED: "Shipped!",
	NEEDS_ATTENTION: "We're looking into an issue with your order and will sort it out.",
	PREFLIGHT_REJECTED: "We're looking into an issue with your order and will sort it out.",
	RPI_REJECTED: "We're looking into an issue with your order and will sort it out.",
	CANCELLED_REFUNDED: "Cancelled and refunded.",
	DISPUTED: "This payment is disputed."
};
function OrderPage() {
	const { token } = Route$12.useParams();
	const [order, setOrder] = (0, import_react.useState)(null);
	const [missing, setMissing] = (0, import_react.useState)(false);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const [desc, setDesc] = (0, import_react.useState)("");
	const load = (0, import_react.useCallback)(() => {
		fetch(`/api/store/order/${token}`).then(async (r) => {
			if (!r.ok) return setMissing(true);
			setOrder(await r.json());
		}).catch(() => setMissing(true));
	}, [token]);
	(0, import_react.useEffect)(load, [load]);
	const act = async (body, ok) => {
		const r = await fetch(`/api/store/order/${token}`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(body)
		});
		setMsg(r.ok ? ok : "That didn't work. The order may no longer be eligible.");
		load();
	};
	if (missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-xl px-6 py-20 text-center text-muted",
		children: "Order not found. If you just paid, refresh in a minute."
	});
	if (!order) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-xl px-6 py-20 text-center text-muted",
		children: "Loading…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold tracking-wide text-muted uppercase",
				children: "Your order"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-sans text-3xl font-bold tracking-tight text-headline",
				children: "Emoji Old Masters"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Bookmark this page: it's where you'll see shipping status and tracking."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-lg text-fg",
				children: order.rpiQueued ? "Paid. Waiting in the printer's queue; it will start soon." : STATE_TEXT[order.state] ?? order.state
			}),
			order.availability ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					"Limited edition: ",
					order.availability.editionRemaining,
					" of ",
					order.availability.editionSize,
					" copies left."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 space-y-1 text-sm text-muted",
				children: [
					order.shipTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Ships to: ", order.shipTo] }) : null,
					order.tier ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Shipping: ", order.tier] }) : null,
					order.totalCents != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Total paid: $", (order.totalCents / 100).toFixed(2)] }) : null
				]
			}),
			order.tracking.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-1",
				children: order.tracking.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t.url ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					className: "underline",
					href: t.url,
					target: "_blank",
					rel: "noopener noreferrer",
					children: ["Track package ", t.number ?? ""]
				}) : t.number }, i))
			}) : null,
			order.canCancel && order.cancelDeadline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-lg bg-surface p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						"You can cancel for a full refund until ",
						new Date(order.cancelDeadline).toLocaleString("en-US", {
							timeZone: "America/Los_Angeles",
							dateStyle: "medium",
							timeStyle: "short"
						}),
						" Pacific."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3",
					variant: "outline",
					onClick: () => {
						if (confirm("Cancel this order for a full refund?")) act({ action: "cancel" }, "Cancellation started.");
					},
					children: "Cancel order"
				})]
			}) : null,
			order.canRequestReprint ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-lg bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Misprinted or damaged? Describe the problem (within 14 days of delivery) and email photos to maxinfeld@gmail.com; we will arrange a free replacement."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: desc,
						onChange: (e) => setDesc(e.target.value),
						rows: 4,
						className: "mt-2 w-full rounded-md border border-border bg-surface p-2 text-sm text-fg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-2",
						disabled: desc.trim().length < 10,
						onClick: () => void act({
							action: "reprint",
							description: desc
						}, "Thanks, we received your request."),
						children: "Request a replacement"
					})
				]
			}) : null,
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-fg",
				children: msg
			}) : null
		]
	});
}
//#endregion
export { OrderPage as component };
