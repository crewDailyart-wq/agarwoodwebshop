import { CharityCarousel } from "@/components/CharityCarousel";
import { CharityQuote, CharityQuotes, Ornament } from "@/components/CharityQuote";
import { ArrowIcon } from "@/components/icons";
import { withSalutation } from "@/components/NarrationBody";
import { charitySlides, charityTeaching, kinNarration, kinText, kinVerses } from "@/content/charity";
import { site } from "@/content/site";

/** What the foundation does, as it describes its own work. */
const works = [
  "Qur’ans placed in open hands",
  "Wells dug where water is scarce",
  "Orphans raised with dignity in Bangladesh",
  "Relief carried to families in crisis",
  "A resting place prepared with honor",
];

/**
 * Homepage section: ALUWWAH sponsors Madinah Global Foundation.
 *
 * Laid out in two halves: the foundation on the left (first on a phone), and on the right
 * the verses and narrations on giving, then the right of kith and kin. The look follows the
 * foundation's own website — deep green, a bold serif headline with a gold italic, soft
 * rounded cards and gold pill buttons (`.mgf-*` in globals.css) — so it reads as its own place
 * apart from the shop.
 */
export function CharitySection() {
  return (
    <section
      aria-labelledby="charity-heading"
      className="mgf relative isolate overflow-hidden border-y border-gold-line"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          {/* ───────── Left half: the foundation ───────── */}
          <div className="lg:sticky lg:top-8">
            <p className="mgf-eyebrow mgf-sans">Giving in charity</p>
            <h2 id="charity-heading" className="mgf-title mt-4">
              <span className="block">We sponsor</span>
              <em className="block">{site.charity.name}</em>
            </h2>

            <span aria-hidden className="mt-6 flex items-center gap-3">
              <span className="h-px w-14 bg-gold" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            </span>

            <p className="mgf-sans mt-6 max-w-[34rem] text-[1.05rem] leading-[1.75] text-ivory-soft">
              ALUWWAH proudly sponsors{" "}
              <strong className="font-semibold text-ivory">{site.charity.name}</strong>, a nonprofit that
              describes itself as U.S. certified. Its work, as it describes it:
            </p>

            <ul className="mgf-card mgf-sans mt-6 max-w-[34rem] divide-y divide-gold-hair px-5 py-2 sm:px-6">
              {works.map((work) => (
                <li key={work} className="flex items-start gap-4 py-3.5 text-[1rem] leading-snug text-ivory">
                  <span aria-hidden className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                  {work}
                </li>
              ))}
            </ul>

            {site.charity.url && (
              <div className="mt-8">
                <a
                  href={site.charity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mgf-pill mgf-sans"
                >
                  Visit {site.charity.name} <ArrowIcon className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          {/* ───────── Right half: verses, narrations and the right of kith and kin ───────── */}
          <div className="flex flex-col gap-6">
            <CharityCarousel
              slides={charitySlides}
              eyebrow="Verses and narrations on charity"
              label="Verses and narrations on giving in charity"
            >
              <Ornament className="mb-5" />
              <p className="mx-auto max-w-xl text-center font-[family-name:var(--font-display)] text-[1.4rem] font-medium italic leading-snug text-ivory sm:text-[1.6rem]">
                {charityTeaching}
              </p>
            </CharityCarousel>

            <section aria-labelledby="kin-heading" className="mgf-card px-5 py-6 sm:px-8 sm:py-8">
              <p id="kin-heading" className="eyebrow eyebrow-gold text-center !text-[0.6rem]">
                The right of kith and kin
              </p>

              <div className="mt-6">
                <CharityQuotes quotes={kinVerses} />
              </div>

              <div className="mt-7 border-t border-gold-line pt-7">
                <p className="text-[1.08rem] leading-relaxed text-ivory-soft">{withSalutation(kinText)}</p>
                <div className="mt-6 rounded-2xl border border-gold-hair bg-black/20 px-4 py-6 sm:px-7">
                  <CharityQuote quote={kinNarration} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
