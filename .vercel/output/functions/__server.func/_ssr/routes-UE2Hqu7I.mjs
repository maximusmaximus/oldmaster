import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as listFanWorks, i as fanImageSrc, m as setFanHidden, s as getFanWork } from "./fan-works-BMoXMERl.mjs";
import { b as unpackReelFrames, c as svgFileSrc, h as downloadSvg, r as listSvgReels } from "./svg-reels-D4HEG8-k.mjs";
import { n as shuffle, t as cn } from "./utils-DYPYmvUL.mjs";
import { i as Search } from "../_libs/lucide-react.mjs";
import { A as fileStem, D as downloadJpeg, F as artists, I as filterPlates, L as formatYear, M as mosaicToSvg, N as parseEmojiGrid, O as downloadText, R as plateCount, b as MosaicCanvas, v as Route$26, y as paintingSrc, z as plates } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as Input } from "./input-B6LEBlYf.mjs";
import { r as adminStatus } from "./admin-KgxjD2y0.mjs";
import { n as IpfsBadge, t as FanIpfsInfo } from "./ipfs-copy-Cnhc40SN.mjs";
import { t as MosaicExport } from "./clip-poster-DPXq7yeC.mjs";
import { t as ShareWork } from "./share-work-CWb2FJ1n.mjs";
import { t as ClipPreview } from "./clip-preview-BIW8wp1c.mjs";
import { n as asStamp, r as sortFanFeed, t as FAN_SORTS } from "./fan-feed-BD1dfKIp.mjs";
import { a as SvgReelPlayer, i as SvgIpfsLinks, l as downloadReelVideo, n as EncodeSpin, o as VideoEncodeWait } from "./svg-4k-MdUCP9xy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-UE2Hqu7I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FanCard({ work, admin = false, onHide }) {
	const [busy, setBusy] = (0, import_react.useState)(null);
	const stem = fileStem(work.title);
	const pins = work.ipfs || work.pins;
	const when = work.createdAt ? new Date(work.createdAt).toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric"
	}) : "";
	const onJpg = async () => {
		setBusy("jpg");
		try {
			const res = await fetch(fanImageSrc(work.id));
			if (!res.ok) return;
			const blob = await res.blob();
			const buf = new Uint8Array(await blob.arrayBuffer());
			let bin = "";
			for (let i = 0; i < buf.length; i += 32768) bin += String.fromCharCode(...buf.subarray(i, i + 32768));
			downloadJpeg(btoa(bin), `${stem}.jpg`);
		} finally {
			setBusy(null);
		}
	};
	const onSvgCover = async () => {
		setBusy("svg");
		try {
			const full = await getFanWork({ data: { id: work.id } });
			if (!full?.emojiText) return;
			const parsed = parseEmojiGrid(full.emojiText);
			downloadText(mosaicToSvg(parsed.glyphs, parsed.cols, parsed.rows), `${stem}-cover.svg`, "image/svg+xml;charset=utf-8");
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: cn("overflow-hidden rounded-xl bg-surface", work.hidden && "opacity-50"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/fan/$id",
			params: { id: work.id },
			className: "relative block aspect-square overflow-hidden bg-surface-2",
			children: [
				work.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipPreview, {
					id: work.id,
					title: work.title
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: fanImageSrc(work.id),
					alt: work.title,
					className: "h-full w-full object-cover"
				}),
				work.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-fg bg-bg/80 text-2xl text-fg",
					children: "▶️"
				}) : null,
				work.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute top-2.5 right-2.5 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg",
					children: "▶ clip"
				}) : null,
				pins ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IpfsBadge, { pins }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/fan/$id",
					params: { id: work.id },
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "line-clamp-2 font-sans text-sm font-semibold tracking-tight text-fg",
						children: [work.title, work.hidden ? " · hidden" : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: work.cols && work.rows ? `${work.cols} × ${work.rows}` : "Fan work"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-subtle",
							children: [
								" ",
								"· ",
								work.kind === "clip" ? "clip" : "still",
								when ? ` · ${when}` : ""
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
					path: `/fan/${work.id}`,
					title: work.title,
					compact: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "h-11 flex-1 px-2 text-xs",
						disabled: busy === "jpg",
						onClick: () => void onJpg(),
						children: busy === "jpg" ? "…" : work.kind === "clip" ? "JPG cover" : "JPG"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "h-11 flex-1 px-2 text-xs",
						disabled: busy === "svg",
						onClick: () => void onSvgCover(),
						children: busy === "svg" ? "…" : work.kind === "clip" ? "SVG cover" : "SVG"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanIpfsInfo, {
					pins,
					kind: work.kind,
					workId: work.id,
					extra: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "break-all text-[11px] text-muted",
						children: [work.id, when ? ` · ${when}` : ""]
					})
				}),
				admin && onHide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					className: "h-8 w-full",
					onClick: () => onHide(work.id, !work.hidden),
					children: work.hidden ? "Unhide" : "Hide"
				}) : null
			]
		})]
	});
}
function GalleryCard({ plate, eager = false }) {
	const canvasRef = (0, import_react.useRef)(null);
	const [grid, setGrid] = (0, import_react.useState)(null);
	const onRendered = (0, import_react.useCallback)((info, canvas) => {
		setGrid(info);
		canvasRef.current = canvas;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "relative aspect-square overflow-hidden rounded-xl bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/plate/$slug",
			params: { slug: plate.slug },
			className: "absolute inset-0 block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicCanvas, {
				src: paintingSrc(plate.source_image_url, 320),
				density: 20,
				eager,
				label: `${plate.title} as an emoji mosaic`,
				fallbackRatio: plate.orientation === "portrait" ? 3 / 4 : 4 / 3,
				onRendered,
				loader: "card",
				fill: true,
				className: "h-full bg-transparent"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 pt-2 pb-2.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/plate/$slug",
				params: { slug: plate.slug },
				className: "block min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg",
					children: plate.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 line-clamp-1 text-xs text-muted",
					children: [plate.artist, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-subtle",
						children: [" · ", formatYear(plate.year)]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicExport, {
					name: plate.title,
					grid,
					canvas: canvasRef.current,
					compact: true
				})
			})]
		})]
	});
}
function SvgReelCard({ work }) {
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const onSvg = async () => {
		setBusy("svg");
		setError(null);
		try {
			const [svgRes, frameRes] = await Promise.all([fetch(svgFileSrc(work.id)), fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`).catch(() => null)]);
			if (!svgRes.ok) throw new Error("missing");
			const svg = await svgRes.text();
			let frames;
			if (frameRes && frameRes.ok) try {
				frames = unpackReelFrames(await frameRes.text()).frames;
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
			const res = await fetch(`/api/svg-reel?id=${encodeURIComponent(work.id)}&k=frames`);
			if (!res.ok) throw new Error("missing");
			const json = await res.text();
			const { frames, fps } = unpackReelFrames(json);
			if (frames.length < 2) throw new Error("short");
			await downloadReelVideo(frames, work.title, fps, size);
		} catch {
			setError(`Could not build ${size.toUpperCase()}. Try again.`);
		} finally {
			setBusy(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgReelPlayer, {
					id: work.id,
					title: work.title
				}),
				busy === "4k" || busy === "8k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoEncodeWait, {
					size: busy,
					compact: true
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute top-2.5 left-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-[10px] font-semibold tracking-wide text-fg uppercase",
					children: "Experimental"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pointer-events-none absolute top-2.5 right-2.5 z-10 rounded-full bg-bg/80 px-2 py-1 text-xs font-medium text-fg",
					children: "📄 SVG"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/svg/$id",
					params: { id: work.id },
					className: "block min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg",
						children: work.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-0.5 text-xs text-muted tabular-nums",
						children: [
							"Experimental · ",
							work.cols,
							" × ",
							work.rows,
							" · ",
							work.frameCount,
							" frames"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
							path: `/svg/${work.id}`,
							title: work.title,
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "h-11 px-2 text-xs",
							disabled: busy === "svg",
							onClick: () => void onSvg(),
							children: busy === "svg" ? "…" : "SVG"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "h-11 px-2 text-xs",
							disabled: busy === "4k" || busy === "8k",
							onClick: () => void onVideo("4k"),
							children: busy === "4k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, { className: "mr-1" }), "4K"] }) : "4K"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "h-11 px-2 text-xs",
							disabled: busy === "4k" || busy === "8k",
							onClick: () => void onVideo("8k"),
							children: busy === "8k" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EncodeSpin, { className: "mr-1" }), "8K"] }) : "8K"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgIpfsLinks, {
							pins: work.ipfs,
							compact: true
						})
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-headline",
					children: error
				}) : null
			]
		})]
	});
}
function columnCount(width) {
	if (width >= 1280) return 5;
	if (width >= 1024) return 4;
	if (width >= 640) return 2;
	return 1;
}
function VirtualGrid({ items, render, overscan = 3 }) {
	const ref = (0, import_react.useRef)(null);
	const [cols, setCols] = (0, import_react.useState)(1);
	const [range, setRange] = (0, import_react.useState)({
		start: 0,
		end: 12
	});
	const [rowH, setRowH] = (0, import_react.useState)(320);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const measure = () => {
			const width = el.clientWidth || window.innerWidth;
			const nextCols = columnCount(width);
			setCols(nextCols);
			const gap = width >= 640 ? 16 : 12;
			const cell = Math.max(160, (width - gap * (nextCols - 1)) / nextCols);
			setRowH(cell + gap);
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const update = () => {
			const top = el.getBoundingClientRect().top + window.scrollY;
			const viewTop = window.scrollY;
			const viewBottom = viewTop + window.innerHeight;
			const startRow = Math.max(0, Math.floor((viewTop - top) / rowH) - overscan);
			const endRow = Math.ceil((viewBottom - top) / rowH) + overscan;
			const start = startRow * cols;
			const end = Math.min(items.length, Math.max(start + cols, endRow * cols));
			setRange((prev) => prev.start === start && prev.end === end ? prev : {
				start,
				end
			});
		};
		update();
		window.addEventListener("scroll", update, { passive: true });
		window.addEventListener("resize", update);
		return () => {
			window.removeEventListener("scroll", update);
			window.removeEventListener("resize", update);
		};
	}, [
		cols,
		rowH,
		items.length,
		overscan
	]);
	const start = Math.min(range.start, items.length);
	const end = Math.min(range.end, items.length);
	const padTop = Math.floor(start / cols) * rowH;
	const rowsAfter = Math.ceil((items.length - end) / cols);
	const padBottom = Math.max(0, rowsAfter * rowH);
	const slice = items.slice(start, end);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		style: {
			paddingTop: padTop,
			paddingBottom: padBottom
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5",
			children: slice.map((item, i) => render(item, start + i))
		})
	});
}
function Gallery() {
	const { view } = Route$26.useSearch();
	const isFans = view === "fans";
	const [q, setQ] = (0, import_react.useState)("");
	const [artist, setArtist] = (0, import_react.useState)("");
	const [deck, setDeck] = (0, import_react.useState)(() => shuffle(plates));
	const shown = (0, import_react.useMemo)(() => filterPlates(deck, q, artist), [
		deck,
		q,
		artist
	]);
	const [fans, setFans] = (0, import_react.useState)(null);
	const [fansError, setFansError] = (0, import_react.useState)(false);
	const [admin, setAdmin] = (0, import_react.useState)(false);
	const [fanSort, setFanSort] = (0, import_react.useState)("shuffle");
	(0, import_react.useEffect)(() => {
		if (isFans) return;
		setDeck(shuffle(plates));
	}, [isFans]);
	(0, import_react.useEffect)(() => {
		if (!isFans) return;
		let live = true;
		setFansError(false);
		adminStatus().then((status) => {
			if (live) setAdmin(status.admin);
		});
		Promise.all([listFanWorks(), listSvgReels()]).then(([works, reels]) => {
			if (!live) return;
			const mixed = [...works.map((data) => ({
				type: "fan",
				data: {
					...data,
					createdAt: asStamp(data.createdAt)
				}
			})), ...reels.map((data) => ({
				type: "svg",
				data: {
					...data,
					createdAt: asStamp(data.createdAt)
				}
			}))];
			setFans(shuffle(mixed));
		}).catch(() => {
			if (live) {
				setFans([]);
				setFansError(true);
			}
		});
		return () => {
			live = false;
		};
	}, [isFans]);
	const hideFan = async (id, hidden) => {
		setFans((rows) => rows ? rows.map((row) => row.type === "fan" && row.data.id === id ? {
			...row,
			data: {
				...row.data,
				hidden
			}
		} : row) : rows);
		try {
			await setFanHidden({ data: {
				id,
				hidden
			} });
		} catch {
			setFans((rows) => rows ? rows.map((row) => row.type === "fan" && row.data.id === id ? {
				...row,
				data: {
					...row.data,
					hidden: !hidden
				}
			} : row) : rows);
		}
	};
	const shownFans = (0, import_react.useMemo)(() => {
		if (!fans) return null;
		try {
			return sortFanFeed(fans, fanSort);
		} catch {
			return fans;
		}
	}, [fans, fanSort]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					isFans ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold tracking-wide text-muted uppercase",
						children: "Gallery · Fans"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: cn("font-sans text-3xl font-bold tracking-tight text-headline sm:text-4xl", isFans && "mt-2"),
						children: isFans ? "Emoji New Masters, from the crowd" : "Public-domain paintings, remade as live emoji mosaics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-base leading-relaxed text-muted",
						children: isFans ? "Stills, camera clips, and experimental SVG reels live here — mosaics, video, and emoji text, pinned to IPFS." : "Each plate is sampled in the browser and rebuilt as color-emoji glyphs — not a pre-baked image. Open a work to change density."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex w-fit rounded-lg border border-border bg-surface p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: {},
						className: cn("inline-flex h-10 items-center rounded-md px-4 text-sm font-semibold transition-[background-color,color] duration-150", !isFans ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
						children: "Masters"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						search: { view: "fans" },
						className: cn("inline-flex h-10 items-center rounded-md px-4 text-sm font-semibold transition-[background-color,color] duration-150", isFans ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"),
						children: "Fans"
					})]
				}), isFans ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sr-only",
						children: "Sort fan works"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: fanSort,
						onChange: (e) => {
							const next = e.target.value;
							setFanSort(next);
							if (next === "shuffle") setFans((rows) => rows ? shuffle(rows) : rows);
						},
						className: "h-12 rounded-md border border-border bg-surface px-3 text-sm font-semibold text-fg transition-[box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
						children: FAN_SORTS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: option.value,
							children: option.label
						}, option.value))
					})]
				}) : null]
			}),
			!isFans ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "relative block min-w-0 flex-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Search plates"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search title, artist, or year",
								className: "pl-10"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block sm:w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Filter by artist"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: artist,
							onChange: (e) => setArtist(e.target.value),
							className: "h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg transition-[box-shadow] duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:outline-none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "All artists"
							}), artists.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: name,
								children: name
							}, name))]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-subtle tabular-nums",
					children: shown.length === plateCount ? `${shown.length} works` : `${shown.length} of ${plateCount}`
				}),
				shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-center text-muted",
					children: "No plates match that search. Try a different artist or title."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VirtualGrid, {
						items: shown,
						render: (plate, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GalleryCard, {
							plate,
							eager: i < 8
						}, plate.slug)
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: shownFans === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Loading fan works…"
			}) : fansError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10 text-sm text-muted",
				children: "Couldn’t load fan works. Try again in a moment."
			}) : shownFans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16 max-w-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted",
					children: "No fan stills, clips, or experimental SVG reels yet. Upload a picture or record a reel, share it, and it lands here."
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5",
				children: shownFans.map((item) => item.type === "svg" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgReelCard, { work: item.data }, item.data.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanCard, {
					work: item.data,
					admin,
					onHide: (id, hidden) => void hideFan(id, hidden)
				}, item.data.id))
			}) })
		]
	});
}
//#endregion
export { Gallery as component };
