import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Header";
import { nav } from "@/content/nav";
import { getMollieMethods } from "@/lib/mollie-methods";
import { PaymentLogos } from "./PaymentLogos";
import { StripSmoke } from "./StripSmoke";
import { Suspense } from "react";
import { FooterAccount, FooterAccountSkeleton } from "./account/FooterAccount";

const information = [
  { href: "/about", label: "About" },
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/privacy", label: "Privacy policy" },
];

/** A fine gold rule with a small diamond in the middle. */
function Rule({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 ${className}`}>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold-line" />
      <span className="h-1.5 w-1.5 rotate-45 border border-gold" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold-line" />
    </div>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-gold-hair pb-3 font-[family-name:var(--font-caps)] text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold-bright">
      {children}
    </h2>
  );
}

function LinkList({ items, label }: { items: { href: string; label: string }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-col gap-3 text-[0.98rem]">
        {items.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-flex items-center gap-3 text-ivory hover:text-gold-bright">
              <span aria-hidden className="h-1 w-1 shrink-0 rotate-45 bg-gold/70" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export async function Footer() {
  const methods = await getMollieMethods();
  return (
    <footer className="mt-auto border-t-2 border-gold-line bg-night/90">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-12 sm:px-8">
        {/* Crest, with the account corner on its left */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <div className="order-first flex flex-col items-center text-center lg:order-none lg:col-start-2">
            <Logo small />
            <p className="mt-4 font-[family-name:var(--font-display)] text-lg italic text-ivory-soft">
              {site.tagline}
            </p>
          </div>
          {site.featuredVideo.id && (
            <figure className="mx-auto w-full max-w-md lg:col-start-3 lg:row-start-1 lg:ml-auto lg:mr-0">
              <figcaption className="eyebrow mb-3 text-center lg:text-right">
                Featured · {site.featuredVideo.channel}
              </figcaption>
              <div className="aspect-video w-full overflow-hidden border border-gold-line bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${site.featuredVideo.id}`}
                  title={site.featuredVideo.title}
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-full w-full"
                />
              </div>
              <p lang="ar" dir="rtl" className="mt-3 text-center text-sm text-ivory-soft lg:text-right">
                {site.featuredVideo.title}
              </p>
            </figure>
          )}
          <div className="flex justify-center lg:col-start-1 lg:row-start-1 lg:justify-start">
            <Suspense fallback={<FooterAccountSkeleton />}>
              <FooterAccount />
            </Suspense>
          </div>
        </div>
        <Rule className="my-10" />

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <section>
            <ColumnTitle>Contact / Wholesale</ColumnTitle>
            <div className="space-y-6 text-[0.98rem] leading-relaxed text-ivory-soft">
              <div>
                <p className="mb-2">For wholesale inquiries you can contact us on the following numbers:</p>
                <ul className="space-y-1">
                  {site.wholesalePhones.map((p) => (
                    <li key={p.tel}>
                      <a href={`tel:${p.tel}`} className="tabular-nums text-ivory hover:text-gold-bright">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {site.contactEmail && (
                <div>
                  <p className="mb-2">For any question you can send us an e-mail to:</p>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="break-all text-ivory underline decoration-gold/50 underline-offset-4 hover:text-gold-bright"
                  >
                    {site.contactEmail}
                  </a>
                </div>
              )}
            </div>
          </section>

          <section>
            <ColumnTitle>Explore</ColumnTitle>
            <LinkList items={nav} label="Footer — explore" />
          </section>

          <section>
            <ColumnTitle>Information</ColumnTitle>
            <LinkList items={information} label="Footer — information" />
          </section>

          <section>
            <ColumnTitle>Payment</ColumnTitle>
            <PaymentLogos methods={methods} />
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Other ways to pay">
              {["Direct bank transfer", "Cash"].map((p) => (
                <li
                  key={p}
                  className="border border-gold-line bg-black/30 px-3 py-1.5 font-[family-name:var(--font-caps)] text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ivory"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-ivory-faint">
              Secure checkout through Mollie. You choose how to pay at checkout.
            </p>
            {site.social.length > 0 && (
              <ul className="mt-6 flex flex-col gap-2">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener noreferrer" className="text-ivory hover:text-gold">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative overflow-hidden border-t border-gold/50 bg-black">
        <StripSmoke />
        <p className="relative mx-auto flex h-14 max-w-[1400px] items-center justify-center px-5 text-center font-[family-name:var(--font-caps)] text-[0.7rem] tracking-[0.16em] text-gold-bright [text-shadow:0_0_3px_#000,0_0_7px_#000,0_0_14px_#000,0_0_22px_#000] sm:px-8">
          © {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
