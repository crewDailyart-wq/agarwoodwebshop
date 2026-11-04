"use client";

import { useState } from "react";
import type { CharityProgram, ProgramIcon } from "@/content/charity-programs";
import { ArrowIcon } from "./icons";

/** Small line icons, one per program. Drawn here, 24 x 24, in the current text colour. */
function ProgramGlyph({ icon }: { icon: ProgramIcon }) {
  const paths: Record<ProgramIcon, React.ReactNode> = {
    // an open book
    quran: <path d="M12 6.5C10 5 7 4.6 4 5.1v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6-.1-8 1.4ZM12 6.5v13.1" />,
    // a drop of water
    well: (
      <>
        <path d="M12 3.5c3 3.6 5.5 6.6 5.5 9.6a5.5 5.5 0 0 1-11 0c0-3 2.5-6 5.5-9.6Z" />
        <path d="M9.6 14.2a2.5 2.5 0 0 0 2 2.3" />
      </>
    ),
    // a heart
    orphan: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
    // a life ring
    relief: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3.6" />
        <path d="m6 6 3.4 3.4M18 6l-3.4 3.4M6 18l3.4-3.4M18 18l-3.4-3.4" />
      </>
    ),
    // a globe
    dawah: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.4 2.4 3.6 5.2 3.6 8.5s-1.2 6.1-3.6 8.5c-2.4-2.4-3.6-5.2-3.6-8.5S9.6 5.9 12 3.5Z" />
      </>
    ),
    // an arched headstone
    waqf: <path d="M7 20V10a5 5 0 0 1 10 0v10M4.5 20h15" />,
  };
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[icon]}
    </svg>
  );
}

/**
 * The foundation's programs, one at a time: a card for each, a button for the previous and
 * the next one, a dot per program, and a button that goes to the foundation's website to
 * donate. Every card sits in the same grid cell, so the block keeps the height of the tallest
 * one and nothing below it jumps when you switch.
 */
export function CharityPrograms({
  programs,
  donateHref,
  eyebrow,
}: {
  programs: CharityProgram[];
  donateHref: string;
  eyebrow: string;
}) {
  const [index, setIndex] = useState(0);
  const count = programs.length;
  const go = (to: number) => setIndex((to + count) % count);

  return (
    <section aria-roledescription="carousel" aria-label={eyebrow} className="mgf-prog mgf-sans">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#80601a]">{eyebrow}</p>
        <p aria-hidden className="text-[0.82rem] tabular-nums text-[#5c6b61]">
          {index + 1} / {count}
        </p>
      </div>

      <div className="mt-5 grid" aria-live="polite">
        {programs.map((program, i) => {
          const active = i === index;
          return (
            <article
              key={program.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${program.title}`}
              inert={!active}
              className={`col-start-1 row-start-1 transition-[opacity,visibility] duration-500 motion-reduce:transition-none ${
                active ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e4ece4] text-[#0e5a41]">
                  <ProgramGlyph icon={program.icon} />
                </span>
                <span className="rounded-full bg-[#e4ece4] px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-[#0e5a41]">
                  {program.tag}
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-serif)] text-[1.7rem] font-semibold leading-tight text-[#17251e]">
                {program.title}
              </h3>
              <p className="mt-2 max-w-[34rem] text-[1rem] leading-[1.7] text-[#4f5d57]">{program.text}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-6 space-y-4 border-t border-[#e6e0d0] pt-4">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous program"
            className="mgf-round"
          >
            <ArrowIcon className="h-4 w-4 rotate-180" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next program" className="mgf-round">
            <ArrowIcon className="h-4 w-4" />
          </button>
          <div role="group" aria-label="Choose a program" className="ml-1 flex items-center">
            {programs.map((program, i) => (
              <button
                key={program.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${program.title}`}
                aria-current={i === index}
                className="flex h-11 w-6 items-center justify-center"
              >
                <span
                  className={`block h-2 w-2 rounded-full border border-[#0e5a41] transition-colors ${
                    i === index ? "bg-[#0e5a41]" : "bg-transparent"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <a href={donateHref} target="_blank" rel="noopener noreferrer" className="mgf-pill mgf-sans w-full">
          Donate on their website <ArrowIcon className="h-4 w-4" />
        </a>
      </div>

      <p className="mt-3 text-[0.74rem] leading-snug text-[#6b7a72]">
        Programs and tags as the foundation describes them on its website.
      </p>
    </section>
  );
}
