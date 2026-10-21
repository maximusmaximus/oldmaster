import { createFileRoute } from "@tanstack/react-router";
import { TEXT_REFUND, TEXT_SHIPPING_DUTIES } from "@/lib/store/config";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Sale · EMOJI OLD MASTERS" }] }),
  component: Terms,
});

function Terms() {
  return (
    <main className="mx-auto max-w-2xl space-y-5 px-4 py-12 text-muted sm:px-6">
      <h1 className="font-sans text-3xl font-bold tracking-tight text-headline">Terms of Sale</h1>
      <h2 className="text-lg font-semibold text-fg">Printed to order</h2>
      <p>Each copy of Emoji Old Masters is printed on demand by our print partner and shipped directly to you.</p>
      <h2 className="text-lg font-semibold text-fg">Cancellations and refunds</h2>
      <p>{TEXT_REFUND}</p>
      <p>Cancel from your order page (linked from your Stripe receipt and shown after payment).</p>
      <h2 className="text-lg font-semibold text-fg">Misprints and damage</h2>
      <p>If your copy arrives misprinted or damaged, request a replacement from your order page within 14 days of delivery. We replace it free of charge; we don't refund printed books.</p>
      <h2 className="text-lg font-semibold text-fg">Shipping, taxes and duties</h2>
      <p>Shipping is charged at our printer's cost for your address and chosen speed. Sales tax is added at checkout where we collect it. {TEXT_SHIPPING_DUTIES}</p>
      <p>We ship to the United States and Canada. We can't deliver to APO/FPO/DPO addresses.</p>
    </main>
  );
}
