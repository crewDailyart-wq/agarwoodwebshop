"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { silhouettes } from "@/content/species-silhouettes";
import type { SpeciesSlide } from "@/content/species";

const INTERVAL_MS = 2000;

/**
 * A quiet slideshow that fills its (relative) parent: one Aquilaria species per region, a new
 * one every two seconds, each with its Latin name and region. A slide shows its photograph when
 * it has one, otherwise the region's outline. Lies behind the heading (the parent keeps the
 * text above it); the slides cross-fade, and with reduced motion it stays on the first one.
 */
export function SpeciesBackdrop({ slides }: { slides: SpeciesSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {slides.map((slide, i) => {
        const active = i === index;
        const shape = silhouettes[slide.region];
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            {slide.photo ? (
              <Image
                src={slide.photo.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className={`object-cover ${active ? "species-drift" : ""}`}
              />
            ) : (
              shape && (
                <svg
                  viewBox={`${shape.box[0] - 12} ${shape.box[1] - 12} ${shape.box[2] + 24} ${shape.box[3] + 24}`}
                  preserveAspectRatio="xMidYMid meet"
                  className={`absolute inset-0 h-full w-full ${active ? "species-drift" : ""}`}
                >
                  <path
                    d={shape.d}
                    fill="#c9a05a"
                    fillOpacity="0.2"
                    stroke="#e7c47a"
                    strokeOpacity="0.65"
                    strokeWidth="0.9"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              )
            )}
            {/* Keeps the heading readable over any photograph. */}
            <div className="absolute inset-0 bg-[radial-gradient(70%_80%_at_50%_45%,rgb(4_19_11/0.78),rgb(4_19_11/0.35))]" />
            <p
              className={`eyebrow eyebrow-gold absolute inset-x-0 bottom-3 px-3 text-center !text-[0.55rem] !tracking-[0.22em] transition-opacity motion-reduce:transition-none ${
                active ? "opacity-100 delay-500 duration-500" : "opacity-0 duration-200"
              }`}
            >
              <em className="font-[family-name:var(--font-display)] text-[0.95rem] normal-case italic tracking-normal">
                {slide.species}
              </em>
              <span className="mx-2 opacity-60">&middot;</span>
              {slide.regionLabel}
            </p>
          </div>
        );
      })}
    </div>
  );
}
