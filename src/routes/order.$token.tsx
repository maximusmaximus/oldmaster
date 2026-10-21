import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/order/$token")({
  head: () => ({ meta: [{ title: "Your order · EMOJI OLD MASTERS" }, { name: "robots", content: "noindex" }] }),
  component: OrderPage,
});

type OrderView = {
  state: string;
  tier: string | null;
  shipTo: string;
  totalCents: number | null;
  cancelDeadline: string | null;
  canCancel: boolean;
  tracking: Array<{ number: string | null; url: string | null }>;
  canRequestReprint: boolean;
};

const STATE_TEXT: Record<string, string> = {
  PAID: "Payment received. Your book is queued for printing.",
  DEFERRED: "Payment received. Your book goes to the printer tonight.",
  HELD: "Payment received. We're reviewing your order before printing.",
  RPI_CREATING: "Sending your book to the printer.",
  RPI_CREATED: "At the printer, being checked before printing.",
  CANCEL_WINDOW: "At the printer, waiting to print.",
  CANCEL_REQUESTED: "Cancellation requested. We'll refund you as soon as the printer confirms.",
  LOCKED: "Printing. It can no longer be cancelled.",
  SHIPPED: "Shipped!",
  NEEDS_ATTENTION: "We're looking into an issue with your order and will sort it out.",
  PREFLIGHT_REJECTED: "We're looking into an issue with your order and will sort it out.",
  RPI_REJECTED: "We're looking into an issue with your order and will sort it out.",
  CANCELLED_REFUNDED: "Cancelled and refunded.",
  DISPUTED: "This payment is disputed.",
};

function OrderPage() {
  const { token } = Route.useParams();
  const [order, setOrder] = useState<OrderView | null>(null);
  const [missing, setMissing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [desc, setDesc] = useState("");

  const load = useCallback(() => {
    fetch(`/api/store/order/${token}`).then(async (r) => {
      if (!r.ok) return setMissing(true);
      setOrder(await r.json());
    }).catch(() => setMissing(true));
  }, [token]);
  useEffect(load, [load]);

  const act = async (body: object, ok: string) => {
    const r = await fetch(`/api/store/order/${token}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    setMsg(r.ok ? ok : "That didn't work. The order may no longer be eligible.");
    load();
  };

  if (missing) {
    return <main className="mx-auto max-w-xl px-6 py-20 text-center text-muted">Order not found. If you just paid, refresh in a minute.</main>;
  }
  if (!order) return <main className="mx-auto max-w-xl px-6 py-20 text-center text-muted">Loading…</main>;

  return (
    <main className="mx-auto max-w-xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-muted uppercase">Your order</p>
      <h1 className="mt-2 font-sans text-3xl font-bold tracking-tight text-headline">Emoji Old Masters</h1>
      <p className="mt-2 text-sm text-muted">Bookmark this page: it's where you'll see shipping status and tracking.</p>
      <p className="mt-6 text-lg text-fg">{STATE_TEXT[order.state] ?? order.state}</p>
      <dl className="mt-4 space-y-1 text-sm text-muted">
        {order.shipTo ? <div>Ships to: {order.shipTo}</div> : null}
        {order.tier ? <div>Shipping: {order.tier}</div> : null}
        {order.totalCents != null ? <div>Total paid: ${(order.totalCents / 100).toFixed(2)}</div> : null}
      </dl>
      {order.tracking.length > 0 ? (
        <ul className="mt-4 space-y-1">
          {order.tracking.map((t, i) => (
            <li key={i}>{t.url ? <a className="underline" href={t.url} target="_blank" rel="noopener noreferrer">Track package {t.number ?? ""}</a> : t.number}</li>
          ))}
        </ul>
      ) : null}
      {order.canCancel && order.cancelDeadline ? (
        <div className="mt-8 rounded-lg bg-surface p-4">
          <p className="text-sm text-muted">
            You can cancel for a full refund until {new Date(order.cancelDeadline).toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" })} Pacific.
          </p>
          <Button className="mt-3" variant="outline" onClick={() => { if (confirm("Cancel this order for a full refund?")) void act({ action: "cancel" }, "Cancellation started."); }}>
            Cancel order
          </Button>
        </div>
      ) : null}
      {order.canRequestReprint ? (
        <div className="mt-8 rounded-lg bg-surface p-4">
          <p className="text-sm text-muted">Misprinted or damaged? Describe the problem (within 14 days of delivery) and we'll arrange a free replacement.</p>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={4} className="mt-2 w-full rounded-md border border-border bg-surface p-2 text-sm text-fg" />
          <Button className="mt-2" disabled={desc.trim().length < 10} onClick={() => void act({ action: "reprint", description: desc }, "Thanks, we received your request.")}>
            Request a replacement
          </Button>
        </div>
      ) : null}
      {msg ? <p className="mt-4 text-sm text-fg">{msg}</p> : null}
    </main>
  );
}
