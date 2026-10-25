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
    <header className="relative z-30 border-b border-gold-line bg-night/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-2 sm:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/collection"
            aria-label="Search the collection"
            className="hidden h-11 w-11 items-center justify-center text-ivory hover:text-gold sm:flex"
          >
            <SearchIcon className="h-5 w-5" />
          </Link>
          <CartButton />
          <span aria-hidden className="mx-2 hidden h-10 w-px bg-gold-line xl:block" />
          <p className="side-note hidden !text-[0.5rem] !leading-[1.7] xl:block">
            A more
            <br />
            fragrant
            <br />
            world
          </p>
          <details className="relative lg:hidden">
            <summary className="eyebrow flex h-11 cursor-pointer list-none items-center px-2">Menu</summary>
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
