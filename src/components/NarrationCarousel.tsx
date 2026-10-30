"use client";

import { useState, type ReactNode } from "react";
import { narrations } from "@/content/narrations";
import { ArrowIcon } from "./icons";

const SALUTATION = "ﷺ";

/** Draws the salutation glyph a little larger, in the Arabic typeface. */
function withSalutation(text: string): ReactNode {
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

/**
 * Framed panel that shows one narration at a time with a button for the next.
 * Every narration sits in the same grid cell, so the panel keeps the height of the
 * tallest one and the page never jumps when you switch.
 */
export function NarrationCarousel({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const count = narrations.length;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Narrations"
      className={`frame relative bg-night/45 px-5 pb-2 pt-5 sm:px-7 ${className}`}
    >
      <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />

      <div className="relative grid" aria-live="polite">
        {narrations.map((narration, i) => {
          const active = i === index;
          return (
            <figure
              key={narration.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              inert={!active}
              className={`col-start-1 row-start-1 flex flex-col justify-center text-center transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${
                active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
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
            </figure>
          );
        })}
      </div>

      <div className="relative mt-3 flex items-center justify-between gap-3 border-t border-gold-hair pt-2">
        <div role="group" aria-label="Choose a narration" className="flex items-center">
          {narrations.map((narration, i) => (
            <button
              key={narration.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show narration ${i + 1} of ${count}`}
              aria-current={i === index}
              className="flex h-11 w-7 items-center justify-center"
            >
              <span
                className={`block h-1.5 w-1.5 rounded-full border border-gold transition-colors ${
                  i === index ? "bg-gold" : "bg-transparent"
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % count)}
          className="group/next inline-flex min-h-11 items-center gap-3 border border-gold-line px-4 font-[family-name:var(--font-caps)] text-[0.58rem] font-medium uppercase tracking-[0.26em] text-gold-bright transition-colors hover:border-gold hover:bg-gold hover:text-ink"
        >
          Next narration
          <ArrowIcon className="h-4 w-4 transition-transform group-hover/next:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
