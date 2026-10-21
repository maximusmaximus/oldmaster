import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { C as useRouter, w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as fanVideoSrc, i as fanImageSrc, m as setFanHidden } from "./fan-works-BMoXMERl.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { p as ArrowLeft } from "../_libs/lucide-react.mjs";
import { o as Route$13 } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { r as adminStatus } from "./admin-KgxjD2y0.mjs";
import { n as IpfsBadge, t as FanIpfsInfo } from "./ipfs-copy-Cnhc40SN.mjs";
import { i as grabClipMiddleFrame, t as MosaicExport } from "./clip-poster-DPXq7yeC.mjs";
import { t as ShareWork } from "./share-work-CWb2FJ1n.mjs";
import { t as SuggestedFans } from "./suggested-works-B1frGP5i.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fan._id-C18SpoIN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClipPlayer({ src, poster, title }) {
	const boxRef = (0, import_react.useRef)(null);
	const videoRef = (0, import_react.useRef)(null);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const toggle = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) video.play();
		else video.pause();
	};
	const goFull = () => {
		const box = boxRef.current;
		const video = videoRef.current;
		if (box && typeof box.requestFullscreen === "function") {
			box.requestFullscreen().catch(() => {
				video?.webkitEnterFullscreen?.();
			});
			return;
		}
		video?.webkitEnterFullscreen?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: boxRef,
		className: "relative bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
				ref: videoRef,
				src,
				poster,
				playsInline: true,
				preload: "metadata",
				"aria-label": title,
				className: "block w-full",
				onClick: toggle,
				onPlay: () => setPlaying(true),
				onPause: () => setPlaying(false),
				onEnded: () => setPlaying(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: toggle,
				"aria-label": playing ? "Pause" : "Play",
				className: cn("absolute top-1/2 left-1/2 z-10 flex size-[4.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-3xl text-fg shadow-lg transition-opacity duration-150", playing ? "opacity-0 hover:opacity-100 focus-visible:opacity-100" : "opacity-100"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					children: playing ? "⏸️" : "▶️"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: goFull,
				"aria-label": "Full screen",
				className: "absolute right-2.5 bottom-2.5 z-10 rounded-full bg-bg/80 px-2.5 py-1 text-sm font-bold text-fg",
				children: "⛶"
			})
		]
	});
}
function FanView() {
	const work = Route$13.useLoaderData();
	const router = useRouter();
	const src = fanImageSrc(work.id);
	const clip = work.kind === "clip" ? fanVideoSrc(work.id) : null;
	const [admin, setAdmin] = (0, import_react.useState)(false);
	const [hidden, setHidden] = (0, import_react.useState)(Boolean(work.hidden));
	const [hiding, setHiding] = (0, import_react.useState)(false);
	const [poster, setPoster] = (0, import_react.useState)(src);
	(0, import_react.useEffect)(() => {
		adminStatus().then((status) => setAdmin(status.admin));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!clip) return;
		let live = true;
		grabClipMiddleFrame(work.id).then((url) => {
			if (live && url) setPoster(url);
		});
		return () => {
			live = false;
		};
	}, [clip, work.id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-5xl px-4 pb-20 pt-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				search: { view: "fans" },
				className: "inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Gallery (Fans)"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-hidden rounded-xl bg-surface p-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-lg bg-surface-2",
						children: [clip ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipPlayer, {
							src: clip,
							poster,
							title: work.title
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: work.title,
							className: "block w-full"
						}), work.ipfs ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpfsBadge, { pins: work.ipfs }) : null]
					}), work.ipfs ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 break-all px-1 font-mono text-[11px] text-subtle",
						children: [work.kind === "clip" ? "🎬 " : "🖼️ ", work.ipfs.videoCid || work.ipfs.jpegCid || work.ipfs.emojiCid]
					}) : null]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold tracking-wide text-muted uppercase",
							children: [work.kind === "clip" ? "Fan clip" : "Fan work", hidden ? " · hidden" : ""]
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
								" emoji"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-col gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
									path: `/fan/${work.id}`,
									title: work.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanIpfsInfo, {
									pins: work.ipfs,
									kind: work.kind,
									workId: work.id,
									extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											work.id,
											" · ",
											work.cols,
											" × ",
											work.rows,
											work.kind === "clip" ? " · clip" : " · still"
										]
									})
								}),
								admin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									disabled: hiding,
									onClick: () => {
										setHiding(true);
										setFanHidden({ data: {
											id: work.id,
											hidden: !hidden
										} }).then(() => {
											setHidden(!hidden);
											router.invalidate();
										}).finally(() => setHiding(false));
									},
									children: hidden ? "Unhide this work" : "Hide this work"
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicExport, {
									name: work.title,
									emojiText: work.emojiText,
									jpegUrl: src,
									cover: work.kind === "clip"
								})
							]
						}),
						work.emojiText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
							className: "mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
								className: "cursor-pointer text-sm font-medium text-fg",
								children: "Emoji text"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "mt-3 max-h-64 overflow-auto rounded-lg bg-surface-2 p-3 text-[8px] leading-none break-all whitespace-pre",
								children: work.emojiText
							})]
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestedFans, { exclude: work.id })
		]
	});
}
//#endregion
export { FanView as component };
