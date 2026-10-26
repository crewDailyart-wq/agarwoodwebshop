import Image from "next/image";
import flower from "@/assets/aquilaria-flower.jpg";

/**
 * The Aquilaria flower with Surah Ya-Sin 36:36 above it and the owner's words
 * below. The photo is small (523 px), so it is shown near its natural size in
 * the middle, over a blurred, darkened copy of itself that fills the panel —
 * the flower stays sharp and the text has a calm, dark field to sit on.
 */
export function FlowerPanel({ className = "" }: { className?: string }) {
  return (
    <figure className={`frame relative isolate flex flex-col overflow-hidden bg-night ${className}`}>
      {/* Backdrop: the same photograph, blurred and darkened, filling the panel. */}
      <Image
        src={flower}
        alt=""
        aria-hidden
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="-z-20 scale-125 object-cover blur-2xl brightness-[0.45] saturate-[0.9]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-transparent to-night/80" />

      <blockquote className="px-6 pt-8 text-center sm:px-9">
        <p lang="ar" dir="rtl" className="quran text-[1.6rem] leading-[2] sm:text-[1.85rem]">
          سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ
        </p>
        <p className="mx-auto mt-3 max-w-md text-[1.02rem] italic leading-relaxed text-ivory">
          &ldquo;Exalted is He who created all pairs &mdash; from what the earth grows and from
          themselves and from that which they do not know.&rdquo;
        </p>
        <footer className="eyebrow eyebrow-gold mt-3 !text-[0.55rem]">Surah Ya-Sin 36:36</footer>
      </blockquote>

      {/* The flower itself, sharp, feathered into the backdrop. */}
      <div className="relative my-4 flex flex-1 items-center justify-center">
        <Image
          src={flower}
          alt="A blooming flower of the Aquilaria tree: six cream petals around a yellow centre, beside a green leaf"
          sizes="(min-width: 1024px) 523px, 100vw"
          className="h-auto w-full max-w-[523px] [mask-image:radial-gradient(ellipse_62%_60%_at_50%_50%,#000_55%,transparent_100%)]"
        />
      </div>

      <figcaption className="px-6 pb-8 text-center sm:px-9">
        <span aria-hidden className="mx-auto mb-4 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-gold-line" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-10 bg-gold-line" />
        </span>
        <p className="mx-auto max-w-md text-[1rem] leading-relaxed text-ivory">
          This is a blooming flower of an Aquilaria tree, from which agarwood is derived. The flower
          will not produce any seed pods until pollen is transferred from the male part to the female
          part. Such has our Creator made everything in pairs to procreate; it is clear that
          everything has been created by the same Creator.
        </p>
      </figcaption>
    </figure>
  );
}
