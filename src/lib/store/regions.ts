/**
 * Where the store sells. Max chose US + Canada + UK + EU (Oct 21, 2026).
 * RPI Print's Generic account refuses every country except US and CA, and its
 * shipping estimate cannot price any other country, so UK/EU stay listed in
 * PENDING_COUNTRIES and are refused with a clear message until RPI ships there.
 * The live RPI estimate is still the final word for every address.
 */
export const ENABLED_COUNTRIES = ["US", "CA"] as const;

export const PENDING_COUNTRIES = [
  "GB",
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU",
  "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
] as const;

/** RPI refuses military addresses. */
export const BLOCKED_US_REGIONS = new Set(["AA", "AE", "AP"]);

export type RegionCheck =
  | { ok: true }
  | { ok: false; reason: "unsupported_country" | "pending_country" | "military" | "missing_region" };

export function checkRegion(country: string, region: string): RegionCheck {
  const c = country.trim().toUpperCase();
  const r = region.trim().toUpperCase();
  if ((PENDING_COUNTRIES as readonly string[]).includes(c)) return { ok: false, reason: "pending_country" };
  if (!(ENABLED_COUNTRIES as readonly string[]).includes(c)) return { ok: false, reason: "unsupported_country" };
  if (!r) return { ok: false, reason: "missing_region" };
  if (c === "US" && BLOCKED_US_REGIONS.has(r)) return { ok: false, reason: "military" };
  return { ok: true };
}

/** Outside the US customs territory: RPI needs a retailPrice on the item. */
export function needsCustomsValue(country: string, region: string): boolean {
  const c = country.toUpperCase();
  const r = region.toUpperCase();
  if (c !== "US") return true;
  return ["PR", "GU", "VI", "AS", "MP", "UM"].includes(r);
}

export const REGION_MESSAGES: Record<Exclude<RegionCheck, { ok: true }>["reason"], string> = {
  unsupported_country: "Sorry, we can't ship to that country yet. We ship to the US and Canada.",
  pending_country: "UK and EU shipping isn't available from our printer yet. We ship to the US and Canada for now.",
  military: "Our printer can't deliver to APO/FPO/DPO military addresses.",
  missing_region: "Please enter a state or province.",
};
