import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as isEmojiProcessed } from "./emoji-processed-DBxAIRLK.mjs";
import { a as number, o as object, s as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/svg-reel-rFo89ddr.js
/**
* Curated color-emoji palette. Geometric glyphs anchor the gamut;
* objects/food/nature fill the rest. Runtime sampling overwrites RGB.
*/
var EMOJI_GLYPHS = [
	"🟥",
	"🟧",
	"🟨",
	"🟩",
	"🟦",
	"🟪",
	"🟫",
	"⬛",
	"⬜",
	"🔴",
	"🟠",
	"🟡",
	"🟢",
	"🔵",
	"🟣",
	"🟤",
	"⚫",
	"⚪",
	"❤️",
	"🧡",
	"💛",
	"💚",
	"💙",
	"💜",
	"🤎",
	"🖤",
	"🤍",
	"💖",
	"💗",
	"💕",
	"💘",
	"💝",
	"🍎",
	"🍓",
	"🍒",
	"🍉",
	"🍅",
	"🌶️",
	"🍑",
	"🍊",
	"🥕",
	"🍋",
	"🍌",
	"🍍",
	"🌽",
	"🥝",
	"🍏",
	"🍐",
	"🍈",
	"🫐",
	"🍇",
	"🍆",
	"🥑",
	"🥒",
	"🥦",
	"🥬",
	"🧄",
	"🧅",
	"🍞",
	"🥐",
	"🥖",
	"🧀",
	"🥚",
	"🍗",
	"🍖",
	"🥩",
	"🍔",
	"🍟",
	"🍕",
	"🌭",
	"🌮",
	"🌯",
	"🥗",
	"🍝",
	"🍜",
	"🍣",
	"🍙",
	"🍚",
	"🎂",
	"🍰",
	"🧁",
	"🍪",
	"🍩",
	"🍫",
	"🍬",
	"🍭",
	"🍯",
	"🥛",
	"☕",
	"🫖",
	"🍺",
	"🍷",
	"🍸",
	"🍹",
	"🌲",
	"🌳",
	"🌴",
	"🌵",
	"🌿",
	"🍀",
	"☘️",
	"🍃",
	"🍂",
	"🍁",
	"🌸",
	"🌺",
	"🌻",
	"🌹",
	"🌷",
	"🌼",
	"🌾",
	"🌊",
	"❄️",
	"⭐",
	"🌟",
	"✨",
	"🌙",
	"☀️",
	"🌈",
	"🔥",
	"💥",
	"⛰️",
	"🏔️",
	"🌋",
	"🏜️",
	"🏝️",
	"🪨",
	"🪵",
	"🌰",
	"🍄",
	"🐚",
	"🐶",
	"🐱",
	"🐭",
	"🐹",
	"🐰",
	"🦊",
	"🐻",
	"🐼",
	"🐨",
	"🐯",
	"🦁",
	"🐮",
	"🐷",
	"🐸",
	"🐵",
	"🐔",
	"🐧",
	"🐦",
	"🐤",
	"🦆",
	"🦅",
	"🦉",
	"🐺",
	"🐗",
	"🐴",
	"🦄",
	"🐝",
	"🐛",
	"🦋",
	"🐌",
	"🐞",
	"🐜",
	"🐢",
	"🐍",
	"🐙",
	"🦑",
	"🦐",
	"🦞",
	"🦀",
	"🐡",
	"🐠",
	"🐟",
	"🐬",
	"🐳",
	"🐋",
	"🦈",
	"🐊",
	"🐅",
	"🐆",
	"🦓",
	"🦍",
	"🐘",
	"🦛",
	"🦏",
	"🐪",
	"🐫",
	"🦒",
	"🦘",
	"🦬",
	"🐃",
	"🐂",
	"🐄",
	"🐎",
	"🐖",
	"🐏",
	"🐑",
	"🦙",
	"🐐",
	"🦌",
	"🐕",
	"🐈",
	"🐓",
	"🦃",
	"🦚",
	"🦜",
	"🦢",
	"🦩",
	"🕊️",
	"🐇",
	"🦝",
	"🦨",
	"🦡",
	"🦫",
	"🦦",
	"🦥",
	"🐁",
	"🐀",
	"🦔",
	"📕",
	"📗",
	"📘",
	"📙",
	"📓",
	"📚",
	"💎",
	"🔮",
	"🎨",
	"🧵",
	"🧶",
	"☂️",
	"🎈",
	"🎀",
	"🎁",
	"📦",
	"🔑",
	"🧸",
	"🚗",
	"🚕",
	"🚙",
	"🚌",
	"🏎️",
	"🚓",
	"🚑",
	"🚒",
	"🚐",
	"🚚",
	"🚜",
	"🛵",
	"🚲",
	"🚁",
	"✈️",
	"🚀",
	"🛸",
	"⛵",
	"🚤",
	"🚢",
	"⚽",
	"🏀",
	"🏈",
	"⚾",
	"🎾",
	"🏐",
	"🎱",
	"🏉",
	"🥏",
	"🎯",
	"🎮",
	"🎲",
	"🧩",
	"🎭",
	"🎸",
	"🎹",
	"🎺",
	"🎻",
	"🥁",
	"🎷",
	"👶",
	"👧",
	"🧒",
	"👦",
	"👩",
	"🧑",
	"👨",
	"👵",
	"👴",
	"🧓",
	"🌕",
	"🌖",
	"🌗",
	"🌘",
	"🌑",
	"🌒",
	"🌓",
	"🌔",
	"☁️",
	"⛅",
	"🌤️",
	"⛈️",
	"🌧️",
	"🌩️",
	"🌫️",
	"🌃",
	"🌌",
	"🌉",
	"🏙️",
	"🌆",
	"🌇",
	"🗾",
	"🧿",
	"🌀",
	"🧊",
	"🧼",
	"🦴",
	"🦷",
	"👀",
	"🧠",
	"🫀",
	"🫁",
	"🩸",
	"🧣",
	"🧤",
	"🧥",
	"👔",
	"👕",
	"👖",
	"👗",
	"👘",
	"🥻",
	"🩱",
	"🩳",
	"👙",
	"👚",
	"👛",
	"👜",
	"👝",
	"🎒",
	"👞",
	"👟",
	"🥾",
	"🥿",
	"👠",
	"👡",
	"🩰",
	"👢",
	"👑",
	"👒",
	"🎩",
	"🎓",
	"🧢",
	"⛑️",
	"💄",
	"💍",
	"💼",
	"🧱",
	"🪟",
	"🪞",
	"🪑",
	"🚪",
	"🛏️",
	"🛋️",
	"🚽",
	"🚿",
	"🛁",
	"🧴",
	"🧷",
	"🧹",
	"🧺",
	"🧻",
	"🪣",
	"🧽",
	"🧯",
	"🛢️",
	"💸",
	"💵",
	"💴",
	"💶",
	"💷",
	"🪙",
	"⚙️",
	"🔧",
	"🔨",
	"🪓",
	"⛏️",
	"🛠️",
	"🗡️",
	"⚔️",
	"🛡️",
	"🔫",
	"🏹",
	"💣",
	"🧨",
	"🪓",
	"🪵",
	"🪦",
	"⚱️",
	"🗿",
	"🪧",
	"📷",
	"📹",
	"💻",
	"🖥️",
	"🖨️",
	"⌨️",
	"🖱️",
	"💽",
	"💾",
	"💿",
	"📀",
	"☎️",
	"📞",
	"📟",
	"📠",
	"📺",
	"📻",
	"🎙️",
	"⏰",
	"⏱️",
	"⏲️",
	"🕰️",
	"⌛",
	"⏳",
	"📡",
	"🔋",
	"🔌",
	"💡",
	"🔦",
	"🕯️",
	"🪔",
	"🧯",
	"🛢️",
	"💰",
	"🪙",
	"⚖️",
	"🪜",
	"🪝",
	"🧰",
	"🧲",
	"🧪",
	"🧫",
	"🧬",
	"🔬",
	"🔭",
	"📡",
	"💉",
	"🩸",
	"💊",
	"🩹",
	"🩺",
	"🚪",
	"🪞",
	"🪟",
	"🛏️",
	"🛋️",
	"🪑",
	"🚽",
	"🚿",
	"🛁",
	"🧺",
	"🧻",
	"🪥",
	"🧹",
	"🪣",
	"🧼",
	"🫧",
	"🧽",
	"🧯",
	"🛒",
	"🚬",
	"⚰️",
	"🪦",
	"⚱️",
	"🗿",
	"🪧",
	"🪪"
];
var EMOJI_FONT = "\"Apple Color Emoji\", \"Segoe UI Emoji\", \"Noto Color Emoji\", \"Twemoji Mozilla\", sans-serif";
var SVG_CLIP_MS = 24e3;
var SVG_DENSITY_STEPS = [
	32,
	48,
	64,
	80,
	96
];
function u8ToB64(bytes) {
	const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes.buffer, bytes.byteOffset, bytes.byteLength);
	let bin = "";
	const chunk = 32768;
	for (let i = 0; i < view.length; i += chunk) bin += String.fromCharCode(...view.subarray(i, i + chunk));
	return btoa(bin);
}
function b64ToU8(b64) {
	const bin = atob(b64);
	const out = new Uint8ClampedArray(bin.length);
	for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
	return out;
}
function paletteFor(frames) {
	const seen = /* @__PURE__ */ new Map();
	const pal = [" "];
	seen.set(" ", 0);
	for (const frame of frames) for (const glyph of frame.glyphs) {
		const g = glyph || " ";
		if (!seen.has(g)) {
			seen.set(g, pal.length);
			pal.push(g);
			if (pal.length >= 255) return pal;
		}
	}
	return pal;
}
function indexBytes(frames, pal) {
	const map = new Map(pal.map((g, i) => [g, i]));
	const first = frames[0];
	const n = first.cols * first.rows;
	const out = new Uint8Array(n * frames.length);
	frames.forEach((frame, f) => {
		const o = f * n;
		for (let i = 0; i < n; i++) out[o + i] = map.get(frame.glyphs[i] || " ") ?? 0;
	});
	return out;
}
function packReelFrames(frames, fps = 8) {
	const first = frames[0];
	if (!first) return "{}";
	const pal = paletteFor(frames);
	const rgb = new Uint8ClampedArray(first.cols * first.rows * 3 * frames.length);
	frames.forEach((frame, f) => {
		rgb.set(frame.colors, f * first.cols * first.rows * 3);
	});
	return JSON.stringify({
		v: 2,
		fps,
		cols: first.cols,
		rows: first.rows,
		pal,
		idx: u8ToB64(indexBytes(frames, pal)),
		rgb: u8ToB64(rgb)
	});
}
function unpackReelFrames(raw) {
	let data;
	try {
		data = JSON.parse(raw);
	} catch {
		return {
			frames: [],
			fps: 8
		};
	}
	const cols = Math.max(2, Number(data.cols) || 2);
	const rows = Math.max(2, Number(data.rows) || 2);
	const fps = Number(data.fps) || 8;
	if (data.pal && data.idx) {
		const pal = data.pal;
		const idx = b64ToU8(data.idx);
		const rgb = data.rgb ? b64ToU8(data.rgb) : /* @__PURE__ */ new Uint8ClampedArray(0);
		const n = cols * rows;
		const count = Math.max(1, Math.floor(idx.length / n) || 1);
		const frames = [];
		for (let f = 0; f < count; f++) {
			const glyphs = [];
			const colors = new Uint8ClampedArray(n * 3);
			const o = f * n;
			for (let i = 0; i < n; i++) glyphs.push(pal[idx[o + i] ?? 0] ?? " ");
			if (rgb.length >= (f + 1) * n * 3) colors.set(rgb.subarray(f * n * 3, (f + 1) * n * 3));
			frames.push({
				cols,
				rows,
				glyphs,
				colors
			});
		}
		return {
			frames,
			fps
		};
	}
	const glyphs = Array.isArray(data.glyphs) ? data.glyphs : [];
	const colors = Array.isArray(data.colors) ? data.colors : [];
	return {
		frames: glyphs.map((g, i) => ({
			cols,
			rows,
			glyphs: Array.isArray(g) ? g : [],
			colors: colors[i] ? b64ToU8(colors[i]) : new Uint8ClampedArray(cols * rows * 3)
		})),
		fps
	};
}
function splitLine(line) {
	if (typeof Intl !== "undefined" && "Segmenter" in Intl) return [...new Intl.Segmenter("en", { granularity: "grapheme" }).segment(line)].map((part) => part.segment);
	return Array.from(line);
}
function stillFromEmojiText(text, cols, rows) {
	const lines = text.replace(/\r/g, "").split("\n");
	const glyphs = [];
	const width = Math.max(2, cols);
	const height = Math.max(2, rows);
	for (let y = 0; y < height; y++) {
		const row = splitLine(lines[y] || "");
		for (let x = 0; x < width; x++) glyphs.push(row[x] || " ");
	}
	return {
		cols: width,
		rows: height,
		glyphs,
		colors: new Uint8ClampedArray(width * height * 3)
	};
}
function framesFromSvgMarkup(svg) {
	const trim = (svg || "").replace(/^\uFEFF/, "").trim();
	if (!trim) return null;
	const tryPack = (raw) => {
		const pack = unpackReelFrames(raw);
		return pack.frames.length ? pack : null;
	};
	if (trim.startsWith("{")) return tryPack(trim);
	const cdata = trim.match(/id=["']reel["'][^>]*>\s*<!\[CDATA\[([\s\S]*?)\]\]>/i);
	if (cdata?.[1]) return tryPack(cdata[1].trim());
	const script = trim.match(/id=["']reel["'][^>]*>([\s\S]*?)<\/script>/i);
	if (script?.[1]) return tryPack(script[1].replace(/<!\[CDATA\[|\]\]>/g, "").trim());
	return null;
}
function escapeXml(value) {
	const amp = String.fromCharCode(38);
	return value.replace(/[&<>]/g, (ch) => {
		if (ch === "&") return `${amp}amp;`;
		if (ch === "<") return `${amp}lt;`;
		return `${amp}gt;`;
	});
}
function framesToAnimatedSvg(frames, fps = 8, cell = 44) {
	if (!frames.length) return "";
	const first = frames[0];
	const width = Math.max(1, first.cols * cell);
	const height = Math.max(1, first.rows * cell);
	const fontPx = Math.max(8, Math.floor(cell * .92));
	const n = frames.length;
	const pal = paletteFor(frames);
	const idx = u8ToB64(indexBytes(frames, pal));
	const rgb = new Uint8ClampedArray(first.cols * first.rows * 3 * n);
	frames.forEach((frame, f) => {
		rgb.set(frame.colors, f * first.cols * first.rows * 3);
	});
	const cells = [];
	for (let y = 0; y < first.rows; y++) for (let x = 0; x < first.cols; x++) {
		const i = y * first.cols + x;
		const r = first.colors[i * 3] ?? 0;
		const g = first.colors[i * 3 + 1] ?? 0;
		const b = first.colors[i * 3 + 2] ?? 0;
		const px = x * cell;
		const py = y * cell;
		const glyph = first.glyphs[i] || " ";
		cells.push(`<rect id="r${i}" x="${px}" y="${py}" width="${cell + .35}" height="${cell + .35}" fill="rgb(${r},${g},${b})"/>`, `<text id="g${i}" x="${(px + cell / 2).toFixed(2)}" y="${(py + cell / 2).toFixed(2)}">${escapeXml(glyph)}</text>`);
	}
	const payload = JSON.stringify({
		pal,
		idx,
		rgb: u8ToB64(rgb),
		cols: first.cols,
		rows: first.rows,
		fps,
		n
	}).replace(/]]>/g, "]]\\>");
	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">`,
		`<title>Emoji SVG reel</title>`,
		`<rect width="100%" height="100%" fill="#0c0b0a"/>`,
		`<style>text{font-family:${EMOJI_FONT};font-size:${fontPx}px;text-anchor:middle;dominant-baseline:central}</style>`,
		`<g id="grid">${cells.join("")}</g>`,
		`<script type="application/json" id="reel"><![CDATA[${payload}]]><\/script>`,
		`<script type="text/ecmascript"><![CDATA[(function(){var el=document.getElementById("reel");if(!el)return;var d=JSON.parse(el.textContent||"{}");var pal=d.pal||[" "];var cols=+d.cols||1,rows=+d.rows||1,fps=+d.fps||8;var n=cols*rows;var idx=atob(d.idx||"");var rgb=atob(d.rgb||"");var frames=Math.max(1,Math.floor(idx.length/n));var rects=[],glyphs=[];for(var i=0;i<n;i++){rects[i]=document.getElementById("r"+i);glyphs[i]=document.getElementById("g"+i);}function paint(f){var o=f*n;for(var i=0;i<n;i++){if(glyphs[i])glyphs[i].textContent=pal[idx.charCodeAt(o+i)]||" ";if(rects[i]&&rgb.length){var k=(o+i)*3;rects[i].setAttribute("fill","rgb("+rgb.charCodeAt(k)+","+rgb.charCodeAt(k+1)+","+rgb.charCodeAt(k+2)+")");}}}var f=0;paint(0);if(frames<2)return;setInterval(function(){f=(f+1)%frames;paint(f);},Math.max(40,1000/fps));}());]]><\/script>`,
		`</svg>`
	].join("");
}
function toStandaloneSvg(raw, frames, fps = 8) {
	const trim = (raw || "").replace(/^\uFEFF/, "").trim();
	if (frames && frames.length >= 2) return framesToAnimatedSvg(frames, fps);
	if (trim.startsWith("{")) try {
		const unpacked = unpackReelFrames(trim);
		if (unpacked.frames.length) return framesToAnimatedSvg(unpacked.frames, unpacked.fps);
	} catch {}
	if (trim.startsWith("<?xml") || trim.startsWith("<svg")) return trim.replace(/^<\?xml[^?]*\?>\s*/i, "");
	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">`,
		`<rect width="100%" height="100%" fill="#0c0b0a"/>`,
		`<text x="32" y="34" text-anchor="middle" fill="#fff" font-size="12">svg</text>`,
		`</svg>`
	].join("");
}
function downloadSvg(svg, filename, frames, fps = 8) {
	const markup = toStandaloneSvg(svg, frames, fps);
	const name = filename.toLowerCase().endsWith(".svg") ? filename : `${filename}.svg`;
	const bytes = new TextEncoder().encode(markup);
	const blob = new Blob([bytes], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = name;
	a.rel = "noopener";
	a.style.display = "none";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 4e3);
}
var frameCache = /* @__PURE__ */ new Map();
function loadReelFrames(id) {
	let hit = frameCache.get(id);
	if (!hit) {
		hit = (async () => {
			const framesUrl = `/api/svg-reel?id=${encodeURIComponent(id)}&k=frames`;
			try {
				const res = await fetch(framesUrl);
				if (res.ok) {
					const pack = unpackReelFrames(await res.text());
					if (pack.frames.length) return pack;
				}
			} catch {}
			const svgRes = await fetch(`/api/svg-reel?id=${encodeURIComponent(id)}&k=file`);
			if (svgRes.ok) {
				const pack = framesFromSvgMarkup(await svgRes.text());
				if (pack?.frames.length) return pack;
			}
			throw new Error("missing");
		})();
		frameCache.set(id, hit);
		hit.catch(() => {
			frameCache.delete(id);
		});
	}
	return hit;
}
function paintReelFrame(ctx, frame, x, y, cell) {
	const w = Math.max(1, frame.cols * cell);
	const h = Math.max(1, frame.rows * cell);
	const sample = document.createElement("canvas");
	sample.width = frame.cols;
	sample.height = frame.rows;
	const sctx = sample.getContext("2d");
	if (sctx) {
		const img = sctx.createImageData(frame.cols, frame.rows);
		const n = frame.cols * frame.rows;
		for (let i = 0; i < n; i++) {
			img.data[i * 4] = frame.colors[i * 3] ?? 0;
			img.data[i * 4 + 1] = frame.colors[i * 3 + 1] ?? 0;
			img.data[i * 4 + 2] = frame.colors[i * 3 + 2] ?? 0;
			img.data[i * 4 + 3] = 255;
		}
		sctx.putImageData(img, 0, 0);
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(sample, x, y, w, h);
	}
	ctx.font = `${Math.max(8, Math.floor(cell * .92))}px ${EMOJI_FONT}`;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	for (let row = 0; row < frame.rows; row++) for (let col = 0; col < frame.cols; col++) {
		const glyph = frame.glyphs[row * frame.cols + col];
		if (!glyph) continue;
		ctx.fillText(glyph, x + (col + .5) * cell, y + (row + .5) * cell);
	}
}
function letterboxReelFrame(canvas, frame, outW, outH) {
	if (canvas.width !== outW || canvas.height !== outH) {
		canvas.width = outW;
		canvas.height = outH;
	}
	const ctx = canvas.getContext("2d");
	if (!ctx) return;
	ctx.fillStyle = "#0c0b0a";
	ctx.fillRect(0, 0, outW, outH);
	const cell = Math.max(1, Math.floor(Math.min(outW / frame.cols, outH / frame.rows)));
	const w = frame.cols * cell;
	const h = frame.rows * cell;
	paintReelFrame(ctx, frame, (outW - w) / 2, (outH - h) / 2, cell);
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/svg-reels-D4HEG8-k.js
var svg_reels_exports = /* @__PURE__ */ __exportAll({
	SVG_ID_RE: () => SVG_ID_RE,
	getSvgReel: () => getSvgReel,
	listSvgReels: () => listSvgReels,
	loadSvgFile: () => loadSvgFile,
	loadSvgFramesJson: () => loadSvgFramesJson,
	loadSvgPosterBytes: () => loadSvgPosterBytes,
	pinAllSvgReels: () => pinAllSvgReels,
	publishSvgReel: () => publishSvgReel,
	svgFileSrc: () => svgFileSrc,
	svgPosterSrc: () => svgPosterSrc
});
var SVG_ID_RE = /^svg-[a-f0-9]{12}$/;
function svgPosterSrc(id) {
	return `/api/svg-reel?id=${encodeURIComponent(id)}&k=poster`;
}
function svgFileSrc(id) {
	return `/api/svg-reel?id=${encodeURIComponent(id)}&k=file`;
}
async function ensureTable(sql) {
	await sql.query(`
    create table if not exists svg_reels (
      id text primary key,
      title text not null,
      cols integer not null,
      rows integer not null,
      fps integer not null default 8,
      frame_count integer not null default 0,
      emoji_text text not null default '',
      poster_jpeg text,
      svg_text text,
      frames_json text,
      pinata_svg_cid text,
      pinata_emoji_cid text,
      pinata_jpeg_cid text,
      pinata_frames_cid text,
      created_at timestamptz not null default now()
    )
  `);
}
async function pinAllSvgReels() {
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	await ensureTable(sql);
	const rows = await sql`
    select id, title, emoji_text, poster_jpeg, svg_text, frames_json,
           pinata_svg_cid, pinata_emoji_cid, pinata_jpeg_cid
    from svg_reels
  `;
	let pinned = 0;
	for (const row of rows) {
		if (row.pinata_svg_cid && row.pinata_jpeg_cid) continue;
		if (!isEmojiProcessed(row.emoji_text) || !row.poster_jpeg || !row.svg_text) continue;
		try {
			const { pinSvgReel } = await import("./pinata-t8BKVcr-.mjs");
			const pinata = await pinSvgReel({
				id: row.id,
				title: row.title,
				emojiText: row.emoji_text,
				jpeg: Buffer.from(row.poster_jpeg, "base64"),
				svg: Buffer.from(row.svg_text, "utf8"),
				frames: row.frames_json ? Buffer.from(row.frames_json, "utf8") : void 0
			});
			if (!pinata) continue;
			await sql`
        update svg_reels
        set pinata_svg_cid = ${pinata.svgCid ?? null},
            pinata_emoji_cid = ${pinata.emojiCid ?? null},
            pinata_jpeg_cid = ${pinata.jpegCid ?? null},
            pinata_frames_cid = ${pinata.framesCid ?? null}
        where id = ${row.id}
      `;
			pinned += 1;
		} catch {}
	}
	return pinned;
}
var listSvgReels = createServerFn({ method: "GET" }).handler(createSsrRpc("f154395f4dcd41884768fe623dcdc9fb28f72c2468f3e0fef930bd2eca82ad8f"));
var getSvgReel = createServerFn({ method: "GET" }).validator(object({ id: string() })).handler(createSsrRpc("2524d5ed1322f3a19060645b9ee77a4ad3173373fb7f392c0f8a32051abe623d"));
async function loadSvgPosterBytes(id) {
	if (!SVG_ID_RE.test(id)) return null;
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const row = (await (await getSql())`
    select poster_jpeg, pinata_jpeg_cid from svg_reels where id = ${id} limit 1
  `)[0];
	if (row?.poster_jpeg) return Buffer.from(row.poster_jpeg, "base64");
	if (row?.pinata_jpeg_cid) {
		const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
		return fetchPinataBytes(row.pinata_jpeg_cid);
	}
	return null;
}
async function loadSvgFile(id) {
	if (!SVG_ID_RE.test(id)) return null;
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const row = (await (await getSql())`
    select svg_text, pinata_svg_cid from svg_reels where id = ${id} limit 1
  `)[0];
	if (row?.svg_text) return row.svg_text;
	if (row?.pinata_svg_cid) {
		const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
		const bytes = await fetchPinataBytes(row.pinata_svg_cid);
		if (bytes) return bytes.toString("utf8");
	}
	return null;
}
async function loadSvgFramesJson(id) {
	if (!SVG_ID_RE.test(id)) return null;
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const row = (await (await getSql())`
    select frames_json, pinata_frames_cid, svg_text, pinata_svg_cid, emoji_text, cols, rows, fps
    from svg_reels where id = ${id} limit 1
  `)[0];
	if (!row) return null;
	const asJson = (raw) => {
		if (!raw) return null;
		const trim = raw.trim();
		if (!trim) return null;
		if (trim.startsWith("{")) {
			if (unpackReelFrames(trim).frames.length) return trim;
		}
		const fromSvg = framesFromSvgMarkup(trim);
		if (fromSvg?.frames.length) return packReelFrames(fromSvg.frames, fromSvg.fps);
		return null;
	};
	const local = asJson(row.frames_json);
	if (local) return local;
	if (row.pinata_frames_cid) try {
		const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
		const bytes = await fetchPinataBytes(row.pinata_frames_cid);
		const packed = asJson(bytes ? bytes.toString("utf8") : null);
		if (packed) return rememberFrames(id, packed);
	} catch {}
	const svgLocal = asJson(row.svg_text);
	if (svgLocal) return rememberFrames(id, svgLocal);
	if (row.pinata_svg_cid) try {
		const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
		const bytes = await fetchPinataBytes(row.pinata_svg_cid);
		const packed = asJson(bytes ? bytes.toString("utf8") : null);
		if (packed) return rememberFrames(id, packed);
	} catch {}
	if (row.emoji_text && row.cols && row.rows) return rememberFrames(id, packReelFrames([stillFromEmojiText(row.emoji_text, Number(row.cols), Number(row.rows))], Number(row.fps) || 8));
	return null;
}
async function rememberFrames(id, json) {
	if (!json || json.length > 8e6) return json;
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		await (await getSql())`update svg_reels set frames_json = ${json} where id = ${id} and (frames_json is null or length(frames_json) < 32)`;
	} catch {}
	return json;
}
var publishSvgReel = createServerFn({ method: "POST" }).validator(object({
	title: string().max(80).optional(),
	cols: number().int().min(2).max(256),
	rows: number().int().min(2).max(256),
	fps: number().int().min(2).max(24).optional(),
	frameCount: number().int().min(2).max(240).optional(),
	emojiText: string().min(1).max(9e5),
	imageJpeg: string().min(32).max(65e5),
	svg: string().min(32).max(16e6),
	framesJson: string().min(2).max(16e6).optional()
})).handler(createSsrRpc("aac0f526acb8e0a59ec6a56bfe89190c3c1060250e28bccf9423365e2f0682cd"));
//#endregion
export { letterboxReelFrame as _, loadSvgFramesJson as a, unpackReelFrames as b, svgFileSrc as c, EMOJI_FONT as d, EMOJI_GLYPHS as f, framesToAnimatedSvg as g, downloadSvg as h, loadSvgFile as i, svgPosterSrc as l, SVG_DENSITY_STEPS as m, getSvgReel as n, loadSvgPosterBytes as o, SVG_CLIP_MS as p, listSvgReels as r, publishSvgReel as s, SVG_ID_RE as t, svg_reels_exports as u, loadReelFrames as v, packReelFrames as y };
