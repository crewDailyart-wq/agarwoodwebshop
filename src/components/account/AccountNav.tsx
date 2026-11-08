"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/account", label: "Overview", exact: true },
  { href: "/account/orders", label: "My orders", exact: false },
  { href: "/account/details", label: "Account details", exact: false },
];

export function AccountNav() {
  const path = usePathname();
  return (
    <nav aria-label="My account">
      <ul className="flex flex-row flex-wrap gap-x-6 gap-y-1 lg:flex-col lg:gap-0">
        {items.map((i) => {
          const active = i.exact ? path === i.href : path.startsWith(i.href);
          return (
            <li key={i.href} className="lg:border-b lg:border-gold-hair">
              <Link
                href={i.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-3 py-3 text-[1.02rem] ${
                  active ? "text-gold-bright" : "text-ivory hover:text-gold-bright"
                }`}
              >
                <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rotate-45 ${active ? "bg-gold" : "bg-gold/40"}`} />
                {i.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
