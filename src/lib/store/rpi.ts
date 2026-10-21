/**
 * RPI Print API client. Pure: callers inject fetch, base URL and the
 * Authorization value (env RPI_API_AUTH). The auth value is never logged,
 * returned or included in errors.
 */
import {
  RPI_COVER_URL,
  RPI_INTERIOR_URL,
  RPI_ITEM_DESCRIPTION,
  RPI_PAGE_COUNT,
  RPI_SKU,
  type ShipTier,
} from "./config.ts";
import { assertUsableOrderId } from "./order-id.ts";
import { needsCustomsValue } from "./regions.ts";
import { normalizeTier } from "./rules.ts";

export type Address = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  region: string; // state / province code
  postal: string;
  country: string; // ISO-2
  email: string;
  phone?: string;
};

export type ShippingOption = {
  tier: ShipTier;
  priceUsd: number;
  methodName: string | null;
  estimatedShipDate: string | null;
  estimatedDeliveryDate: string | null;
};

export type RpiResult<T> =
  | { kind: "ok"; status: number; data: T }
  | { kind: "http"; status: number; error: string }
  | { kind: "network"; error: string };

type Fetch = typeof fetch;

export function rpiDestination(a: Address) {
  return {
    name: a.name,
    address1: a.address1,
    ...(a.address2 ? { address2: a.address2 } : {}),
    city: a.city,
    regionCode: a.region.toUpperCase(),
    postal: a.postal,
    country: a.country.toUpperCase(),
    email: a.email,
    ...(a.phone ? { phone: a.phone } : {}),
  };
}

export function createOrderBody(args: {
  customerOrderId: string;
  tier: ShipTier;
  address: Address;
  webhookUrl: string;
  payload: string;
  retailPriceUsd: string;
}) {
  assertUsableOrderId(args.customerOrderId);
  return {
    customerOrderId: args.customerOrderId,
    currency: "USD",
    shippingClassification: args.tier,
    webhookUrl: args.webhookUrl,
    payload: args.payload.slice(0, 512),
    destination: rpiDestination(args.address),
    orderItems: [
      {
        sku: RPI_SKU,
        quantity: 1,
        // Always sent; required for customs outside the US customs territory.
        retailPrice: args.retailPriceUsd,
        itemDescription: RPI_ITEM_DESCRIPTION,
        product: { coverUrl: RPI_COVER_URL, gutsUrl: RPI_INTERIOR_URL },
      },
    ],
    _customs: needsCustomsValue(args.address.country, args.address.region),
  };
}

export function createRpiClient(opts: { baseUrl: string; auth: string; fetch?: Fetch; timeoutMs?: number }) {
  const f = opts.fetch ?? fetch;
  const base = opts.baseUrl.replace(/\/+$/, "");
  const timeoutMs = opts.timeoutMs ?? 8000;

  async function call<T>(method: string, path: string, body?: unknown): Promise<RpiResult<T>> {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    try {
      const res = await f(`${base}${path}`, {
        method,
        headers: {
          Authorization: opts.auth,
          Accept: "application/json",
          ...(body ? { "Content-Type": "application/json" } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: ctrl.signal,
      });
      const text = await res.text();
      let data: unknown = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }
      if (res.ok) return { kind: "ok", status: res.status, data: data as T };
      const d = (data ?? {}) as { errorDescription?: string; message?: string };
      return { kind: "http", status: res.status, error: String(d.errorDescription ?? d.message ?? `HTTP ${res.status}`).slice(0, 300) };
    } catch (err) {
      return { kind: "network", error: (err as Error)?.name === "AbortError" ? "timeout" : "network error" };
    } finally {
      clearTimeout(timer);
    }
  }

  return {
    async shippingEstimate(address: Address): Promise<RpiResult<ShippingOption[]>> {
      const r = await call<Array<Record<string, unknown>>>("POST", "/orders/shipping/estimate", {
        currency: "USD",
        destination: rpiDestination(address),
        orderItems: [{ sku: RPI_SKU, quantity: 1, pageCount: RPI_PAGE_COUNT }],
      });
      if (r.kind !== "ok") return r;
      const out: ShippingOption[] = [];
      for (const m of Array.isArray(r.data) ? r.data : []) {
        const tier = normalizeTier(m.methodClassification as string);
        const price = Number(m.price);
        if (!tier || !Number.isFinite(price) || price < 0) continue;
        if (out.some((o) => o.tier === tier)) continue;
        out.push({
          tier,
          priceUsd: Math.round(price * 100) / 100,
          methodName: (m.methodName as string) ?? null,
          estimatedShipDate: (m.estimatedShipDateUTC as string) ?? null,
          estimatedDeliveryDate: (m.estimatedDeliveryDateUTC as string) ?? null,
        });
      }
      return { kind: "ok", status: r.status, data: out };
    },

    /** Print cost per copy from RPI's pricing estimate (pre-create safety stop). */
    async printCostPerCopy(): Promise<RpiResult<number>> {
      const r = await call<{ productionPrice?: number }>("POST", "/pricing/production", {
        currency: "USD",
        orderItems: [{ sku: RPI_SKU, quantity: 1, pageCount: RPI_PAGE_COUNT }],
      });
      if (r.kind !== "ok") return r;
      const p = Number(r.data?.productionPrice);
      if (!Number.isFinite(p)) return { kind: "http", status: 200, error: "no productionPrice" };
      return { kind: "ok", status: 200, data: p };
    },

    getOrder(customerOrderId: string) {
      assertUsableOrderId(customerOrderId);
      return call<RpiFullOrder>("GET", `/orders/${encodeURIComponent(customerOrderId)}`);
    },

    createOrder(body: ReturnType<typeof createOrderBody>) {
      assertUsableOrderId(body.customerOrderId);
      const { _customs: _ignored, ...wire } = body;
      void _ignored;
      return call<{ customerOrderId: string; statusCode: number }>("POST", "/orders/create", wire);
    },

    cancelOrder(customerOrderId: string) {
      assertUsableOrderId(customerOrderId);
      return call<{ status?: string } | RpiFullOrder>("DELETE", `/orders/${encodeURIComponent(customerOrderId)}`);
    },

    async ping() {
      const r = await call<unknown>("GET", "/orders?limit=1");
      return r.kind === "ok" ? { ok: true, status: r.status } : { ok: false, status: r.kind === "http" ? r.status : 0 };
    },
  };
}

export type RpiClient = ReturnType<typeof createRpiClient>;

export type RpiFullOrder = {
  order?: { customerOrderId?: string; status?: string };
  pricing?: { orderTotal?: number | null; itemsTotal?: number; taxesTotal?: number; shippingTotal?: number | null };
  selectedShipping?: { price?: number | null; estimatedDeliveryDateUTC?: string | null };
  shipmentTracking?: Array<{ trackingNumbers?: Array<{ trackingNumber?: string | null; trackingUrl?: string | null }> }>;
  validations?: Array<{ humanReadableString?: string; fatal?: boolean }> | { items?: unknown[] };
  paymentInfo?: { paymentStatus?: string };
};

export type CreateOutcome =
  | { kind: "created" }
  | { kind: "adopted" }
  | { kind: "retry_later"; error: string }
  | { kind: "auth_failed" }
  | { kind: "rejected"; error: string };

/**
 * Create with GET-before-retry. Never invents a new id. On timeout/5xx/network
 * or "already used" 400, GET the same id: 200 → adopt; 404 → retry later
 * (reconcile cron retries with the SAME id).
 */
export async function createWithGetBeforeRetry(
  client: RpiClient,
  body: ReturnType<typeof createOrderBody>,
): Promise<CreateOutcome> {
  const r = await client.createOrder(body);
  if (r.kind === "ok") return { kind: "created" };
  if (r.kind === "http" && (r.status === 401 || r.status === 403)) return { kind: "auth_failed" };
  const ambiguous =
    r.kind === "network" ||
    (r.kind === "http" && r.status >= 500) ||
    (r.kind === "http" && r.status === 400 && /already|exist|duplicate|used/i.test(r.error));
  if (!ambiguous) return { kind: "rejected", error: r.kind === "http" ? r.error : "error" };
  const g = await client.getOrder(body.customerOrderId);
  if (g.kind === "ok") return { kind: "adopted" };
  if (g.kind === "http" && (g.status === 401 || g.status === 403)) return { kind: "auth_failed" };
  if (r.kind === "http" && r.status === 400) {
    return { kind: "rejected", error: "id reported used but GET did not find it" };
  }
  return { kind: "retry_later", error: r.kind === "network" ? r.error : `HTTP ${r.status}` };
}
