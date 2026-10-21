import { createFileRoute } from "@tanstack/react-router";
import { getSql } from "@/lib/db";
import { RPI_COVER_URL, RPI_INTERIOR_URL } from "@/lib/store/config";
import { verifyCron } from "@/lib/store/signatures";
import { getStore, json, resolveSecrets } from "@/lib/store/store.server";

const JOBS = new Set(["reconcile", "release", "daily"]);

/** Signed cron calls from Max's Cloudflare Worker (see docs/store-cron-worker.js). */
export const Route = createFileRoute("/api/store/cron/$job")({
  server: {
    handlers: {
      POST: async ({ params, request }) => {
        const job = params.job;
        const secrets = await resolveSecrets(await getSql());
        if (!JOBS.has(job) || !verifyCron(job, request.headers.get("x-cron-ts"), request.headers.get("x-cron-sig"), secrets.CRON_SECRET)) {
          return new Response("Not Found", { status: 404 });
        }
        const store = await getStore();
        if (job === "reconcile") return json(await store.reconcile());
        if (job === "release") return json(await store.releaseDeferred());
        const out = await store.daily();
        for (const url of [RPI_INTERIOR_URL, RPI_COVER_URL]) {
          const r = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) }).catch(() => null);
          if (!r || r.status !== 200) await store.tripKillSwitch("a print file did not return HTTP 200");
        }
        return json(out);
      },
    },
  },
});
