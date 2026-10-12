import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "./Header";
import { nav } from "@/content/nav";

const more = [
  { href: "/shop/the-complete-ritual", label: "The Complete Ritual" },
  { href: "/ritual", label: "The Ritual" },
  { href: "/our-story", label: "Our Story" },
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/privacy", label: "Privacy policy" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold-line bg-night/80">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-8 px-5 py-8 sm:px-8">
        <Logo small />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-9 gap-y-2 text-[0.95rem]">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ivory hover:text-gold-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-8">
          {site.social.length > 0 && (
            <ul className="flex gap-5">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} rel="noopener noreferrer" className="text-ivory hover:text-gold">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <span aria-hidden className="hidden h-10 w-px bg-gold-line md:block" />
          <p className="side-note !text-[0.55rem] !text-ivory">
            A more fragrant world
            <br />
            for generations to come.
          </p>
        </div>
      </div>
      <div className="border-t border-gold-hair">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-5 text-[0.8rem] text-ivory-faint sm:px-8">
          <p>© {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {more.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="italic">Rare woods. A more fragrant world.</p>
        </div>
      </div>
    </footer>
  );
}
