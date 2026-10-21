/** 4:00 PM America/Los_Angeles cancel cutoff and the 02:15 UTC deferred run. */
const TZ = "America/Los_Angeles";

function laParts(d: Date) {
  const f = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  const p = Object.fromEntries(f.formatToParts(d).map((x) => [x.type, x.value]));
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, min: +p.minute, s: +p.second };
}

/** UTC instant of a wall-clock time in Los Angeles (handles PDT/PST). */
function laWallToUtc(y: number, m: number, d: number, h: number): Date {
  let guess = Date.UTC(y, m - 1, d, h + 8);
  for (let i = 0; i < 3; i++) {
    const p = laParts(new Date(guess));
    const diff = Date.UTC(p.y, p.m - 1, p.d, p.h, p.min) - Date.UTC(y, m - 1, d, h);
    if (diff === 0) break;
    guess -= diff;
  }
  return new Date(guess);
}

/** Next 16:00 Los Angeles time strictly after `paidAt`. */
export function cancelDeadlineFor(paidAt: Date): Date {
  const p = laParts(paidAt);
  const today = laWallToUtc(p.y, p.m, p.d, 16);
  if (paidAt.getTime() < today.getTime()) return today;
  const next = new Date(Date.UTC(p.y, p.m - 1, p.d + 1));
  return laWallToUtc(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), 16);
}

export function isAfterTodayCutoff(now: Date): boolean {
  const p = laParts(now);
  return now.getTime() >= laWallToUtc(p.y, p.m, p.d, 16).getTime();
}

/** Next 02:15 UTC strictly after `now` (just after RPI's nightly charge). */
export function nextPostChargeRunUtc(now: Date): Date {
  const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 2, 15));
  if (t.getTime() <= now.getTime()) t.setUTCDate(t.getUTCDate() + 1);
  return t;
}

/** Start of the current RPI charge day (most recent 02:00 UTC). */
export function capDayStartUtc(now: Date): Date {
  const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 2, 0));
  if (t.getTime() > now.getTime()) t.setUTCDate(t.getUTCDate() - 1);
  return t;
}

/** Most recent midnight America/Los_Angeles (the buyer-facing daily limit resets then). */
export function ptDayStartUtc(now: Date): Date {
  const p = laParts(now);
  return laWallToUtc(p.y, p.m, p.d, 0);
}

/** Next midnight America/Los_Angeles after `now`. */
export function nextPtMidnightUtc(now: Date): Date {
  const p = laParts(now);
  const next = new Date(Date.UTC(p.y, p.m - 1, p.d + 1));
  return laWallToUtc(next.getUTCFullYear(), next.getUTCMonth() + 1, next.getUTCDate(), 0);
}
