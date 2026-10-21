//#region node_modules/.nitro/vite/services/ssr/assets/emoji-processed-DBxAIRLK.js
function isEmojiProcessed(text) {
	const compact = text.replace(/\s+/g, "");
	if (compact.length >= 4) return true;
	return compact.length > 0 && /[^\u0000-\u007F]/.test(compact);
}
//#endregion
export { isEmojiProcessed as t };
