import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { o as Plus, s as Minus } from "../_libs/lucide-react.mjs";
import { C as DENSITY_STEPS } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/density-control-CjeO0SOG.js
var import_jsx_runtime = require_jsx_runtime();
function DensityControl({ value, onChange, cols, rows, locked = false, busy = false, steps = DENSITY_STEPS, lockLabel = "Saved — glyph count is locked" }) {
	const at = Math.max(0, steps.findIndex((step) => step === value));
	const coarser = at > 0;
	const finer = at >= 0 && at < steps.length - 1;
	const frozen = locked || busy;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center rounded-lg border border-border bg-surface p-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "size-11 rounded-md",
					disabled: frozen || !coarser,
					"aria-label": "Fewer emoji",
					onClick: () => onChange(steps[Math.max(0, at - 1)]),
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "density-snail text-lg",
						"aria-hidden": "true",
						children: "🐌"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-24 items-center justify-center gap-1.5 px-2 text-center text-sm text-muted tabular-nums",
					children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "density-snail text-xl",
						"aria-hidden": "true",
						children: "🐌"
					}) : null, cols && rows ? `${cols} × ${rows}` : "Glyphs"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "size-11 rounded-md",
					disabled: frozen || !finer,
					"aria-label": "More emoji",
					onClick: () => onChange(steps[Math.min(steps.length - 1, at + 1)]),
					children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "density-snail text-lg",
						"aria-hidden": "true",
						children: "🐌"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("text-xs text-subtle", locked && "text-muted"),
			children: locked ? lockLabel : busy ? "🐌 packing more glyphs…" : "Fewer, larger glyphs · denser, smaller"
		})]
	});
}
//#endregion
export { DensityControl as t };
