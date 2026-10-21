import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
import { t as isEmojiProcessed } from "./emoji-processed-DBxAIRLK.mjs";
import { a as number, n as boolean, o as object, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fan-works-BMoXMERl.js
var fan_works_exports = /* @__PURE__ */ __exportAll({
	FANS_REPO_URL: () => FANS_REPO_URL,
	FAN_ID_RE: () => FAN_ID_RE,
	GH_RAW: () => GH_RAW,
	backfillFanPins: () => backfillFanPins,
	ensureFanPinned: () => ensureFanPinned,
	extractVideoMiddleFrame: () => extractVideoMiddleFrame,
	fanImageSrc: () => fanImageSrc,
	fanVideoSrc: () => fanVideoSrc,
	getFanWork: () => getFanWork,
	listFanWorks: () => listFanWorks,
	loadFanJpegBytes: () => loadFanJpegBytes,
	loadFanOgJpegBytes: () => loadFanOgJpegBytes,
	loadFanVideoBytes: () => loadFanVideoBytes,
	pinAllUnpinned: () => pinAllUnpinned,
	publishFanWork: () => publishFanWork,
	setFanHidden: () => setFanHidden
});
var GH_OWNER = "maximusmaximus";
var GH_REPO = "oldmaster";
var FANS_REPO_URL = `https://github.com/${GH_OWNER}/${GH_REPO}`;
var GH_RAW = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main`;
var FAN_ID_RE = /^fan-[a-f0-9]{12}$/;
function fanImageSrc(id) {
	return `/api/fan-image?id=${encodeURIComponent(id)}`;
}
function fanVideoSrc(id) {
	return `/api/fan-video?id=${encodeURIComponent(id)}`;
}
var cachedToken;
function isPat(token) {
	return token.startsWith("github_pat_") || token.startsWith("ghp_");
}
async function tokenFromSecretsFile() {
	if (typeof window !== "undefined") return "";
	try {
		const { readFile } = await import("node:fs/promises");
		return (await readFile("/workspace/.grok/secrets/github-token", "utf8")).trim();
	} catch {
		return "";
	}
}
async function ghToken() {
	if (cachedToken !== void 0) return cachedToken ?? "";
	const fileTok = await tokenFromSecretsFile();
	if (fileTok) {
		cachedToken = fileTok;
		return fileTok;
	}
	const env = typeof process !== "undefined" && (process.env.GH_TOKEN || process.env.GITHUB_TOKEN) || "";
	if (env && isPat(env)) {
		cachedToken = env;
		return env;
	}
	if (typeof window !== "undefined") {
		cachedToken = "";
		return "";
	}
	try {
		const { execFile } = await import("node:child_process");
		const { promisify } = await import("node:util");
		const { stdout } = await promisify(execFile)("gh", ["auth", "token"], { timeout: 8e3 });
		const cli = stdout.trim();
		if (cli && (isPat(cli) || !env)) {
			cachedToken = cli;
			return cli;
		}
	} catch {}
	if (env) {
		cachedToken = env;
		return env;
	}
	cachedToken = "";
	return "";
}
async function ghPut(path, contentB64, message, sha) {
	const token = await ghToken();
	if (!token) return false;
	const body = {
		message,
		content: contentB64,
		branch: "main"
	};
	if (sha) body.sha = sha;
	return (await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}`, {
		method: "PUT",
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			"User-Agent": "EmojiOldMasters"
		},
		body: JSON.stringify(body)
	})).ok;
}
function utf8ToB64(text) {
	return Buffer.from(text, "utf8").toString("base64");
}
async function loadFanJpegBytes(id) {
	if (!FAN_ID_RE.test(id)) return null;
	const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		const row = (await (await getSql())`
      select image_jpeg, pinata_jpeg_cid from fan_works where id = ${id} limit 1
    `)[0];
		if (row?.image_jpeg && row.image_jpeg.length > 2e3) {
			const bytes = Buffer.from(row.image_jpeg, "base64");
			if (bytes.length > 2048 && bytes[0] === 255 && bytes[1] === 216) return bytes;
		}
		if (row?.pinata_jpeg_cid) {
			const pinned = await fetchPinataBytes(row.pinata_jpeg_cid);
			if (pinned && pinned.length > 2048) return pinned;
		}
	} catch {}
	try {
		const res = await fetch(`${GH_RAW}/fans/${id}/mosaic.jpg`, { cache: "force-cache" });
		if (res.ok) {
			const bytes = Buffer.from(await res.arrayBuffer());
			if (bytes.length > 2048) return bytes;
		}
	} catch {}
	try {
		const pinRes = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
		if (pinRes.ok) {
			const pin = await pinRes.json();
			if (pin.jpegCid) return await fetchPinataBytes(pin.jpegCid);
		}
	} catch {
		return null;
	}
	return null;
}
async function loadFanVideoBytes(id) {
	if (!FAN_ID_RE.test(id)) return null;
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		const rows = await (await getSql())`
      select video_b64, video_mime, kind from fan_works where id = ${id} limit 1
    `;
		if (rows[0]?.video_b64) return {
			bytes: Buffer.from(rows[0].video_b64, "base64"),
			mime: rows[0].video_mime || "video/webm"
		};
	} catch {}
	try {
		for (const name of [`clip.webm`, `clip.mp4`]) {
			const res = await fetch(`${GH_RAW}/fans/${id}/${name}`, { cache: "force-cache" });
			if (res.ok) return {
				bytes: Buffer.from(await res.arrayBuffer()),
				mime: name.endsWith("mp4") ? "video/mp4" : "video/webm"
			};
		}
	} catch {}
	try {
		const pinRes = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
		if (pinRes.ok) {
			const pin = await pinRes.json();
			if (pin.videoCid) {
				const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
				const bytes = await fetchPinataBytes(pin.videoCid);
				if (bytes) return {
					bytes,
					mime: "video/webm"
				};
			}
		}
	} catch {
		return null;
	}
	return null;
}
async function extractVideoMiddleFrame(bytes, mime = "video/webm") {
	const { spawn } = await import("node:child_process");
	const { mkdtemp, readFile, rm, writeFile } = await import("node:fs/promises");
	const { tmpdir } = await import("node:os");
	const { join } = await import("node:path");
	const ext = mime.includes("mp4") ? "mp4" : "webm";
	const dir = await mkdtemp(join(tmpdir(), "eom-frame-"));
	const src = join(dir, `clip.${ext}`);
	const out = join(dir, "frame.jpg");
	const run = (args) => new Promise((resolve, reject) => {
		const child = spawn("ffmpeg", args, { stdio: "ignore" });
		child.on("error", reject);
		child.on("exit", (code) => {
			if (code === 0) resolve();
			else reject(/* @__PURE__ */ new Error("ffmpeg frame failed"));
		});
	});
	const probeDuration = () => new Promise((resolve) => {
		const child = spawn("ffprobe", [
			"-v",
			"error",
			"-show_entries",
			"format=duration",
			"-of",
			"default=noprint_wrappers=1:nokey=1",
			src
		], { stdio: [
			"ignore",
			"pipe",
			"ignore"
		] });
		let outBuf = "";
		child.stdout.on("data", (chunk) => {
			outBuf += String(chunk);
		});
		child.on("error", () => resolve(0));
		child.on("exit", () => {
			const n = Number.parseFloat(outBuf.trim());
			resolve(Number.isFinite(n) && n > 0 ? n : 0);
		});
	});
	try {
		await writeFile(src, bytes);
		const duration = await probeDuration();
		const ss = (duration > .2 ? duration / 2 : .5).toFixed(2);
		try {
			await run([
				"-y",
				"-ss",
				ss,
				"-i",
				src,
				"-frames:v",
				"1",
				"-update",
				"1",
				"-q:v",
				"3",
				out
			]);
		} catch {
			await run([
				"-y",
				"-i",
				src,
				"-ss",
				ss,
				"-frames:v",
				"1",
				"-update",
				"1",
				"-q:v",
				"3",
				out
			]);
		}
		return await readFile(out);
	} catch {
		return null;
	} finally {
		await rm(dir, {
			recursive: true,
			force: true
		}).catch(() => void 0);
	}
}
async function loadFanOgJpegBytes(id) {
	const { mkdir, readFile, writeFile } = await import("node:fs/promises");
	const { join } = await import("node:path");
	const cache = join(process.cwd(), ".data/og-fans", `${id}-mid.jpg`);
	try {
		return await readFile(cache);
	} catch {}
	const video = await loadFanVideoBytes(id);
	if (video) {
		const frame = await extractVideoMiddleFrame(video.bytes, video.mime);
		if (frame) {
			await mkdir(join(process.cwd(), ".data/og-fans"), { recursive: true });
			await writeFile(cache, frame);
			return frame;
		}
	}
	return loadFanJpegBytes(id);
}
async function persistPins(sql, id, pinata) {
	try {
		await sql`
      update fan_works
      set pinata_emoji_cid = ${pinata.emojiCid ?? null},
          pinata_jpeg_cid = ${pinata.jpegCid ?? null},
          pinata_video_cid = ${pinata.videoCid ?? null}
      where id = ${id}
    `;
	} catch {}
	await ghPut(`fans/${id}/pinata.json`, utf8ToB64(JSON.stringify(pinata, null, 2)), `fan: ${id} pinata cids`);
}
async function pinRow(row) {
	if (!row.image_jpeg) return null;
	if (row.kind !== "clip" && !isEmojiProcessed(row.emoji_text)) return null;
	const { pinFanArtwork } = await import("./pinata-t8BKVcr-.mjs");
	const jpeg = Buffer.from(row.image_jpeg, "base64");
	if (jpeg.length < 32) return null;
	for (let attempt = 0; attempt < 3; attempt++) {
		try {
			const pinata = await pinFanArtwork({
				id: row.id,
				title: row.title,
				emojiText: isEmojiProcessed(row.emoji_text) ? row.emoji_text : "🎞️",
				jpeg,
				video: row.video_b64 ? Buffer.from(row.video_b64, "base64") : void 0,
				videoMime: row.video_mime || void 0
			});
			if (pinata?.jpegCid || pinata?.emojiCid) return pinata;
		} catch {}
		await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
	}
	return null;
}
async function importGithubFans(sql) {
	const token = await ghToken();
	try {
		const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/fans?ref=main`, { headers: {
			Accept: "application/vnd.github+json",
			"X-GitHub-Api-Version": "2022-11-28",
			...token ? { Authorization: `Bearer ${token}` } : {},
			"User-Agent": "EmojiOldMasters"
		} });
		if (!res.ok) return 0;
		const items = await res.json();
		if (!Array.isArray(items)) return 0;
		let added = 0;
		for (const item of items) {
			const id = item.name || "";
			if (item.type !== "dir" || !FAN_ID_RE.test(id)) continue;
			if ((await sql`select id from fan_works where id = ${id} limit 1`)[0]) continue;
			const [txtRes, jpgRes, metaRes] = await Promise.all([
				fetch(`${GH_RAW}/fans/${id}/emoji.txt`, { cache: "no-store" }),
				fetch(`${GH_RAW}/fans/${id}/mosaic.jpg`, { cache: "no-store" }),
				fetch(`${GH_RAW}/fans/${id}/meta.json`, { cache: "no-store" })
			]);
			if (!jpgRes.ok) continue;
			const jpeg = Buffer.from(await jpgRes.arrayBuffer()).toString("base64");
			const emojiText = txtRes.ok ? await txtRes.text() : "⬜⬛";
			let title = "Emoji New Master";
			let cols = 8;
			let rows = 8;
			let createdAt = (/* @__PURE__ */ new Date()).toISOString();
			let kind = "still";
			if (metaRes.ok) try {
				const meta = await metaRes.json();
				title = (meta.title || title).slice(0, 80);
				cols = Number(meta.cols) || cols;
				rows = Number(meta.rows) || rows;
				createdAt = meta.createdAt || createdAt;
				kind = meta.kind === "clip" ? "clip" : "still";
			} catch {}
			await sql`
        insert into fan_works (
          id, title, cols, rows, emoji_text, image_jpeg, created_at, kind
        )
        values (
          ${id},
          ${title},
          ${cols},
          ${rows},
          ${emojiText},
          ${jpeg},
          ${createdAt}::timestamptz,
          ${kind}
        )
      `;
			added += 1;
		}
		return added;
	} catch {
		return 0;
	}
}
async function backfillFanPins() {
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	let hydrated = 0;
	try {
		hydrated = await hydrateFromPinata(sql);
	} catch {
		hydrated = 0;
	}
	try {
		hydrated += await importGithubFans(sql);
	} catch {}
	const rows = await sql`
    select id, title, emoji_text, image_jpeg, kind, video_b64, video_mime,
           pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
    from fan_works
  `;
	let pinned = 0;
	let skipped = 0;
	let failed = 0;
	for (const row of rows) {
		if (!(!row.pinata_jpeg_cid || !row.pinata_emoji_cid || row.kind === "clip" && !row.pinata_video_cid)) {
			skipped += 1;
			continue;
		}
		if (!isEmojiProcessed(row.emoji_text) && row.kind !== "clip") {
			skipped += 1;
			continue;
		}
		if (!row.image_jpeg) {
			skipped += 1;
			continue;
		}
		try {
			const pinata = await pinRow(row);
			if (!pinata) {
				failed += 1;
				continue;
			}
			await persistPins(sql, row.id, pinata);
			pinned += 1;
		} catch {
			failed += 1;
		}
	}
	return {
		total: rows.length,
		pinned,
		skipped,
		failed,
		hydrated
	};
}
async function pinAllUnpinned() {
	const result = await backfillFanPins();
	try {
		const { pinAllSvgReels } = await import("./svg-reels-D4HEG8-k.mjs").then((n) => n.u);
		await pinAllSvgReels();
	} catch {}
	return result;
}
function mintFanId(seed) {
	return `fan-${Array.from(seed).reduce((h, ch) => (h << 5) - h + ch.charCodeAt(0) | 0, 0).toString(16).replace("-", "a").padStart(12, "0").slice(-12)}`;
}
async function hydrateFromPinata(sql) {
	let jwt = "";
	try {
		const { readFile } = await import("node:fs/promises");
		jwt = (await readFile("/workspace/.grok/secrets/pinata-jwt", "utf8")).trim();
	} catch {
		jwt = "";
	}
	if (!jwt) jwt = process.env.PINATA_JWT || "";
	if (!jwt) return 0;
	return hydrateWithToken(sql, jwt);
}
async function hydrateWithToken(sql, jwt) {
	const res = await fetch("https://api.pinata.cloud/data/pinList?status=pinned&pageLimit=1000", { headers: { Authorization: `Bearer ${jwt}` } });
	if (!res.ok) return 0;
	const json = await res.json();
	const groups = /* @__PURE__ */ new Map();
	for (const row of json.rows ?? []) {
		const name = row.metadata?.name || "";
		const kv = row.metadata?.keyvalues || {};
		const cid = row.ipfs_pin_hash;
		if (!cid) continue;
		let fanId = kv.fanId || "";
		const m = name.match(/^(fan-[a-z0-9]+)-(emoji\.txt|mosaic\.jpg|clip\.(webm|mp4))$/i);
		if (!fanId && m?.[1]) fanId = m[1];
		if (!fanId) continue;
		if (!FAN_ID_RE.test(fanId)) fanId = mintFanId(fanId);
		const g = groups.get(fanId) ?? {};
		if (kv.file === "jpeg" || name.endsWith("-mosaic.jpg")) g.jpegCid = cid;
		if (kv.file === "emoji" || name.endsWith("-emoji.txt")) g.emojiCid = cid;
		if (kv.file === "video" || /clip\.(webm|mp4)$/i.test(name)) g.videoCid = cid;
		if (kv.title) g.title = kv.title;
		g.date = g.date || row.date_pinned;
		groups.set(fanId, g);
	}
	let added = 0;
	const { fetchPinataBytes } = await import("./pinata-t8BKVcr-.mjs");
	for (const [id, g] of groups) {
		if (!g.jpegCid && !g.emojiCid) continue;
		if ((await sql`select id from fan_works where id = ${id} limit 1`)[0]) {
			await persistPins(sql, id, {
				emojiCid: g.emojiCid,
				jpegCid: g.jpegCid,
				videoCid: g.videoCid
			});
			continue;
		}
		let emojiText = "⬜";
		let jpeg = "";
		if (g.emojiCid) {
			const bytes = await fetchPinataBytes(g.emojiCid);
			if (bytes) emojiText = bytes.toString("utf8");
		}
		if (g.jpegCid) {
			const bytes = await fetchPinataBytes(g.jpegCid);
			if (bytes) jpeg = bytes.toString("base64");
		}
		if (!isEmojiProcessed(emojiText) && !jpeg) continue;
		if (!isEmojiProcessed(emojiText)) emojiText = "⬜⬛";
		const cols = Math.max(2, emojiText.split("\n")[0]?.length || 8);
		const rows = Math.max(2, emojiText.split("\n").filter(Boolean).length);
		const createdAt = g.date || (/* @__PURE__ */ new Date()).toISOString();
		const title = (g.title || "Emoji New Master").slice(0, 80);
		const kind = g.videoCid ? "clip" : "still";
		await sql`
      insert into fan_works (
        id, title, cols, rows, emoji_text, image_jpeg, created_at, kind,
        pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
      )
      values (
        ${id},
        ${title},
        ${cols},
        ${rows},
        ${emojiText},
        ${jpeg || " "},
        ${createdAt}::timestamptz,
        ${kind},
        ${g.emojiCid ?? null},
        ${g.jpegCid ?? null},
        ${g.videoCid ?? null}
      )
    `;
		added += 1;
	}
	return added;
}
createServerFn({ method: "GET" }).handler(createSsrRpc("8a9a02dd6249ef4b48b18c35f262d9bdf2ed900e767783a477ce32ae6cacce14"));
var listFanWorks = createServerFn({ method: "GET" }).handler(createSsrRpc("3c9742ad731bb746f086b7b75aa629d9dfe5ec4845bac4b3363467f763ec3e5e"));
var getFanWork = createServerFn({ method: "GET" }).validator(object({ id: string().regex(FAN_ID_RE) })).handler(createSsrRpc("2bf82b1dd9ec57c68c976889c2ae4a9759f2b5e0d03252190b3ead473fa3d1ca"));
var publishFanWork = createServerFn({ method: "POST" }).validator(object({
	title: string().max(80).optional(),
	cols: number().int().min(2).max(256),
	rows: number().int().min(2).max(256),
	emojiText: string().min(1).max(9e5),
	imageJpeg: string().min(32).max(65e5),
	kind: _enum(["still", "clip"]).optional(),
	videoBase64: string().min(32).max(4e7).optional(),
	videoMime: string().max(80).optional()
})).handler(createSsrRpc("8572fc6f0732da2ae86fa86310f9f12fd24a840e79c1df6d62cdebe88533b447"));
var ensureFanPinned = createServerFn({ method: "POST" }).validator(object({ id: string().regex(FAN_ID_RE) })).handler(createSsrRpc("fd365f0d9de1512d6bb67b308531b67cccef8f58a95dac9a14277cf0d125bc40"));
var setFanHidden = createServerFn({ method: "POST" }).validator(object({
	id: string().regex(FAN_ID_RE),
	hidden: boolean()
})).handler(createSsrRpc("7cc8546412131eac039397c9c376f48927c2da5d7dd8525666ec9df1c7c68b68"));
//#endregion
export { fanVideoSrc as a, listFanWorks as c, loadFanVideoBytes as d, pinAllUnpinned as f, fanImageSrc as i, loadFanJpegBytes as l, setFanHidden as m, FAN_ID_RE as n, fan_works_exports as o, publishFanWork as p, ensureFanPinned as r, getFanWork as s, FANS_REPO_URL as t, loadFanOgJpegBytes as u };
