import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { d as Copy, f as Check, r as Share2 } from "../_libs/lucide-react.mjs";
import { T as copyText } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/share-work-CWb2FJ1n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function absoluteUrl(path) {
	if (typeof window === "undefined") return path;
	return new URL(path, window.location.origin).toString();
}
function ShareWork({ path, title, text, compact = false }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [canNative, setCanNative] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setCanNative(typeof navigator.share === "function");
	}, []);
	const url = () => absoluteUrl(path);
	const onCopy = async () => {
		if (!await copyText(url())) return;
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	};
	const onNative = async () => {
		if (typeof navigator.share !== "function") return;
		try {
			await navigator.share({
				title,
				text: text ?? "Look at this Emoji New Master",
				url: url()
			});
		} catch {}
	};
	const size = compact ? "sm" : "default";
	const compactClass = compact ? "h-11 flex-1 px-2 text-xs" : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-2", compact && "gap-1"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			size,
			className: compactClass,
			onClick: () => void onCopy(),
			children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : compact ? "Copy link" : "Copy link"]
		}), canNative ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: compact ? "outline" : "default",
			size,
			className: compactClass,
			onClick: () => void onNative(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), compact ? "Share" : "Share"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: compact ? "outline" : "default",
			size,
			className: compactClass,
			onClick: () => void onCopy(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), "Share"]
		})]
	});
}
//#endregion
export { ShareWork as t };
