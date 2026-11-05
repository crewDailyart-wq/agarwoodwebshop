"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import type { Photo } from "@/content/catalog";
import { PhotoSlot } from "./PhotoSlot";

/**
 * The product photographs: one large picture and a grid of the rest. Clicking a real photo
 * opens it enlarged in a lightbox (arrow keys / swipe-free buttons to move, Esc or a click
 * outside to close). Placeholders ("photograph to come") are not clickable.
 */
export function ProductGallery({ photos, inset }: { photos: Photo[]; inset?: ReactNode }) {
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  // Only real photographs can be enlarged; keep their original positions for the lightbox order.
  const enlargeable = photos.map((p, i) => ({ p, i })).filter(({ p }) => p.src);
  const position = (index: number) => enlargeable.findIndex((e) => e.i === index);

  const show = (index: number) => {
    lastFocus.current = document.activeElement as HTMLElement | null;
    setOpen(position(index));
  };

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((cur) => (cur === null ? cur : (cur + dir + enlargeable.length) % enlargeable.length));
    },
    [enlargeable.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, step]);

  const tile = (photo: Photo, index: number, className: string, sizes: string, style?: React.CSSProperties, priority = false) => {
    const slot = (
      <PhotoSlot photo={photo} priority={priority} className="absolute inset-0" sizes={sizes} />
    );
    if (!photo.src) {
      return (
        <div key={photo.brief} className={`relative ${className}`} style={style}>
          {slot}
        </div>
      );
    }
    return (
      <button
        key={photo.brief}
        type="button"
        onClick={() => show(index)}
        aria-label={`Enlarge photo: ${photo.alt}`}
        className={`group relative block cursor-zoom-in overflow-hidden text-left ${className}`}
        style={style}
      >
        {slot}
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2.5 right-2.5 flex h-8 w-8 items-center justify-center bg-night/70 text-gold-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.3">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M12.5 12.5 18 18M8.5 6v5M6 8.5h5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    );
  };

  const [hero, ...rest] = photos;
  const current = open === null ? null : enlargeable[open]?.p;

  return (
    <>
      <div className="relative">
        {tile(
          hero,
          0,
          "w-full",
          "(min-width: 1024px) 60vw, 100vw",
          { aspectRatio: hero.heroRatio ?? Math.max(hero.width / hero.height, 0.8) },
          true,
        )}
        {inset && <div className="pointer-events-none absolute inset-0">{inset}</div>}
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {rest.map((photo, i) => {
            // An odd photo out spans the full row so the grid has no empty cell.
            const wide = rest.length % 2 === 1 && i === rest.length - 1;
            return tile(
              photo,
              i + 1,
              wide ? "col-span-2 aspect-[3/2] w-full" : "aspect-square w-full",
              wide ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 27vw, 50vw",
            );
          })}
        </div>
      )}

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged photograph"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-night/95 p-4 sm:p-10"
          onClick={close}
        >
          <Image
            key={current.src}
            src={current.src!}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            quality={85}
            priority
            className="h-auto max-h-full w-auto max-w-full shadow-[0_10px_60px_rgb(0_0_0_/_0.6)]"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            ref={closeRef}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              close();
            }}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-gold-line bg-night/80 text-gold-bright transition-colors hover:bg-gold hover:text-ink sm:right-6 sm:top-6"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M4 4l12 12M16 4 4 16" />
            </svg>
          </button>

          {enlargeable.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-gold-line bg-night/80 text-gold-bright transition-colors hover:bg-gold hover:text-ink sm:left-6"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12.5 4 6.5 10l6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-gold-line bg-night/80 text-gold-bright transition-colors hover:bg-gold hover:text-ink sm:right-6"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.5 4l6 6-6 6" />
                </svg>
              </button>
              <p className="eyebrow absolute bottom-4 left-1/2 -translate-x-1/2 !text-[0.6rem] text-gold-bright">
                {(open ?? 0) + 1} / {enlargeable.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
