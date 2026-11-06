import type { Metadata } from "next";
import { AddToCart } from "@/components/AddToCart";
import { withSalutation } from "@/components/NarrationBody";
import { NarrationCarousel } from "@/components/NarrationCarousel";
import { ProductGallery } from "@/components/ProductGallery";
import { Price } from "@/components/Price";
import { QuantityOptions } from "@/components/QuantityOptions";
import { products } from "@/content/catalog";
import { camphorNarrations } from "@/content/narrations";
import { site } from "@/content/site";

const product = products["pure-camphor"];
const description = product.description.filter((b): b is string => typeof b === "string");

export const metadata: Metadata = {
  title: product.seo.title,
  description: product.seo.description,
  alternates: { canonical: "/camphor" },
};

/** Qur'an 76:5 — Arabic from quran.com; the English is a plain rendering of the meaning. */
const verse = {
  arabic: "إِنَّ ٱلۡأَبۡرَارَ يَشۡرَبُونَ مِن كَأۡسٖ كَانَ مِزَاجُهَا كَافُورًا",
  english: "Indeed, the righteous will drink from a cup whose mixture is camphor.",
  ref: "Surah Al-Insan 76:5",
};

/** Ibn ‘Abbas’s saying, as given by the owner. */
const ibnAbbas = {
  arabic: "لَيْسَ فِي الدُّنْيَا مِمَّا فِي الْجَنَّةِ إِلَّا الأَسْمَاءُ",
  english: "Nothing of what is in Paradise is in this world except the names.",
};

function Divider() {
  return (
    <span aria-hidden className="mx-auto my-5 flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-gold-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold-line" />
    </span>
  );
}

/** A framed panel with the site's double gold rule and a small gold heading. */
function Panel({
  eyebrow,
  label,
  className = "",
  children,
}: {
  eyebrow: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={label} className={`frame relative bg-night/45 px-5 py-6 sm:px-7 ${className}`}>
      <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
      <p className="eyebrow eyebrow-gold relative mb-4 text-center !text-[0.58rem]">{eyebrow}</p>
      <div className="relative">{children}</div>
    </section>
  );
}

export default function CamphorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: (product.priceCents / 100).toFixed(2),
      availability: "https://schema.org/InStock",
      url: `${site.url}/camphor`,
    },
  };

  return (
    <div className="velvet">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <h1 className="display text-center text-[2.6rem] leading-[1.1] sm:text-6xl">Pure Camphor</h1>

        {/* ───────── First narration: agarwood together with camphor ───────── */}
        <figure className="frame relative mx-auto mt-8 max-w-4xl bg-night/45 px-5 py-6 text-center sm:px-9">
          <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
          <blockquote className="relative">
            <p lang="ar" dir="rtl" className="quran text-[1.1rem] leading-[1.95] sm:text-[1.25rem]">
              عَنْ نَافِعٍ، قَالَ: كَانَ ابْنُ عُمَرَ إِذَا اسْتَجْمَرَ اسْتَجْمَرَ{" "}
              <span className="text-ivory">بِالأَلُوَّةِ</span> غَيْرِ مُطَرَّاةٍ، وَ<span className="text-ivory">بِكَافُورٍ</span>{" "}
              يَطْرَحُهُ مَعَ <span className="text-ivory">الأَلُوَّةِ</span>،
              ثُمَّ قَالَ: هَكَذَا كَانَ يَسْتَجْمِرُ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-[0.98rem] italic leading-relaxed text-ivory">
              Nafi&rsquo; reported: When Ibn &lsquo;Umar fumigated himself, he used aloeswood{" "}
              <span className="not-italic text-gold-bright">(al-uluwwah)</span> without mixing anything with it, and
              with <span className="not-italic text-gold-bright">camphor</span> which he put together with the
              aloeswood. Then he said: &ldquo;This is how the Messenger of Allah{" "}
              <span className="mx-0.5 inline-block not-italic text-[1.15em] leading-none">&#xFDFA;</span> used to
              fumigate himself.&rdquo;
            </p>
          </blockquote>
          <figcaption className="eyebrow eyebrow-gold relative mt-3 !text-[0.55rem]">Sahih Muslim 2254</figcaption>

          <Divider />
          <p className="relative mx-auto max-w-2xl text-[1.08rem] leading-relaxed text-ivory-soft">
            {withSalutation(
              "It is also from the tradition of Prophet Muhammad ﷺ to use agarwood/aloeswood by mixing it with camphor.",
            )}
          </p>
        </figure>

        {/*
          Three columns on a large screen: the other narrations on the left, the product in the
          middle, the verse on the right. On a phone the order is: first narration (above), the
          product, the verse, then the other narrations — the order they are written in here.
        */}
        <div className="mx-auto mt-8 grid max-w-2xl items-start gap-8 lg:max-w-none lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-6 xl:gap-8">
          {/* ── The product ── */}
          <article aria-label={product.name} className="lg:col-start-2 lg:row-start-1">
            <div className="space-y-4">
              <ProductGallery photos={product.photos} />
            </div>
            <div className="mt-6 text-center">
              <h2 className="display text-[2.1rem] leading-tight">{product.name}</h2>
              <Price cents={product.priceCents} className="mt-2 block text-xl tabular-nums" />
            </div>
            <div className="mt-6 space-y-5 border-t border-gold-line pt-6">
              <QuantityOptions product={product} />
              <AddToCart id={product.id} />
            </div>

            {/* The description: Bismillah, what the camphor is and how to use it, and a closing reflection. */}
            <div className="mt-8 border-t border-gold-line pt-8">
              {product.bismillah && (
                <p className="pb-5 text-center">
                  <span lang="ar" dir="rtl" className="quran block text-[1.7rem] leading-[1.8]">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                  <span className="mt-1 block italic text-ivory">(Bismillah Ar-Rahman Ar-Rahiem)</span>
                </p>
              )}
              <div className="space-y-4 text-ivory-soft">
                {description.slice(0, -1).map((text) => (
                  <p key={text}>{withSalutation(text)}</p>
                ))}
              </div>
              <Divider />
              <p className="text-center italic text-ivory">{withSalutation(description[description.length - 1])}</p>
            </div>
          </article>

          {/* ── The verse ── */}
          <Panel
            eyebrow="From the Holy Qur’an"
            label="From the Holy Qur'an"
            className="lg:col-start-3 lg:row-start-1"
          >
            <div className="text-center">
              <p lang="ar" dir="rtl" className="quran text-[1.55rem] leading-[2.05] sm:text-[1.75rem]">
                {verse.arabic}
              </p>
              <p className="mx-auto mt-3 max-w-md text-[1.02rem] italic leading-relaxed text-ivory">
                &ldquo;{verse.english}&rdquo;
              </p>
              <p className="eyebrow eyebrow-gold mt-3 !text-[0.55rem]">{verse.ref}</p>
            </div>

            <Divider />

            <div className="space-y-4 text-[1rem] leading-relaxed text-ivory-soft">
              <p>
                Camphor is mentioned by Allah as being mixed in the drink of the inhabitants of paradise, and it is
                also the name of the spring from which this drink gushes forth. Earthly camphor is toxic when
                ingested directly, but in Paradise it will possess all the pleasant qualities without the earthly
                aspects which would make it unpleasant to ingest.
              </p>
              <p>
                Ibn &lsquo;Abbas {withSalutation("ؓ")} said famously and correctly:
              </p>
              <blockquote className="border-y border-gold-hair py-3 text-center">
                <p lang="ar" dir="rtl" className="quran text-[1.25rem] leading-[2]">
                  {ibnAbbas.arabic}
                </p>
                <p className="mt-1 text-[0.9rem] italic text-ivory">&ldquo;{ibnAbbas.english}&rdquo;</p>
              </blockquote>
              <p>
                Our Creator tells us of all these things in Paradise that are familiar to us, but no doubt that it
                will be much better than what we expect.
              </p>
            </div>
          </Panel>

          {/* ── The other narrations ── */}
          <div className="lg:col-start-1 lg:row-start-1">
            <NarrationCarousel items={camphorNarrations} label="Narrations on camphor">
              <p className="eyebrow eyebrow-gold mb-3 text-center !text-[0.58rem]">What these narrations teach</p>
              <div className="space-y-4 text-[1rem] leading-relaxed text-ivory-soft">
                <p>
                  {withSalutation(
                    "These narrations indicate that Prophet Muhammad ﷺ tells us to apply camphor to the bodies of our dead, and besides the fact that the camphor gives us a pleasant and cooling fragrance, this practice is supported scientifically as camphor is anti-microbial, delays decomposition, keeps away insects and vermin and tightens the skin of the deceased.",
                  )}
                </p>
                <p>
                  {withSalutation(
                    "These are of the benefits which we know, but no doubt that there are hidden benefits as with everything our Creator and our Prophet ﷺ commanded us. That is why we are also commanded to “Hear and Obey”, because Allah knows while we do not.",
                  )}
                </p>
              </div>
            </NarrationCarousel>
          </div>
        </div>
      </div>
    </div>
  );
}
