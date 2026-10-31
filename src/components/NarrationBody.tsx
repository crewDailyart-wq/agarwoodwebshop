import type { ReactNode } from "react";
import type { Narration } from "@/content/narrations";

const SALUTATION = "ﷺ";

/** Draws the salutation glyph after the Prophet's name a little larger, in the Arabic typeface. */
export function withSalutation(text: string): ReactNode {
  const chunks = text.split(SALUTATION);
  return chunks.flatMap((chunk, i) =>
    i < chunks.length - 1
      ? [
          chunk,
          <span
            key={i}
            aria-label="peace and blessings be upon him"
            className="quran mx-0.5 inline-block align-middle not-italic text-[1.35em] leading-none !text-gold-bright"
          >
            {SALUTATION}
          </span>,
        ]
      : [chunk],
  );
}

/** The text of one narration (Arabic, English, source line). Place it inside a <figure>. */
export function NarrationBody({ narration }: { narration: Narration }) {
  return (
    <>
      {narration.parts.map((part, j) => (
        <blockquote key={j} className={j > 0 ? "mt-4 border-t border-gold-hair pt-4" : ""}>
          <p lang="ar" dir="rtl" className="quran text-[1.05rem] leading-[1.95] sm:text-[1.12rem]">
            {part.arabic}
          </p>
          <p className="mx-auto mt-2 text-[0.86rem] italic leading-relaxed text-ivory">
            {withSalutation(part.english)}
          </p>
        </blockquote>
      ))}
      <figcaption className="eyebrow eyebrow-gold mt-3 !text-[0.5rem] !tracking-[0.24em]">
        {narration.reference}
      </figcaption>
    </>
  );
}
