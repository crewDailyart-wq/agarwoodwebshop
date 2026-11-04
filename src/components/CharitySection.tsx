import { ArrowIcon } from "@/components/icons";
import { NarrationBody, withSalutation } from "@/components/NarrationBody";
import { NarrationCarousel } from "@/components/NarrationCarousel";
import {
  charityNarrations,
  charityTeaching,
  kinNarration,
  kinText,
  kinVerses,
} from "@/content/charity";
import { site } from "@/content/site";

/**
 * Homepage section about Madinah Global Foundation.
 *
 * Two halves: on the left (first on a phone) the foundation, laid out like the hero of its
 * own homepage — deep green, a serif headline with a gold italic, an Arabic line, a short
 * paragraph and two pill buttons (`.mgf-*` in globals.css). On the right, the verses and
 * narrations in the shop's own style: the narration carousel, then the right of kith and kin.
 *
 * Shown on the homepage and on its own page (/charity); on that page `standalone` makes the
 * foundation's name the page's h1.
 */
export function CharitySection({ standalone = false }: { standalone?: boolean }) {
  const { name, url } = site.charity;
  const Heading = standalone ? "h1" : "h2";

  return (
    <section
      aria-labelledby="charity-heading"
      className="mgf relative isolate overflow-hidden border-y border-gold-line"
    >
      <div className="mx-auto max-w-[1240px] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          {/* ───────── Left half: the foundation ───────── */}
          <div className="lg:sticky lg:top-8">
            <p className="mgf-eyebrow mgf-sans">Giving in charity &middot; U.S. certified nonprofit</p>

            <Heading id="charity-heading" className="mgf-title mt-5">
              <span className="block">Madinah Global</span>
              <em className="block">Foundation</em>
            </Heading>

            <p lang="ar" dir="rtl" className="quran mt-4 text-left text-[2.1rem] leading-[1.6]">
              صَدَقَةٌ جَارِيَةٌ
            </p>

            <p className="mgf-sans mt-5 max-w-[32rem] text-[1.05rem] leading-[1.8] text-ivory-soft">
              {name} places Qur&rsquo;ans in open hands, digs wells where water is scarce, raises
              orphans with dignity in Bangladesh, carries relief to families in crisis and prepares
              resting places with honor.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`${url}#donate`}
                target="_blank"
                rel="noopener noreferrer"
                className="mgf-pill mgf-sans"
              >
                Give now
              </a>
              <a
                href={`${url}#work`}
                target="_blank"
                rel="noopener noreferrer"
                className="mgf-pill-line mgf-sans !min-h-12 !px-6 !text-[0.95rem]"
              >
                Explore their work <ArrowIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* ───────── Right half: verses and narrations, in the shop's own style ───────── */}
          <div className="flex flex-col gap-5">
            <NarrationCarousel items={charityNarrations} label="Verses and narrations on giving in charity">
              <p className="text-center font-[family-name:var(--font-display)] text-[1.25rem] font-medium italic leading-snug text-ivory sm:text-[1.4rem]">
                {charityTeaching}
              </p>
            </NarrationCarousel>

            <section
              aria-labelledby="kin-heading"
              className="frame relative bg-night/45 px-5 py-5 sm:px-7"
            >
              <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
              <div className="relative">
                <p
                  id="kin-heading"
                  className="eyebrow eyebrow-gold mb-3 text-center !text-[0.58rem]"
                >
                  The right of kith and kin
                </p>

                <figure className="text-center">
                  <NarrationBody narration={kinVerses} />
                </figure>

                <div className="mt-4 border-t border-gold-line pt-4">
                  <p className="text-[0.98rem] leading-relaxed text-ivory-soft">
                    {withSalutation(kinText)}
                  </p>
                  <figure className="mt-4 border-t border-gold-hair pt-4 text-center">
                    <NarrationBody narration={kinNarration} />
                  </figure>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
