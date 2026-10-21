import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/db-Cq0aOiwy.js
var _0002_fan_works_default = "create table if not exists fan_works (\n  id text primary key,\n  title text not null default 'Emoji New Master',\n  cols integer not null,\n  rows integer not null,\n  emoji_text text not null,\n  image_jpeg text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists fan_works_created_at_idx on fan_works (created_at desc);";
var _0003_fan_clips_default = "alter table fan_works add column if not exists kind text not null default 'still';\nalter table fan_works add column if not exists video_b64 text;\nalter table fan_works add column if not exists video_mime text;\n";
var _0004_fan_hidden_default = "alter table fan_works add column if not exists hidden boolean not null default false;\n\ncreate table if not exists fan_hidden (\n  id text primary key,\n  hidden_at timestamptz not null default now()\n);\n";
var _0005_fan_ipfs_default = "alter table fan_works add column if not exists pinata_emoji_cid text;\nalter table fan_works add column if not exists pinata_jpeg_cid text;\nalter table fan_works add column if not exists pinata_video_cid text;\n";
var _0006_svg_reels_default = "create table if not exists svg_reels (\n  id text primary key,\n  title text not null,\n  cols integer not null,\n  rows integer not null,\n  fps integer not null default 8,\n  frame_count integer not null default 0,\n  emoji_text text not null default '',\n  poster_jpeg text,\n  svg_text text,\n  frames_json text,\n  pinata_svg_cid text,\n  pinata_emoji_cid text,\n  pinata_jpeg_cid text,\n  pinata_frames_cid text,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists svg_reels_created_at_idx on svg_reels (created_at desc);\n";
var _0007_store_default = "-- Emoji Old Masters storefront (additive only). Sales ship OFF.\ncreate table if not exists store_settings (\n  key text primary key,\n  value text not null\n);\ninsert into store_settings (key, value) values\n  ('ORDERS_ENABLED', 'false'),\n  ('KILL_REASON', ''),\n  ('MAX_RPI_ORDERS_PER_DAY', '5'),\n  ('MAX_RPI_EXPOSURE_USD_PER_DAY', '550'),\n  ('NEXT_ORDER_SEQ', '4')\non conflict (key) do nothing;\n\ncreate table if not exists store_quotes (\n  id text primary key,\n  address_json text not null,\n  options_json text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists store_orders (\n  id text primary key,\n  state text not null,\n  quote_id text references store_quotes(id),\n  ship_tier text,\n  quoted_shipping_cents integer,\n  stripe_session_id text unique,\n  stripe_payment_intent_id text,\n  stripe_customer_id text,\n  customer_order_id text unique,\n  rpi_attempt integer not null default 0,\n  rpi_status text,\n  rpi_next_retry_at timestamptz,\n  address_json text,\n  amount_subtotal_cents integer,\n  amount_total_cents integer,\n  amount_tax_cents integer,\n  amount_shipping_cents integer,\n  cancel_deadline_utc timestamptz,\n  deferred_until_utc timestamptz,\n  paid_at timestamptz,\n  locked_at timestamptz,\n  shipped_at timestamptz,\n  tracking_json text,\n  risk_level text,\n  last_error text,\n  created_at timestamptz not null default now(),\n  updated_at timestamptz not null default now()\n);\ncreate index if not exists store_orders_state_idx on store_orders (state);\n\ncreate table if not exists store_stripe_events (\n  event_id text primary key,\n  type text,\n  received_at timestamptz not null default now()\n);\n\ncreate table if not exists store_rpi_events (\n  body_sha256 text primary key,\n  customer_order_id text,\n  received_at timestamptz not null default now()\n);\n\ncreate table if not exists store_reprint_requests (\n  id text primary key,\n  order_id text not null references store_orders(id),\n  description text not null,\n  decision text,\n  created_at timestamptz not null default now(),\n  decided_at timestamptz\n);\n\ncreate table if not exists store_audit (\n  id bigserial primary key,\n  order_id text,\n  from_state text,\n  to_state text,\n  actor text,\n  note text,\n  at timestamptz not null default now()\n);\n\ncreate table if not exists store_alerts (\n  id bigserial primary key,\n  level text not null,\n  message text not null,\n  order_id text,\n  resolved boolean not null default false,\n  at timestamptz not null default now()\n);\n\ncreate table if not exists store_counters (\n  name text primary key,\n  window_start timestamptz not null,\n  count integer not null\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var db_exports = /* @__PURE__ */ __exportAll({
	dbSource: () => dbSource,
	ensureDbReady: () => ensureDbReady,
	getSql: () => getSql
});
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const parsers = {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		};
		const tryDir = async () => {
			const { mkdir } = await import("node:fs/promises");
			const { join } = await import("node:path");
			const dir = join(process.cwd(), ".data/pglite");
			await mkdir(dir, { recursive: true });
			const pg = new PGlite(dir, { parsers });
			await pg.waitReady;
			return pg;
		};
		const pg = await tryDir().catch(async () => {
			const fallback = new PGlite({ parsers });
			await fallback.waitReady;
			return fallback;
		});
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_fan_works.sql": _0002_fan_works_default,
			"/migrations/0003_fan_clips.sql": _0003_fan_clips_default,
			"/migrations/0004_fan_hidden.sql": _0004_fan_hidden_default,
			"/migrations/0005_fan_ipfs.sql": _0005_fan_ipfs_default,
			"/migrations/0006_svg_reels.sql": _0006_svg_reels_default,
			"/migrations/0007_store.sql": _0007_store_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql as n, db_exports as t };
