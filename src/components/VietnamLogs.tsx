import Image from "next/image";
import logSection from "@/assets/aquilaria-log-section.jpg";
import logSplit from "@/assets/aquilaria-log-split.jpg";

const photos = [
  {
    src: logSection,
    alt: "Cross-section of an Aquilaria Crassna log, with a dark patch of resin-laden heartwood in the pale wood",
    caption: "The dark heartwood, where the resin formed",
  },
  {
    src: logSplit,
    alt: "A split Aquilaria Crassna log showing a dark vein of resin running through the pale wood",
    caption: "A vein of resin running through the log",
  },
];

const verse = {
  arabic: "وَفِي الْأَرْضِ آيَاتٌ لِّلْمُوقِنِينَ ۝ وَفِي أَنفُسِكُمْ ۚ أَفَلَا تُبْصِرُونَ",
  english:
    "And on the earth are signs for those with certainty [of faith]. And in yourselves. Then will you not see?",
  ref: "Surah Adh-Dhariyat 51:20–21",
};

/** From our supplier: photographs of the logs, with a reflection on the signs within them. */
export function VietnamLogs() {
  return (
    <section aria-labelledby="logs-heading" className="border-t border-gold-line pt-10">
      <p className="eyebrow eyebrow-gold mb-3">From our supplier in Vietnam</p>
      <h2 id="logs-heading" className="display text-2xl sm:text-3xl">
        A hidden blessing
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {photos.map((p) => (
          <figure key={p.caption}>
            <div className="frame relative aspect-[4/5] overflow-hidden bg-plum">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 27vw, 50vw"
                className="object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-2 text-center !text-[0.55rem] !leading-relaxed !text-ivory-faint">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-7 space-y-5 text-ivory-soft">
        <p>
          These are Aquilaria Crassna tree logs from our supplier in Vietnam. The dark part is where
          the tree has produced the resin, and that is the aloeswood (agarwood); a hidden blessing.
        </p>
        <p>Our Creator tells us in the Holy Qur&rsquo;an:</p>
      </div>

      <aside
        aria-label="From the Holy Qur'an"
        className="frame relative mt-5 bg-night/55 px-6 py-7 sm:px-9"
      >
        <span aria-hidden className="absolute inset-2 border border-gold-hair" />
        <div className="relative text-center">
          <p lang="ar" dir="rtl" className="quran text-[1.6rem] leading-[2] sm:text-[1.85rem]">
            {verse.arabic}
          </p>
          <p className="mx-auto mt-3 max-w-lg text-[1.02rem] italic leading-relaxed text-ivory">
            &ldquo;{verse.english}&rdquo;
          </p>
          <p className="eyebrow eyebrow-gold mt-3 !text-[0.55rem]">{verse.ref}</p>
        </div>
      </aside>

      <p className="mt-5 text-ivory-soft">
        The meaning is similar to verse 81 of Surah Ghafir (40:81), found on our homepage: there are
        signs of the One Creator everywhere we look, but the heart needs to be open to perceive
        them as such.
      </p>
    </section>
  );
}
