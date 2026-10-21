/**
 * Minimal Stripe REST client (form-encoded) so the store needs no SDK.
 * Pure: callers inject fetch and the secret key. Never logs the key.
 */
import { BOOK_CURRENCY, BOOK_PRICE_CENTS, BOOK_TAX_CODE, BOOK_TITLE, TEXT_REFUND, TIER_LABEL } from "./config.ts";
import type { Address, ShippingOption } from "./rpi.ts";

/** Uses the Stripe account's default API version (set in the Dashboard). */

type Fetch = typeof fetch;

/** Flatten nested objects/arrays into Stripe's bracket form encoding. */
export function formEncode(obj: Record<string, unknown>, prefix = "", out = new URLSearchParams()): URLSearchParams {
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null) continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (Array.isArray(v)) {
      v.forEach((item, i) => {
        if (item !== null && typeof item === "object") formEncode(item as Record<string, unknown>, `${key}[${i}]`, out);
        else out.append(`${key}[${i}]`, String(item));
      });
    } else if (typeof v === "object") {
      formEncode(v as Record<string, unknown>, key, out);
    } else {
      out.append(key, String(v));
    }
  }
  return out;
}

function daysUntil(iso: string | null, now: Date): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return null;
  return Math.max(1, Math.ceil((t - now.getTime()) / 86_400_000));
}

export function shippingOptionsFor(options: ShippingOption[], now = new Date()) {
  return options.map((o) => {
    const days = daysUntil(o.estimatedDeliveryDate, now);
    return {
      shipping_rate_data: {
        type: "fixed_amount",
        display_name: `${TIER_LABEL[o.tier]} (printed to order)`,
        fixed_amount: { amount: Math.round(o.priceUsd * 100), currency: BOOK_CURRENCY },
        tax_behavior: "exclusive",
        metadata: { tier: o.tier },
        ...(days
          ? { delivery_estimate: { minimum: { unit: "business_day", value: days }, maximum: { unit: "business_day", value: days + 3 } } }
          : {}),
      },
    };
  });
}

export function checkoutSessionParams(args: {
  orderToken: string;
  quoteId: string;
  customerId: string;
  option: ShippingOption;
  baseUrl: string;
}) {
  const orderUrl = `${args.baseUrl}/order/${args.orderToken}`;
  return {
    mode: "payment",
    customer: args.customerId,
    client_reference_id: args.orderToken,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: BOOK_CURRENCY,
          unit_amount: BOOK_PRICE_CENTS,
          tax_behavior: "exclusive",
          product_data: {
            name: `${BOOK_TITLE} (hardcover, 440 pages, 11.75 × 11.75 in)`,
            tax_code: BOOK_TAX_CODE,
          },
        },
      },
    ],
    // Exactly the tier the buyer picked, priced from the stored RPI quote.
    shipping_options: shippingOptionsFor([args.option]),
    automatic_tax: { enabled: true },
    payment_method_types: ["card"],
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      submit: { message: TEXT_REFUND },
      terms_of_service_acceptance: { message: `I agree to the [Terms of Sale](${args.baseUrl}/terms).` },
    },
    metadata: { order_token: args.orderToken, quote_id: args.quoteId, tier: args.option.tier },
    payment_intent_data: {
      description: `${BOOK_TITLE}: track or cancel your order at ${orderUrl}`,
      metadata: { order_token: args.orderToken },
    },
    success_url: `${orderUrl}?new=1`,
    cancel_url: `${args.baseUrl}/book`,
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
  };
}

export function customerParams(a: Address) {
  const addr = {
    line1: a.address1,
    line2: a.address2 || undefined,
    city: a.city,
    state: a.region.toUpperCase(),
    postal_code: a.postal,
    country: a.country.toUpperCase(),
  };
  return {
    email: a.email,
    name: a.name,
    phone: a.phone || undefined,
    address: addr,
    shipping: { name: a.name, phone: a.phone || undefined, address: addr },
  };
}

export function createStripeClient(opts: { secretKey: string; fetch?: Fetch }) {
  const f = opts.fetch ?? fetch;
  async function call<T>(method: string, path: string, params?: Record<string, unknown>, idem?: string) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    try {
      const body = params ? formEncode(params).toString() : undefined;
      const url = method === "GET" && body ? `https://api.stripe.com${path}?${body}` : `https://api.stripe.com${path}`;
      const res = await f(url, {
        method,
        headers: {
          Authorization: `Bearer ${opts.secretKey}`,
          ...(method !== "GET" ? { "Content-Type": "application/x-www-form-urlencoded" } : {}),
          ...(idem ? { "Idempotency-Key": idem } : {}),
        },
        body: method === "GET" ? undefined : body,
        signal: ctrl.signal,
      });
      const data = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
      if (!res.ok) throw new Error(`stripe ${path} HTTP ${res.status}`);
      return data as T;
    } finally {
      clearTimeout(timer);
    }
  }
  return {
    createCustomer: (a: Address, idem: string) => call<{ id: string }>("POST", "/v1/customers", customerParams(a), idem),
    createCheckoutSession: (p: ReturnType<typeof checkoutSessionParams>, idem: string) =>
      call<{ id: string; url: string }>("POST", "/v1/checkout/sessions", p, idem),
    retrieveSession: (id: string) =>
      call<StripeSession>("GET", `/v1/checkout/sessions/${encodeURIComponent(id)}`, {
        expand: ["payment_intent.latest_charge", "total_details"],
      }),
    refund: (paymentIntent: string, idem: string) =>
      call<{ id: string; status: string }>("POST", "/v1/refunds", { payment_intent: paymentIntent }, idem),
    keyIsLive: () => opts.secretKey.startsWith("sk_live_") || opts.secretKey.startsWith("rk_live_"),
  };
}

export type StripeClient = ReturnType<typeof createStripeClient>;

export type StripeSession = {
  id: string;
  payment_status?: string;
  status?: string;
  amount_subtotal?: number;
  amount_total?: number;
  total_details?: { amount_shipping?: number; amount_tax?: number };
  metadata?: Record<string, string>;
  payment_intent?: string | { id: string; latest_charge?: { outcome?: { risk_level?: string } } | string };
  created?: number;
};
