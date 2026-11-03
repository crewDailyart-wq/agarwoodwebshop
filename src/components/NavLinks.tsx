"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-2.5 min-[1100px]:gap-4 min-[1400px]:gap-6">
      {nav.map((item, i) => {
        const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Fragment key={item.href}>
            {i > 0 && (
              <li aria-hidden className="h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
            )}
            <li>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                aria-label={item.label}
                className={`group flex flex-col items-center border-b-2 pb-1 text-center font-[family-name:var(--font-caps)] font-semibold uppercase leading-[1.25] tracking-[0.06em] min-[1100px]:tracking-[0.1em] min-[1400px]:tracking-[0.12em] text-gold-deep transition-colors ${
                  active ? "border-gold" : "border-transparent hover:border-gold/50 hover:text-emerald"
                }`}
              >
                {item.lines.map((line) => (
                  <span key={line} className="whitespace-nowrap text-[0.66rem] min-[1100px]:text-[0.78rem] min-[1280px]:text-[0.86rem] min-[1400px]:text-[0.98rem]">
                    {line}
                  </span>
                ))}
              </Link>
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
}
