import Link from "next/link";
import { site } from "@/content/site";
import { CartButton } from "./CartButton";

const nav = [
  { href: "/shop/agarwood-chips", label: "Agarwood" },
  { href: "/shop/incense-burner", label: "Burner" },
  { href: "/shop/the-complete-ritual", label: "The Complete Ritual" },
  { href: "/origins", label: "Origins" },
  { href: "/ritual", label: "The Ritual" },
];

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="display text-xl tracking-[0.32em] sm:text-2xl">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow !text-ivory-soft hover:!text-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <details className="relative lg:hidden">
            <summary className="eyebrow !text-ivory flex min-h-11 cursor-pointer list-none items-center">
              Menu
            </summary>
            <nav
              aria-label="Mobile"
              className="absolute right-0 top-12 w-64 border border-gold-line bg-aubergine p-5"
            >
              <ul className="space-y-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="display block py-2 text-2xl">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
