import type { ReactNode } from "react";
import type { Narration } from "@/content/narrations";

/**
 * The two prayers after a name: for the Prophet (the sign U+FDFA) and for a Companion
 * (U+0613, which is a combining mark and cannot stand alone, so it is written out).
 */
const SIGNS: Record<string, { label: string; text: string; size: string }> = {
  "ﷺ": { label: "peace and blessings be upon him", text: "ﷺ", size: "text-[1.35em]" },
  "ؓ": { label: "may Allah be pleased with him", text: "رَضِيَ اللَّهُ عَنْهُ", size: "text-[1.1em]" },
};

/** Draws each prayer a little larger, in the Arabic typeface. */
export function withSalutation(text: string): ReactNode {
  return text.split(/([ﷺؓ])/).map((chunk, i) => {
    const sign = SIGNS[chunk];
    return sign ? (
      <span
        key={i}
        lang="ar"
        aria-label={sign.label}
        className={`quran mx-0.5 inline-block align-middle not-italic ${sign.size} leading-none !text-gold-bright`}
      >
        {sign.text}
      </span>
    ) : (
      chunk
    );
  });
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
