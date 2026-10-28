import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { VietnamInset } from "@/components/VietnamInset";
import { products } from "@/content/catalog";

export const metadata: Metadata = {
  title: "Our Agarwood Assortment",
  description: "High Grade Vietnamese Agarwood Chips and the Complete Agarwood Set.",
};

/** The word al-uluwwah (aloeswood, the brand's name), picked out in the texts. */
function Uluwwah({ children }: { children: React.ReactNode }) {
  return <span className="text-ivory">{children}</span>;
}

function Divider() {
  return (
    <span aria-hidden className="mx-auto my-4 flex items-center justify-center gap-3">
      <span className="h-px w-10 bg-gold-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold-line" />
    </span>
  );
}

/** ﷺ, spaced so it does not run into the next word. */
function Saw() {
  return <span className="mx-1 inline-block not-italic text-[1.15em] leading-none">&#xFDFA;</span>;
}

export default function CollectionPage() {
  return (
    <div className="velvet">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <h1 className="display text-center text-[2.6rem] leading-[1.1] sm:text-6xl">
          Our Agarwood Assortment.
          <span className="mt-2 block text-[0.62em]">This is what we offer.</span>
        </h1>

        {/* Paradise and this world: Sahih al-Bukhari 3327 beside Surah Al-An'am 6:32. */}
        <section
          aria-label="From the Sunnah and the Qur'an"
          className="frame relative mx-auto mt-10 grid max-w-[1240px] bg-night/45 lg:grid-cols-[minmax(0,1.45fr)_auto_minmax(0,1fr)]"
        >
          <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />

          <figure className="relative px-6 py-7 text-center sm:px-9">
            <blockquote>
              <p lang="ar" dir="rtl" className="quran text-[1.08rem] leading-[2] sm:text-[1.2rem]">
                عَنْ أَبِي هُرَيْرَةَ رضي الله عنه قَالَ: قَالَ رَسُولُ اللَّهِ صلى الله عليه وسلم: «إِنَّ أَوَّلَ
                زُمْرَةٍ يَدْخُلُونَ الْجَنَّةَ عَلَى صُورَةِ الْقَمَرِ لَيْلَةَ الْبَدْرِ، ثُمَّ الَّذِينَ يَلُونَهُمْ عَلَى
                أَشَدِّ كَوْكَبٍ دُرِّيٍّ فِي السَّمَاءِ إِضَاءَةً، لاَ يَبُولُونَ وَلاَ يَتَغَوَّطُونَ وَلاَ يَتْفِلُونَ وَلاَ
                يَمْتَخِطُونَ، أَمْشَاطُهُمُ الذَّهَبُ، وَرَشْحُهُمُ الْمِسْكُ، وَمَجَامِرُهُمُ{" "}
                <Uluwwah>الأَلُوَّةُ</Uluwwah> الأَنْجُوجُ عُودُ الطِّيبِ، وَأَزْوَاجُهُمُ الْحُورُ الْعِينُ، عَلَى
                خَلْقِ رَجُلٍ وَاحِدٍ عَلَى صُورَةِ أَبِيهِمْ آدَمَ، سِتُّونَ ذِرَاعًا فِي السَّمَاءِ»
              </p>
              <p className="mx-auto mt-3 max-w-2xl text-[0.95rem] italic leading-relaxed text-ivory">
                Abu Huraira reported that the Messenger of Allah <Saw /> said: &ldquo;The first group to enter
                Paradise will shine like the moon on the night it is full, and those who follow them like the
                most brilliant star in the sky. They will not urinate, relieve themselves, spit or blow their
                noses. Their combs will be of gold and their sweat of musk, and their censers will burn{" "}
                <span className="not-italic text-gold-bright">aloeswood (al-uluwwah)</span>, the fragrant
                &lsquo;ud. Their wives will be the houris. All of them will be alike in form, in the image of
                their father Adam, sixty cubits tall.&rdquo;
              </p>
            </blockquote>
            <figcaption className="eyebrow eyebrow-gold mt-4 !text-[0.55rem]">Sahih al-Bukhari 3327</figcaption>
          </figure>

          <span aria-hidden className="relative mx-8 h-px bg-gold-line lg:mx-0 lg:my-10 lg:h-auto lg:w-px" />

          <figure className="relative flex flex-col justify-center px-6 py-7 text-center sm:px-9">
            <blockquote>
              <p lang="ar" dir="rtl" className="quran text-[1.3rem] leading-[2.1] sm:text-[1.5rem]">
                وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا لَعِبٌ وَلَهْوٌ ۖ وَلَلدَّارُ الْآخِرَةُ خَيْرٌ لِّلَّذِينَ يَتَّقُونَ ۗ
                أَفَلَا تَعْقِلُونَ
              </p>
              <p className="mx-auto mt-3 max-w-md text-[0.98rem] italic leading-relaxed text-ivory">
                &ldquo;And the worldly life is not but amusement and diversion; but the home of the Hereafter
                is best for those who fear Allah, so will you not reason?&rdquo;
              </p>
            </blockquote>
            <figcaption className="eyebrow eyebrow-gold mt-4 !text-[0.55rem]">Surah Al-An&lsquo;am 6:32</figcaption>
          </figure>
        </section>

        <div className="mx-auto mt-10 grid max-w-[1240px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ProductCard product={products["agarwood-chips"]} inset={<VietnamInset />} />

          {/* A reminder, in the place of a product. */}
          <article className="frame velvet relative flex flex-col px-6 py-7 text-center sm:row-span-1">
            <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
            <p className="eyebrow eyebrow-gold relative !text-[0.55rem]">A reminder</p>
            <figure className="relative mt-4">
              <blockquote>
                <p lang="ar" dir="rtl" className="quran text-[1.12rem] leading-[2]">
                  عَنْ أَنَسٍ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ: «اللَّهُمَّ لاَ عَيْشَ إِلاَّ عَيْشُ
                  الآخِرَةِ، فَأَصْلِحِ الأَنْصَارَ وَالْمُهَاجِرَةَ»
                </p>
                <p className="mt-2 text-[0.9rem] italic leading-relaxed text-ivory">
                  Anas reported that the Prophet <Saw /> said: &ldquo;O Allah! There is no life worth living
                  except the life of the Hereafter, so make righteous the Ansar and the Emigrants.&rdquo;
                </p>
              </blockquote>
              <figcaption className="eyebrow eyebrow-gold mt-3 !text-[0.5rem]">Sahih al-Bukhari 6413</figcaption>
            </figure>
            <Divider />
            <div className="relative space-y-3 text-left text-[0.86rem] leading-relaxed text-ivory-soft">
              <p>
                Allah and His Messenger Muhammad <Saw /> remind us numerous times that this life is not to be
                traded for the Hereafter. Rather, we must use what Allah has given us, and taught us through
                His Messenger, to attain salvation in the Hereafter. This does not mean that one must lead a
                difficult or bad life; it means to adhere to that which Allah has ordained for us and to stay
                away from that which He has forbidden, which causes one to lead a good life in this world and
                the Hereafter.
              </p>
              <p>
                There are many verses of the Qur&rsquo;an and many narrations of our Prophet, but we are not
                able to mention all of them here. It is incumbent upon the believers to attain knowledge, which
                Allah has made easy for us in this time, so that Allah might strengthen us by it in our religion
                and worldly affairs.
              </p>
            </div>
          </article>

          <ProductCard product={products["the-complete-ritual"]} />
        </div>
      </div>
    </div>
  );
}
