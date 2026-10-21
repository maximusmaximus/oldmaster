import { t as createServerFn } from "./ssr.mjs";
import { t as isEmojiProcessed } from "./emoji-processed-DBxAIRLK.mjs";
import { a as number, n as boolean, o as object, s as string, t as _enum } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { o as mergePins, t as hasPins } from "./ipfs-DsUAJpaN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fan-works-CzOqM0aD.js
var GH_OWNER = "maximusmaximus";
var GH_REPO = "oldmaster";
var GH_RAW = `https://raw.githubusercontent.com/${GH_OWNER}/${GH_REPO}/main`;
var FAN_ID_RE = /^fan-[a-f0-9]{12}$/;
function newId() {
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(bytes);
	return `fan-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
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
async function ghGet(path) {
	const token = await ghToken();
	const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${path}?ref=main`, { headers: {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		...token ? { Authorization: `Bearer ${token}` } : {},
		"User-Agent": "EmojiOldMasters"
	} });
	if (!res.ok) return null;
	const json = await res.json();
	if (!json.sha || !json.content) return null;
	const content = json.encoding === "base64" ? json.content.replace(/\n/g, "") : json.content;
	return {
		sha: json.sha,
		content
	};
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
async function publishToGithub(work, imageJpeg, video) {
	try {
		const meta = JSON.stringify({
			id: work.id,
			title: work.title,
			cols: work.cols,
			rows: work.rows,
			createdAt: work.createdAt,
			kind: work.kind
		}, null, 2);
		const okTxt = await ghPut(`fans/${work.id}/emoji.txt`, utf8ToB64(work.emojiText), `fan: ${work.id} emoji text`);
		const okMeta = await ghPut(`fans/${work.id}/meta.json`, utf8ToB64(meta), `fan: ${work.id} meta`);
		const okJpg = await ghPut(`fans/${work.id}/mosaic.jpg`, imageJpeg, `fan: ${work.id} mosaic jpg`);
		let okVid = true;
		if (video && video.b64.length < 9e5) {
			const ext = video.mime.includes("mp4") ? "mp4" : "webm";
			okVid = await ghPut(`fans/${work.id}/clip.${ext}`, video.b64, `fan: ${work.id} clip`);
		}
		const existing = await ghGet("fans/index.json");
		let list = [];
		if (existing) try {
			list = JSON.parse(Buffer.from(existing.content, "base64").toString("utf8"));
			if (!Array.isArray(list)) list = [];
		} catch {
			list = [];
		}
		if (!list.some((e) => e.id === work.id)) list.unshift({
			id: work.id,
			title: work.title,
			cols: work.cols,
			rows: work.rows,
			createdAt: work.createdAt,
			kind: work.kind
		});
		const okIdx = await ghPut("fans/index.json", utf8ToB64(JSON.stringify(list, null, 2)), `fan: index ${work.id}`, existing?.sha);
		return okTxt && okMeta && okJpg && okVid && okIdx;
	} catch {
		return false;
	}
}
function mapMeta(row) {
	const ipfs = mapPins(row);
	return {
		id: row.id,
		title: row.title,
		cols: Number(row.cols),
		rows: Number(row.rows),
		createdAt: String(row.created_at),
		kind: row.kind === "clip" ? "clip" : "still",
		hidden: Boolean(row.hidden),
		ipfs,
		pins: ipfs
	};
}
async function listFromGithub() {
	try {
		const res = await fetch(`${GH_RAW}/fans/index.json`, { cache: "no-store" });
		if (!res.ok) return [];
		const list = await res.json();
		if (!Array.isArray(list)) return [];
		return list.filter((e) => e && FAN_ID_RE.test(e.id)).map((e) => ({
			id: e.id,
			title: e.title || "Emoji New Master",
			cols: Number(e.cols) || 0,
			rows: Number(e.rows) || 0,
			createdAt: e.createdAt,
			kind: e.kind === "clip" ? "clip" : "still"
		}));
	} catch {
		return [];
	}
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
var backfillRunning = false;
function kickFanPinBackfill() {
	if (backfillRunning) return;
	backfillRunning = true;
	backfillFanPins().then((r) => r.pinned).catch(() => 0).finally(() => {
		backfillRunning = false;
	});
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
var repinFanWorks_createServerFn_handler = createServerRpc({
	id: "8a9a02dd6249ef4b48b18c35f262d9bdf2ed900e767783a477ce32ae6cacce14",
	name: "repinFanWorks",
	filename: "src/lib/fan-works.ts"
}, (opts) => repinFanWorks.__executeServer(opts));
var repinFanWorks = createServerFn({ method: "GET" }).handler(repinFanWorks_createServerFn_handler, async () => {
	backfillRunning = false;
	return pinAllUnpinned();
});
function mapPins(row) {
	return mergePins({
		emojiCid: row.pinata_emoji_cid || void 0,
		jpegCid: row.pinata_jpeg_cid || void 0,
		videoCid: row.pinata_video_cid || void 0
	});
}
async function pinsFromGithub(id) {
	try {
		const res = await fetch(`${GH_RAW}/fans/${id}/pinata.json`, { cache: "force-cache" });
		if (!res.ok) return null;
		const pin = await res.json();
		if (!pin.emojiCid && !pin.jpegCid && !pin.videoCid) return null;
		return mergePins({
			emojiCid: pin.emojiCid,
			jpegCid: pin.jpegCid,
			videoCid: pin.videoCid
		});
	} catch {
		return null;
	}
}
async function hiddenIds(sql) {
	try {
		const rows = await sql`select id from fan_hidden`;
		return new Set(rows.map((row) => row.id));
	} catch {
		return /* @__PURE__ */ new Set();
	}
}
var listFanWorks_createServerFn_handler = createServerRpc({
	id: "3c9742ad731bb746f086b7b75aa629d9dfe5ec4845bac4b3363467f763ec3e5e",
	name: "listFanWorks",
	filename: "src/lib/fan-works.ts"
}, (opts) => listFanWorks.__executeServer(opts));
var listFanWorks = createServerFn({ method: "GET" }).handler(listFanWorks_createServerFn_handler, async () => {
	kickFanPinBackfill();
	const { isAdminRequest } = await import("./admin-session.server-Cz10_xeY.mjs");
	const admin = await isAdminRequest();
	let fromDb = [];
	let banned = /* @__PURE__ */ new Set();
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		const sql = await getSql();
		banned = await hiddenIds(sql);
		fromDb = (await sql`select id, title, cols, rows, created_at, kind, hidden, pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid from fan_works order by created_at desc limit 200`).map(mapMeta);
	} catch {
		fromDb = [];
	}
	const fromGh = await listFromGithub();
	const seen = new Set(fromDb.map((r) => r.id));
	const extras = fromGh.filter((g) => !seen.has(g.id));
	const extrasWithPins = await Promise.all(extras.map(async (g) => ({
		...g,
		hidden: banned.has(g.id),
		ipfs: g.ipfs ?? await pinsFromGithub(g.id)
	})));
	const merged = [...fromDb, ...extrasWithPins].map((work) => ({
		...work,
		hidden: Boolean(work.hidden || banned.has(work.id))
	}));
	const filled = await Promise.all(merged.map(async (work) => {
		let ipfs = work.ipfs;
		if (!(hasPins(ipfs) && (work.kind !== "clip" || ipfs.videoCid))) ipfs = mergePins(ipfs, await pinsFromGithub(work.id));
		return {
			...work,
			ipfs,
			pins: ipfs
		};
	}));
	if (admin) return filled;
	return filled.filter((work) => !work.hidden);
});
var getFanWork_createServerFn_handler = createServerRpc({
	id: "2bf82b1dd9ec57c68c976889c2ae4a9759f2b5e0d03252190b3ead473fa3d1ca",
	name: "getFanWork",
	filename: "src/lib/fan-works.ts"
}, (opts) => getFanWork.__executeServer(opts));
var getFanWork = createServerFn({ method: "GET" }).validator(object({ id: string().regex(FAN_ID_RE) })).handler(getFanWork_createServerFn_handler, async ({ data }) => {
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		const rows = await (await getSql())`select id, title, cols, rows, emoji_text, created_at, kind, hidden, pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid from fan_works where id = ${data.id} limit 1`;
		if (rows[0]) {
			const work = {
				...mapMeta(rows[0]),
				emojiText: rows[0].emoji_text,
				ipfs: mergePins(mapPins(rows[0]), await pinsFromGithub(data.id))
			};
			work.pins = work.ipfs;
			if (work.hidden) {
				const { isAdminRequest } = await import("./admin-session.server-Cz10_xeY.mjs");
				if (!await isAdminRequest()) return null;
			}
			return work;
		}
	} catch {}
	try {
		const metaRes = await fetch(`${GH_RAW}/fans/${data.id}/meta.json`);
		const txtRes = await fetch(`${GH_RAW}/fans/${data.id}/emoji.txt`);
		if (!metaRes.ok || !txtRes.ok) return null;
		const meta = await metaRes.json();
		let hidden = false;
		try {
			const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
			hidden = (await hiddenIds(await getSql())).has(meta.id);
		} catch {
			hidden = false;
		}
		if (hidden) {
			const { isAdminRequest } = await import("./admin-session.server-Cz10_xeY.mjs");
			if (!await isAdminRequest()) return null;
		}
		return {
			id: meta.id,
			title: meta.title,
			cols: meta.cols,
			rows: meta.rows,
			emojiText: await txtRes.text(),
			createdAt: meta.createdAt,
			kind: meta.kind === "clip" ? "clip" : "still",
			hidden,
			ipfs: await pinsFromGithub(data.id)
		};
	} catch {
		return null;
	}
});
var publishFanWork_createServerFn_handler = createServerRpc({
	id: "8572fc6f0732da2ae86fa86310f9f12fd24a840e79c1df6d62cdebe88533b447",
	name: "publishFanWork",
	filename: "src/lib/fan-works.ts"
}, (opts) => publishFanWork.__executeServer(opts));
var publishFanWork = createServerFn({ method: "POST" }).validator(object({
	title: string().max(80).optional(),
	cols: number().int().min(2).max(256),
	rows: number().int().min(2).max(256),
	emojiText: string().min(1).max(9e5),
	imageJpeg: string().min(32).max(65e5),
	kind: _enum(["still", "clip"]).optional(),
	videoBase64: string().min(32).max(4e7).optional(),
	videoMime: string().max(80).optional()
})).handler(publishFanWork_createServerFn_handler, async ({ data }) => {
	if (!isEmojiProcessed(data.emojiText)) throw new Error("Only emoji mosaics can be saved to Fans.");
	const id = newId();
	const title = (data.title?.trim() || "Emoji New Master").slice(0, 80);
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	const kind = data.kind === "clip" || data.videoBase64 ? "clip" : "still";
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	await sql`
      insert into fan_works (id, title, cols, rows, emoji_text, image_jpeg, created_at, kind, video_b64, video_mime)
      values (
        ${id},
        ${title},
        ${data.cols},
        ${data.rows},
        ${data.emojiText},
        ${data.imageJpeg},
        ${createdAt}::timestamptz,
        ${kind},
        ${data.videoBase64 ?? null},
        ${data.videoMime ?? null}
      )
    `;
	const work = {
		id,
		title,
		cols: data.cols,
		rows: data.rows,
		emojiText: data.emojiText,
		createdAt,
		kind
	};
	const video = data.videoBase64 && data.videoMime ? {
		b64: data.videoBase64,
		mime: data.videoMime
	} : void 0;
	const github = await publishToGithub(work, data.imageJpeg, video);
	let pinata = null;
	pinata = await pinRow({
		id,
		title,
		emoji_text: data.emojiText,
		image_jpeg: data.imageJpeg,
		kind,
		video_b64: data.videoBase64 ?? null,
		video_mime: data.videoMime ?? null
	});
	if (pinata) await persistPins(sql, id, pinata);
	pinAllUnpinned();
	return {
		id,
		github,
		pinata
	};
});
var ensureFanPinned_createServerFn_handler = createServerRpc({
	id: "fd365f0d9de1512d6bb67b308531b67cccef8f58a95dac9a14277cf0d125bc40",
	name: "ensureFanPinned",
	filename: "src/lib/fan-works.ts"
}, (opts) => ensureFanPinned.__executeServer(opts));
var ensureFanPinned = createServerFn({ method: "POST" }).validator(object({ id: string().regex(FAN_ID_RE) })).handler(ensureFanPinned_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	const row = (await sql`
      select id, title, emoji_text, image_jpeg, kind, video_b64, video_mime,
             pinata_emoji_cid, pinata_jpeg_cid, pinata_video_cid
      from fan_works where id = ${data.id} limit 1
    `)[0];
	if (!row) return null;
	const existing = mapPins(row);
	if (hasPins(existing) && (row.kind !== "clip" || existing.videoCid)) return existing;
	const pinata = await pinRow(row);
	if (!pinata) return existing;
	await persistPins(sql, data.id, pinata);
	return mergePins(existing, pinata);
});
var setFanHidden_createServerFn_handler = createServerRpc({
	id: "7cc8546412131eac039397c9c376f48927c2da5d7dd8525666ec9df1c7c68b68",
	name: "setFanHidden",
	filename: "src/lib/fan-works.ts"
}, (opts) => setFanHidden.__executeServer(opts));
var setFanHidden = createServerFn({ method: "POST" }).validator(object({
	id: string().regex(FAN_ID_RE),
	hidden: boolean()
})).handler(setFanHidden_createServerFn_handler, async ({ data }) => {
	const { isAdminRequest } = await import("./admin-session.server-Cz10_xeY.mjs");
	if (!await isAdminRequest()) throw new Error("Staff only");
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	if (data.hidden) {
		await sql`insert into fan_hidden (id) values (${data.id}) on conflict (id) do nothing`;
		await sql`update fan_works set hidden = true where id = ${data.id}`;
	} else {
		await sql`delete from fan_hidden where id = ${data.id}`;
		await sql`update fan_works set hidden = false where id = ${data.id}`;
	}
	return {
		id: data.id,
		hidden: data.hidden
	};
});
//#endregion
export { ensureFanPinned_createServerFn_handler, getFanWork_createServerFn_handler, listFanWorks_createServerFn_handler, publishFanWork_createServerFn_handler, repinFanWorks_createServerFn_handler, setFanHidden_createServerFn_handler };
