import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as listFanWorks, i as fanImageSrc } from "./fan-works-BMoXMERl.mjs";
import { L as formatYear, b as MosaicCanvas, y as paintingSrc } from "./router-ByA-bRxH.mjs";
import { t as ClipPreview } from "./clip-preview-BIW8wp1c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suggested-works-B1frGP5i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PlateSuggestCard({ plate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/plate/$slug",
		params: { slug: plate.slug },
		className: "group relative aspect-square overflow-hidden rounded-xl bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MosaicCanvas, {
			src: paintingSrc(plate.source_image_url, 320),
			density: 20,
			label: `${plate.title} as an emoji mosaic`,
			fallbackRatio: plate.orientation === "portrait" ? 3 / 4 : 4 / 3,
			loader: "card",
			fill: true,
			className: "h-full bg-transparent"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg",
				children: plate.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-0.5 line-clamp-1 text-xs text-muted",
				children: [plate.artist, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-subtle",
					children: [" · ", formatYear(plate.year)]
				})]
			})]
		})]
	});
}
function FanSuggestCard({ work }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/fan/$id",
		params: { id: work.id },
		className: "group relative aspect-square overflow-hidden rounded-xl bg-surface",
		children: [work.kind === "clip" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipPreview, {
			id: work.id,
			title: work.title
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: fanImageSrc(work.id),
			alt: work.title,
			className: "h-full w-full object-cover"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute inset-x-0 bottom-0 z-10 bg-bg/70 px-2.5 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "line-clamp-1 font-sans text-sm font-semibold tracking-tight text-fg",
				children: work.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted tabular-nums",
				children: work.cols && work.rows ? `${work.cols} × ${work.rows}` : "Fan work"
			})]
		})]
	});
}
function SuggestedPlates({ plates }) {
	if (!plates.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-sans text-lg font-bold tracking-tight text-headline",
			children: "More to explore"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6",
			children: plates.map((plate) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlateSuggestCard, { plate }, plate.slug))
		})]
	});
}
function SuggestedFans({ exclude }) {
	const [works, setWorks] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		let live = true;
		listFanWorks().then((list) => {
			if (!live) return;
			setWorks(list.filter((w) => w.id !== exclude).slice(0, 6));
		});
		return () => {
			live = false;
		};
	}, [exclude]);
	if (!works.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-sans text-lg font-bold tracking-tight text-headline",
			children: "More to explore"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-6",
			children: works.map((work) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FanSuggestCard, { work }, work.id))
		})]
	});
}
//#endregion
export { SuggestedPlates as n, SuggestedFans as t };
