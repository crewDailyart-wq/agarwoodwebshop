import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { CartButton } from "./CartButton";
import { nav } from "@/content/nav";
import { NavLinks } from "./NavLinks";
import { SearchIcon } from "./icons";
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
    <header className="relative z-30 flex items-stretch border-b border-gold bg-white">
      {/* The logo sits on its own deep-emerald corner, as in the original artwork. */}
      <div className="flex shrink-0 items-center bg-emerald bg-[radial-gradient(90%_90%_at_50%_45%,#00461a_0%,#002e0a_70%)] px-5 py-2 sm:px-8">
        <Logo />
      </div>
      <div className="flex flex-1 items-center justify-between gap-6 px-5 sm:px-8">
        <nav aria-label="Main" className="hidden flex-1 justify-center lg:flex">
          <NavLinks />
        </nav>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <Link
            href="/collection"
            aria-label="Search the collection"
            className="hidden h-11 w-11 items-center justify-center text-gold-deep hover:text-emerald sm:flex"
          >
            <SearchIcon className="h-6 w-6" />
          </Link>
          <CartButton />
          <span aria-hidden className="mx-2 hidden h-10 w-px bg-gold/60 min-[1400px]:block" />
          <p className="side-note hidden !text-[0.58rem] !leading-[1.7] !text-gold-deep min-[1400px]:block">
            A more
            <br />
            fragrant
            <br />
            world
          </p>
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
    </header>
  );
}
