import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { l as ExternalLink, p as ArrowLeft } from "../_libs/lucide-react.mjs";
import { B as suggestedPlates, L as formatYear, b as MosaicCanvas, i as Route$11, y as paintingSrc } from "./router-ByA-bRxH.mjs";
import { t as Button } from "./button-Bw-0zTMy.mjs";
import { t as MosaicExport } from "./clip-poster-DPXq7yeC.mjs";
import { t as ShareWork } from "./share-work-CWb2FJ1n.mjs";
import { n as SuggestedPlates } from "./suggested-works-B1frGP5i.mjs";
import { t as DensityControl } from "./density-control-CjeO0SOG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plate._slug-Ba4O-Elr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlateView() {
	const plate = Route$11.useLoaderData();
	const [density, setDensity] = (0, import_react.useState)(64);
	const [grid, setGrid] = (0, import_react.useState)(null);
	const [showSource, setShowSource] = (0, import_react.useState)(false);
	const [rebuilding, setRebuilding] = (0, import_react.useState)(true);
	const canvasRef = (0, import_react.useRef)(null);
	const onRendered = (0, import_react.useCallback)((info, canvas) => {
		setGrid(info);
		canvasRef.current = canvas;
		setRebuilding(false);
	}, []);
	const src = paintingSrc(plate.source_image_url, 1200);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "inline-flex h-11 items-center gap-2 text-sm text-muted transition-[color] duration-150 hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Gallery"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.7fr)] lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-xl bg-surface p-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-lg bg-surface-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicCanvas, {
							src,
							density,
							eager: true,
							label: `${plate.title} as an emoji mosaic`,
							fallbackRatio: plate.orientation === "portrait" ? 3 / 4 : 4 / 3,
							onRendered,
							className: showSource ? "invisible" : void 0
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: `Original painting: ${plate.title}`,
							className: cn("absolute inset-0 z-10 h-full w-full object-contain", showSource ? "opacity-100" : "pointer-events-none opacity-0")
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: plate.artist
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-1 font-sans text-3xl font-bold tracking-tight text-headline",
							children: plate.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-subtle",
							children: formatYear(plate.year)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DensityControl, {
								value: density,
								onChange: (next) => {
									setRebuilding(true);
									setDensity(next);
								},
								cols: grid?.cols,
								rows: grid?.rows,
								busy: rebuilding
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: showSource ? "default" : "outline",
								size: "sm",
								onClick: () => setShowSource((v) => !v),
								children: showSource ? "Show mosaic" : "Show original"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareWork, {
								path: `/plate/${plate.slug}`,
								title: `${plate.title} — EMOJI OLD MASTERS`,
								text: `${plate.title} by ${plate.artist}, remade as an emoji mosaic.`
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicExport, {
								name: plate.title,
								grid,
								canvas: canvasRef.current
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-8 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "License"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5 text-muted",
									children: plate.license
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Source"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-0.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: plate.commons_page,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1.5 text-fg underline decoration-border underline-offset-4 transition-[decoration-color] duration-150 hover:decoration-fg",
										children: ["Wikimedia Commons", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
									})
								})] }),
								grid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Glyphs"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "mt-0.5 tabular-nums text-muted",
									children: [grid.cells.toLocaleString(), " emoji cells"]
								})] })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuggestedPlates, { plates: suggestedPlates(plate) })
		]
	});
}
//#endregion
export { PlateView as component };
