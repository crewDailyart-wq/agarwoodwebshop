import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { CartButton } from "./CartButton";
import { nav } from "@/content/nav";
import { NavLinks } from "./NavLinks";
import { SearchIcon } from "./icons";
import { AgarwoodBranch, BrocadeBand, StarLattice } from "./HeaderOrnament";
import logo from "@/assets/aluwwah-logo.png";

export function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} — home`}>
      {/* The full ALUWWAH logo: tree, name and roots. The name is in the artwork. */}
      <Image
        src={logo}
        alt={site.name}
        preload={!small}
        sizes="(min-width: 640px) 192px, 160px"
        className={`${small ? "h-20" : "h-[4.5rem] sm:h-24"} w-auto`}
      />
    </Link>
  );
}

export function Header() {
  return (
    <header className="relative z-30">
      {/* Announcement strip */}
      <div className="relative overflow-hidden border-b border-gold/50 bg-black">
        <BrocadeBand className="absolute inset-0 h-full w-full opacity-55 [mask-image:linear-gradient(90deg,#000_0%,#000_8%,transparent_17%,transparent_83%,#000_92%,#000_100%)] sm:[mask-image:linear-gradient(90deg,#000_0%,#000_33%,transparent_42%,transparent_58%,#000_67%,#000_100%)]" />
        <p className="relative flex h-9 items-center justify-center gap-3 font-[family-name:var(--font-caps)] text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold-bright sm:text-[0.74rem]">
          <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
          Worldwide shipping
          <span aria-hidden className="h-1 w-1 rotate-45 bg-gold" />
        </p>
      </div>

      {/* Three columns with equal outer widths, so the menu sits exactly under the strip's text. */}
      <div className="relative grid grid-cols-[1fr_auto] items-stretch border-b border-gold bg-white lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <StarLattice
          className="pointer-events-none absolute inset-0 h-full w-full text-gold-deep opacity-[0.28] [mask-image:linear-gradient(90deg,#000,rgb(0_0_0/0.35)_40%,rgb(0_0_0/0.35)_60%,#000)]"
        />

        <div className="relative flex min-w-0 items-stretch">
          {/* The logo sits on its own deep-emerald corner, as in the original artwork. */}
          <div className="flex shrink-0 items-center bg-emerald bg-[radial-gradient(90%_90%_at_50%_45%,#00461a_0%,#002e0a_70%)] px-5 py-2 sm:px-8">
            <Logo />
          </div>
          {/* Below lg the menu is folded away: a facing pair of branches fills the bar. */}
          <div className="flex min-w-0 flex-1 items-center justify-center gap-1 px-2 sm:gap-4 lg:hidden">
            <AgarwoodBranch id="orn-m1" className="h-12 w-auto max-w-[47%] sm:h-[5rem]" />
            <AgarwoodBranch id="orn-m2" className="h-12 w-auto max-w-[47%] -scale-x-100 sm:h-[5rem]" />
          </div>
        </div>

        {/* Menu flanked by two identical branches, so the centre stays symmetrical. */}
        <div className="relative hidden items-center gap-3 px-3 lg:flex min-[1600px]:gap-4">
          <AgarwoodBranch id="orn-l" className="hidden h-[3.5rem] w-auto shrink-0 min-[1440px]:block min-[1600px]:h-[5.6rem]" />
          <nav aria-label="Main">
            <NavLinks />
          </nav>
          <AgarwoodBranch id="orn-r" className="hidden h-[3.5rem] w-auto shrink-0 -scale-x-100 min-[1440px]:block min-[1600px]:h-[5.6rem]" />
        </div>

        <div className="relative flex min-w-0 items-center justify-end">
          <div className="flex shrink-0 items-center gap-1 pr-4 sm:gap-2 sm:pr-6">
            <Link
              href="/collection"
              aria-label="Search the collection"
              className="hidden h-11 w-11 items-center justify-center text-gold-deep hover:text-emerald sm:flex"
            >
              <SearchIcon className="h-6 w-6" />
            </Link>
            <CartButton />
            <details className="relative lg:hidden">
              <summary className="flex h-11 cursor-pointer list-none items-center px-2 font-[family-name:var(--font-caps)] text-[0.85rem] font-semibold tracking-[0.25em] text-gold-deep uppercase">
                Menu
              </summary>
              <nav
                aria-label="Mobile"
                className="absolute right-0 top-12 w-64 border border-gold-line bg-night p-5"
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
          </div>
        </div>
      </div>
    </header>
  );
}
