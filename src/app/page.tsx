import Link from "next/link";
import { AsiaMap } from "@/components/AsiaMap";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon, BotanicalSprig } from "@/components/icons";
import { products } from "@/content/catalog";

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
    <aside aria-label="From the Holy Qur'an" className="frame relative bg-night/55 px-6 py-7 sm:px-9">
      <span aria-hidden className="absolute inset-2 border border-gold-hair" />
      <ul className="relative space-y-6">
        {verses.map((v) => (
          <li key={v.ref} className="text-center">
            <p lang="ar" dir="rtl" className="quran text-[1.6rem] leading-[2] sm:text-[1.85rem]">
              {v.arabic}
            </p>
            <p className="mx-auto mt-3 max-w-lg text-[1.02rem] italic leading-relaxed text-ivory">
              &ldquo;{v.english}&rdquo;
            </p>
            <p className="eyebrow eyebrow-gold mt-3 !text-[0.55rem]">{v.ref}</p>
          </li>
        ))}
      </ul>
      <div aria-hidden className="relative mx-auto my-6 flex items-center justify-center gap-3">
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

        <div className="mx-auto w-full max-w-[1400px] px-5 pb-12 pt-5 sm:px-8 md:pt-6">
          <h1 className="display text-balance text-center text-[2.1rem] sm:text-[2.6rem] lg:text-[3rem]">
            True Agarwood from Different Parts of Asia
          </h1>

          <div className="mt-5 grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
            <figure className="frame relative flex flex-col bg-night/55 p-2">
              <div className="relative aspect-[1000/760] overflow-hidden bg-black lg:aspect-auto lg:flex-1">
                <AsiaMap cover className="absolute inset-0 h-full w-full" />
                {/* Over the open land of the north, clear of every country name. */}
                <div className="absolute inset-x-0 top-[4%] flex justify-center px-4">
                  <Link
                    href="/collection"
                    className="btn btn-solid !min-h-[2.5rem] !gap-3 !px-5 !text-[0.6rem] sm:!min-h-[3.2rem] sm:!gap-4 sm:!px-8 sm:!text-[0.74rem] shadow-[0_6px_28px_rgb(0_0_0_/_0.55)] ring-1 ring-gold-bright/70"
                  >
                    Explore the collection <ArrowIcon className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <figcaption className="flex flex-wrap items-center justify-between gap-2 px-3 pb-1 pt-2.5">
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

    </>
  );
}
