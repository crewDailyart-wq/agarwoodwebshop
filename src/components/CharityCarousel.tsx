"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { CharitySlide } from "@/content/charity";
import { CharityQuotes } from "./CharityQuote";
import { ArrowIcon } from "./icons";

/**
 * Switches between verses and narrations. A button per slide (labelled with its source)
 * and a "Next" button; the text under the slides stays whichever one is showing.
 *
 * Every slide sits in the same grid cell, so the card keeps the height of the tallest
 * one and the page never jumps when you switch.
 */
export function CharityCarousel({
  slides,
  eyebrow,
  label,
  children,
}: {
  slides: CharitySlide[];
  eyebrow: string;
  label: string;
  children?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const count = slides.length;

  function go(to: number, focus = false) {
    const next = (to + count) % count;
    setIndex(next);
    if (focus) tabs.current[next]?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      go(index + 1, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      go(index - 1, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1, true);
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="mgf-card px-5 py-6 sm:px-8 sm:py-8"
    >
      <p className="eyebrow eyebrow-gold text-center !text-[0.6rem]">{eyebrow}</p>

      <div
        role="tablist"
        aria-label="Choose a verse or narration"
        onKeyDown={onKeyDown}
        className="mt-5 flex flex-wrap justify-center gap-2"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${uid}-panel-${i}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className={`mgf-chip mgf-sans ${i === index ? "mgf-chip-on" : ""}`}
          >
            {slide.tab}
          </button>
        ))}
      </div>

      <div className="mt-7 grid" aria-live="polite">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.id}
              role="tabpanel"
              id={`${uid}-panel-${i}`}
              aria-labelledby={`${uid}-tab-${i}`}
              inert={!active}
              className={`col-start-1 row-start-1 flex flex-col justify-center transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${
                active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <CharityQuotes quotes={slide.quotes} />
            </div>
          );
        })}
      </div>

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-gold-hair pt-4">
        <p aria-hidden className="mgf-sans text-[0.82rem] tabular-nums text-ivory-faint">
          {index + 1} / {count}
        </p>
        <button type="button" onClick={() => go(index + 1)} className="mgf-pill-line mgf-sans group/next">
          Next
          <ArrowIcon className="h-4 w-4 transition-transform group-hover/next:translate-x-0.5" />
        </button>
      </div>

      {children && <div className="mt-7 border-t border-gold-line pt-7">{children}</div>}
    </section>
  );
}
