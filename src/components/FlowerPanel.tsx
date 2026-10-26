import Image from "next/image";
import flower from "@/assets/aquilaria-flower.jpg";

/**
 * Card: Surah Ya-Sin 36:36 above the owner's photo of an Aquilaria flower,
 * with the owner's words beneath. Same outer shape as the product cards
 * (a 4:5 picture area, then text) so the row stays symmetrical.
 */
export function FlowerPanel({ className = "" }: { className?: string }) {
  return (
    <figure className={`frame flex flex-col bg-night/80 ${className}`}>
      <div className="flex aspect-[4/5] flex-col overflow-hidden">
        <blockquote className="bg-night/60 px-4 pb-3 pt-4 text-center">
          <p lang="ar" dir="rtl" className="quran text-[1.08rem] leading-[1.95]">
            سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ
          </p>
          <p className="mt-1.5 text-[0.78rem] italic leading-snug text-ivory">
            &ldquo;Exalted is He who created all pairs &mdash; from what the earth grows and from
            themselves and from that which they do not know.&rdquo;
          </p>
          <footer className="eyebrow eyebrow-gold mt-1.5 !text-[0.48rem]">Surah Ya-Sin 36:36</footer>
        </blockquote>
        <div className="relative min-h-0 flex-1">
          <Image
            src={flower}
            alt="A blooming flower of the Aquilaria tree: six cream petals around a yellow centre, beside a green leaf"
            fill
            sizes="(min-width: 1280px) 330px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-[52%_50%]"
          />
          <div aria-hidden className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-night/60 to-transparent" />
        </div>
      </div>
      <figcaption className="flex flex-1 items-center px-5 pb-5 pt-4 text-center text-[0.84rem] leading-relaxed text-ivory-soft">
        This is a blooming flower of an Aquilaria tree, from which agarwood is derived. The flower
        will not produce any seed pods until pollen is transferred from the male part to the female
        part. Such has our Creator made everything in pairs to procreate; it is clear that everything
        has been created by the same Creator.
      </figcaption>
    </figure>
  );
}
