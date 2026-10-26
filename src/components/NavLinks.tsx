"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-6 xl:gap-9">
      {nav.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`border-b-2 pb-1 font-[family-name:var(--font-caps)] text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-gold-deep transition-colors xl:text-[1.2rem] ${
                active ? "border-gold" : "border-transparent hover:border-gold/50 hover:text-emerald"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
