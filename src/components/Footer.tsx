import Link from "next/link";
import { site } from "@/content/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop/agarwood-chips", label: "Agarwood" },
      { href: "/shop/incense-burner", label: "The Burner" },
      { href: "/shop/the-complete-ritual", label: "The Complete Ritual" },
    ],
  },
  {
    title: "Discover",
    links: [
      { href: "/our-story", label: "Our Story" },
      { href: "/origins", label: "Origins" },
      { href: "/ritual", label: "The Ritual" },
    ],
  },
  {
    title: "Care",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/shipping-returns", label: "Shipping & returns" },
      { href: "/privacy", label: "Privacy policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-violet-line bg-gradient-to-b from-transparent to-plum/40 shadow-[0_-1px_30px_rgb(140_80_230/0.25)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <p className="display text-2xl tracking-[0.32em]">{site.name}</p>
          <p className="mt-4 max-w-xs text-sm text-ivory-faint">{site.description}</p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="eyebrow mb-4">{col.title}</h2>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ivory-soft hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-gold-line px-5 py-6 text-xs text-ivory-faint sm:px-8">
        <p>© {site.name}</p>
        {site.social.length > 0 && (
          <ul className="flex gap-5">
            {site.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener noreferrer" className="hover:text-gold">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
