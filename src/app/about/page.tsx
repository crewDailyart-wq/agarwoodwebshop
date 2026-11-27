import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";
import { site } from "@/content/site";
import { NarrationBody } from "@/components/NarrationBody";
import { safetyNarration } from "@/content/narrations";

export const metadata: Metadata = {
  title: "About",
  description: "Who we are, how to reach us, and the terms that apply to your order.",
};

export default function AboutPage() {
  const l = site.legal;
  const rows: [string, React.ReactNode][] = [
    ["Trading name", site.name],
    ...(l.legalName ? ([["Registered name", l.legalName]] as [string, React.ReactNode][]) : []),
    ...(l.address ? ([["Address", l.address]] as [string, React.ReactNode][]) : []),
    ...(l.kvk ? ([["KvK number", l.kvk]] as [string, React.ReactNode][]) : []),
    ...(l.vatId ? ([["BTW-id (VAT)", l.vatId]] as [string, React.ReactNode][]) : []),
    ...(site.contactEmail
      ? ([["E-mail", <a key="m" href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>]] as [string, React.ReactNode][])
      : []),
    [
      "Telephone",
      <span key="t">
        {site.wholesalePhones.map((p, i) => (
          <span key={p.tel}>
            {i > 0 && " · "}
            <a href={`tel:${p.tel}`}>{p.display}</a>
          </span>
        ))}
      </span>,
    ],
  ];

  return (
    <EditorialPage eyebrow="Information" title="About">
      <p>
        {site.name} offers true agarwood, pure camphor and the things needed to use them, sold
        online from the Netherlands. Below you find who we are and the terms that apply when you
        order from us.
      </p>

      <h2>Company details</h2>
      <dl className="not-prose divide-y divide-gold-line border-y border-gold-line text-base">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-3">
            <dt className="text-ivory-faint">{k}</dt>
            <dd className="text-right text-ivory [&_a]:underline">{v}</dd>
          </div>
        ))}
      </dl>

      <h2>Prices and payment</h2>
      <p>
        All prices are in euros and include VAT (BTW). Shipping costs are shown before you pay.
        Payment is processed securely by Mollie; the payment methods available are shown at
        checkout.
      </p>

      <h2>Right of withdrawal</h2>
      <p>
        If you are a consumer you may cancel your order without giving a reason within 14 days of
        receiving it. To do so, tell us clearly by e-mail or telephone, using the contact details
        above, that you want to withdraw.
      </p>
      <p>
        Send the goods back to us within 14 days of telling us you withdraw. The direct cost of
        returning the goods is borne by you. We refund the amount you paid, including the original
        standard shipping costs, within 14 days of receiving the goods back or proof that you have
        sent them. The goods must be returned unused and in their original condition; you are liable
        for any reduction in value caused by handling beyond what is needed to inspect them.
      </p>
      <h2>Safe use</h2>
      <p>We endorse safe use of our products and safe conduct in everything in our lives.</p>
      <figure className="frame not-prose relative my-6 bg-night/45 px-5 py-6 text-center sm:px-8">
        <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
        <div className="relative">
          <NarrationBody narration={safetyNarration} large />
        </div>
      </figure>

      <h2>Privacy and cookies</h2>
      <p>
        How we handle your personal data is described in our{" "}
        <Link href="/privacy">privacy policy</Link>. We only use cookies that are needed for the
        shop to work, such as your cart and being signed in.
      </p>

      <h2>Delivery and returns</h2>
      <p>
        See <Link href="/shipping-returns">Shipping &amp; returns</Link> for where we deliver and
        how long it takes.
      </p>
    </EditorialPage>
  );
}
