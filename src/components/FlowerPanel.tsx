import Image from "next/image";
import flower from "@/assets/aquilaria-flower.jpg";

/**
 * Card: the owner's photo of an Aquilaria flower in the same 4:3 picture area
 * as the product cards, then Surah Ya-Sin 36:36 and the owner's words beneath.
 */
export function FlowerPanel({ className = "" }: { className?: string }) {
  return (
    <figure className={`frame flex flex-col bg-night/80 ${className}`}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={flower}
          alt="A blooming flower of the Aquilaria tree: six cream petals around a yellow centre, beside a green leaf"
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-[52%_50%]"
        />
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3 text-center">
        <blockquote>
          <p lang="ar" dir="rtl" className="quran text-[0.98rem] leading-[1.9]">
            سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ
          </p>
          <p className="mt-1 text-[0.74rem] italic leading-snug text-ivory">
            &ldquo;Exalted is He who created all pairs &mdash; from what the earth grows and from
            themselves and from that which they do not know.&rdquo;
          </p>
          <footer className="eyebrow eyebrow-gold mt-1.5 !text-[0.46rem]">Surah Ya-Sin 36:36</footer>
        </blockquote>
        <span aria-hidden className="mx-auto my-3 flex items-center gap-2">
          <span className="h-px w-6 bg-gold-line" />
          <span className="h-1 w-1 rotate-45 bg-gold" />
          <span className="h-px w-6 bg-gold-line" />
        </span>
        <figcaption className="text-[0.76rem] leading-relaxed text-ivory-soft">
          This is a blooming flower of an Aquilaria tree, from which agarwood is derived. The flower
          will not produce any seed pods until pollen is transferred from the male part to the female
          part. Such has our Creator made everything in pairs to procreate; it is clear that
          everything has been created by the same Creator.
        </figcaption>
      </div>
    </figure>
  );
}
