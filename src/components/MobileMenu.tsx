"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/nav";

/** The folded-away menu on phones and tablets: opens a panel with a cross to close it again. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);

  // Close after navigating to another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close with Esc or by tapping anywhere outside the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={root} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 cursor-pointer items-center px-2 font-[family-name:var(--font-caps)] text-[0.85rem] font-semibold uppercase tracking-[0.25em] text-gold-deep"
      >
        Menu
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute right-0 top-12 z-40 w-64 border border-gold-line bg-night p-5 pt-4 shadow-[0_12px_40px_rgb(0_0_0_/_0.5)]"
        >
          <div className="mb-1 flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="-mr-2 flex h-10 w-10 items-center justify-center text-gold-bright transition-colors hover:text-ivory"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 4l12 12M16 4 4 16" />
              </svg>
            </button>
          </div>
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)} className="display block py-2 text-2xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
