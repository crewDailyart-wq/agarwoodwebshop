import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BakhoorSmoke } from "@/components/BakhoorSmoke";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";

// Self-hosted (src/fonts) so the build never depends on Google Fonts.
const display = localFont({
  variable: "--font-cormorant",
  src: "../fonts/cormorant-garamond-latin-wght-normal.woff2",
  weight: "300 700",
  display: "swap",
});

const serif = localFont({
  variable: "--font-garamond",
  src: [
    { path: "../fonts/eb-garamond-latin-wght-normal.woff2", weight: "400 800", style: "normal" },
    { path: "../fonts/eb-garamond-latin-wght-italic.woff2", weight: "400 800", style: "italic" },
  ],
  display: "swap",
});

const caps = localFont({
  variable: "--font-cinzel",
  src: "../fonts/cinzel-latin-wght-normal.woff2",
  weight: "400 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#0B0710",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${caps.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <BakhoorSmoke />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
