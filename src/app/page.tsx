import Link from "next/link";
import { AsiaMap } from "@/components/AsiaMap";
import { CartIconButton } from "@/components/CartIconButton";
import { FlowerPanel } from "@/components/FlowerPanel";
import { PhotoSlot } from "@/components/PhotoSlot";
import { VietnamInset } from "@/components/VietnamInset";
import { ArrowIcon, BotanicalSprig } from "@/components/icons";
import { pricesConfirmed, products, type Product } from "@/content/catalog";
import { formatMoney } from "@/lib/money";

function ProductBody({ product }: { product: Product }) {
  return (
    <div className="paper flex flex-1 flex-col border-t border-gold px-5 pb-5 pt-4">
      <h3 className="eyebrow !text-[0.7rem] !text-gold-ink leading-relaxed">
        <Link href={`/shop/${product.slug}`} className="hover:text-gold-deep">
          {product.name}
        </Link>
      </h3>
      <p className="eyebrow mt-1 !text-[0.5rem] !text-gold-deep leading-loose">{product.cardLabel}</p>
      <p className="mt-3 text-[0.8rem] leading-relaxed">{product.summary}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <CardPrice cents={product.priceCents} />
        <CartIconButton id={product.id} name={product.name} soldOut={product.stock === 0} />
      </div>
    </div>
  );
}

function CardPrice({ cents }: { cents: number }) {
  return (
    <p className="font-[family-name:var(--font-display)] text-[1.5rem] leading-none tabular-nums">
      {formatMoney(cents)}
      {!pricesConfirmed && (
        <span className="eyebrow mt-1 block !text-[0.48rem] !text-gold-deep">preview price</span>
      )}
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
  const vietnamese = products["agarwood-chips"];
  const set = products["the-complete-ritual"];

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

      {/* ───────── Regions & products ───────── */}
      <section className="velvet border-b border-gold-line">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8">
          {/* Two halves, each centred over two of the four cards below. */}
          <div className="mx-auto grid max-w-sm items-center gap-6 sm:max-w-2xl lg:max-w-[1240px] lg:grid-cols-2 lg:gap-5">
            <header className="text-center">
              <p className="eyebrow eyebrow-gold">Choose which agarwood region</p>
              <div className="mt-3 flex items-center justify-center gap-4 sm:gap-5">
                <span aria-hidden className="h-px w-8 bg-gold sm:w-12" />
                <h2 className="display whitespace-nowrap text-[2.2rem] sm:text-[2.6rem]">True Agarwood</h2>
                <span aria-hidden className="h-px w-8 bg-gold sm:w-12" />
              </div>
            </header>

            {/* Sahih Muslim 2254: the Prophet ﷺ fumigated himself with aloeswood (al-uluwwah). */}
            <figure className="frame relative bg-night/45 px-5 py-4 text-center sm:px-7">
              <span aria-hidden className="absolute inset-1.5 border border-gold-hair" />
              <blockquote className="relative">
                <p lang="ar" dir="rtl" className="quran text-[1.02rem] leading-[1.95] sm:text-[1.1rem]">
                  عَنْ نَافِعٍ، قَالَ: كَانَ ابْنُ عُمَرَ إِذَا اسْتَجْمَرَ اسْتَجْمَرَ{" "}
                  <span className="text-ivory">بِالأَلُوَّةِ</span> غَيْرِ مُطَرَّاةٍ، وَبِكَافُورٍ يَطْرَحُهُ مَعَ{" "}
                  <span className="text-ivory">الأَلُوَّةِ</span>، ثُمَّ قَالَ: هَكَذَا كَانَ يَسْتَجْمِرُ رَسُولُ اللَّهِ صَلَّى
                  اللَّهُ عَلَيْهِ وَسَلَّمَ
                </p>
                <p className="mx-auto mt-2 max-w-xl text-[0.86rem] italic leading-relaxed text-ivory">
                  Nafi&rsquo; reported: When Ibn &lsquo;Umar fumigated himself, he used aloeswood{" "}
                  <span className="not-italic text-gold-bright">(al-uluwwah)</span> without mixing anything with
                  it, and with camphor which he put together with the aloeswood. Then he said: &ldquo;This is how the
                  Messenger of Allah{" "}
                  <span className="mx-0.5 inline-block not-italic text-[1.15em] leading-none">&#xFDFA;</span>{" "}
                  used to fumigate himself.&rdquo;
                </p>
              </blockquote>
              <figcaption className="eyebrow eyebrow-gold relative mt-2 !text-[0.5rem]">Sahih Muslim 2254</figcaption>
            </figure>
          </div>

          {/* Four cards of equal width and height. */}
          <div className="mx-auto mt-8 grid max-w-sm gap-5 sm:max-w-2xl sm:grid-cols-2 lg:max-w-[1240px] lg:grid-cols-4">
            <FlowerPanel />

            {/* Vietnam: the product photo leads; the region map is a small inset. */}
            <article className="frame group flex flex-col bg-night/80 transition-colors hover:border-gold">
              <Link href={`/shop/${vietnamese.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[4/3]">
                <PhotoSlot photo={vietnamese.photos[0]} quiet className="absolute inset-0" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
                <VietnamInset />
              </Link>
              <ProductBody product={vietnamese} />
            </article>

            <article className="frame group flex flex-col bg-night/80 transition-colors hover:border-gold">
              <Link href={`/shop/${set.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[4/3]">
                <PhotoSlot photo={set.photos[0]} quiet className="absolute inset-0" sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" />
              </Link>
              <ProductBody product={set} />
            </article>

            <Link
              href="/collection"
              className="frame velvet group relative flex min-h-64 flex-col justify-between overflow-hidden p-6"
            >
              <BotanicalSprig className="absolute -right-8 -top-10 h-80 w-28 rotate-12 text-gold/25" />
              <p className="font-[family-name:var(--font-caps)] text-[1.15rem] uppercase leading-snug tracking-[0.14em] text-ivory">
                Our Creator&rsquo;s
                <br />
                favor upon us
              </p>
              <span aria-hidden className="h-px w-10 bg-gold" />
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
