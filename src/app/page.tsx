import Link from "next/link";
import { AsiaMap } from "@/components/AsiaMap";
import { PhotoSlot } from "@/components/PhotoSlot";
import { ProductCard } from "@/components/ProductCard";
import {
  ArrowIcon,
  BotanicalSprig,
  FlowerIcon,
  LeafIcon,
  RootsIcon,
} from "@/components/icons";
import { products } from "@/content/catalog";

/** The agarwood-growing regions, grouped as in an atlas legend. Geography, not sourcing. */
const regionGroups = [
  { title: "South Asia", places: "India · Sri Lanka · Bangladesh" },
  { title: "Mainland Southeast Asia", places: "Myanmar · Thailand · Laos · Cambodia · Vietnam" },
  { title: "Maritime Southeast Asia", places: "Malaysia · Singapore · Brunei · Indonesia · Philippines" },
  { title: "Southern China", places: "Southern China" },
  { title: "New Guinea / Oceania", places: "Papua New Guinea" },
];

const craft = [
  { Icon: RootsIcon, title: "Natural resin formation", note: "Years to decades" },
  { Icon: LeafIcon, title: "A gentle ritual", note: "Warmed, never lit" },
  { Icon: FlowerIcon, title: "Considered selection", note: "Two essentials, chosen" },
];

/**
 * Notes from the house. These are NOT customer reviews: real reviews, with the
 * customer's permission, can replace them later. Never invent attributions.
 */
const voices = [
  {
    quote:
      "Agarwood is warmed, never lit. Its fragrance arrives slowly — and changes as it does.",
    source: "On the ritual",
  },
  {
    quote: "A single chip, a quiet evening. Some luxuries ask only for time.",
    source: "From the house",
  },
];

function SideNote({ lines, className = "" }: { lines: string[]; className?: string }) {
  return (
    <p aria-hidden className={`side-note pointer-events-none absolute ${className}`}>
      {lines.map((l) => (
        <span key={l} className="block">
          {l}
        </span>
      ))}
    </p>
  );
}

/**
 * Two verses of the Holy Qur'an (Arabic text with an English rendering of the
 * meaning) and the owner's reflection on them. Shown in the hero so every
 * visitor sees them on arrival.
 */
const verses = [
  {
    arabic:
      "وَسَخَّرَ لَكُمْ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ جَمِيعًا مِنْهُ ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ",
    english:
      "And He has subjected to you whatever is in the heavens and whatever is on the earth — all from Him. Indeed, in that are signs for a people who reflect.",
    ref: "Surah Al-Jathiyah 45:13",
  },
  {
    arabic: "وَيُرِيكُمْ آيَاتِهِ فَأَيَّ آيَاتِ اللَّهِ تُنْكِرُونَ",
    english: "And He shows you His signs. So which of the signs of Allah will you deny?",
    ref: "Surah Ghafir 40:81",
  },
];

function Signs() {
  return (
    <aside aria-label="From the Holy Qur'an" className="frame relative bg-night/55 px-6 py-9 sm:px-10">
      <span aria-hidden className="absolute inset-2 border border-gold-hair" />
      <ul className="relative space-y-8">
        {verses.map((v) => (
          <li key={v.ref} className="text-center">
            <p lang="ar" dir="rtl" className="quran text-[1.7rem] leading-[2.1] sm:text-[2rem]">
              {v.arabic}
            </p>
            <p className="mx-auto mt-3 max-w-lg text-[1.02rem] italic leading-relaxed text-ivory">
              &ldquo;{v.english}&rdquo;
            </p>
            <p className="eyebrow eyebrow-gold mt-3 !text-[0.55rem]">{v.ref}</p>
          </li>
        ))}
      </ul>
      <div aria-hidden className="relative mx-auto my-8 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gold-line" />
        <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
        <span className="h-px w-12 bg-gold-line" />
      </div>
      <p className="relative mx-auto max-w-lg text-center text-[1.05rem] leading-relaxed text-ivory">
        Our Creator has subjected to us all that is in the earth, and shows us His signs therein;
        we use it and benefit from it. But it should not lead us away from Him &mdash; rather, it
        should lead us closer to Him.
      </p>
    </aside>
  );
}

export default function Home() {
  const featured = [
    products["agarwood-chips"],
    products["incense-burner"],
    products["the-complete-ritual"],
  ];

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section className="velvet relative isolate overflow-hidden border-b border-gold-line">
        <BotanicalSprig className="absolute -left-6 top-0 -z-10 hidden h-full w-40 text-gold/25 md:block" />

        <div className="mx-auto w-full max-w-[1400px] px-5 pb-14 pt-8 sm:px-8 md:pb-16 md:pt-10">
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6 md:pl-10">
            <div className="max-w-3xl">
              <h1 className="display text-[2.6rem] sm:text-5xl lg:text-[3.6rem]">
                True Agarwood from Different Parts of Asia
              </h1>
              <p className="mt-4 max-w-xl text-[1.12rem] leading-relaxed text-ivory">
                Genuine agarwood, formed over years as a tree answers a wound with fragrant resin.
              </p>
            </div>
            <div className="flex flex-col items-start gap-5">
              <Link href="/collection" className="btn btn-line">
                Explore the collection <ArrowIcon className="h-4 w-4" />
              </Link>
              <ul className="eyebrow eyebrow-gold flex flex-wrap items-center gap-x-4 gap-y-2 !text-[0.55rem]">
                <li>
                  <Link href="/origins" className="hover:text-gold-bright">Rare origins</Link>
                </li>
                <li aria-hidden className="h-3 w-px bg-gold" />
                <li>
                  <Link href="/ritual" className="hover:text-gold-bright">The ritual</Link>
                </li>
                <li aria-hidden className="h-3 w-px bg-gold" />
                <li>
                  <Link href="/our-story" className="hover:text-gold-bright">Lasting legacy</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:pl-10">
            <figure className="frame relative flex flex-col bg-night/55 p-2">
              <div className="relative aspect-[1000/720] overflow-hidden bg-black lg:aspect-auto lg:flex-1">
                <AsiaMap cover className="absolute inset-0 h-full w-full" />
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 pb-1 pt-3">
                <span className="eyebrow eyebrow-gold !text-[0.55rem]">Where agarwood grows</span>
                <span className="text-[0.75rem] italic text-ivory-faint">
                  Satellite imagery: NASA Blue Marble
                </span>
              </figcaption>
            </figure>

            <Signs />
          </div>
        </div>
      </section>

      {/* ───────── Featured selection ───────── */}
      <section className="border-b border-gold-line bg-night/70">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:pl-10">
            <div>
              <p className="eyebrow">Featured selection</p>
              <div className="mt-3 flex items-center gap-5">
                <h2 className="display text-4xl sm:text-[2.6rem]">Exceptional Agarwood</h2>
                <span aria-hidden className="hidden h-px w-12 bg-gold sm:block" />
              </div>
            </div>
            <p className="flex items-center gap-5 text-[1.05rem] italic text-ivory">
              &ldquo;The rarest fragrances are written by time.&rdquo;
              <span aria-hidden className="hidden h-px w-10 bg-gold sm:block" />
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
            <Link
              href="/collection"
              className="frame velvet group relative flex min-h-72 flex-col justify-between overflow-hidden p-8"
            >
              <BotanicalSprig className="absolute -right-8 -top-10 h-80 w-28 rotate-12 text-gold/25" />
              <p className="font-[family-name:var(--font-caps)] text-[1.35rem] uppercase leading-snug tracking-[0.16em] text-ivory">
                A higher
                <br />
                kind of
                <br />
                luxury
              </p>
              <span aria-hidden className="my-6 h-px w-10 bg-gold" />
              <span className="flex items-center justify-between gap-4">
                <span className="eyebrow eyebrow-gold !text-[0.55rem] leading-loose">
                  Discover
                  <br />
                  all products
                </span>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold transition-colors group-hover:bg-gold group-hover:text-ink">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── Sacred origins ───────── */}
      <section className="velvet border-b border-gold-line">
        <div className="mx-auto grid max-w-[1400px] items-center lg:grid-cols-2">
          <div className="px-5 py-14 sm:px-8 lg:py-20 lg:pl-12">
            <p className="eyebrow eyebrow-gold">Sacred origins</p>
            <h2 className="display mt-4 text-4xl sm:text-[2.6rem]">A Global Heritage</h2>
            <p className="mt-5 max-w-xs text-[1.08rem] leading-relaxed text-ivory">
              From ancient forests to your hands. The map above shows the regions where agarwood has
              grown, and been revered, for centuries.
            </p>
            <Link href="/origins" className="btn btn-line mt-8">
              Explore the origins <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="border-gold-line px-5 py-12 sm:px-8 lg:border-l lg:px-7">
            <p className="eyebrow eyebrow-gold">The agarwood regions</p>
            <ol className="mt-6 space-y-5">
              {regionGroups.map((g, i) => (
                <li key={g.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-bright to-gold font-[family-name:var(--font-caps)] text-[0.75rem] font-semibold text-ink">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block leading-tight text-ivory">{g.title}</span>
                    <span className="mt-0.5 block text-[0.82rem] leading-snug text-ivory-soft">
                      {g.places}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-start gap-4">
              <span aria-hidden className="mt-2 h-px w-8 shrink-0 bg-gold" />
              <p className="eyebrow !text-[0.52rem] leading-loose">
                Exceptional places.
                <br />
                Extraordinary woods.
              </p>
            </div>
            <p className="mt-6 text-[0.75rem] italic leading-snug text-ivory-faint">
              Where agarwood grows naturally — not a list of where ours comes from.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── The craft ───────── */}
      <section className="relative isolate overflow-hidden border-b border-gold-line bg-night/70">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[34%] lg:block">
          <PhotoSlot
            photo={{
              src: null,
              alt: "A drop of golden resin on dark agarwood",
              brief: "Macro: a bead of golden resin on dark, grained agarwood; purple shadows.",
              width: 1000,
              height: 800,
            }}
            quiet
            sizes="34vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night to-transparent" />
        </div>
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)_minmax(0,0.75fr)] lg:pl-12">
          <div>
            <p className="eyebrow eyebrow-gold">The craft</p>
            <h2 className="display mt-4 text-4xl sm:text-[2.6rem]">A Rarity Born of Time</h2>
            <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-ivory">
              Agarwood is nature&rsquo;s alchemy — formed over years through a rare interplay of
              tree, resin and time. We present it with respect for the material and the traditions
              around it.
            </p>
            <Link href="/craft" className="btn btn-line mt-7">
              Our craftsmanship <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid grid-cols-3 divide-x divide-gold-line border-x border-gold-line">
            {craft.map(({ Icon, title, note }) => (
              <li key={title} className="flex flex-col items-center px-3 py-4 text-center">
                <Icon className="h-14 w-14 text-gold" />
                <p className="eyebrow mt-5 !text-[0.52rem] leading-loose">{title}</p>
                <p className="mt-3 text-[0.85rem] italic text-ivory-soft">{note}</p>
              </li>
            ))}
          </ul>
          <div className="hidden lg:block" />
        </div>
        <SideNote
          lines={["Time", "creates", "the", "extraordinary"]}
          className="bottom-8 right-8 hidden lg:block"
        />
      </section>

      {/* ───────── Voices & heritage ───────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[26%] lg:block">
          <PhotoSlot
            photo={{
              src: null,
              alt: "The incense burner with smoke rising in a dim room",
              brief: "The burner on a dark table, smoke rising, window light behind.",
              width: 800,
              height: 800,
            }}
            quiet
            sizes="26vw"
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night to-transparent" />
        </div>
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.75fr)] lg:pl-12">
          <div>
            <p className="eyebrow">Voices &amp; heritage</p>
            <h2 className="display mt-4 text-4xl sm:text-[2.4rem]">
              A Fragrance
              <br />
              that Connects Us
            </h2>
            <p className="mt-5 text-[0.95rem] italic text-ivory-soft">Notes from the house.</p>
          </div>
          {voices.map((v) => (
            <figure key={v.quote} className="border-gold-line lg:border-l lg:pl-8">
              <span aria-hidden className="display block text-5xl leading-none">
                &ldquo;
              </span>
              <blockquote className="mt-1 text-[1.02rem] italic leading-relaxed text-ivory">
                {v.quote}
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-[0.85rem] text-ivory-soft">
                <span aria-hidden className="h-px w-6 bg-gold" />
                {v.source}
              </figcaption>
            </figure>
          ))}
          <div className="hidden lg:block" />
        </div>
        <SideNote
          lines={["Different", "peoples", "one rare", "connection"]}
          className="bottom-1/3 right-8 hidden lg:block"
        />
      </section>
    </>
  );
}
