import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Header";
import { nav } from "@/content/nav";

const information = [
  { href: "/shop/the-complete-ritual", label: "Complete Agarwood Set" },
  { href: "/ritual", label: "The Ritual" },
  { href: "/our-story", label: "Our Story" },
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/privacy", label: "Privacy policy" },
];

/**
 * Payment methods shown in the footer. Payment is taken on Mollie's secure page,
 * so this list must match the methods switched on in the Mollie dashboard.
 * Plain text plaques on purpose: no third-party logos are copied.
 */
const payments = ["iDEAL", "Visa", "Mastercard", "Bancontact", "PayPal"];

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

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-gold-line bg-night/90">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-12 sm:px-8">
        {/* Crest */}
        <div className="flex flex-col items-center text-center">
          <Logo small />
          <p className="mt-4 font-[family-name:var(--font-display)] text-lg italic text-ivory-soft">
            {site.tagline}
          </p>
        </div>
        <Rule className="my-10" />

        {/* Columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <section>
            <ColumnTitle>Our House</ColumnTitle>
            <p className="max-w-[28ch] text-[0.98rem] leading-relaxed text-ivory-soft">
              Genuine agarwood from different parts of Asia, offered with respect for the tree and
              for the ritual.
            </p>
            <p className="side-note mt-5 !text-[0.55rem] !text-ivory">
              A more fragrant world
              <br />
              for generations to come.
            </p>
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
            <ul className="flex flex-wrap gap-2" aria-label="Accepted payment methods">
              {payments.map((p) => (
                <li
                  key={p}
                  className="border border-gold-line bg-black/30 px-3 py-1.5 font-[family-name:var(--font-caps)] text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ivory"
                >
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-ivory-faint">
              Secure checkout. You choose how to pay on the next page.
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
      <div className="border-t border-gold-hair">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-2 px-5 py-6 text-center text-[0.8rem] text-ivory-faint sm:px-8">
          <p className="font-[family-name:var(--font-caps)] text-[0.62rem] uppercase tracking-[0.3em] text-gold">
            Rare woods. A more fragrant world.
          </p>
          <p>© {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
