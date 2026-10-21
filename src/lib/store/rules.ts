import {
  BOOK_PRICE_CENTS,
  EXPECTED_PRINT_COST_USD,
  MAX_PRINT_COST_USD,
  QUOTE_TTL_MS,
  SHIPPING_OVERAGE_TOLERANCE_USD,
  type ShipTier,
} from "./config.ts";

/** Estimated RPI exposure of one order (print + shipping + 10% tax headroom). */
export function orderExposureUsd(shippingUsd: number, printUsd = EXPECTED_PRINT_COST_USD): number {
  return Math.round((printUsd + shippingUsd) * 1.1 * 100) / 100;
}

export type CapResult = { ok: true } | { ok: false; reason: "count" };

/** Buyer-facing daily limit: copies only. (The dollar figure is an admin alert, not a cap.) */
export function capCheck(args: { ordersToday: number; maxOrders: number }): CapResult {
  if (args.ordersToday >= args.maxOrders) return { ok: false, reason: "count" };
  return { ok: true };
}

/** Admin alert: today's estimated RPI exposure is above the alert threshold. */
export function exposureAlert(exposureTodayUsd: number, thresholdUsd: number): boolean {
  return thresholdUsd > 0 && exposureTodayUsd > thresholdUsd;
}

/** Per-order sanity: RPI total above ($145 + paid shipping) × 1.15. */
export function rpiTotalTooHigh(rpiOrderTotalUsd: number | null | undefined, paidShippingCents: number | null | undefined): boolean {
  if (typeof rpiOrderTotalUsd !== "number") return false;
  const limit = (BOOK_PRICE_CENTS + (paidShippingCents ?? 0)) / 100 * 1.15;
  return rpiOrderTotalUsd > Math.round(limit * 100) / 100;
}

export function printCostTooHigh(printUsdPerCopy: number | null | undefined): boolean {
  return typeof printUsdPerCopy === "number" && printUsdPerCopy > MAX_PRINT_COST_USD;
}

export function shippingOverageTooHigh(rpiShippingUsd: number | null | undefined, paidShippingCents: number): boolean {
  if (typeof rpiShippingUsd !== "number") return false;
  return rpiShippingUsd - paidShippingCents / 100 > SHIPPING_OVERAGE_TOLERANCE_USD;
}

export function quoteIsFresh(createdAt: Date, now: Date): boolean {
  return now.getTime() - createdAt.getTime() <= QUOTE_TTL_MS;
}

export function subtotalIsExpected(amountSubtotalCents: number | null | undefined): boolean {
  return amountSubtotalCents === BOOK_PRICE_CENTS;
}

export function usdToCents(usd: number): number {
  return Math.round(usd * 100);
}

/** Normalize RPI's tier names (express/priority are legacy names). */
export function normalizeTier(c: string | null | undefined): ShipTier | null {
  const v = (c ?? "").toLowerCase();
  if (v === "standard" || v === "economy") return "standard";
  if (v === "expedited" || v === "express") return "expedited";
  if (v === "rush" || v === "priority") return "rush";
  return null;
}

export type SiteState =
  | "PAID" | "DEFERRED" | "HELD" | "RPI_CREATING" | "RPI_CREATED" | "CANCEL_WINDOW"
  | "CANCEL_REQUESTED" | "LOCKED" | "SHIPPED" | "PREFLIGHT_REJECTED" | "RPI_REJECTED"
  | "NEEDS_ATTENTION" | "CANCELLED_REFUNDED" | "EXPIRED" | "CHECKOUT_OPEN" | "DISPUTED";

/** RPI status → site state (null = handled elsewhere / no change). */
export function mapRpiStatus(s: string | null | undefined): SiteState | null {
  switch (s) {
    case "QUEUED": case "RECEIVED": case "VALIDATING": return "RPI_CREATED"; // QUEUED = waiting in RPI's 50/24h limit queue
    case "VALID_AWAITING_PAYMENT": return "CANCEL_WINDOW";
    case "VALID_HOLDING_BIN": case "PRINTING": case "RECEIVED_BY_PRINTER":
    case "IN_PRODUCTION": case "READY_TO_SHIP": return "LOCKED";
    case "SHIPPED": return "SHIPPED";
    case "FAILED": return "PREFLIGHT_REJECTED";
    case "REJECTED": return "NEEDS_ATTENTION"; // limit queue full: alert, never resubmit
    case "EXCEPTION": case "CANCELLATION_REQUESTED": return "NEEDS_ATTENTION";
    default: return null;
  }
}

const RANK: Partial<Record<SiteState, number>> = {
  RPI_CREATING: 1, RPI_CREATED: 2, CANCEL_WINDOW: 3, LOCKED: 4, SHIPPED: 5,
};

/** Forward-only progression for normal RPI status updates. */
export function isForward(from: SiteState, to: SiteState): boolean {
  const a = RANK[from];
  const b = RANK[to];
  if (a === undefined || b === undefined) return to === "NEEDS_ATTENTION" || to === "PREFLIGHT_REJECTED" || to === "RPI_REJECTED" ? from !== "SHIPPED" : false;
  return b > a;
}

/** Customer may cancel for a refund: before the deadline and before RPI locks. */
export function customerCanCancel(state: SiteState, deadline: Date | null, now: Date): boolean {
  if (!deadline || now.getTime() >= deadline.getTime()) return false;
  return ["PAID", "DEFERRED", "HELD", "RPI_CREATED", "CANCEL_WINDOW"].includes(state);
}

/** RPI GET-before-retry backoff, minutes after each failed attempt. */
export const RETRY_BACKOFF_MIN = [1, 2, 5, 15, 30, 60];
export const MAX_CREATE_ATTEMPTS = 6;
