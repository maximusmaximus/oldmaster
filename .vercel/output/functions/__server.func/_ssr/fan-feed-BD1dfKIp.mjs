//#region node_modules/.nitro/vite/services/ssr/assets/fan-feed-BD1dfKIp.js
var FAN_SORTS = [
	{
		value: "shuffle",
		label: "Shuffle"
	},
	{
		value: "newest",
		label: "Newest"
	},
	{
		value: "oldest",
		label: "Oldest"
	},
	{
		value: "title",
		label: "Title A–Z"
	},
	{
		value: "emoji",
		label: "Most emoji"
	},
	{
		value: "clips",
		label: "Clips first"
	}
];
function asText(value) {
	if (value == null) return "";
	if (typeof value === "string") return value;
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString();
	return String(value);
}
function asStamp(value) {
	if (value instanceof Date) return Number.isNaN(value.getTime()) ? "" : value.toISOString();
	if (typeof value === "number" && Number.isFinite(value)) {
		const ms = value > 0 && value < 0xe8d4a51000 ? value * 1e3 : value;
		const date = new Date(ms);
		return Number.isNaN(date.getTime()) ? "" : date.toISOString();
	}
	if (typeof value === "string") {
		const trimmed = value.trim();
		if (!trimmed) return "";
		const date = new Date(trimmed);
		return Number.isNaN(date.getTime()) ? trimmed : date.toISOString();
	}
	return "";
}
function asCount(value) {
	const n = Number(value);
	return Number.isFinite(n) ? n : 0;
}
function feedCreated(item) {
	return asStamp(item.data.createdAt);
}
function feedTitle(item) {
	return asText(item.data.title);
}
function feedEmoji(item) {
	return asCount(item.data.cols) * asCount(item.data.rows);
}
function feedIsClip(item) {
	return item.type === "svg" || item.data.kind === "clip";
}
function cmpText(a, b) {
	return a.localeCompare(b);
}
function sortFanFeed(rows, sort) {
	const copy = [...rows];
	if (sort === "newest") return copy.sort((a, b) => cmpText(feedCreated(b), feedCreated(a)));
	if (sort === "oldest") return copy.sort((a, b) => cmpText(feedCreated(a), feedCreated(b)));
	if (sort === "title") return copy.sort((a, b) => cmpText(feedTitle(a), feedTitle(b)) || cmpText(feedCreated(b), feedCreated(a)));
	if (sort === "emoji") return copy.sort((a, b) => feedEmoji(b) - feedEmoji(a));
	if (sort === "clips") return copy.sort((a, b) => Number(feedIsClip(b)) - Number(feedIsClip(a)) || cmpText(feedCreated(b), feedCreated(a)));
	return copy;
}
//#endregion
export { asStamp as n, sortFanFeed as r, FAN_SORTS as t };
