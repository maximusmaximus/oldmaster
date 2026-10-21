/**
 * Store orchestration with injected dependencies (sql, RPI client, Stripe
 * client, clock), so tests run it on in-memory PGLite with mocked HTTP.
 * Rules: never create an RPI order unless sales are ON, under caps, paid,
 * amount-checked and print cost is within the safety stop. Never touch ids
 * at or below -003. Never log addresses, tokens or secrets.
 */
import { randomBytes, createHash } from "node:crypto";
import {
  BOOK_PRICE_CENTS,
  DEFAULT_MAX_EXPOSURE_USD_PER_DAY,
  DEFAULT_MAX_ORDERS_PER_DAY,
  EDITION_SIZE,
  EXPECTED_PRINT_COST_USD,
  REASON_TEXT,
  RESERVATION_MS,
  type UnavailableReason,
  type ShipTier,
} from "./config.ts";
import { cancelDeadlineFor, isAfterTodayCutoff, nextPostChargeRunUtc, nextPtMidnightUtc, ptDayStartUtc } from "./cutoff.ts";
import { formatOrderId } from "./order-id.ts";
import { checkRegion, REGION_MESSAGES } from "./regions.ts";
import {
  capCheck,
  customerCanCancel,
  isForward,
  mapRpiStatus,
  MAX_CREATE_ATTEMPTS,
  printCostTooHigh,
  quoteIsFresh,
  RETRY_BACKOFF_MIN,
  shippingOverageTooHigh,
  subtotalIsExpected,
  exposureAlert,
  rpiTotalTooHigh,
  type SiteState,
} from "./rules.ts";
import { createOrderBody, createWithGetBeforeRetry, type Address, type RpiClient, type RpiFullOrder, type ShippingOption } from "./rpi.ts";
import { checkoutSessionParams, type StripeClient, type StripeSession } from "./stripe.ts";

export interface StoreSql {
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
}

export type StoreDeps = {
  sql: StoreSql;
  rpi: RpiClient | null; // null when RPI_API_AUTH is not set
  stripe: StripeClient | null; // null when STRIPE_SECRET_KEY is not set
  baseUrl: string;
  now?: () => Date;
};

export type OrderRow = {
  id: string;
  state: SiteState;
  quote_id: string | null;
  ship_tier: ShipTier | null;
  quoted_shipping_cents: number | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  customer_order_id: string | null;
  rpi_attempt: number;
  rpi_status: string | null;
  rpi_next_retry_at: Date | string | null;
  address_json: string | null;
  amount_shipping_cents: number | null;
  amount_total_cents: number | null;
  cancel_deadline_utc: Date | string | null;
  deferred_until_utc: Date | string | null;
  tracking_json: string | null;
  last_error: string | null;
  created_at: Date | string;
  paid_at: Date | string | null;
};

const token = () => randomBytes(16).toString("base64url");
const asDate = (v: Date | string | null | undefined) => (v ? new Date(v) : null);

export function createStore(deps: StoreDeps) {
  const { sql } = deps;
  const now = deps.now ?? (() => new Date());

  // ---------- settings / audit / alerts ----------
  async function getSetting(key: string): Promise<string> {
    const r = await sql.query<{ value: string }>("select value from store_settings where key = $1", [key]);
    return r[0]?.value ?? "";
  }
  async function setSetting(key: string, value: string) {
    await sql.query(
      "insert into store_settings (key, value) values ($1, $2) on conflict (key) do update set value = excluded.value",
      [key, value],
    );
  }
  async function salesOpen(): Promise<boolean> {
    return (await getSetting("ORDERS_ENABLED")) === "true";
  }
  async function audit(orderId: string | null, from: string | null, to: string | null, actor: string, note = "") {
    await sql.query(
      "insert into store_audit (order_id, from_state, to_state, actor, note) values ($1, $2, $3, $4, $5)",
      [orderId, from, to, actor, note.slice(0, 500)],
    );
  }
  async function alert(level: "info" | "warn" | "critical", message: string, orderId: string | null = null) {
    await sql.query("insert into store_alerts (level, message, order_id) values ($1, $2, $3)", [level, message.slice(0, 500), orderId]);
  }
  async function tripKillSwitch(reason: string) {
    await setSetting("ORDERS_ENABLED", "false");
    await setSetting("KILL_REASON", reason);
    await audit(null, null, null, "system", `kill switch: ${reason}`);
    await alert("critical", `Sales turned OFF automatically: ${reason}`);
  }
  async function bump(name: string, windowMs: number): Promise<number> {
    const t = now();
    const rows = await sql.query<{ window_start: Date | string; count: number }>(
      "select window_start, count from store_counters where name = $1",
      [name],
    );
    const row = rows[0];
    if (!row || t.getTime() - new Date(row.window_start).getTime() > windowMs) {
      await sql.query(
        "insert into store_counters (name, window_start, count) values ($1, $2, 1) on conflict (name) do update set window_start = $2, count = 1",
        [name, t.toISOString()],
      );
      return 1;
    }
    await sql.query("update store_counters set count = count + 1 where name = $1", [name]);
    return Number(row.count) + 1;
  }
  async function noteBadSignature(source: string) {
    const n = await bump(`badsig:${source}`, 60 * 60 * 1000);
    if (n > 20) await tripKillSwitch(`more than 20 bad ${source} webhook signatures in an hour`);
  }

  // ---------- orders ----------
  async function getOrder(id: string): Promise<OrderRow | null> {
    const r = await sql.query<OrderRow>("select * from store_orders where id = $1", [id]);
    return r[0] ?? null;
  }
  async function transition(o: OrderRow, to: SiteState, actor: string, note = "", extra: Record<string, unknown> = {}) {
    const cols = Object.keys(extra);
    const sets = ["state = $2", "updated_at = now()", ...cols.map((c, i) => `${c} = $${i + 3}`)];
    await sql.query(`update store_orders set ${sets.join(", ")} where id = $1`, [o.id, to, ...cols.map((c) => extra[c])]);
    await audit(o.id, o.state, to, actor, note);
    o.state = to;
    Object.assign(o, extra);
  }

  /**
   * Counting rules (Max, Oct 21, 2026):
   * - a copy is "taken" by a paid order that wasn't cancelled/refunded, or by an
   *   open Checkout Session created in the last 30 minutes (a reservation);
   * - the edition counts all taken copies; the daily limit counts copies taken
   *   since midnight PT.
   * SQL fragments are shared by the status read and the atomic checkout insert.
   */
  const TAKEN_SQL = `((paid_at is not null and state <> 'CANCELLED_REFUNDED')
      or (state = 'CHECKOUT_OPEN' and stripe_session_id is not null and created_at >= $RES))`;
  const TODAY_SQL = `((paid_at is not null and state <> 'CANCELLED_REFUNDED' and paid_at >= $DAY)
      or (state = 'CHECKOUT_OPEN' and stripe_session_id is not null and created_at >= $RES))`;

  function windows() {
    const t = now();
    return { day: ptDayStartUtc(t).toISOString(), res: new Date(t.getTime() - RESERVATION_MS).toISOString(), resetsAt: nextPtMidnightUtc(t).toISOString() };
  }

  async function capStatus(_nextShippingUsd: number, excludeOrderId: string | null = null) {
    const w = windows();
    const where = TODAY_SQL.replaceAll("$DAY", "$1").replaceAll("$RES", "$2");
    const rows = await sql.query<{ n: number; ship: number | null }>(
      `select count(*)::int as n, coalesce(sum(coalesce(amount_shipping_cents, quoted_shipping_cents, 0)), 0)::int as ship
       from store_orders where ${where} and ($3::text is null or id <> $3)`,
      [w.day, w.res, excludeOrderId],
    );
    const n = Number(rows[0]?.n ?? 0);
    const exposure = Math.round((n * EXPECTED_PRINT_COST_USD + Number(rows[0]?.ship ?? 0) / 100) * 1.1 * 100) / 100;
    const maxOrders = Number(await getSetting("MAX_RPI_ORDERS_PER_DAY")) || DEFAULT_MAX_ORDERS_PER_DAY;
    const maxExposure = Number(await getSetting("MAX_RPI_EXPOSURE_USD_PER_DAY")) || DEFAULT_MAX_EXPOSURE_USD_PER_DAY;
    return { ordersToday: n, exposureTodayUsd: exposure, maxOrders, maxExposure, resetsAt: w.resetsAt, result: capCheck({ ordersToday: n, maxOrders }) };
  }

  async function copiesTaken(excludeOrderId: string | null = null): Promise<number> {
    const w = windows();
    const where = TAKEN_SQL.replaceAll("$RES", "$1");
    const r = await sql.query<{ n: number }>(
      `select count(*)::int as n from store_orders where ${where} and ($2::text is null or id <> $2)`,
      [w.res, excludeOrderId],
    );
    return Number(r[0]?.n ?? 0);
  }

  /** Buyer-facing availability for /api/store/status, /book and the order page. */
  async function availability() {
    const taken = await copiesTaken();
    const caps = await capStatus(0);
    const editionRemaining = Math.max(0, EDITION_SIZE - taken);
    const countLeft = Math.max(0, caps.maxOrders - caps.ordersToday);
    const reason: UnavailableReason | null =
      editionRemaining === 0 ? "edition_sold_out" : countLeft === 0 ? "daily_count_reached" : null;
    return {
      editionSize: EDITION_SIZE,
      editionRemaining,
      soldOut: editionRemaining === 0,
      dailyLimit: caps.maxOrders,
      // Never advertise copies "left today" while orders can't actually be placed.
      dailyRemaining: reason ? 0 : Math.min(countLeft, editionRemaining),
      dailySoldOut: countLeft === 0,
      dailyCapReached: countLeft === 0,
      unavailableReason: reason,
      dailyResetsAt: caps.resetsAt,
    };
  }

  // ---------- quote ----------
  async function quote(address: Address): Promise<{ ok: true; quoteId: string; options: ShippingOption[] } | { ok: false; status: number; error: string; reason?: UnavailableReason }> {
    const region = checkRegion(address.country, address.region);
    if (!region.ok) return { ok: false, status: 422, error: REGION_MESSAGES[region.reason] };
    if (!(await salesOpen())) return { ok: false, status: 503, error: "Sales open soon." };
    const avail = await availability();
    if (avail.unavailableReason) return { ok: false, status: 409, error: REASON_TEXT[avail.unavailableReason], reason: avail.unavailableReason };
    if (!deps.rpi) return { ok: false, status: 503, error: "Shipping quotes are unavailable right now." };
    const r = await deps.rpi.shippingEstimate(address);
    if (r.kind === "http" && (r.status === 401 || r.status === 403)) {
      await tripKillSwitch("RPI auth failed (shipping estimate)");
      return { ok: false, status: 503, error: "Shipping quotes are unavailable right now." };
    }
    if (r.kind === "http" && r.status === 400) return { ok: false, status: 422, error: "Our printer can't ship to that address. Please check it." };
    if (r.kind !== "ok") return { ok: false, status: 502, error: "Shipping quotes are unavailable right now. Please try again." };
    if (r.data.length === 0) return { ok: false, status: 422, error: "No shipping options for that address." };
    const id = token();
    await sql.query("insert into store_quotes (id, address_json, options_json, created_at) values ($1, $2, $3, $4)", [id, JSON.stringify(address), JSON.stringify(r.data), now().toISOString()]);
    return { ok: true, quoteId: id, options: r.data };
  }

  // ---------- checkout ----------
  async function checkout(quoteId: string, tier: ShipTier): Promise<{ ok: true; url: string } | { ok: false; status: number; error: string }> {
    if (!(await salesOpen())) return { ok: false, status: 503, error: "sales_closed" };
    if (!deps.stripe) return { ok: false, status: 503, error: "checkout_unavailable" };
    const q = (await sql.query<{ id: string; address_json: string; options_json: string; created_at: Date | string }>("select * from store_quotes where id = $1", [quoteId]))[0];
    if (!q) return { ok: false, status: 404, error: "quote_not_found" };
    if (!quoteIsFresh(new Date(q.created_at), now())) return { ok: false, status: 410, error: "quote_expired" };
    const option = (JSON.parse(q.options_json) as ShippingOption[]).find((o) => o.tier === tier);
    if (!option) return { ok: false, status: 422, error: "tier_unavailable" };
    const caps = await capStatus(option.priceUsd);
    if (!caps.result.ok) return { ok: false, status: 409, error: "daily_count_reached" };
    const address = JSON.parse(q.address_json) as Address;
    const orderToken = token();
    // Atomic reservation: one statement inserts the order only while both the
    // edition and today's count (paid + open reservations) have room. The row is
    // a reservation from now on (stripe_session_id is set right after).
    const w = windows();
    const taken = TAKEN_SQL.replaceAll("$RES", "$8");
    const today = TODAY_SQL.replaceAll("$DAY", "$7").replaceAll("$RES", "$8");
    const inserted = await sql.query<{ id: string }>(
      `insert into store_orders (id, state, quote_id, ship_tier, quoted_shipping_cents, address_json, created_at, stripe_session_id)
       select $1, 'CHECKOUT_OPEN', $2, $3, $4, $5, $6, 'pending:' || $1
       where (select count(*) from store_orders where ${taken}) < $9
         and (select count(*) from store_orders where ${today}) < $10
       returning id`,
      [orderToken, quoteId, tier, Math.round(option.priceUsd * 100), q.address_json, now().toISOString(), w.day, w.res, EDITION_SIZE, caps.maxOrders],
    );
    if (inserted.length === 0) {
      const a = await availability();
      return { ok: false, status: 409, error: a.unavailableReason ?? (a.soldOut ? "edition_sold_out" : "daily_count_reached") };
    }
    try {
      const customer = await deps.stripe.createCustomer(address, `cus-${orderToken}`);
      const session = await deps.stripe.createCheckoutSession(
        checkoutSessionParams({ orderToken, quoteId, customerId: customer.id, option, baseUrl: deps.baseUrl }),
        `cs-${orderToken}`,
      );
      await sql.query("update store_orders set stripe_session_id = $2, stripe_customer_id = $3, updated_at = now() where id = $1", [orderToken, session.id, customer.id]);
      return { ok: true, url: session.url };
    } catch {
      await sql.query("update store_orders set state = 'EXPIRED', stripe_session_id = null, last_error = 'stripe session failed' where id = $1", [orderToken]);
      return { ok: false, status: 502, error: "checkout_unavailable" };
    }
  }

  // ---------- RPI create ----------
  async function allocateOrderId(o: OrderRow): Promise<string> {
    if (o.customer_order_id) return o.customer_order_id;
    const r = await sql.query<{ seq: string }>(
      "update store_settings set value = (value::int + 1)::text where key = 'NEXT_ORDER_SEQ' returning ((value::int) - 1)::text as seq",
    );
    const id = formatOrderId(Number(r[0]?.seq));
    const upd = await sql.query<{ customer_order_id: string }>(
      "update store_orders set customer_order_id = coalesce(customer_order_id, $2), updated_at = now() where id = $1 returning customer_order_id",
      [o.id, id],
    );
    o.customer_order_id = upd[0]?.customer_order_id ?? id;
    return o.customer_order_id;
  }

  async function rpiCreate(o: OrderRow, actor: string) {
    if (!deps.rpi) {
      await transition(o, "HELD", actor, "RPI not configured");
      await alert("warn", "Order held: RPI_API_AUTH not set", o.id);
      return;
    }
    if (!(await salesOpen())) {
      if (o.state !== "HELD") await transition(o, "HELD", actor, "sales off");
      return;
    }
    // Safety stop: print cost per copy.
    const pc = await deps.rpi.printCostPerCopy();
    if (pc.kind === "http" && (pc.status === 401 || pc.status === 403)) {
      await tripKillSwitch("RPI auth failed");
      if (o.state !== "HELD") await transition(o, "HELD", actor, "rpi auth failed");
      return;
    }
    if (pc.kind === "ok" && printCostTooHigh(pc.data)) {
      await tripKillSwitch(`RPI print cost $${pc.data.toFixed(2)} is above $140 per copy`);
      await transition(o, "NEEDS_ATTENTION", actor, "print cost above safety stop");
      return;
    }
    const id = await allocateOrderId(o);
    if (o.state !== "RPI_CREATING") await transition(o, "RPI_CREATING", actor, id);
    await sql.query("update store_orders set rpi_attempt = rpi_attempt + 1 where id = $1", [o.id]);
    o.rpi_attempt += 1;
    const address = JSON.parse(o.address_json ?? "{}") as Address;
    const body = createOrderBody({
      customerOrderId: id,
      tier: (o.ship_tier ?? "standard") as ShipTier,
      address,
      webhookUrl: `${deps.baseUrl}/api/store/rpi-webhook?o=${o.id}`,
      payload: JSON.stringify({ s: o.stripe_session_id, t: o.id }),
      retailPriceUsd: (BOOK_PRICE_CENTS / 100).toFixed(2),
    });
    const out = await createWithGetBeforeRetry(deps.rpi, body);
    if (out.kind === "created" || out.kind === "adopted") {
      await transition(o, "RPI_CREATED", actor, out.kind, { rpi_next_retry_at: null, last_error: null });
      await syncFromRpi(o, actor);
      return;
    }
    if (out.kind === "auth_failed") {
      await tripKillSwitch("RPI auth failed (401/403)");
      await sql.query("update store_orders set rpi_next_retry_at = $2 where id = $1", [o.id, new Date(now().getTime() + 15 * 60_000).toISOString()]);
      return;
    }
    if (out.kind === "rejected") {
      await transition(o, "NEEDS_ATTENTION", actor, "rpi rejected create", { last_error: out.error });
      await alert("warn", `RPI refused order ${id}: ${out.error}`, o.id);
      return;
    }
    if (o.rpi_attempt >= MAX_CREATE_ATTEMPTS) {
      await transition(o, "NEEDS_ATTENTION", actor, "create retries exhausted", { last_error: out.error });
      await alert("warn", `RPI create for ${id} failed ${o.rpi_attempt} times`, o.id);
      return;
    }
    const mins = RETRY_BACKOFF_MIN[Math.min(o.rpi_attempt - 1, RETRY_BACKOFF_MIN.length - 1)];
    await sql.query("update store_orders set rpi_next_retry_at = $2, last_error = $3 where id = $1", [o.id, new Date(now().getTime() + mins * 60_000).toISOString(), out.error]);
  }

  async function syncFromRpi(o: OrderRow, actor: string, full?: RpiFullOrder) {
    if (!deps.rpi || !o.customer_order_id) return;
    let data = full;
    if (!data) {
      const g = await deps.rpi.getOrder(o.customer_order_id);
      if (g.kind === "http" && (g.status === 401 || g.status === 403)) return tripKillSwitch("RPI auth failed (GET)");
      if (g.kind !== "ok") return;
      data = g.data;
    }
    const status = data.order?.status ?? null;
    await sql.query("update store_orders set rpi_status = $2, updated_at = now() where id = $1", [o.id, status]);
    const items = data.pricing?.itemsTotal;
    if (printCostTooHigh(items)) {
      await tripKillSwitch(`RPI item total $${items} above $140 per copy`);
      if (o.state !== "LOCKED" && o.state !== "SHIPPED") await deps.rpi.cancelOrder(o.customer_order_id);
      await transition(o, "NEEDS_ATTENTION", actor, "item total above safety stop");
      return;
    }
    const total = data.pricing?.orderTotal;
    if (rpiTotalTooHigh(total, o.amount_shipping_cents) && o.state !== "NEEDS_ATTENTION") {
      await alert("critical", `RPI total $${total} for ${o.customer_order_id} is above $145 + paid shipping + 15%; held. Cancel+Refund before RPI's 02:00 UTC charge or within the 2-hour holding bin if needed.`, o.id);
      await transition(o, "NEEDS_ATTENTION", actor, "rpi total above per-order limit");
      return;
    }
    const ship = data.pricing?.shippingTotal ?? data.selectedShipping?.price;
    if (o.amount_shipping_cents != null && shippingOverageTooHigh(ship, o.amount_shipping_cents) && o.state !== "NEEDS_ATTENTION") {
      await alert("warn", `RPI shipping $${ship} exceeds paid shipping by more than $2`, o.id);
      await transition(o, "NEEDS_ATTENTION", actor, "shipping overage");
      return;
    }
    if (status === "CANCELLED") return;
    const to = mapRpiStatus(status);
    if (!to || to === o.state || !isForward(o.state, to)) return;
    const extra: Record<string, unknown> = {};
    if (to === "LOCKED") extra.locked_at = now().toISOString();
    if (to === "SHIPPED") {
      extra.shipped_at = now().toISOString();
      const tracking = (data.shipmentTracking ?? []).flatMap((t) => t.trackingNumbers ?? []).map((t) => ({ number: t.trackingNumber ?? null, url: t.trackingUrl ?? null }));
      extra.tracking_json = JSON.stringify(tracking);
    }
    if (to === "NEEDS_ATTENTION" || to === "PREFLIGHT_REJECTED" || to === "RPI_REJECTED") {
      await alert(status === "REJECTED" ? "critical" : "warn", status === "REJECTED" ? `RPI rejected ${o.customer_order_id}: its order-limit queue was full. Not resubmitted; decide in admin.` : `RPI status ${status} for ${o.customer_order_id}`, o.id);
    }
    await transition(o, to, actor, `rpi ${status}`, extra);
  }

  // ---------- Stripe webhook ----------
  async function handleStripeEvent(event: { id: string; type: string; data: { object: Record<string, unknown> } }) {
    const ins = await sql.query<{ event_id: string }>(
      "insert into store_stripe_events (event_id, type) values ($1, $2) on conflict (event_id) do nothing returning event_id",
      [event.id, event.type],
    );
    if (ins.length === 0) return { handled: "duplicate" };
    const obj = event.data.object;
    if (event.type === "checkout.session.expired") {
      const o = await getOrder(String((obj.metadata as Record<string, string> | undefined)?.order_token ?? ""));
      if (o && o.state === "CHECKOUT_OPEN") await transition(o, "EXPIRED", "stripe");
      return { handled: "expired" };
    }
    if (event.type === "charge.dispute.created" || event.type === "radar.early_fraud_warning.created") {
      const n = await bump("disputes", 7 * 86_400_000);
      await alert("critical", `Stripe ${event.type}`);
      if (n > 3) await tripKillSwitch("more than 3 disputes or fraud warnings in 7 days");
      return { handled: "dispute" };
    }
    if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
      return { handled: "ignored" };
    }
    if (!deps.stripe) return { handled: "no_stripe" };
    const sessionId = String(obj.id ?? "");
    const s: StripeSession = await deps.stripe.retrieveSession(sessionId);
    if (s.payment_status !== "paid") return { handled: "not_paid" };
    const o = await getOrder(String(s.metadata?.order_token ?? ""));
    if (!o || o.stripe_session_id !== s.id) return { handled: "no_order" };
    if (o.state !== "CHECKOUT_OPEN" && o.state !== "EXPIRED") return { handled: "already_processed" };
    const pi = typeof s.payment_intent === "string" ? s.payment_intent : s.payment_intent?.id ?? null;
    const charge = typeof s.payment_intent === "object" ? s.payment_intent?.latest_charge : undefined;
    const risk = typeof charge === "object" ? charge?.outcome?.risk_level ?? null : null;
    const paidAt = now();
    const deadline = cancelDeadlineFor(paidAt);
    const shipCents = s.total_details?.amount_shipping ?? null;
    await transition(o, "PAID", "stripe", "", {
      stripe_payment_intent_id: pi,
      amount_subtotal_cents: s.amount_subtotal ?? null,
      amount_total_cents: s.amount_total ?? null,
      amount_tax_cents: s.total_details?.amount_tax ?? null,
      amount_shipping_cents: shipCents,
      paid_at: paidAt.toISOString(),
      cancel_deadline_utc: deadline.toISOString(),
      risk_level: risk,
    });
    if (!subtotalIsExpected(s.amount_subtotal)) {
      await tripKillSwitch(`paid subtotal ${s.amount_subtotal} is not ${BOOK_PRICE_CENTS}`);
      await transition(o, "HELD", "stripe", "price mismatch");
      return { handled: "held_price" };
    }
    if ((await copiesTaken(o.id)) >= EDITION_SIZE) {
      await alert("warn", "Paid after the edition sold out; refunded", o.id);
      await transition(o, "HELD", "stripe", "edition sold out");
      await refund(o, "stripe", "edition sold out: refunded");
      return { handled: "sold_out_refunded" };
    }
    if (shipCents !== o.quoted_shipping_cents) {
      await transition(o, "HELD", "stripe", "shipping amount differs from quote");
      await alert("warn", "Paid shipping differs from the quote; order held", o.id);
      return { handled: "held_shipping" };
    }
    const caps = await capStatus((shipCents ?? 0) / 100, o.id); // exclude this order itself
    const todayAll = await capStatus(0);
    if (exposureAlert(todayAll.exposureTodayUsd, todayAll.maxExposure)) {
      await alert("info", `Today's estimated RPI spend is above the alert threshold ($${todayAll.maxExposure})`);
    }
    if (!(await salesOpen()) || !caps.result.ok || risk === "elevated" || risk === "highest") {
      await transition(o, "HELD", "stripe", !caps.result.ok ? `cap ${caps.result.ok ? "" : caps.result.reason}` : risk ? `risk ${risk}` : "sales off");
      await alert("info", "Paid order held for review", o.id);
      return { handled: "held" };
    }
    if (isAfterTodayCutoff(paidAt)) {
      await transition(o, "DEFERRED", "stripe", "after 4 PM PT", { deferred_until_utc: nextPostChargeRunUtc(paidAt).toISOString() });
      return { handled: "deferred" };
    }
    await rpiCreate(o, "stripe");
    return { handled: o.state };
  }

  // ---------- RPI webhook ----------
  async function handleRpiWebhook(rawBody: string, orderToken: string | null) {
    const hash = createHash("sha256").update(rawBody).digest("hex");
    let cid: string | null = null;
    let source = "";
    try {
      const parsed = JSON.parse(rawBody) as { data?: RpiFullOrder; source?: string };
      cid = parsed.data?.order?.customerOrderId ?? null;
      source = String(parsed.source ?? "");
    } catch {
      cid = null;
    }
    const ins = await sql.query<{ body_sha256: string }>(
      "insert into store_rpi_events (body_sha256, customer_order_id) values ($1, $2) on conflict (body_sha256) do nothing returning body_sha256",
      [hash, cid],
    );
    if (ins.length === 0) return { handled: "duplicate" };
    let o = orderToken ? await getOrder(orderToken) : null;
    if (!o && cid) o = (await sql.query<OrderRow>("select * from store_orders where customer_order_id = $1", [cid]))[0] ?? null;
    // Account-level payment events may not name one of our orders.
    if (source === "PaymentFailure") await alert("critical", "RPI card payment failed; RPI retries the next day. Check the card on the RPI dashboard.", o?.id ?? null);
    if (source === "PaymentSuccessful") await audit(o?.id ?? null, null, null, "rpi", "PaymentSuccessful");
    if (!o || !o.customer_order_id) return { handled: source ? `account:${source}` : "unknown_order" };
    if (source === "OrderOverLimitQueued") {
      await audit(o.id, o.state, o.state, "rpi", "OrderOverLimitQueued: waiting in RPI's limit queue");
      await alert("info", `${o.customer_order_id} is waiting in RPI's order-limit queue`, o.id);
    }
    if (source === "OrderExitedLimitQueue") await audit(o.id, o.state, o.state, "rpi", "OrderExitedLimitQueue");
    if (source === "OrderExceedsLimitQueue") {
      await alert("critical", `RPI rejected ${o.customer_order_id}: limit queue full. Not resubmitted.`, o.id);
      if (o.state !== "NEEDS_ATTENTION") await transition(o, "NEEDS_ATTENTION", "rpi", "OrderExceedsLimitQueue");
    }
    await syncFromRpi(o, "rpi"); // webhook is a hint; GET is the truth
    return { handled: o.state };
  }

  // ---------- cancel / refund ----------
  async function refund(o: OrderRow, actor: string, note: string) {
    if (!deps.stripe || !o.stripe_payment_intent_id) {
      await transition(o, "NEEDS_ATTENTION", actor, "refund not possible automatically");
      return;
    }
    await deps.stripe.refund(o.stripe_payment_intent_id, `refund-${o.id}`);
    await transition(o, "CANCELLED_REFUNDED", actor, note);
  }

  async function customerCancel(orderToken: string): Promise<{ ok: boolean; state?: string; error?: string }> {
    const o = await getOrder(orderToken);
    if (!o) return { ok: false, error: "not_found" };
    if (!customerCanCancel(o.state, asDate(o.cancel_deadline_utc), now())) return { ok: false, error: "not_cancellable" };
    return cancelOrder(o, "customer");
  }

  async function cancelOrder(o: OrderRow, actor: string): Promise<{ ok: boolean; state?: string; error?: string }> {
    if (!o.customer_order_id || o.state === "PAID" || o.state === "DEFERRED" || o.state === "HELD") {
      if (o.customer_order_id && deps.rpi) {
        const g = await deps.rpi.getOrder(o.customer_order_id);
        if (g.kind === "ok") return cancelAtRpi(o, actor);
      }
      await refund(o, actor, "cancelled before RPI order");
      return { ok: true, state: o.state };
    }
    return cancelAtRpi(o, actor);
  }

  async function cancelAtRpi(o: OrderRow, actor: string) {
    if (!deps.rpi || !o.customer_order_id) return { ok: false, error: "rpi_unavailable" };
    const r = await deps.rpi.cancelOrder(o.customer_order_id);
    const status = r.kind === "ok" ? ((r.data as { status?: string }).status ?? (r.data as RpiFullOrder).order?.status) : null;
    if (r.kind === "ok" && status === "CANCELLED") {
      await refund(o, actor, "cancelled at RPI");
      return { ok: true, state: o.state };
    }
    if (o.state !== "CANCEL_REQUESTED") await transition(o, "CANCEL_REQUESTED", actor, `rpi cancel ${status ?? (r.kind === "http" ? r.status : r.kind)}`);
    return { ok: true, state: o.state };
  }

  // ---------- reprint ----------
  async function requestReprint(orderToken: string, description: string) {
    const o = await getOrder(orderToken);
    if (!o || o.state !== "SHIPPED") return { ok: false, error: "not_eligible" };
    const id = token();
    await sql.query("insert into store_reprint_requests (id, order_id, description) values ($1, $2, $3)", [id, o.id, description.slice(0, 2000)]);
    await alert("warn", "Reprint request received", o.id);
    return { ok: true };
  }

  // ---------- cron ----------
  async function reconcile() {
    const t = now().toISOString();
    const due = await sql.query<OrderRow>(
      "select * from store_orders where state = 'RPI_CREATING' and (rpi_next_retry_at is null or rpi_next_retry_at <= $1) order by created_at limit 10",
      [t],
    );
    for (const o of due) await rpiCreate(o, "cron");
    const active = await sql.query<OrderRow>(
      "select * from store_orders where state in ('RPI_CREATED','CANCEL_WINDOW','LOCKED','CANCEL_REQUESTED') and customer_order_id is not null order by updated_at limit 25",
    );
    for (const o of active) {
      if (o.state === "CANCEL_REQUESTED") await cancelAtRpi(o, "cron");
      else await syncFromRpi(o, "cron");
    }
    return { retried: due.length, synced: active.length };
  }

  async function releaseDeferred() {
    const due = await sql.query<OrderRow>(
      "select * from store_orders where state = 'DEFERRED' and deferred_until_utc <= $1 order by paid_at limit 10",
      [now().toISOString()],
    );
    for (const o of due) {
      const caps = await capStatus((o.amount_shipping_cents ?? 0) / 100, o.id);
      if (!(await salesOpen()) || !caps.result.ok) {
        await transition(o, "HELD", "cron", "sales off or cap at release");
        continue;
      }
      await rpiCreate(o, "cron");
    }
    return { released: due.length };
  }

  async function daily() {
    await sql.query("delete from store_quotes where created_at < $1 and id not in (select quote_id from store_orders where quote_id is not null)", [new Date(now().getTime() - 86_400_000).toISOString()]);
    const stuck = await sql.query<{ n: number }>("select count(*)::int as n from store_orders where state in ('HELD','NEEDS_ATTENTION')");
    if (Number(stuck[0]?.n) > 0) await alert("info", `${stuck[0]?.n} order(s) need review`);
    return { ok: true };
  }

  // ---------- admin ----------
  async function adminRelease(orderId: string) {
    const o = await getOrder(orderId);
    if (!o || (o.state !== "HELD" && o.state !== "NEEDS_ATTENTION")) return { ok: false, error: "not_releasable" };
    if (!(await salesOpen())) return { ok: false, error: "sales_off" };
    await rpiCreate(o, "admin");
    return { ok: true, state: o.state };
  }
  async function adminCancelRefund(orderId: string) {
    const o = await getOrder(orderId);
    if (!o || ["CANCELLED_REFUNDED", "EXPIRED", "CHECKOUT_OPEN", "SHIPPED"].includes(o.state)) return { ok: false, error: "not_cancellable" };
    return cancelOrder(o, "admin");
  }

  return {
    getSetting, setSetting, salesOpen, tripKillSwitch, noteBadSignature, alert,
    getOrder, capStatus, availability, copiesTaken, quote, checkout, rpiCreate, syncFromRpi,
    handleStripeEvent, handleRpiWebhook, customerCancel, requestReprint,
    reconcile, releaseDeferred, daily, adminRelease, adminCancelRefund,
  };
}

export type Store = ReturnType<typeof createStore>;
