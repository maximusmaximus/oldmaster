import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AdminLogin } from "@/components/admin-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/store")({
  head: () => ({ meta: [{ title: "Store admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminStore,
});

type Overview = {
  ordersEnabled: boolean;
  stripeReady?: boolean;
  killReason: string;
  maxOrdersPerDay: number;
  maxExposureUsdPerDay: number;
  ordersToday: number;
  exposureTodayUsd: number;
  nextOrderSeq: string;
  availability?: { editionRemaining: number; editionSize: number };
  orders: Array<Record<string, unknown>>;
  alerts: Array<{ id: number; level: string; message: string; order_id: string | null; at: string }>;
  reprints: Array<{ id: string; order_id: string; description: string; decision: string | null }>;
};

function AdminStore() {
  const [data, setData] = useState<Overview | null>(null);
  const [health, setHealth] = useState<unknown>(null);
  const [denied, setDenied] = useState(false);
  const [caps, setCaps] = useState({ maxOrders: "", maxExposureUsd: "" });

  const load = useCallback(async () => {
    const r = await fetch("/api/store/admin/overview");
    if (!r.ok) return setDenied(true);
    const d = (await r.json()) as Overview;
    setDenied(false);
    setData(d);
    setCaps({ maxOrders: String(d.maxOrdersPerDay), maxExposureUsd: String(d.maxExposureUsdPerDay) });
  }, []);
  useEffect(() => void load(), [load]);

  const act = async (body: object, confirmText?: string) => {
    if (confirmText && !confirm(confirmText)) return;
    const r = await fetch("/api/store/admin/action", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || d.ok === false) alert(`Failed: ${d.error ?? r.status}`);
    void load();
  };

  if (denied) {
    return (
      <main className="mx-auto max-w-md px-6 py-16">
        <p className="mb-4 text-muted">Sign in as admin to manage the store.</p>
        <AdminLogin onSuccess={() => void load()} />
        <Button className="mt-4" variant="outline" onClick={() => void load()}>Reload</Button>
      </main>
    );
  }
  if (!data) return <main className="p-10 text-muted">Loading…</main>;

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-10 text-sm text-fg">
      <h1 className="text-2xl font-bold">Store admin</h1>
      <section className="rounded-lg bg-surface p-4">
        <p className="text-lg">
          Sales are <b>{data.ordersEnabled ? "ON" : "OFF"}</b>
          {data.killReason ? <span className="text-red-400"> (auto-off: {data.killReason})</span> : null}
        </p>
        <p className="mt-1 text-muted">Card checkout is {data.stripeReady ? "connected" : "not connected. Turning sales on does not connect Stripe."}</p>
        <Button className="mt-2" onClick={() => void act({ action: "setSales", enabled: !data.ordersEnabled }, data.ordersEnabled ? "Turn sales OFF?" : "Turn sales ON? Real customers will be charged and real RPI orders created.")}>
          Turn sales {data.ordersEnabled ? "OFF" : "ON"}
        </Button>
        <p className="mt-3 text-muted">Today (since midnight PT, incl. open checkouts): {data.ordersToday} copies, ${data.exposureTodayUsd.toFixed(2)} exposure. {data.availability ? `Edition: ${data.availability.editionRemaining} of ${data.availability.editionSize} left. ` : ""}Next RPI id: emoji-old-masters-440pp-gls-{data.nextOrderSeq.padStart(3, "0")}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label>Max orders/day <Input className="w-24" value={caps.maxOrders} onChange={(e) => setCaps({ ...caps, maxOrders: e.target.value })} /></label>
          <label>Alert above $/day (not a cap) <Input className="w-28" value={caps.maxExposureUsd} onChange={(e) => setCaps({ ...caps, maxExposureUsd: e.target.value })} /></label>
          <Button variant="outline" onClick={() => void act({ action: "setCaps", maxOrders: Number(caps.maxOrders), maxExposureUsd: Number(caps.maxExposureUsd) })}>Save caps</Button>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Alerts</h2>
        {data.alerts.length === 0 ? <p className="text-muted">None.</p> : (
          <ul className="space-y-1">
            {data.alerts.map((a) => (
              <li key={a.id} className="flex items-center justify-between gap-2 rounded bg-surface p-2">
                <span><b>{a.level}</b> {a.message} {a.order_id ? `(order ${a.order_id.slice(0, 8)})` : ""} · {new Date(a.at).toLocaleString()}</span>
                <Button variant="outline" onClick={() => void act({ action: "resolveAlert", alertId: a.id })}>Dismiss</Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Orders</h2>
        <table className="w-full text-left">
          <thead className="text-muted"><tr><th>Id</th><th>State</th><th>RPI id</th><th>RPI status</th><th>Ship</th><th>Total</th><th>Error</th><th /></tr></thead>
          <tbody>
            {data.orders.map((o) => (
              <tr key={String(o.id)} className="border-t border-border">
                <td>{String(o.short)}</td><td>{String(o.state)}</td><td>{String(o.customer_order_id ?? "")}</td><td>{String(o.rpi_status ?? "")}</td>
                <td>{String(o.ship_tier ?? "")}</td><td>{o.amount_total_cents != null ? `$${(Number(o.amount_total_cents) / 100).toFixed(2)}` : ""}</td>
                <td className="max-w-48 truncate">{String(o.last_error ?? "")}</td>
                <td className="space-x-1 whitespace-nowrap">
                  {o.state === "HELD" || o.state === "NEEDS_ATTENTION" ? <Button variant="outline" onClick={() => void act({ action: "release", orderId: o.id }, "Send this order to RPI now?")}>Release</Button> : null}
                  <Button variant="outline" onClick={() => void act({ action: "cancelRefund", orderId: o.id }, "Cancel at RPI (if possible) and refund in full?")}>Cancel+Refund</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Reprint requests</h2>
        {data.reprints.length === 0 ? <p className="text-muted">None.</p> : data.reprints.map((r) => (
          <div key={r.id} className="mt-2 rounded bg-surface p-2">
            <p>Order {r.order_id.slice(0, 8)}: {r.description}</p>
            <p className="text-muted">Decision: {r.decision ?? "pending"} (file the reprint claim with RPI support manually)</p>
            {!r.decision ? (
              <span className="space-x-1">
                <Button variant="outline" onClick={() => void act({ action: "decideReprint", requestId: r.id, decision: "approved" })}>Approve</Button>
                <Button variant="outline" onClick={() => void act({ action: "decideReprint", requestId: r.id, decision: "declined" })}>Decline</Button>
              </span>
            ) : null}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold">Health</h2>
        <Button variant="outline" onClick={() => void fetch("/api/store/admin/health").then((r) => r.json()).then(setHealth)}>Run health check</Button>
        {health ? <pre className="mt-2 overflow-x-auto rounded bg-surface p-2">{JSON.stringify(health, null, 2)}</pre> : null}
      </section>
    </main>
  );
}
