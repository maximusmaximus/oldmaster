import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as unpackReelFrames, c as svgFileSrc, h as downloadSvg } from "./svg-reels-D4HEG8-k.mjs";
import { p as ArrowLeft } from "../_libs/lucide-react.mjs";
import { A as fileStem, r as Route$10 } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as ShareWork } from "./share-work-CWb2FJ1n.mjs";
import { a as SvgReelPlayer, i as SvgIpfsLinks, l as downloadReelVideo, n as EncodeSpin, o as VideoEncodeWait } from "./svg-4k-MdUCP9xy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/svg._id-Dx4ek9-c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SvgReelView() {
	const work = Route$10.useLoaderData();
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const seedFrames = work.framesJson ? unpackReelFrames(work.framesJson).frames : void 0;
	const onSvg = async () => {
		setBusy("svg");
		setError(null);
		try {
			const svg = work.svg ?? await (await fetch(svgFileSrc(work.id))).text();
			let frames = work.framesJson ? unpackReelFrames(work.framesJson).frames : void 0;
			if (!frames) try {
				const json = await (await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`)).text();
				frames = unpackReelFrames(json).frames;
			} catch {
				frames = void 0;
			}
			downloadSvg(svg, `${fileStem(work.title)}.svg`, frames);
		} catch {
			setError("Could not download that SVG.");
		} finally {
			setBusy(null);
		}
	};
	const onVideo = async (size) => {
		setBusy(size);
		setError(null);
		try {
			const json = work.framesJson ?? await (await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`)).text();
			const { frames, fps } = unpackReelFrames(json);
			await downloadReelVideo(frames, work.title, fps, size);
		} catch {
			setError(`Could not build ${size.toUpperCase()} video.`);
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/",
			search: { view: "fans" },
			className: "inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Gallery (Fans)"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl bg-surface p-1.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-lg bg-surface-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgReelPlayer, {
						id: work.id,
						title: work.title,
						frames: seedFrames,
						fps: work.fps,
						autoPlay: true,
						className: "aspect-square w-full"
					}), busy === "4k" || busy === "8k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoEncodeWait, { size: busy }) : null]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "lg:sticky lg:top-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-wide text-muted uppercase",
						children: "Experimental · SVG reel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-sans text-3xl font-bold tracking-tight text-headline",
						children: work.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-subtle tabular-nums",
						children: [
							work.cols,
							" × ",
							work.rows,
							" · ",
							work.frameCount,
							" frames"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
								path: `/svg/${work.id}`,
								title: work.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: busy === "svg",
								onClick: () => void onSvg(),
								children: busy === "svg" ? "Downloading…" : "Download SVG"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: busy === "4k" || busy === "8k",
								onClick: () => void onVideo("4k"),
								children: busy === "4k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, {}), " Building 4K…"]
								}) : "Download 4K video"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								disabled: busy === "4k" || busy === "8k",
								onClick: () => void onVideo("8k"),
								children: busy === "8k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, {}), " Building 8K…"]
								}) : "Download 8K video"
							}),
							work.ipfs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIpfsLinks, { pins: work.ipfs }) : null,
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-headline",
								children: error
							}) : null
						]
					})
				]
			})]
		})]
	});
}
//#endregion
export { SvgReelView as component };
