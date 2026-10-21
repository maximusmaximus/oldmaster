import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as fanImageSrc } from "./fan-works-BMoXMERl.mjs";
import { t as cn } from "./utils-DYPYmvUL.mjs";
import { i as grabClipMiddleFrame } from "./clip-poster-DPXq7yeC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/clip-preview-BIW8wp1c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ClipPreview({ id, title, className }) {
	const fallback = fanImageSrc(id);
	const [src, setSrc] = (0, import_react.useState)(fallback);
	(0, import_react.useEffect)(() => {
		let live = true;
		setSrc(fallback);
		grabClipMiddleFrame(id).then((url) => {
			if (live && url) setSrc(url);
		});
		return () => {
			live = false;
		};
	}, [id, fallback]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: title,
		className: cn("h-full w-full object-cover", className)
	});
}
//#endregion
export { ClipPreview as t };
