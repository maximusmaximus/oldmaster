import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DYPYmvUL.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function shuffle(list) {
	const next = [...list];
	for (let i = next.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const a = next[i];
		next[i] = next[j];
		next[j] = a;
	}
	return next;
}
//#endregion
export { shuffle as n, cn as t };
