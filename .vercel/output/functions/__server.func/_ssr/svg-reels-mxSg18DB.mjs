import { t as createServerFn } from "./ssr.mjs";
import { t as isEmojiProcessed } from "./emoji-processed-DBxAIRLK.mjs";
import { a as number, o as object, s as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { t as hasPins } from "./ipfs-DsUAJpaN.mjs";
import { n as asStamp } from "./fan-feed-BD1dfKIp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/svg-reels-mxSg18DB.js
var SVG_ID_RE = /^svg-[a-f0-9]{12}$/;
function newId() {
	const bytes = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(bytes);
	return `svg-${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}
function mapPins(row) {
	const pins = {
		svgCid: row.pinata_svg_cid || void 0,
		emojiCid: row.pinata_emoji_cid || void 0,
		jpegCid: row.pinata_jpeg_cid || void 0,
		framesCid: row.pinata_frames_cid || void 0
	};
	return hasPins(pins) ? pins : null;
}
async function ensureTable(sql) {
	await sql.query(`
    create table if not exists svg_reels (
      id text primary key,
      title text not null,
      cols integer not null,
      rows integer not null,
      fps integer not null default 8,
      frame_count integer not null default 0,
      emoji_text text not null default '',
      poster_jpeg text,
      svg_text text,
      frames_json text,
      pinata_svg_cid text,
      pinata_emoji_cid text,
      pinata_jpeg_cid text,
      pinata_frames_cid text,
      created_at timestamptz not null default now()
    )
  `);
}
var svgBackfill = null;
async function pinAllSvgReels() {
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	await ensureTable(sql);
	const rows = await sql`
    select id, title, emoji_text, poster_jpeg, svg_text, frames_json,
           pinata_svg_cid, pinata_emoji_cid, pinata_jpeg_cid
    from svg_reels
  `;
	let pinned = 0;
	for (const row of rows) {
		if (row.pinata_svg_cid && row.pinata_jpeg_cid) continue;
		if (!isEmojiProcessed(row.emoji_text) || !row.poster_jpeg || !row.svg_text) continue;
		try {
			const { pinSvgReel } = await import("./pinata-t8BKVcr-.mjs");
			const pinata = await pinSvgReel({
				id: row.id,
				title: row.title,
				emojiText: row.emoji_text,
				jpeg: Buffer.from(row.poster_jpeg, "base64"),
				svg: Buffer.from(row.svg_text, "utf8"),
				frames: row.frames_json ? Buffer.from(row.frames_json, "utf8") : void 0
			});
			if (!pinata) continue;
			await sql`
        update svg_reels
        set pinata_svg_cid = ${pinata.svgCid ?? null},
            pinata_emoji_cid = ${pinata.emojiCid ?? null},
            pinata_jpeg_cid = ${pinata.jpegCid ?? null},
            pinata_frames_cid = ${pinata.framesCid ?? null}
        where id = ${row.id}
      `;
			pinned += 1;
		} catch {}
	}
	return pinned;
}
function kickSvgPinBackfill() {
	if (svgBackfill) return;
	svgBackfill = pinAllSvgReels().then(() => void 0).catch(() => void 0).finally(() => {
		svgBackfill = null;
	});
}
var listSvgReels_createServerFn_handler = createServerRpc({
	id: "f154395f4dcd41884768fe623dcdc9fb28f72c2468f3e0fef930bd2eca82ad8f",
	name: "listSvgReels",
	filename: "src/lib/svg-reels.ts"
}, (opts) => listSvgReels.__executeServer(opts));
var listSvgReels = createServerFn({ method: "GET" }).handler(listSvgReels_createServerFn_handler, async () => {
	kickSvgPinBackfill();
	try {
		const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
		const sql = await getSql();
		await ensureTable(sql);
		return (await sql`
      select id, title, cols, rows, fps, frame_count, created_at,
             pinata_svg_cid, pinata_emoji_cid, pinata_jpeg_cid, pinata_frames_cid
      from svg_reels
      order by created_at desc
      limit 120
    `).map((row) => ({
			id: row.id,
			title: row.title,
			cols: row.cols,
			rows: row.rows,
			fps: row.fps || 8,
			frameCount: row.frame_count,
			createdAt: asStamp(row.created_at),
			ipfs: mapPins(row)
		}));
	} catch {
		return [];
	}
});
var getSvgReel_createServerFn_handler = createServerRpc({
	id: "2524d5ed1322f3a19060645b9ee77a4ad3173373fb7f392c0f8a32051abe623d",
	name: "getSvgReel",
	filename: "src/lib/svg-reels.ts"
}, (opts) => getSvgReel.__executeServer(opts));
var getSvgReel = createServerFn({ method: "GET" }).validator(object({ id: string() })).handler(getSvgReel_createServerFn_handler, async ({ data }) => {
	if (!SVG_ID_RE.test(data.id)) return null;
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const row = (await (await getSql())`
      select id, title, cols, rows, fps, frame_count, created_at, emoji_text,
             svg_text, frames_json, pinata_svg_cid, pinata_emoji_cid,
             pinata_jpeg_cid, pinata_frames_cid
      from svg_reels
      where id = ${data.id}
      limit 1
    `)[0];
	if (!row) return null;
	return {
		id: row.id,
		title: row.title,
		cols: row.cols,
		rows: row.rows,
		fps: row.fps || 8,
		frameCount: row.frame_count,
		createdAt: asStamp(row.created_at),
		emojiText: row.emoji_text,
		svg: row.svg_text || null,
		framesJson: row.frames_json || null,
		ipfs: mapPins(row)
	};
});
var publishSvgReel_createServerFn_handler = createServerRpc({
	id: "aac0f526acb8e0a59ec6a56bfe89190c3c1060250e28bccf9423365e2f0682cd",
	name: "publishSvgReel",
	filename: "src/lib/svg-reels.ts"
}, (opts) => publishSvgReel.__executeServer(opts));
var publishSvgReel = createServerFn({ method: "POST" }).validator(object({
	title: string().max(80).optional(),
	cols: number().int().min(2).max(256),
	rows: number().int().min(2).max(256),
	fps: number().int().min(2).max(24).optional(),
	frameCount: number().int().min(2).max(240).optional(),
	emojiText: string().min(1).max(9e5),
	imageJpeg: string().min(32).max(65e5),
	svg: string().min(32).max(16e6),
	framesJson: string().min(2).max(16e6).optional()
})).handler(publishSvgReel_createServerFn_handler, async ({ data }) => {
	if (!isEmojiProcessed(data.emojiText)) throw new Error("Only emoji mosaics can be saved.");
	const id = newId();
	const title = (data.title?.trim() || "SVG reel").slice(0, 80);
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	const fps = data.fps || 8;
	const frameCount = data.frameCount || 2;
	const { getSql } = await import("./db-Cq0aOiwy.mjs").then((n) => n.t);
	const sql = await getSql();
	await ensureTable(sql);
	const storeSvg = data.svg.length <= 8e6 ? data.svg : null;
	const storeFrames = data.framesJson && data.framesJson.length <= 8e6 ? data.framesJson : null;
	await sql`
      insert into svg_reels (
        id, title, cols, rows, fps, frame_count, emoji_text, poster_jpeg, svg_text, frames_json, created_at
      )
      values (
        ${id},
        ${title},
        ${data.cols},
        ${data.rows},
        ${fps},
        ${frameCount},
        ${data.emojiText},
        ${data.imageJpeg},
        ${storeSvg},
        ${storeFrames},
        ${createdAt}::timestamptz
      )
    `;
	let pinata = null;
	try {
		const { pinSvgReel } = await import("./pinata-t8BKVcr-.mjs");
		pinata = await pinSvgReel({
			id,
			title,
			emojiText: data.emojiText,
			jpeg: Buffer.from(data.imageJpeg, "base64"),
			svg: Buffer.from(data.svg, "utf8"),
			frames: data.framesJson ? Buffer.from(data.framesJson, "utf8") : void 0
		});
	} catch {
		pinata = null;
	}
	if (pinata) await sql`
        update svg_reels
        set pinata_svg_cid = ${pinata.svgCid ?? null},
            pinata_emoji_cid = ${pinata.emojiCid ?? null},
            pinata_jpeg_cid = ${pinata.jpegCid ?? null},
            pinata_frames_cid = ${pinata.framesCid ?? null}
        where id = ${id}
      `;
	pinAllSvgReels();
	try {
		const { pinAllUnpinned } = await import("./fan-works-BMoXMERl.mjs").then((n) => n.o);
		pinAllUnpinned();
	} catch {}
	return {
		id,
		title,
		ipfs: pinata
	};
});
//#endregion
export { getSvgReel_createServerFn_handler, listSvgReels_createServerFn_handler, publishSvgReel_createServerFn_handler };
