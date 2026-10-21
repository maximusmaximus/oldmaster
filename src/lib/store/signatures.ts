import { createHmac, timingSafeEqual } from "node:crypto";

function safeEq(a: Buffer, b: Buffer): boolean {
  return a.length === b.length && a.length > 0 && timingSafeEqual(a, b);
}

/**
 * Verify a Stripe-Signature header (t=...,v1=...) over the raw body.
 * Tolerance defaults to 300 s like Stripe's SDK.
 */
export function verifyStripeSignature(
  rawBody: string,
  header: string | null,
  secret: string,
  nowSec = Math.floor(Date.now() / 1000),
  toleranceSec = 300,
): boolean {
  if (!header || !secret) return false;
  let t = "";
  const v1: string[] = [];
  for (const part of header.split(",")) {
    const [k, v] = part.split("=", 2);
    if (k?.trim() === "t") t = (v ?? "").trim();
    if (k?.trim() === "v1" && v) v1.push(v.trim());
  }
  const ts = Number(t);
  if (!t || !Number.isFinite(ts) || v1.length === 0) return false;
  if (Math.abs(nowSec - ts) > toleranceSec) return false;
  const expected = createHmac("sha256", secret).update(`${t}.${rawBody}`, "utf8").digest();
  return v1.some((sig) => /^[0-9a-f]+$/i.test(sig) && safeEq(Buffer.from(sig, "hex"), expected));
}

/** Test helper / documentation of the format. */
export function signStripePayload(rawBody: string, secret: string, t: number): string {
  const sig = createHmac("sha256", secret).update(`${t}.${rawBody}`, "utf8").digest("hex");
  return `t=${t},v1=${sig}`;
}

/** RPI: base64 HMAC-SHA256 of the raw body in header x-rpi-printapi-hmac-sha256. */
export function verifyRpiSignature(rawBody: string, header: string | null, secret: string): boolean {
  if (!header || !secret) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  let got: Buffer;
  try {
    got = Buffer.from(header.trim(), "base64");
  } catch {
    return false;
  }
  return safeEq(got, expected);
}

export function signRpiPayload(rawBody: string, secret: string): string {
  return createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
}

/**
 * Cron calls: headers x-cron-ts (unix seconds) and x-cron-sig =
 * hex HMAC-SHA256(CRON_SECRET, `${ts}.${job}`), 5-minute window.
 */
export function signCron(job: string, ts: number, secret: string): string {
  return createHmac("sha256", secret).update(`${ts}.${job}`, "utf8").digest("hex");
}

export function verifyCron(
  job: string,
  tsHeader: string | null,
  sigHeader: string | null,
  secret: string,
  nowSec = Math.floor(Date.now() / 1000),
): boolean {
  if (!secret || !tsHeader || !sigHeader || !/^[0-9a-f]{64}$/i.test(sigHeader)) return false;
  const ts = Number(tsHeader);
  if (!Number.isInteger(ts) || Math.abs(nowSec - ts) > 300) return false;
  return safeEq(Buffer.from(sigHeader, "hex"), Buffer.from(signCron(job, ts, secret), "hex"));
}
