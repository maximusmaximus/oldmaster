/**
 * RPI customerOrderId series for this book. 001–003 were manual/test orders
 * (003 is pending at RPI and must never be touched), so live orders start at 004.
 */
export const ORDER_ID_PREFIX = "emoji-old-masters-440pp-gls-";
export const FIRST_LIVE_SEQ = 4;
export const RESERVED_ORDER_IDS = new Set([
  "emoji-old-masters-440pp-gls-001",
  "emoji-old-masters-440pp-gls-002",
  "emoji-old-masters-440pp-gls-003",
]);

export function formatOrderId(seq: number, suffix = ""): string {
  if (!Number.isInteger(seq) || seq < FIRST_LIVE_SEQ) {
    throw new Error(`order sequence ${seq} is below the first live sequence`);
  }
  const id = `${ORDER_ID_PREFIX}${String(seq).padStart(3, "0")}${suffix}`;
  assertUsableOrderId(id);
  return id;
}

export function assertUsableOrderId(id: string): void {
  const base = id.replace(/-r\d+$/, "");
  if (RESERVED_ORDER_IDS.has(base)) throw new Error("reserved customerOrderId");
  if (id.length > 40) throw new Error("customerOrderId longer than 40 characters");
  if (!id.startsWith(ORDER_ID_PREFIX)) throw new Error("customerOrderId outside the store series");
}
