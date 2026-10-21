import { n as ipfsGatewayUrl } from "./ipfs-DsUAJpaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pinata-t8BKVcr-.js
async function readSecret(name) {
	if (typeof window !== "undefined") return "";
	try {
		const { readFile } = await import("node:fs/promises");
		const raw = await readFile(`/workspace/.grok/secrets/${name}`, "utf8");
		if (raw.trim()) return raw.trim();
	} catch {}
	return "";
}
async function pinataJwt() {
	const file = await readSecret("pinata-jwt");
	if (file) return file;
	return typeof process !== "undefined" && (process.env.PINATA_JWT || process.env.PINATA_TOKEN || "") || "";
}
async function pinataKeyPair() {
	return {
		key: await readSecret("pinata-api-key") || (typeof process !== "undefined" ? process.env.PINATA_API_KEY || "" : ""),
		secret: await readSecret("pinata-api-secret") || (typeof process !== "undefined" ? process.env.PINATA_SECRET_API_KEY || "" : "")
	};
}
function authHeaders(token, pair) {
	if (token) return { Authorization: `Bearer ${token}` };
	if (pair.key && pair.secret) return {
		pinata_api_key: pair.key,
		pinata_secret_api_key: pair.secret
	};
	return {};
}
async function gatewayToken() {
	const file = await readSecret("pinata-gateway-token");
	if (file) return file;
	return typeof process !== "undefined" && process.env.PINATA_GATEWAY_TOKEN || "";
}
async function pinataUploadFile(input) {
	const token = await pinataJwt();
	const pair = await pinataKeyPair();
	if (!token && !(pair.key && pair.secret)) return null;
	const copy = Buffer.from(input.bytes);
	const blob = new Blob([copy], { type: input.mime });
	const file = new File([blob], input.name, { type: input.mime });
	for (let attempt = 0; attempt < 3; attempt += 1) {
		const form = new FormData();
		form.set("network", "public");
		form.set("file", file);
		form.set("name", input.name);
		if (input.keyvalues) form.set("keyvalues", JSON.stringify(input.keyvalues));
		try {
			const res = await fetch("https://uploads.pinata.cloud/v3/files", {
				method: "POST",
				headers: authHeaders(token, pair),
				body: form
			});
			if (res.ok) {
				const json = await res.json();
				const cid = json.data?.cid || json.cid;
				if (cid) return {
					cid,
					id: json.data?.id,
					name: json.data?.name || input.name
				};
			}
			const legacy = await pinLegacy(token, pair, file, input.name, input.keyvalues);
			if (legacy) return legacy;
		} catch {}
		await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
	}
	return null;
}
async function pinLegacy(token, pair, file, name, keyvalues) {
	const form = new FormData();
	form.set("file", file, name);
	form.set("pinataMetadata", JSON.stringify({
		name,
		keyvalues: keyvalues ?? {}
	}));
	form.set("pinataOptions", JSON.stringify({ cidVersion: 1 }));
	const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
		method: "POST",
		headers: authHeaders(token, pair),
		body: form
	});
	if (!res.ok) return null;
	const json = await res.json();
	if (!json.IpfsHash) return null;
	return {
		cid: json.IpfsHash,
		name
	};
}
async function pinFanArtwork(input) {
	const meta = {
		fanId: input.id,
		title: input.title,
		kind: input.video ? "emoji-clip" : "emoji-new-master"
	};
	const jobs = [pinataUploadFile({
		name: `${input.id}-emoji.txt`,
		bytes: Buffer.from(input.emojiText, "utf8"),
		mime: "text/plain; charset=utf-8",
		keyvalues: {
			...meta,
			file: "emoji"
		}
	}), pinataUploadFile({
		name: `${input.id}-mosaic.jpg`,
		bytes: input.jpeg,
		mime: "image/jpeg",
		keyvalues: {
			...meta,
			file: "jpeg"
		}
	})];
	const [emoji, jpeg] = await Promise.all(jobs);
	let videoCid;
	if (input.video) try {
		const ext = (input.videoMime ?? "").includes("mp4") ? "mp4" : "webm";
		videoCid = (await pinataUploadFile({
			name: `${input.id}-clip.${ext}`,
			bytes: input.video,
			mime: input.videoMime || "video/webm",
			keyvalues: {
				...meta,
				file: "video"
			}
		}))?.cid;
	} catch {
		videoCid = void 0;
	}
	if (!emoji?.cid && !jpeg?.cid && !videoCid) return null;
	return {
		emojiCid: emoji?.cid,
		jpegCid: jpeg?.cid,
		videoCid
	};
}
async function pinSvgReel(input) {
	const meta = {
		reelId: input.id,
		title: input.title,
		kind: "emoji-svg-reel"
	};
	const [emoji, jpeg, svg] = await Promise.all([
		pinataUploadFile({
			name: `${input.id}-emoji.txt`,
			bytes: Buffer.from(input.emojiText, "utf8"),
			mime: "text/plain; charset=utf-8",
			keyvalues: {
				...meta,
				file: "emoji"
			}
		}),
		pinataUploadFile({
			name: `${input.id}-poster.jpg`,
			bytes: input.jpeg,
			mime: "image/jpeg",
			keyvalues: {
				...meta,
				file: "jpeg"
			}
		}),
		pinataUploadFile({
			name: `${input.id}-reel.svg`,
			bytes: input.svg,
			mime: "image/svg+xml",
			keyvalues: {
				...meta,
				file: "svg"
			}
		})
	]);
	let framesCid;
	if (input.frames) try {
		framesCid = (await pinataUploadFile({
			name: `${input.id}-frames.json`,
			bytes: input.frames,
			mime: "application/json",
			keyvalues: {
				...meta,
				file: "frames"
			}
		}))?.cid;
	} catch {
		framesCid = void 0;
	}
	if (!emoji?.cid && !jpeg?.cid && !svg?.cid && !framesCid) return null;
	return {
		emojiCid: emoji?.cid,
		jpegCid: jpeg?.cid,
		svgCid: svg?.cid,
		framesCid
	};
}
async function fetchPinataBytes(cid) {
	const token = await gatewayToken();
	const url = ipfsGatewayUrl(cid);
	const res = await fetch(url, { headers: token ? { "x-pinata-gateway-token": token } : {} });
	if (!res.ok) return null;
	return Buffer.from(await res.arrayBuffer());
}
//#endregion
export { fetchPinataBytes, pinFanArtwork, pinSvgReel };
