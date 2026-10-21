import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as fanVideoSrc } from "./fan-works-BMoXMERl.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { c as FileType2, d as Copy, f as Check, u as Download } from "../_libs/lucide-react.mjs";
import { A as fileStem, D as downloadJpeg, M as mosaicToSvg, N as parseEmojiGrid, O as downloadText, T as copyText, j as glyphsToText, w as canvasToJpegBase64 } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clip-poster-DPXq7yeC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MosaicExport({ name, grid, canvas, emojiText, jpegUrl, compact = false, cover = false }) {
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const stem = fileStem(name);
	const resolved = (() => {
		if (grid?.glyphs.length) return {
			glyphs: grid.glyphs,
			cols: grid.cols,
			rows: grid.rows,
			colors: grid.colors,
			text: glyphsToText(grid.glyphs, grid.cols)
		};
		if (emojiText?.trim()) {
			const parsed = parseEmojiGrid(emojiText);
			return {
				glyphs: parsed.glyphs,
				cols: parsed.cols,
				rows: parsed.rows,
				colors: void 0,
				text: emojiText
			};
		}
		return null;
	})();
	const ready = Boolean(resolved);
	const onCopy = async () => {
		if (!resolved) return;
		setBusy("copy");
		const ok = await copyText(resolved.text);
		setBusy(null);
		if (ok) {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		}
	};
	const onJpeg = async () => {
		setBusy("jpg");
		try {
			if (canvas) {
				const jpeg = await canvasToJpegBase64(canvas, 1200);
				downloadJpeg(jpeg, `${stem}.jpg`);
				return;
			}
			if (jpegUrl) {
				const res = await fetch(jpegUrl);
				if (!res.ok) return;
				const blob = await res.blob();
				const url = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${stem}.jpg`;
				a.click();
				URL.revokeObjectURL(url);
			}
		} finally {
			setBusy(null);
		}
	};
	const onSvg = () => {
		if (!resolved) return;
		setBusy("svg");
		const svg = mosaicToSvg(resolved.glyphs, resolved.cols, resolved.rows, resolved.colors);
		downloadText(svg, `${stem}.svg`, "image/svg+xml;charset=utf-8");
		setBusy(null);
	};
	const btn = compact ? "sm" : "default";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-2", compact && "gap-1"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: btn,
				className: compact ? "h-11 flex-1 px-2 text-xs" : void 0,
				disabled: !ready || busy === "copy",
				onClick: () => void onCopy(),
				children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : compact ? "Copy" : "Copy emoji"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: btn,
				className: compact ? "h-11 flex-1 px-2 text-xs" : void 0,
				disabled: !canvas && !jpegUrl || busy === "jpg",
				onClick: () => void onJpeg(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), busy === "jpg" ? "…" : compact ? "JPG" : "Download JPG"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				variant: "outline",
				size: btn,
				className: compact ? "h-11 flex-1 px-2 text-xs" : void 0,
				disabled: !ready || busy === "svg",
				onClick: onSvg,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileType2, { className: "size-4" }), compact ? cover ? "SVG cover" : "SVG" : cover ? "Download SVG cover" : "Download SVG"]
			})
		]
	});
}
var OG_W = 1200;
var OG_H = 630;
var OG_BG = "#0c0b0a";
function finishVideo(video, resolve, settled) {
	return (url) => {
		if (settled.current) return;
		settled.current = true;
		video.pause();
		video.removeAttribute("src");
		video.load();
		resolve(url);
	};
}
function frameFromVideo(video) {
	if (!video.videoWidth) return null;
	const canvas = document.createElement("canvas");
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	const ctx = canvas.getContext("2d");
	if (!ctx) return null;
	ctx.drawImage(video, 0, 0);
	try {
		return canvas.toDataURL("image/jpeg", .88);
	} catch {
		return null;
	}
}
function grabVideoFrameAt(src, ratio = .5) {
	return new Promise((resolve) => {
		const video = document.createElement("video");
		video.muted = true;
		video.playsInline = true;
		video.preload = "auto";
		video.crossOrigin = "anonymous";
		const done = finishVideo(video, resolve, { current: false });
		const grab = () => done(frameFromVideo(video));
		const seek = () => {
			const span = Number.isFinite(video.duration) && video.duration > .05 ? video.duration : 1;
			const t = Math.min(span * .98, Math.max(.04, span * ratio));
			const onSeeked = () => grab();
			video.addEventListener("seeked", onSeeked, { once: true });
			try {
				video.currentTime = t;
			} catch {
				grab();
			}
		};
		video.addEventListener("loadeddata", seek, { once: true });
		video.addEventListener("error", () => done(null), { once: true });
		window.setTimeout(() => done(null), 9e3);
		video.src = src;
	});
}
function grabClipMiddleFrame(id) {
	return grabVideoFrameAt(fanVideoSrc(id), .5);
}
async function grabBlobMiddleFrame(blob) {
	const url = URL.createObjectURL(blob);
	try {
		return await grabVideoFrameAt(url, .5);
	} finally {
		URL.revokeObjectURL(url);
	}
}
function jpegToDataUrl(jpeg) {
	return jpeg.startsWith("data:") ? jpeg : `data:image/jpeg;base64,${jpeg}`;
}
function dataUrlToJpeg(dataUrl) {
	const i = dataUrl.indexOf(",");
	return i >= 0 ? dataUrl.slice(i + 1) : dataUrl;
}
function letterboxOgDataUrl(jpeg) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement("canvas");
			canvas.width = OG_W;
			canvas.height = OG_H;
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("no canvas"));
				return;
			}
			ctx.fillStyle = OG_BG;
			ctx.fillRect(0, 0, OG_W, OG_H);
			const scale = Math.min(OG_W / img.width, OG_H / img.height);
			const w = Math.max(1, Math.round(img.width * scale));
			const h = Math.max(1, Math.round(img.height * scale));
			ctx.drawImage(img, (OG_W - w) / 2, (OG_H - h) / 2, w, h);
			resolve(canvas.toDataURL("image/jpeg", .88));
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error("og preview failed"));
		img.src = jpegToDataUrl(jpeg);
	});
}
//#endregion
export { jpegToDataUrl as a, grabClipMiddleFrame as i, dataUrlToJpeg as n, letterboxOgDataUrl as o, grabBlobMiddleFrame as r, MosaicExport as t };
