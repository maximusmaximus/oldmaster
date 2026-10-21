import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as letterboxReelFrame, d as EMOJI_FONT, l as svgPosterSrc, v as loadReelFrames } from "./svg-reels-D4HEG8-k.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { A as fileStem, T as copyText } from "./router-ByA-bRxH.mjs";
import { n as ipfsGatewayUrl } from "./ipfs-DsUAJpaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/svg-4k-MdUCP9xy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		key: "svgCid",
		emoji: "📄",
		label: "SVG"
	},
	{
		key: "emojiCid",
		emoji: "🧬",
		label: "Emoji text"
	},
	{
		key: "jpegCid",
		emoji: "🖼️",
		label: "Poster"
	},
	{
		key: "framesCid",
		emoji: "🎞️",
		label: "Frames"
	}
];
function SvgIpfsLinks({ pins, compact = false }) {
	const [copied, setCopied] = (0, import_react.useState)(null);
	if (!pins) return null;
	const items = LINKS.filter((item) => pins[item.key]);
	if (!items.length) return null;
	const copyGateway = async (key, cid) => {
		if (!await copyText(ipfsGatewayUrl(cid))) return;
		setCopied(key);
		window.setTimeout(() => setCopied((cur) => cur === key ? null : cur), 1600);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-wrap gap-2", compact && "gap-1"),
		children: items.map((item) => {
			const cid = pins[item.key];
			if (!cid) return null;
			const done = copied === item.key;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				title: done ? `Copied ${item.label} gateway` : `Copy ${item.label} IPFS gateway`,
				"aria-label": done ? `Copied ${item.label} gateway` : `Copy ${item.label} IPFS gateway`,
				onClick: () => void copyGateway(item.key, cid),
				className: cn("inline-flex items-center justify-center rounded-full border border-border bg-surface-2", compact ? "size-9 text-lg" : "h-11 gap-1.5 px-3 text-xl"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: done ? "✅" : item.emoji
				}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium text-fg",
					children: done ? "Copied" : item.label
				})]
			}, item.key);
		})
	});
}
function SvgReelPlayer({ title, id, frames: given, fps: givenFps, autoPlay = false, className }) {
	const wrapRef = (0, import_react.useRef)(null);
	const canvasRef = (0, import_react.useRef)(null);
	const framesRef = (0, import_react.useRef)(given ?? []);
	const fpsRef = (0, import_react.useRef)(givenFps || 8);
	const indexRef = (0, import_react.useRef)(0);
	const [ready, setReady] = (0, import_react.useState)(Boolean(given && given.length));
	const [playing, setPlaying] = (0, import_react.useState)(autoPlay);
	const [error, setError] = (0, import_react.useState)(false);
	const [attempt, setAttempt] = (0, import_react.useState)(0);
	const paint = (0, import_react.useCallback)((frame) => {
		const canvas = canvasRef.current;
		const wrap = wrapRef.current;
		if (!canvas || !wrap) return;
		const css = Math.max(160, wrap.clientWidth || 320);
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const px = Math.max(160, Math.round(css * dpr));
		letterboxReelFrame(canvas, frame, px, px);
		canvas.style.width = "100%";
		canvas.style.height = "100%";
	}, []);
	(0, import_react.useEffect)(() => {
		framesRef.current = given ?? framesRef.current;
		if (givenFps) fpsRef.current = givenFps;
		if (given && given.length) {
			setReady(true);
			setError(false);
			document.fonts.load(`24px ${EMOJI_FONT}`).finally(() => {
				paint(given[0]);
			});
		}
	}, [
		given,
		givenFps,
		paint
	]);
	(0, import_react.useEffect)(() => {
		if (given?.length || !id) return;
		let live = true;
		loadReelFrames(id).then(async (pack) => {
			if (!live) return;
			try {
				await document.fonts.load(`24px ${EMOJI_FONT}`);
			} catch {}
			framesRef.current = pack.frames;
			fpsRef.current = pack.fps || 8;
			const start = autoPlay ? 0 : Math.floor(pack.frames.length / 2);
			indexRef.current = start;
			setReady(true);
			const frame = pack.frames[start] ?? pack.frames[0];
			if (frame) paint(frame);
		}).catch(() => {
			if (live) setError(true);
		});
		return () => {
			live = false;
		};
	}, [
		given,
		id,
		paint,
		autoPlay,
		attempt
	]);
	(0, import_react.useEffect)(() => {
		const wrap = wrapRef.current;
		if (!wrap) return;
		const ro = new ResizeObserver(() => {
			const list = framesRef.current;
			const frame = list[indexRef.current] ?? list[0];
			if (frame) paint(frame);
		});
		ro.observe(wrap);
		return () => ro.disconnect();
	}, [paint]);
	(0, import_react.useEffect)(() => {
		if (!playing || !ready) return;
		const frames = framesRef.current;
		if (frames.length < 2) return;
		const step = 1e3 / Math.max(1, fpsRef.current);
		const idTimer = window.setInterval(() => {
			indexRef.current = (indexRef.current + 1) % frames.length;
			const frame = frames[indexRef.current];
			if (frame) paint(frame);
		}, step);
		return () => window.clearInterval(idTimer);
	}, [
		playing,
		ready,
		paint
	]);
	const toggle = () => {
		if (error && id) {
			setError(false);
			setAttempt((n) => n + 1);
		}
		setPlaying((on) => !on);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: cn("relative aspect-square overflow-hidden bg-bg", className),
		children: [
			id && !ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: svgPosterSrc(id),
				alt: title,
				className: "absolute inset-0 size-full object-cover"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: cn("absolute inset-0 size-full", ready ? "opacity-100" : "opacity-0"),
				"aria-label": title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toggle,
				"aria-label": playing ? "Pause emoji reel" : "Play emoji reel",
				className: cn("absolute top-1/2 left-1/2 z-10 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-2xl text-fg shadow-lg transition-opacity duration-150 sm:size-[4.5rem] sm:text-3xl", playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: playing ? "⏸️" : "▶️"
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute inset-x-2 bottom-2 z-10 text-center text-xs text-headline",
				children: "Still catching up — tap play again."
			}) : null
		]
	});
}
var LINES = {
	"4k": [
		"Spinning the 4K reel. Don’t blink.",
		"Teaching emojis to act at 3840 wide.",
		"Lemon-pressing pixels into a movie.",
		"This takes a minute. The wheel is honest.",
		"Frame by frame, glyph by glyph…"
	],
	"8k": [
		"8K is a lot of lemon. Hang tight.",
		"Unrolling a cinema-sized emoji carpet.",
		"Your phone is sweating. That’s the art.",
		"Almost a planet of pixels. Still spinning.",
		"High-res patience is a virtue. 📀"
	]
};
var ORBIT = [
	"🎬",
	"🍋",
	"🎞️",
	"🎥"
];
function VideoEncodeWait({ size = "4k", compact = false }) {
	const lines = LINES[size];
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setIndex((n) => n + 1), 1400);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-30 flex flex-col items-center justify-center gap-3 bg-bg/85 px-4 text-center backdrop-blur-[2px]",
		role: "status",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("relative", compact ? "size-20" : "size-28"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "encode-orbit absolute inset-0",
					children: ORBIT.map((glyph, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", compact ? "text-lg" : "text-2xl"),
						style: { transform: `rotate(${i * 90}deg) translateY(${compact ? -34 : -46}px) rotate(${-i * 90}deg)` },
						children: glyph
					}, glyph))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("encode-spin absolute inset-0 grid place-items-center", compact ? "text-4xl" : "text-5xl"),
					"aria-hidden": "true",
					children: "📀"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("max-w-[16rem] font-medium text-headline", compact ? "text-xs" : "text-sm"),
				children: size === "8k" ? "Cooking 8K" : "Cooking 4K"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-line max-w-[18rem] text-xs text-muted",
				children: lines[index % lines.length]
			}, lines[index % lines.length])
		]
	});
}
function EncodeSpin({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("encode-spin inline-block", className),
		"aria-hidden": "true",
		children: "📀"
	});
}
var CLIP_MS = 12e3;
var LIVE_DENSITY_STEPS = [
	24,
	32,
	40,
	48,
	64
];
var LIVE_DENSITY_STEPS_DESKTOP = [
	32,
	40,
	48,
	64,
	80,
	96,
	128,
	160,
	192,
	224,
	256
];
var LIVE_DENSITY_KEY = "eom-live-density";
function isDesktopLive() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(pointer: fine) and (min-width: 900px)").matches;
}
function liveDensitySteps() {
	return isDesktopLive() ? LIVE_DENSITY_STEPS_DESKTOP : LIVE_DENSITY_STEPS;
}
function liveFpsFor(density) {
	if (density >= 224) return 8;
	if (density >= 160) return 10;
	if (density >= 128) return 12;
	if (density >= 96) return 16;
	return 20;
}
function defaultLiveDensity() {
	return isDesktopLive() ? 64 : 48;
}
function isLiveDensity(value, steps = liveDensitySteps()) {
	return steps.includes(value);
}
function readLiveDensity() {
	const steps = liveDensitySteps();
	const fallback = defaultLiveDensity();
	try {
		const raw = Number(localStorage.getItem(LIVE_DENSITY_KEY));
		if (isLiveDensity(raw, steps)) return raw;
	} catch {}
	return fallback;
}
function writeLiveDensity(value) {
	if (!Number.isFinite(value)) return;
	try {
		localStorage.setItem(LIVE_DENSITY_KEY, String(value));
	} catch {}
}
function pickRecorderMime() {
	if (typeof MediaRecorder === "undefined") return "";
	return (typeof navigator !== "undefined" && (/iP(hone|ad|od)/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) ? [
		"video/mp4",
		"video/mp4;codecs=avc1.42E01E",
		"video/webm"
	] : [
		"video/webm;codecs=vp8",
		"video/webm",
		"video/mp4;codecs=avc1.42E01E",
		"video/mp4",
		"video/webm;codecs=vp9"
	]).find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}
function isIosLive() {
	if (typeof navigator === "undefined") return false;
	return /iP(hone|ad|od)/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
}
function requestFullscreenEl(el) {
	if (!el || typeof document === "undefined") return;
	if (document.fullscreenElement === el) return;
	const node = el;
	const req = node.requestFullscreen?.bind(node) ?? node.webkitRequestFullscreen?.bind(node);
	if (req) Promise.resolve(req()).catch(() => void 0);
}
function exitFullscreenSafe() {
	if (typeof document === "undefined") return;
	const doc = document;
	try {
		if (document.fullscreenElement) document.exitFullscreen();
		else doc.webkitExitFullscreen?.();
	} catch {}
}
function videoExt(mime) {
	return mime.includes("mp4") ? "mp4" : "webm";
}
async function blobToBase64(blob) {
	const bytes = new Uint8Array(await blob.arrayBuffer());
	let bin = "";
	const chunk = 32768;
	for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
	return btoa(bin);
}
function downloadBlob(blob, filename) {
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}
var LONG_EDGE = {
	"4k": 3840,
	"8k": 7680
};
var BITRATE = {
	"4k": 24e6,
	"8k": 96e6
};
function wait(ms) {
	return new Promise((resolve) => window.setTimeout(resolve, ms));
}
function even16(n) {
	return Math.max(16, Math.round(n / 16) * 16);
}
function reelVideoDimensions(frame, size) {
	const long = LONG_EDGE[size];
	const cols = Math.max(1, frame.cols);
	const rows = Math.max(1, frame.rows);
	if (rows > cols) return {
		w: even16(long * (cols / rows)),
		h: long
	};
	if (cols > rows) return {
		w: long,
		h: even16(long * (rows / cols))
	};
	return {
		w: long,
		h: long
	};
}
function makeCanvas(w, h) {
	const canvas = document.createElement("canvas");
	canvas.width = w;
	canvas.height = h;
	if (canvas.width !== w || canvas.height !== h) return null;
	if (!canvas.getContext("2d")) return null;
	return canvas;
}
function sizeLadder(frame, size) {
	const wanted = reelVideoDimensions(frame, size);
	const four = reelVideoDimensions(frame, "4k");
	const hdLong = 1920;
	const hd = frame.rows > frame.cols ? {
		w: even16(hdLong * (frame.cols / frame.rows)),
		h: hdLong
	} : {
		w: hdLong,
		h: even16(hdLong * (frame.rows / frame.cols))
	};
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const dim of [
		wanted,
		four,
		hd
	]) {
		const key = `${dim.w}x${dim.h}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(dim);
	}
	return out;
}
async function encodeAt(frames, fps, w, h, bits) {
	const canvas = makeCanvas(w, h);
	if (!canvas || typeof canvas.captureStream !== "function") throw new Error("This browser can’t record that size");
	letterboxReelFrame(canvas, frames[0], w, h);
	const stream = canvas.captureStream(Math.max(4, fps));
	const mime = pickRecorderMime() || "video/webm";
	let rec;
	try {
		rec = new MediaRecorder(stream, {
			mimeType: mime,
			videoBitsPerSecond: bits
		});
	} catch {
		rec = new MediaRecorder(stream);
	}
	const chunks = [];
	rec.ondataavailable = (event) => {
		if (event.data.size) chunks.push(event.data);
	};
	const stopped = new Promise((resolve, reject) => {
		rec.onerror = () => reject(/* @__PURE__ */ new Error("encode failed"));
		rec.onstop = () => {
			const type = rec.mimeType || mime;
			const blob = new Blob(chunks, { type });
			if (blob.size < 64) reject(/* @__PURE__ */ new Error("encode was empty"));
			else resolve(blob);
		};
	});
	rec.start(200);
	const step = 1e3 / Math.max(1, fps);
	for (let i = 0; i < frames.length; i++) {
		letterboxReelFrame(canvas, frames[i], w, h);
		await wait(step);
	}
	if (rec.state !== "inactive") rec.stop();
	const blob = await stopped;
	return {
		blob,
		mime: blob.type || mime
	};
}
async function encodeReelVideo(frames, fps = 8, size = "4k") {
	if (frames.length < 2) throw new Error("Need more frames");
	let last = null;
	for (const dim of sizeLadder(frames[0], size)) try {
		const bits = dim.w >= 7e3 || dim.h >= 7e3 ? BITRATE["8k"] : BITRATE["4k"];
		return {
			...await encodeAt(frames, fps, dim.w, dim.h, bits),
			w: dim.w,
			h: dim.h
		};
	} catch (err) {
		last = err instanceof Error ? err : /* @__PURE__ */ new Error("encode failed");
	}
	throw last ?? /* @__PURE__ */ new Error("Could not encode video");
}
async function downloadReelVideo(frames, title, fps = 8, size = "4k") {
	const { blob, mime, w, h } = await encodeReelVideo(frames, fps, size);
	const label = size === "8k" ? "8k" : "4k";
	const orient = h > w ? "portrait" : w > h ? "landscape" : "square";
	downloadBlob(blob, `${fileStem(title || "emoji-svg-reel")}-${label}-${orient}.${videoExt(mime)}`);
}
//#endregion
export { requestFullscreenEl as _, SvgReelPlayer as a, downloadBlob as c, isDesktopLive as d, isIosLive as f, readLiveDensity as g, pickRecorderMime as h, SvgIpfsLinks as i, downloadReelVideo as l, liveFpsFor as m, EncodeSpin as n, VideoEncodeWait as o, liveDensitySteps as p, LIVE_DENSITY_STEPS as r, blobToBase64 as s, CLIP_MS as t, exitFullscreenSafe as u, videoExt as v, writeLiveDensity as y };
