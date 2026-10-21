/**
 * Store tests: pure rules + full flow on in-memory PGLite with mocked Stripe
 * and RPI. Real network is blocked: any unmocked fetch throws.
 */
import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { cancelDeadlineFor, isAfterTodayCutoff, nextPostChargeRunUtc } from "./cutoff.ts";
import { formatOrderId, assertUsableOrderId } from "./order-id.ts";
import { checkRegion } from "./regions.ts";
import { capCheck, mapRpiStatus, printCostTooHigh, shippingOverageTooHigh, quoteIsFresh } from "./rules.ts";
import { signCron, signRpiPayload, signStripePayload, verifyCron, verifyRpiSignature, verifyStripeSignature } from "./signatures.ts";
import { createRpiClient, createOrderBody, createWithGetBeforeRetry, type Address } from "./rpi.ts";
import { createStripeClient, formEncode } from "./stripe.ts";
import { createStore } from "./service.ts";

globalThis.fetch = (() => {
  throw new Error("real network call attempted in tests");
}) as typeof fetch;

const ADDR: Address = { name: "Test Buyer", address1: "1 Main St", city: "Chico", region: "CA", postal: "95926", country: "US", email: "buyer@example.com" };

describe("order ids", () => {
  it("starts at 004 and never allows 001-003", () => {
    assert.equal(formatOrderId(4), "emoji-old-masters-440pp-gls-004");
    assert.throws(() => formatOrderId(3));
    assert.throws(() => assertUsableOrderId("emoji-old-masters-440pp-gls-003"));
    assert.throws(() => assertUsableOrderId("emoji-old-masters-440pp-gls-003-r1"));
    assert.equal(formatOrderId(12, "-r1"), "emoji-old-masters-440pp-gls-012-r1");
  });
});

describe("regions", () => {
  it("allows US and CA, refuses military, holds UK/EU as pending", () => {
    assert.deepEqual(checkRegion("US", "CA"), { ok: true });
    assert.deepEqual(checkRegion("ca", "on"), { ok: true });
    assert.equal(checkRegion("US", "AE").ok, false);
    assert.deepEqual(checkRegion("GB", "London"), { ok: false, reason: "pending_country" });
    assert.deepEqual(checkRegion("DE", "BE"), { ok: false, reason: "pending_country" });
    assert.deepEqual(checkRegion("JP", "13"), { ok: false, reason: "unsupported_country" });
  });
});

describe("cutoff", () => {
  it("before 4 PM PT is same day, after is next day (PDT and PST)", () => {
    assert.equal(cancelDeadlineFor(new Date("2026-10-21T17:00:00Z")).toISOString(), "2026-10-21T23:00:00.000Z");
    assert.equal(cancelDeadlineFor(new Date("2026-10-21T23:30:00Z")).toISOString(), "2026-10-22T23:00:00.000Z");
    assert.equal(cancelDeadlineFor(new Date("2026-11-10T18:00:00Z")).toISOString(), "2026-11-11T00:00:00.000Z");
    assert.equal(isAfterTodayCutoff(new Date("2026-10-21T23:30:00Z")), true);
    assert.equal(nextPostChargeRunUtc(new Date("2026-10-21T23:30:00Z")).toISOString(), "2026-10-22T02:15:00.000Z");
  });
});

describe("rules", () => {
  it("caps at 5 orders / $550", () => {
    const base = { maxOrders: 5, maxExposureUsd: 550, nextShippingUsd: 6.99 };
    assert.deepEqual(capCheck({ ...base, ordersToday: 5, exposureTodayUsd: 0 }), { ok: false, reason: "count" });
    assert.deepEqual(capCheck({ ...base, ordersToday: 4, exposureTodayUsd: 450 }), { ok: false, reason: "exposure" });
    assert.deepEqual(capCheck({ ...base, ordersToday: 4, exposureTodayUsd: 400 }), { ok: true });
  });
  it("safety stop and overage", () => {
    assert.equal(printCostTooHigh(87.3), false);
    assert.equal(printCostTooHigh(140.01), true);
    assert.equal(shippingOverageTooHigh(9.0, 699), true);
    assert.equal(shippingOverageTooHigh(8.99, 699), false);
    assert.equal(quoteIsFresh(new Date(0), new Date(30 * 60 * 1000)), true);
    assert.equal(quoteIsFresh(new Date(0), new Date(30 * 60 * 1000 + 1)), false);
    assert.equal(mapRpiStatus("VALID_HOLDING_BIN"), "LOCKED");
  });
});

describe("signatures", () => {
  it("stripe", () => {
    const h = signStripePayload("{}", "whsec_x", 1000);
    assert.equal(verifyStripeSignature("{}", h, "whsec_x", 1000), true);
    assert.equal(verifyStripeSignature("{ }", h, "whsec_x", 1000), false);
    assert.equal(verifyStripeSignature("{}", h, "whsec_x", 2000), false);
    assert.equal(verifyStripeSignature("{}", null, "whsec_x", 1000), false);
  });
  it("rpi and cron", () => {
    assert.equal(verifyRpiSignature("body", signRpiPayload("body", "k"), "k"), true);
    assert.equal(verifyRpiSignature("body2", signRpiPayload("body", "k"), "k"), false);
    assert.equal(verifyCron("reconcile", "1000", signCron("reconcile", 1000, "s"), "s", 1100), true);
    assert.equal(verifyCron("release", "1000", signCron("reconcile", 1000, "s"), "s", 1100), false);
    assert.equal(verifyCron("reconcile", "1000", signCron("reconcile", 1000, "s"), "s", 1400), false);
  });
});

describe("stripe form encoding", () => {
  it("encodes nested shipping options", () => {
    const f = formEncode({ shipping_options: [{ shipping_rate_data: { fixed_amount: { amount: 699 } } }], a: [1] });
    assert.equal(f.get("shipping_options[0][shipping_rate_data][fixed_amount][amount]"), "699");
    assert.equal(f.get("a[0]"), "1");
  });
});

// ---------- mocked HTTP ----------
type Call = { method: string; url: string; body: string | undefined; auth: string | null };
function mockRpi(handlers: Record<string, (c: Call) => { status: number; body?: unknown } | "timeout">) {
  const calls: Call[] = [];
  const f = (async (url: string, init: RequestInit) => {
    const c: Call = { method: init.method ?? "GET", url, body: init.body as string | undefined, auth: (init.headers as Record<string, string>).Authorization ?? null };
    calls.push(c);
    const path = new URL(url).pathname;
    const key = `${c.method} ${path.replace(/emoji-old-masters-440pp-gls-\d+(-r\d+)?/, ":id")}`;
    const h = handlers[key];
    if (!h) throw new Error(`unmocked RPI call ${key}`);
    const r = h(c);
    if (r === "timeout") {
      const e = new Error("aborted");
      e.name = "AbortError";
      throw e;
    }
    return new Response(r.body === undefined ? "" : JSON.stringify(r.body), { status: r.status });
  }) as unknown as typeof fetch;
  return { calls, client: createRpiClient({ baseUrl: "https://rpi.test", auth: "Basic TESTONLY", fetch: f }) };
}

const ESTIMATE = [
  { methodClassification: "standard", price: 6.99, estimatedDeliveryDateUTC: null },
  { methodClassification: "expedited", price: 30.99 },
  { methodClassification: "rush", price: 35.99 },
];

describe("GET-before-retry", () => {
  const body = createOrderBody({ customerOrderId: "emoji-old-masters-440pp-gls-004", tier: "standard", address: ADDR, webhookUrl: "https://x.test/w", payload: "{}", retailPriceUsd: "145.00" });
  it("timeout then GET 200 adopts without a second create", async () => {
    const m = mockRpi({ "POST /orders/create": () => "timeout", "GET /orders/:id": () => ({ status: 200, body: { order: { status: "RECEIVED" } } }) });
    assert.deepEqual(await createWithGetBeforeRetry(m.client, body), { kind: "adopted" });
    assert.equal(m.calls.filter((c) => c.url.endsWith("/orders/create")).length, 1);
  });
  it("5xx then GET 404 retries later with the same id", async () => {
    const m = mockRpi({ "POST /orders/create": () => ({ status: 502 }), "GET /orders/:id": () => ({ status: 404 }) });
    const r = await createWithGetBeforeRetry(m.client, body);
    assert.equal(r.kind, "retry_later");
  });
  it("401 is auth_failed", async () => {
    const m = mockRpi({ "POST /orders/create": () => ({ status: 401 }) });
    assert.deepEqual(await createWithGetBeforeRetry(m.client, body), { kind: "auth_failed" });
  });
  it("sends the R2 files, SKU and retailPrice, never Pinata", () => {
    const s = JSON.stringify(body);
    assert.match(s, /pub-fc606df28da84dbabc0f8782d8ab944e\.r2\.dev/);
    assert.doesNotMatch(s, /pinata/i);
    assert.match(s, /BKPH_HCIW_STD_11\.750x11\.750IN_80C_MT_40_100T_GLS_44/);
    assert.match(s, /"retailPrice":"145.00"/);
  });
});

// ---------- full flow on PGLite ----------
async function freshDb() {
  const pg = new PGlite();
  await pg.exec(readFileSync(new URL("../../../migrations/0007_store.sql", import.meta.url), "utf8"));
  return { pg, sql: { query: async <T>(t: string, p: unknown[] = []) => (await pg.query<T>(t, p)).rows } };
}

function mockStripe(session: () => Record<string, unknown>) {
  const calls: string[] = [];
  const f = (async (url: string, init: RequestInit) => {
    const path = new URL(url).pathname;
    calls.push(`${init.method} ${path}`);
    if (path === "/v1/customers") return Response.json({ id: "cus_test" });
    if (path === "/v1/checkout/sessions") return Response.json({ id: "cs_test_1", url: "https://checkout.stripe.test/1" });
    if (path.startsWith("/v1/checkout/sessions/")) return Response.json(session());
    if (path === "/v1/refunds") return Response.json({ id: "re_1", status: "succeeded" });
    throw new Error(`unmocked stripe ${path}`);
  }) as unknown as typeof fetch;
  return { calls, client: createStripeClient({ secretKey: "sk_test_dummy", fetch: f }) };
}

describe("store flow (mocked Stripe + RPI, in-memory DB)", () => {
  let db: Awaited<ReturnType<typeof freshDb>>;
  beforeEach(async () => {
    db = await freshDb();
  });

  const morning = () => new Date("2026-10-22T16:00:00Z"); // 9 AM PT

  function setup(opts: { rpi?: Parameters<typeof mockRpi>[0]; shipCents?: number; subtotal?: number } = {}) {
    const rpi = mockRpi({
      "POST /orders/shipping/estimate": () => ({ status: 200, body: ESTIMATE }),
      "POST /pricing/production": () => ({ status: 200, body: { productionPrice: 87.3 } }),
      "POST /orders/create": () => ({ status: 201, body: { statusCode: 201 } }),
      "GET /orders/:id": () => ({ status: 200, body: { order: { status: "RECEIVED" }, pricing: { itemsTotal: 87.3, shippingTotal: 6.99 } } }),
      "DELETE /orders/:id": () => ({ status: 200, body: { status: "CANCELLED" } }),
      ...opts.rpi,
    });
    let token = "";
    const stripe = mockStripe(() => ({
      id: "cs_test_1", payment_status: "paid", amount_subtotal: opts.subtotal ?? 14500, amount_total: 15199,
      total_details: { amount_shipping: opts.shipCents ?? 699, amount_tax: 0 }, metadata: { order_token: token },
      payment_intent: { id: "pi_1", latest_charge: { outcome: { risk_level: "normal" } } },
    }));
    const store = createStore({ sql: db.sql, rpi: rpi.client, stripe: stripe.client, baseUrl: "https://emoji.test", now: morning });
    return { store, rpi, stripe, setToken: (t: string) => (token = t) };
  }

  async function buy(s: ReturnType<typeof setup>) {
    const q = await s.store.quote(ADDR);
    assert.ok(q.ok);
    const c = await s.store.checkout(q.quoteId, "standard");
    assert.ok(c.ok);
    const row = (await db.sql.query<{ id: string }>("select id from store_orders"))[0];
    s.setToken(row.id);
    return row.id;
  }

  it("sales default OFF: quote and checkout refuse, no RPI or Stripe calls", async () => {
    const s = setup();
    const q = await s.store.quote(ADDR);
    assert.equal(q.ok, false);
    const c = await s.store.checkout("x".repeat(20), "standard");
    assert.deepEqual(c, { ok: false, status: 503, error: "sales_closed" });
    assert.equal(s.rpi.calls.length, 0);
    assert.equal(s.stripe.calls.length, 0);
  });

  it("paid order creates RPI order 004 once; replayed event is ignored", async () => {
    const s = setup();
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    const ev = { id: "evt_1", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } };
    await s.store.handleStripeEvent(ev);
    assert.deepEqual(await s.store.handleStripeEvent(ev), { handled: "duplicate" });
    const o = await s.store.getOrder(id);
    assert.equal(o?.customer_order_id, "emoji-old-masters-440pp-gls-004");
    assert.equal(o?.state, "RPI_CREATED");
    assert.equal(s.rpi.calls.filter((c) => c.url.endsWith("/orders/create")).length, 1);
    const created = JSON.parse(s.rpi.calls.find((c) => c.url.endsWith("/orders/create"))!.body!);
    assert.equal(created.customerOrderId, "emoji-old-masters-440pp-gls-004");
    assert.equal(created._customs, undefined);
    assert.ok(s.rpi.calls.every((c) => !c.url.includes("-003")));
  });

  it("price mismatch trips the kill switch and holds", async () => {
    const s = setup({ subtotal: 100 });
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_2", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    assert.equal((await s.store.getOrder(id))?.state, "HELD");
    assert.equal(await s.store.salesOpen(), false);
    assert.equal(s.rpi.calls.filter((c) => c.url.endsWith("/orders/create")).length, 0);
  });

  it("print cost above $140 trips the kill switch before any create", async () => {
    const s = setup({ rpi: { "POST /pricing/production": () => ({ status: 200, body: { productionPrice: 141 } }) } });
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_3", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    assert.equal((await s.store.getOrder(id))?.state, "NEEDS_ATTENTION");
    assert.equal(await s.store.salesOpen(), false);
    assert.equal(s.rpi.calls.filter((c) => c.url.endsWith("/orders/create")).length, 0);
  });

  it("paid shipping that differs from the quote is held", async () => {
    const s = setup({ shipCents: 100 });
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_4", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    assert.equal((await s.store.getOrder(id))?.state, "HELD");
  });

  it("daily order cap holds the 6th order", async () => {
    const s = setup();
    await s.store.setSetting("ORDERS_ENABLED", "true");
    await db.sql.query("insert into store_orders (id, state, customer_order_id, paid_at, amount_shipping_cents) select 'o'||g, 'RPI_CREATED', 'emoji-old-masters-440pp-gls-9'||g, $1, 699 from generate_series(10,14) g", [morning().toISOString()]);
    const q = await s.store.quote(ADDR);
    assert.ok(q.ok);
    const c = await s.store.checkout(q.quoteId, "standard");
    assert.deepEqual(c, { ok: false, status: 503, error: "sold_out_today" });
  });

  it("timeout + GET 404 stays RPI_CREATING and reconcile retries with the same id", async () => {
    let creates = 0;
    let found = false;
    const s = setup({
      rpi: {
        "POST /orders/create": () => (++creates === 1 ? "timeout" : (found = true, { status: 201, body: {} })),
        "GET /orders/:id": () => (found ? { status: 200, body: { order: { status: "RECEIVED" }, pricing: { itemsTotal: 87.3 } } } : { status: 404 }),
      },
    });
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_5", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    assert.equal((await s.store.getOrder(id))?.state, "RPI_CREATING");
    await db.sql.query("update store_orders set rpi_next_retry_at = null");
    await s.store.reconcile();
    const o = await s.store.getOrder(id);
    assert.equal(o?.state, "RPI_CREATED");
    const ids = s.rpi.calls.filter((c) => c.url.endsWith("/orders/create")).map((c) => JSON.parse(c.body!).customerOrderId);
    assert.deepEqual(ids, ["emoji-old-masters-440pp-gls-004", "emoji-old-masters-440pp-gls-004"]);
  });

  it("customer cancel before deadline cancels at RPI and refunds", async () => {
    const s = setup();
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_6", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    const r = await s.store.customerCancel(id);
    assert.equal(r.ok, true);
    assert.equal((await s.store.getOrder(id))?.state, "CANCELLED_REFUNDED");
    assert.ok(s.stripe.calls.includes("POST /v1/refunds"));
  });

  it("RPI webhook is a hint: state comes from GET", async () => {
    const s = setup({ rpi: { "GET /orders/:id": () => ({ status: 200, body: { order: { status: "SHIPPED" }, pricing: { itemsTotal: 87.3, shippingTotal: 6.99 }, shipmentTracking: [{ trackingNumbers: [{ trackingNumber: "1Z", trackingUrl: "https://t" }] }] } }) } });
    await s.store.setSetting("ORDERS_ENABLED", "true");
    const id = await buy(s);
    await s.store.handleStripeEvent({ id: "evt_7", type: "checkout.session.completed", data: { object: { id: "cs_test_1" } } });
    const o = await s.store.getOrder(id);
    assert.equal(o?.state, "SHIPPED");
    assert.match(o?.tracking_json ?? "", /1Z/);
    assert.deepEqual(await s.store.handleRpiWebhook("{}", id), { handled: "SHIPPED" });
    assert.deepEqual(await s.store.handleRpiWebhook("{}", id), { handled: "duplicate" });
  });
});
