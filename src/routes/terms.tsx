import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  BOOK_PRICE_CENTS,
  CANCEL_CUTOFF_LABEL,
  CONTACT_EMAIL,
  QUOTE_TTL_MS,
  REPRINT_WINDOW_DAYS,
  SELLER_NAME,
  STORE_NAME,
  TERMS_EFFECTIVE_DATE,
} from "@/lib/store/config";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Sale · EMOJI OLD MASTERS" },
      { name: "description", content: "Terms of Sale for the Emoji Old Masters book." },
    ],
  }),
  component: Terms,
});

const PRICE = `$${(BOOK_PRICE_CENTS / 100).toFixed(2)} USD`;
const QUOTE_MIN = Math.round(QUOTE_TTL_MS / 60000);
const mail = <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold text-fg">{n}. {title}</h2>
      {children}
    </section>
  );
}

function Terms() {
  return (
    <main className="mx-auto max-w-2xl space-y-8 px-4 py-12 leading-relaxed text-muted sm:px-6">
      <header className="space-y-2">
        <h1 className="font-sans text-3xl font-bold tracking-tight text-headline">Terms of Sale</h1>
        <p className="text-sm">Effective {TERMS_EFFECTIVE_DATE}</p>
        <p>
          These terms apply when you buy the book from this website. By placing an order you agree to them.
          If you have a question, email {mail} before you buy.
        </p>
      </header>

      <Section n={1} title="Who you're buying from">
        <p>
          You are buying from {SELLER_NAME}, who publishes {STORE_NAME} ("we", "us"). Contact: {mail}.
        </p>
      </Section>

      <Section n={2} title="The product">
        <p>
          {STORE_NAME} is a hardcover art book, 440 pages, 11.75 × 11.75 inches, printed in full color on gloss paper.
          Each copy is printed on demand after you order, by a third-party print partner, and shipped directly from them to you.
          Colors, trim and binding can vary slightly from copy to copy and from what you see on screen; that is not a defect.
        </p>
      </Section>

      <Section n={3} title="Price, shipping and tax">
        <ul className="list-disc space-y-1 pl-5">
          <li>The book costs {PRICE}.</li>
          <li>
            Shipping is charged at our printer's cost for your address and the speed you choose (Standard, Expedited or Rush;
            not every speed is offered to every address). We show the exact shipping price before you pay. A shipping quote is valid for {QUOTE_MIN} minutes.
          </li>
          <li>We collect California sales tax on orders shipped to California. Tax is calculated by Stripe and shown at checkout.</li>
          <li>All prices are in US dollars. Your bank may charge currency-conversion or foreign-transaction fees.</li>
        </ul>
      </Section>

      <Section n={4} title="Where we ship">
        <p>
          We ship to the United States (including Puerto Rico and US territories when our printer offers shipping there) and Canada only.
          We can't ship to APO/FPO/DPO military addresses. We don't currently ship to the UK, the EU or other countries.
        </p>
        <p>
          <b className="text-fg">Canadian buyers:</b> your order ships from the US. You are responsible for any import duties, taxes, customs or
          brokerage fees charged on delivery. If you refuse to pay them and the package is returned, we can't refund the book.
        </p>
      </Section>

      <Section n={5} title="Production and delivery times">
        <p>
          Printing usually takes a few business days, then shipping time depends on the speed you choose. Dates we show are
          estimates from our printer and carriers, not guarantees. We're not responsible for carrier delays, but we'll help you
          chase a late package.
        </p>
      </Section>

      <Section n={6} title="Cancellations and refunds">
        <ul className="list-disc space-y-1 pl-5">
          <li>
            You can cancel for a <b className="text-fg">full refund</b> until <b className="text-fg">{CANCEL_CUTOFF_LABEL} on the day you order</b>.
            If you order after {CANCEL_CUTOFF_LABEL}, you can cancel until {CANCEL_CUTOFF_LABEL} the next day. Cancel from your order page
            (linked from your receipt and shown after payment) or by emailing {mail} before the deadline.
          </li>
          <li>After that deadline your book goes into production and can no longer be cancelled or refunded.</li>
          <li>Because every copy is printed for you, we don't accept returns or give refunds for a change of mind.</li>
          <li>Refunds go back to the card you paid with. Your bank may take 5–10 business days to show them.</li>
          <li>
            We may cancel and fully refund an order at any time before it's printed, for example if we suspect fraud, can't deliver to
            the address, or the printer can't produce it.
          </li>
        </ul>
      </Section>

      <Section n={7} title="Damaged or misprinted copies">
        <p>
          If your book arrives damaged or misprinted, request a replacement from your order page within{" "}
          <b className="text-fg">{REPRINT_WINDOW_DAYS} days of delivery</b>, and email clear photos of the problem (and of the packaging, for
          shipping damage) to {mail}. If we confirm the problem, we'll send a free replacement. We replace defective copies; we don't refund them.
        </p>
      </Section>

      <Section n={8} title="Lost packages">
        <p>
          If tracking shows no movement for an unusually long time or the package is marked delivered but you didn't receive it, email {mail}.
          We'll open a trace with the printer and carrier. If the package is confirmed lost in transit, we'll send a replacement. A package marked
          delivered to the address you gave is considered delivered.
        </p>
      </Section>

      <Section n={9} title="Your address">
        <p>
          Please check your shipping address before paying; the book ships to exactly the address you enter. If the address is wrong or incomplete,
          we're not responsible for a lost or returned package, and a reship is at your cost. If you spot a mistake, email us right away; we can fix it
          only before the book goes into production.
        </p>
      </Section>

      <Section n={10} title="Payment and chargebacks">
        <p>
          Payments are processed by Stripe. We never see or store your full card number; Stripe handles your card data under its own security standards.
        </p>
        <p>
          If something is wrong, please contact us first; we usually fix problems faster than a bank dispute can. If you file a chargeback for an order
          that was delivered as described, we will share the order, tracking and these terms with your bank, and we may decline future orders from you.
        </p>
      </Section>

      <Section n={11} title="Privacy">
        <p>
          To fulfil your order we collect your name, email, shipping address, optional phone number and order details. Payment details are collected
          by Stripe, not by us. We share your information only with Stripe (payment and tax) and our print partner and its carriers (printing and
          delivery). We don't sell it or use it for marketing. We keep order records as long as needed for fulfilment, tax and legal reasons. To ask
          what we hold or to have it deleted where the law allows, email {mail}.
        </p>
      </Section>

      <Section n={12} title="Artwork and copyright">
        <p>
          The book's plates are based on paintings that are in the public domain. The emoji mosaic renderings, selection, arrangement, text and design
          of the book are © {SELLER_NAME}. Buying a copy gives you the physical book; it doesn't grant rights to reproduce the book or its compilation.
        </p>
      </Section>

      <Section n={13} title="Limitation of liability">
        <p>
          To the extent the law allows, our total liability for any claim about an order is limited to the amount you paid for that order, and we're not
          liable for indirect or consequential losses. Nothing here limits rights you have under consumer-protection law that can't be waived.
        </p>
      </Section>

      <Section n={14} title="Governing law">
        <p>These terms are governed by the laws of the State of California, USA, without regard to its conflict-of-law rules.</p>
      </Section>

      <Section n={15} title="Changes to these terms">
        <p>
          We may update these terms from time to time. The version shown here when you place your order applies to that order. The effective date at the
          top shows when they last changed.
        </p>
      </Section>

      <p className="pt-4 text-sm">
        <Link to="/book" className="underline">Back to the book</Link>
      </p>
    </main>
  );
}
