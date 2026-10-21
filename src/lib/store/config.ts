/**
 * Emoji Old Masters storefront constants. Pure (no env, no I/O) so it can be
 * imported by client pages, server routes and node tests alike.
 * Server code never trusts prices or SKUs sent by the browser; it uses these.
 */
export const BOOK_TITLE = "Emoji Old Masters";
export const BOOK_PRICE_CENTS = 14500;
export const BOOK_CURRENCY = "usd";
export const BOOK_TAX_CODE = "txcd_35010000"; // Stripe: printed books

export const RPI_SKU = "BKPH_HCIW_STD_11.750x11.750IN_80C_MT_40_100T_GLS_44";
export const RPI_PAGE_COUNT = 440;
export const RPI_DEFAULT_BASE_URL = "https://open.api.rpiprint.com";
export const RPI_INTERIOR_URL =
  "https://pub-fc606df28da84dbabc0f8782d8ab944e.r2.dev/rpi/EmojiOldMasters-RPI-INTERIOR-440pp-GLS-300ppi-QR.pdf";
export const RPI_COVER_URL =
  "https://pub-fc606df28da84dbabc0f8782d8ab944e.r2.dev/rpi/EmojiOldMasters-RPI-COVER-440pp-GLS-300ppi-flat-r2.pdf";
export const RPI_ITEM_DESCRIPTION = "Emoji Old Masters (440pp hardcover)";

/** Expected print cost per copy (USD, before tax/shipping). */
export const EXPECTED_PRINT_COST_USD = 87.3;
/** Safety stop: RPI print cost above this per copy trips the kill switch. */
export const MAX_PRINT_COST_USD = 140;
/** Quote validity and tolerated shipping overage. */
export const QUOTE_TTL_MS = 30 * 60 * 1000;
export const SHIPPING_OVERAGE_TOLERANCE_USD = 2;

/** Default caps (Max, Oct 21, 2026). Editable on /admin/store. */
export const DEFAULT_MAX_ORDERS_PER_DAY = 5;
export const DEFAULT_MAX_EXPOSURE_USD_PER_DAY = 550;

export const SHIP_TIERS = ["standard", "expedited", "rush"] as const;
export type ShipTier = (typeof SHIP_TIERS)[number];
export const TIER_LABEL: Record<ShipTier, string> = {
  standard: "Standard",
  expedited: "Expedited",
  rush: "Rush",
};

export const TEXT_SHIPPING_DUTIES =
  "Printed to order and shipped from the US. Orders outside the US may owe import duties, taxes or fees on delivery; these are paid by the buyer.";
export const TEXT_REFUND =
  "Each copy is printed to order. You can cancel for a full refund until 4:00 PM Pacific on the day you order (orders after 4:00 PM PT: until 4:00 PM PT the next day). After that your book goes to print and can't be cancelled or refunded. Misprinted or damaged copies are replaced free.";

export const SELLER_NAME = "Max Infeld";
export const STORE_NAME = "Emoji Old Masters";
export const CONTACT_EMAIL = "maxinfeld@gmail.com";
export const CANCEL_CUTOFF_LABEL = "4:00 PM Pacific Time";
export const REPRINT_WINDOW_DAYS = 14;
export const TERMS_EFFECTIVE_DATE = "October 21, 2026";

/** Limited edition (Max, Oct 21, 2026). */
export const EDITION_SIZE = 500;
/** Open Checkout Sessions reserve a copy for this long (matches the 30-min session expiry). */
export const RESERVATION_MS = 30 * 60 * 1000;
export const TEXT_DAILY_SOLD_OUT = "Today's 5 copies are sold, back tomorrow at midnight PT.";
