import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as ensureFanPinned } from "./fan-works-BMoXMERl.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { d as Copy, f as Check, l as ExternalLink } from "../_libs/lucide-react.mjs";
import { T as copyText } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { a as mediaCid, i as ipfsUri, n as ipfsGatewayUrl, r as ipfsOpenUrl, s as primaryCid, t as hasPins } from "./ipfs-DsUAJpaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ipfs-copy-Cnhc40SN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IpfsOpenButton({ pins, compact = false }) {
	const cid = primaryCid(pins);
	if (!cid) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		asChild: true,
		variant: "outline",
		size: compact ? "sm" : "default",
		className: compact ? "h-11 flex-1 px-2 text-xs" : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
			href: ipfsOpenUrl(cid),
			target: "_blank",
			rel: "noreferrer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), compact ? "IPFS" : "Open IPFS"]
		})
	});
}
function IpfsBadge({ pins }) {
	if (!primaryCid(pins)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		title: "Pinned on IPFS",
		className: "absolute top-2.5 left-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg",
		children: "📌 IPFS"
	});
}
var PIN_LINKS = [
	{
		key: "jpegCid",
		emoji: "🖼️",
		label: "Cover"
	},
	{
		key: "videoCid",
		emoji: "🎬",
		label: "Clip"
	},
	{
		key: "svgCid",
		emoji: "📄",
		label: "SVG"
	},
	{
		key: "emojiCid",
		emoji: "🧬",
		label: "Emoji"
	},
	{
		key: "framesCid",
		emoji: "🎞️",
		label: "Frames"
	}
];
function PinataLinks({ pins, compact = false, showUrl = true }) {
	const [copied, setCopied] = (0, import_react.useState)(null);
	if (!pins) return null;
	const items = PIN_LINKS.filter((item) => pins[item.key]);
	if (!items.length) return null;
	const copyGateway = async (key, cid) => {
		if (!await copyText(ipfsGatewayUrl(cid))) return;
		setCopied(key);
		window.setTimeout(() => setCopied((cur) => cur === key ? null : cur), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: cn("space-y-1.5", compact && "space-y-1"),
		children: items.map((item) => {
			const cid = pins[item.key];
			if (!cid) return null;
			const url = ipfsGatewayUrl(cid);
			const done = copied === item.key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				title: done ? `Copied ${item.label} gateway` : `Copy ${item.label} Pinata gateway`,
				"aria-label": done ? `Copied ${item.label} gateway` : `Copy ${item.label} Pinata gateway`,
				onClick: () => void copyGateway(item.key, cid),
				className: cn("flex w-full min-w-0 items-center gap-2 rounded-md border border-border bg-surface-2 px-2 text-left", compact ? "min-h-9 py-1" : "min-h-11 py-1.5"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: compact ? "text-base" : "text-xl",
					children: done ? "✅" : item.emoji
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-[11px] font-medium text-fg",
						children: done ? "Copied gateway" : `${item.emoji} ${item.label}`
					}), showUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block break-all font-mono text-[10px] text-fg",
						children: cid
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block break-all font-mono text-[10px] text-subtle",
						children: url
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block break-all font-mono text-[10px] text-fg",
						children: cid
					})]
				})]
			}) }, item.key);
		})
	});
}
function IpfsCopy({ pins }) {
	const cid = primaryCid(pins);
	const [copied, setCopied] = (0, import_react.useState)(null);
	const copy = async (kind, value) => {
		if (!await copyText(value)) return;
		setCopied(kind);
		window.setTimeout(() => setCopied(null), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				children: "Pinata gateway"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinataLinks, { pins }),
			cid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex flex-wrap gap-2"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpfsOpenButton, { pins }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => void copy("ipfs", ipfsUri(cid)),
						children: [copied === "ipfs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied === "ipfs" ? "Copied" : "Copy IPFS"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => void copy("gateway", ipfsGatewayUrl(cid)),
						children: [copied === "gateway" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied === "gateway" ? "Copied" : "Copy gateway"]
					})
				]
			}) : null
		]
	});
}
function FanIpfsInfo({ pins, kind, extra, workId }) {
	const [live, setLive] = (0, import_react.useState)(hasPins(pins) ? pins : null);
	const [phase, setPhase] = (0, import_react.useState)(hasPins(pins) ? "ready" : workId ? "pinning" : "missing");
	(0, import_react.useEffect)(() => {
		if (hasPins(pins)) {
			setLive(pins);
			setPhase("ready");
			return;
		}
		if (!workId) {
			setPhase("missing");
			return;
		}
		let stop = false;
		setPhase("pinning");
		ensureFanPinned({ data: { id: workId } }).then((next) => {
			if (stop) return;
			if (hasPins(next)) {
				setLive(next);
				setPhase("ready");
			} else setPhase("missing");
		}).catch(() => {
			if (!stop) setPhase("missing");
		});
		return () => {
			stop = true;
		};
	}, [
		workId,
		pins?.jpegCid,
		pins?.emojiCid,
		pins?.videoCid
	]);
	const cid = live ? mediaCid(live) : "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold tracking-wide text-muted uppercase",
				children: "IPFS"
			}),
			phase === "pinning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted",
				children: "📌 Pinning…"
			}) : cid ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "break-all font-mono text-[11px] leading-snug text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-1",
					"aria-hidden": "true",
					children: kind === "clip" ? "🎬" : "🖼️"
				}), cid]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-subtle",
				children: "📌 Pinning…"
			}),
			live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinataLinks, {
				pins: live,
				compact: true
			}) : null,
			extra ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
				className: "cursor-pointer text-xs font-medium text-muted",
				children: "More info"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-2",
				children: extra
			})] }) : null
		]
	});
}
//#endregion
export { IpfsBadge as n, IpfsCopy as r, FanIpfsInfo as t };
