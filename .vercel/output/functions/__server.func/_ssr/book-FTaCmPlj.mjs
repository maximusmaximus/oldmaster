import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as TIER_LABEL, d as REASON_TEXT, g as TEXT_SHIPPING_DUTIES, h as TEXT_REFUND, n as ENABLED_COUNTRIES, s as BOOK_PRICE_CENTS } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as Input } from "./input-B6LEBlYf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-FTaCmPlj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AvailabilityLine({ a }) {
	if (!a) return null;
	if (a.unavailableReason === "edition_sold_out") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "font-semibold text-fg",
		children: REASON_TEXT.edition_sold_out
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-semibold text-fg",
			children: [
				a.editionRemaining,
				" of ",
				a.editionSize,
				" copies left"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: a.unavailableReason ? REASON_TEXT[a.unavailableReason] : `${a.dailyRemaining} of ${a.dailyLimit} left today (resets at midnight PT)`
		})]
	});
}
var COUNTRY_NAMES = {
	US: "United States",
	CA: "Canada"
};
var price = (c) => `$${(c / 100).toFixed(2)}`;
function BookPage() {
	const [salesOpen, setSalesOpen] = (0, import_react.useState)(null);
	const [avail, setAvail] = (0, import_react.useState)(null);
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		email: "",
		phone: "",
		address1: "",
		address2: "",
		city: "",
		region: "",
		postal: "",
		country: "US"
	});
	const [quote, setQuote] = (0, import_react.useState)(null);
	const [tier, setTier] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetch("/api/store/status").then((r) => r.json()).then((d) => {
			setSalesOpen(Boolean(d.salesOpen));
			if (typeof d.editionRemaining === "number") setAvail(d);
		}).catch(() => setSalesOpen(false));
	}, []);
	const set = (k) => (e) => {
		setForm({
			...form,
			[k]: e.target.value
		});
		setQuote(null);
		setTier(null);
	};
	const getQuote = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError(null);
		try {
			const r = await fetch("/api/store/quote", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(form)
			});
			const d = await r.json();
			if (!r.ok) throw new Error(d.error || "Could not get shipping.");
			setQuote(d);
			setTier(d.options[0]?.tier ?? null);
		} catch (err) {
			setError(err.message);
		} finally {
			setBusy(false);
		}
	};
	const pay = async () => {
		if (!quote || !tier) return;
		setBusy(true);
		setError(null);
		try {
			const r = await fetch("/api/store/checkout", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					quoteId: quote.quoteId,
					tier
				})
			});
			const d = await r.json();
			if (!r.ok) {
				const msg = {
					quote_expired: "That shipping quote expired. Please get a new one.",
					...REASON_TEXT,
					sales_closed: "Sales are closed right now."
				};
				throw new Error(msg[d.error] ?? "Checkout is unavailable right now.");
			}
			window.location.href = d.url;
		} catch (err) {
			setError(err.message);
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold tracking-wide text-muted uppercase",
				children: "The book"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-sans text-4xl font-bold tracking-tight text-headline",
				children: "EMOJI OLD MASTERS"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/book/preview.jpg",
					alt: "Emoji Old Masters book",
					width: 870,
					height: 864,
					className: "w-full rounded-lg bg-surface-2 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-bold text-fg",
							children: price(BOOK_PRICE_CENTS)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [
								"Limited edition of ",
								500,
								" copies, at most 5 sold per day."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvailabilityLine, { a: avail }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Hardcover, 440 pages, 11.75 × 11.75 in, gloss paper. Printed to order and shipped to you." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Shipping is charged at cost for your address. Tax is added at checkout where it applies." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: TEXT_SHIPPING_DUTIES
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: ["Ships to the US and Canada (no APO/FPO). UK and EU shipping is not available from our printer yet. ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "underline",
								children: "Terms of Sale"
							})]
						})
					]
				})]
			}),
			avail?.unavailableReason === "edition_sold_out" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg",
				children: "Sold out."
			}) : avail?.unavailableReason && salesOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg",
				children: REASON_TEXT[avail.unavailableReason]
			}) : salesOpen === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg",
				children: "Sales open soon."
			}) : salesOpen === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl bg-surface p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold text-fg",
						children: "1. Where should we ship it?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: getQuote,
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								placeholder: "Full name",
								value: form.name,
								onChange: set("name"),
								autoComplete: "name"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								type: "email",
								placeholder: "Email",
								value: form.email,
								onChange: set("email"),
								autoComplete: "email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								className: "sm:col-span-2",
								placeholder: "Address line 1",
								value: form.address1,
								onChange: set("address1"),
								autoComplete: "address-line1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "sm:col-span-2",
								placeholder: "Address line 2 (optional)",
								value: form.address2,
								onChange: set("address2"),
								autoComplete: "address-line2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								placeholder: "City",
								value: form.city,
								onChange: set("city"),
								autoComplete: "address-level2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								placeholder: "State / province code (e.g. CA, ON)",
								maxLength: 3,
								value: form.region,
								onChange: set("region"),
								autoComplete: "address-level1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								required: true,
								placeholder: "ZIP / postal code",
								value: form.postal,
								onChange: set("postal"),
								autoComplete: "postal-code"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: form.country,
								onChange: set("country"),
								className: "h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg",
								autoComplete: "country",
								children: ENABLED_COUNTRIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: COUNTRY_NAMES[c] ?? c
								}, c))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Phone (for the carrier, optional)",
								value: form.phone,
								onChange: set("phone"),
								autoComplete: "tel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: busy,
								children: busy && !quote ? "Getting shipping…" : "Get shipping options"
							})
						]
					}),
					quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-fg",
								children: "2. Choose shipping"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 space-y-2",
								children: quote.options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center justify-between rounded-md border border-border p-3 text-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "tier",
												checked: tier === o.tier,
												onChange: () => setTier(o.tier)
											}),
											TIER_LABEL[o.tier],
											o.estimatedDeliveryDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-muted",
												children: ["· est. arrival ", o.estimatedDeliveryDate.slice(0, 10)]
											}) : null
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["$", o.priceUsd.toFixed(2)] })]
								}, o.tier))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm text-muted",
								children: TEXT_REFUND
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted",
								children: [
									"By continuing you agree to the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										className: "underline",
										children: "Terms of Sale"
									}),
									". The quote is valid for 30 minutes."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvailabilityLine, { a: avail })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "mt-4",
								onClick: pay,
								disabled: busy || !tier,
								children: busy ? "Opening checkout…" : "Continue to payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									"Payment is processed by Stripe. Read the full ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/terms",
										className: "underline",
										children: "Terms of Sale"
									}),
									" before paying."
								]
							})
						]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-red-400",
						role: "alert",
						children: error
					}) : null
				]
			})
		]
	});
}
//#endregion
export { AvailabilityLine, BookPage as component };
