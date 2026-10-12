"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-9">
      {nav.map((item) => {
        const active =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`border-b pb-1 text-[0.98rem] transition-colors ${
                active
                  ? "border-gold text-gold-bright"
                  : "border-transparent text-ivory hover:text-gold-bright"
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
