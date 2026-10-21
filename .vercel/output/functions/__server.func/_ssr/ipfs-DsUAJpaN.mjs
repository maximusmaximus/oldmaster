//#region node_modules/.nitro/vite/services/ssr/assets/ipfs-DsUAJpaN.js
var IPFS_GATEWAY_HOST = "emoji.mypinata.cloud";
var IPFS_PUBLIC_GATEWAY = "https://gateway.pinata.cloud/ipfs";
function ipfsUri(cid) {
	return `ipfs://${cid}`;
}
function ipfsGatewayUrl(cid) {
	return `https://${IPFS_GATEWAY_HOST}/ipfs/${cid}`;
}
function ipfsOpenUrl(cid) {
	return `${IPFS_PUBLIC_GATEWAY}/${cid}`;
}
function primaryCid(pins) {
	return pins.svgCid || pins.videoCid || pins.jpegCid || pins.emojiCid || pins.framesCid || "";
}
function mediaCid(pins) {
	return pins.videoCid || pins.jpegCid || pins.svgCid || pins.emojiCid || pins.framesCid || "";
}
function hasPins(pins) {
	return Boolean(pins && primaryCid(pins));
}
function mergePins(a, b) {
	const pins = {
		emojiCid: a?.emojiCid || b?.emojiCid,
		jpegCid: a?.jpegCid || b?.jpegCid,
		videoCid: a?.videoCid || b?.videoCid,
		svgCid: a?.svgCid || b?.svgCid,
		framesCid: a?.framesCid || b?.framesCid
	};
	return hasPins(pins) ? pins : null;
}
//#endregion
export { mediaCid as a, ipfsUri as i, ipfsGatewayUrl as n, mergePins as o, ipfsOpenUrl as r, primaryCid as s, hasPins as t };
