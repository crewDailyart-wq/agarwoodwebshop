import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";
import { site } from "@/content/site";
import { NarrationBody } from "@/components/NarrationBody";
import { safetyNarration } from "@/content/narrations";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "The terms that apply when you order from ALUWWAH.",
};

export default function TermsPage() {
  const l = site.legal;
  return (
    <EditorialPage eyebrow="Information" title="Terms and conditions">
      <p className="pb-1">
        <span lang="ar" dir="rtl" className="quran block text-left text-[1.7rem] leading-[1.8]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
        <span className="mt-1 block italic text-ivory">(Bismillah Ar-Rahman Ar-Rahiem)</span>
      </p>
      <p>The following information you find on this page is required by the law of the country in which we operate.</p>

      <h2>1. Who we are</h2>
      <p>
        {site.name} is the trading name of {l.legalName ?? site.name}
        {l.address ? `, ${l.address}` : ""}
        {l.kvk ? `. KvK number ${l.kvk}` : ""}
        {l.vatId ? `. BTW-id ${l.vatId}` : ""}. You can reach us by e-mail at{" "}
        {site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>} or by
        telephone on {site.wholesalePhones.map((p) => p.display).join(" or ")}. More details are on
        our <Link href="/about">About page</Link>.
      </p>

      <h2>2. Our products and prices</h2>
      <p>
        Agarwood, camphor and the incense burner are natural or hand-finished goods. Colour, grain,
        shape and scent may differ a little from the photographs and from piece to piece; this is
        the nature of true agarwood. We describe our products as truthfully as we can.
      </p>
      <p>
        All prices are in euros and include VAT (BTW). Shipping costs are shown before you pay and
        are never added afterwards. If a price or description is clearly a mistake, we may correct
        it before we accept your order and will tell you.
      </p>

      <h2>3. Your order</h2>
      <p>
        When you place an order we send you a confirmation by e-mail. The agreement is made when
        we send that confirmation. If we cannot fulfil your order, for example because an item is
        sold out, we will tell you promptly and refund anything you have paid.
      </p>

      <h2>4. Payment</h2>
      <p>
        You can pay with the methods shown at checkout. Online payments are processed securely by
        Mollie. If you pay by bank transfer or by cash sent as arranged at checkout, we prepare
        your order once the payment has reached us.
      </p>

      <h2>5. Delivery</h2>
      <p>
        We deliver to the countries shown at checkout. The expected delivery time is shown on our{" "}
        <Link href="/shipping-returns">Shipping &amp; returns</Link> page. Unless we agree
        otherwise, we deliver within 30 days of your order. If we cannot, you may cancel and we
        refund you. The goods become your responsibility once they have been delivered to you.
        Please check the parcel on arrival and tell us at once if it is damaged. We ship worldwide. For orders outside the European Union, import duties, taxes and any permits required by the destination country are the responsibility of the customer.
      </p>

      <h2>6. Right of withdrawal</h2>
      <p>
        As a consumer you may cancel your order without giving a reason within 14 days after you
        have received the goods. Tell us clearly, by e-mail or telephone, that you wish to
        withdraw; you can use the model form at the end of these terms, but you do not have to.
      </p>
      <p>
        Send the goods back to us within 14 days after telling us. We cover the cost of returning
        the goods: tell us you wish to return them and we will arrange the return or reimburse
        your postage. We refund the full amount you paid, including the original
        standard shipping costs, within 14 days after we receive the goods back or after you show
        proof that you have sent them. Return the goods unused and in their original condition; you
        are liable for any loss in value caused by handling beyond what is needed to inspect them.
      </p>

      <h2>7. If something is not right</h2>
      <p>
        The goods must match what we described. If they do not, or if they arrive damaged, contact
        us as soon as you notice, with a photograph if you can. We will reply as soon as possible, within 2 days, and replace your order or refund you insha Allah.
      </p>

      <h2>8. Safe use</h2>
      <p>We endorse safe use of our products and safe conduct in everything in our lives.</p>
      <figure className="frame not-prose relative my-6 bg-night/45 px-5 py-6 text-center sm:px-8">
        <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
        <div className="relative">
          <NarrationBody narration={safetyNarration} large />
        </div>
      </figure>

      <h2>9. Liability</h2>
      <p>
        We are liable for damage or improper handling caused from our side. This is the right way.
      </p>

      <h2>10. Privacy</h2>
      <p>
        How we handle your personal data is described in our{" "}
        <Link href="/privacy">privacy policy</Link>.
      </p>

      <h2>11. Applicable law</h2>
      <p>
        Dutch law applies to these terms and to every agreement between you and us. Mandatory
        consumer protection of the country where you live remains unaffected. We may update these
        terms; the version that applies to your order is the one that was shown when you placed it.
      </p>
      <p>
        May Allah give the believers a strong and helping realm on this earth, helping each other to true success in this world and the hereafter.
      </p>

      <h2>Model withdrawal form</h2>
      <p>
        (Complete and return this form only if you wish to withdraw from the contract.)
      </p>
      <p>
        To {l.legalName ?? site.name}, {l.address ?? ""}
        {site.contactEmail ? `, ${site.contactEmail}` : ""}:
      </p>
      <p>
        I/We hereby give notice that I/We withdraw from my/our contract for the sale of the
        following goods: ______________________ · Ordered on / received on: ______________ · Name of
        consumer(s): ______________________ · Address of consumer(s): ______________________ ·
        Signature of consumer(s) (only if this form is on paper): ______________ · Date: ____________
      </p>
    </EditorialPage>
  );
}
