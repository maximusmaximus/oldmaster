// Cloudflare Worker (Max's account). Secret: CRON_SECRET (same value as the site's).
// Var: SITE = "https://emoji.grok.me". Triggers (UTC): "*/15 * * * *", "0 1 * * *", "15 2 * * *".
const JOB_BY_CRON = { "*/15 * * * *": "reconcile", "0 1 * * *": "daily", "15 2 * * *": "release" };

async function hmacHex(secret, msg) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(msg));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default {
  async scheduled(event, env, ctx) {
    const job = JOB_BY_CRON[event.cron];
    if (!job) return;
    const ts = Math.floor(Date.now() / 1000);
    const sig = await hmacHex(env.CRON_SECRET, `${ts}.${job}`);
    ctx.waitUntil(fetch(`${env.SITE}/api/store/cron/${job}`, { method: "POST", headers: { "x-cron-ts": String(ts), "x-cron-sig": sig } }));
  },
};
