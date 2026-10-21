import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BOOK_PRICE_CENTS, EDITION_SIZE, REASON_TEXT, TEXT_REFUND, type UnavailableReason, TEXT_SHIPPING_DUTIES, TIER_LABEL, type ShipTier } from "@/lib/store/config";
import { ENABLED_COUNTRIES } from "@/lib/store/regions";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Buy the book · EMOJI OLD MASTERS" },
      { name: "description", content: "Emoji Old Masters: a 440-page 11.75 × 11.75 inch hardcover, printed to order." },
    ],
  }),
  component: BookPage,
});

type Availability = { editionSize: number; editionRemaining: number; soldOut: boolean; dailyLimit: number; dailyRemaining: number; dailySoldOut: boolean; dailyCapReached: boolean; unavailableReason: UnavailableReason | null };

export function AvailabilityLine({ a }: { a: Availability | null }) {
  if (!a) return null;
  if (a.unavailableReason === "edition_sold_out") return <p className="font-semibold text-fg">{REASON_TEXT.edition_sold_out}</p>;
  return (
    <div className="space-y-0.5">
      <p className="font-semibold text-fg">{a.editionRemaining} of {a.editionSize} copies left</p>
      <p className="text-sm">{a.unavailableReason ? REASON_TEXT[a.unavailableReason] : `${a.dailyRemaining} of ${a.dailyLimit} left today (resets at midnight PT)`}</p>
    </div>
  );
}

type Option = { tier: ShipTier; priceUsd: number; estimatedDeliveryDate: string | null };

const COUNTRY_NAMES: Record<string, string> = { US: "United States", CA: "Canada" };
const price = (c: number) => `$${(c / 100).toFixed(2)}`;

function BookPage() {
  const [salesOpen, setSalesOpen] = useState<boolean | null>(null);
  const [avail, setAvail] = useState<Availability | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address1: "", address2: "", city: "", region: "", postal: "", country: "US" });
  const [quote, setQuote] = useState<{ quoteId: string; options: Option[] } | null>(null);
  const [tier, setTier] = useState<ShipTier | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch("/api/store/status")
      .then((r) => r.json())
      .then((d) => {
        setSalesOpen(Boolean(d.salesOpen));
        if (typeof d.editionRemaining === "number") setAvail(d);
      })
      .catch(() => setSalesOpen(false));
  }, []);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => {
    setForm({ ...form, [k]: e.target.value });
    setQuote(null);
    setTier(null);
  };

  const getQuote = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/store/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Could not get shipping.");
      setQuote(d);
      setTier(d.options[0]?.tier ?? null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const pay = async () => {
    if (!quote || !tier) return;
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/store/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ quoteId: quote.quoteId, tier }) });
      const d = await r.json();
      if (!r.ok) {
        const msg: Record<string, string> = {
          quote_expired: "That shipping quote expired. Please get a new one.",
          ...REASON_TEXT,
          sales_closed: "Sales are closed right now.",
        };
        throw new Error(msg[d.error] ?? "Checkout is unavailable right now.");
      }
      window.location.href = d.url;
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-semibold tracking-wide text-muted uppercase">The book</p>
      <h1 className="mt-2 font-sans text-4xl font-bold tracking-tight text-headline">EMOJI OLD MASTERS</h1>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <img src="/book/preview.jpg" alt="Emoji Old Masters book" width={870} height={864} className="w-full rounded-lg bg-surface-2 object-contain" />
        <div className="space-y-3 text-muted">
          <p className="text-3xl font-bold text-fg">{price(BOOK_PRICE_CENTS)}</p>
          <p className="text-sm">Limited edition of {EDITION_SIZE} copies, at most 5 sold per day.</p>
          <AvailabilityLine a={avail} />
          <p>Hardcover, 440 pages, 11.75 × 11.75 in, gloss paper. Printed to order and shipped to you.</p>
          <p>Shipping is charged at cost for your address. Tax is added at checkout where it applies.</p>
          <p className="text-sm">{TEXT_SHIPPING_DUTIES}</p>
          <p className="text-sm">Ships to the US and Canada (no APO/FPO). UK and EU shipping is not available from our printer yet. <Link to="/terms" className="underline">Terms of Sale</Link></p>
        </div>
      </div>

      {avail?.unavailableReason === "edition_sold_out" ? (
        <p className="mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg">Sold out.</p>
      ) : avail?.unavailableReason && salesOpen ? (
        <p className="mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg">{REASON_TEXT[avail.unavailableReason]}</p>
      ) : salesOpen === false ? (
        <p className="mt-10 rounded-lg bg-surface p-6 text-center text-lg font-semibold text-fg">Sales open soon.</p>
      ) : salesOpen === null ? null : (
        <section className="mt-10 rounded-xl bg-surface p-5">
          <h2 className="text-xl font-bold text-fg">1. Where should we ship it?</h2>
          <form onSubmit={getQuote} className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input required placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
            <Input required type="email" placeholder="Email" value={form.email} onChange={set("email")} autoComplete="email" />
            <Input required className="sm:col-span-2" placeholder="Address line 1" value={form.address1} onChange={set("address1")} autoComplete="address-line1" />
            <Input className="sm:col-span-2" placeholder="Address line 2 (optional)" value={form.address2} onChange={set("address2")} autoComplete="address-line2" />
            <Input required placeholder="City" value={form.city} onChange={set("city")} autoComplete="address-level2" />
            <Input required placeholder="State / province code (e.g. CA, ON)" maxLength={3} value={form.region} onChange={set("region")} autoComplete="address-level1" />
            <Input required placeholder="ZIP / postal code" value={form.postal} onChange={set("postal")} autoComplete="postal-code" />
            <select value={form.country} onChange={set("country")} className="h-11 rounded-md border border-border bg-surface px-3 text-sm text-fg" autoComplete="country">
              {ENABLED_COUNTRIES.map((c) => (
                <option key={c} value={c}>{COUNTRY_NAMES[c] ?? c}</option>
              ))}
            </select>
            <Input placeholder="Phone (for the carrier, optional)" value={form.phone} onChange={set("phone")} autoComplete="tel" />
            <Button type="submit" disabled={busy}>{busy && !quote ? "Getting shipping…" : "Get shipping options"}</Button>
          </form>

          {quote ? (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-fg">2. Choose shipping</h2>
              <div className="mt-3 space-y-2">
                {quote.options.map((o) => (
                  <label key={o.tier} className="flex cursor-pointer items-center justify-between rounded-md border border-border p-3 text-fg">
                    <span className="flex items-center gap-2">
                      <input type="radio" name="tier" checked={tier === o.tier} onChange={() => setTier(o.tier)} />
                      {TIER_LABEL[o.tier]}
                      {o.estimatedDeliveryDate ? <span className="text-sm text-muted">· est. arrival {o.estimatedDeliveryDate.slice(0, 10)}</span> : null}
                    </span>
                    <span>${o.priceUsd.toFixed(2)}</span>
                  </label>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted">{TEXT_REFUND}</p>
              <p className="mt-2 text-sm text-muted">
                By continuing you agree to the <Link to="/terms" className="underline">Terms of Sale</Link>. The quote is valid for 30 minutes.
              </p>
              <div className="mt-4 text-muted"><AvailabilityLine a={avail} /></div>
              <Button className="mt-4" onClick={pay} disabled={busy || !tier}>{busy ? "Opening checkout…" : "Continue to payment"}</Button>
              <p className="mt-2 text-xs text-muted">
                Payment is processed by Stripe. Read the full <Link to="/terms" className="underline">Terms of Sale</Link> before paying.
              </p>
            </div>
          ) : null}
          {error ? <p className="mt-4 text-sm text-red-400" role="alert">{error}</p> : null}
        </section>
      )}
    </main>
  );
}
