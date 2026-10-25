import Image from "next/image";
import type { Photo } from "@/content/catalog";

/**
 * Shows the real photograph when `photo.src` is set. Until then it renders an
 * honest placeholder carrying the art-direction brief — never a fake photo of
 * the goods. Drop the file into /public/photos and set `src` in the catalog.
 */
export function PhotoSlot({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  quiet = false,
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the art-direction brief; show only a small "photograph to come" mark. */
  quiet?: boolean;
}) {
  // Callers may pass `absolute` (full-bleed backgrounds); don't let our
  // `relative` override it, or the frame collapses to zero height.
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  if (photo.src) {
    return (
      <div className={`${position} overflow-hidden bg-plum ${className}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${photo.alt} (photograph to come)`}
      className={`${position} overflow-hidden ${className}`}
      style={{
        // Semi-transparent so the bakhoor smoke stays visible until a real photo is set.
        backgroundImage:
          "radial-gradient(120% 90% at 70% 15%, rgb(185 154 105 / 0.12), transparent 55%), radial-gradient(90% 70% at 20% 100%, rgb(73 51 41 / 0.4), transparent 60%), linear-gradient(160deg, rgb(14 51 33 / 0.55) 0%, rgb(8 32 21 / 0.35) 100%)",
      }}
    >
      <div
        aria-hidden
        className="smoke absolute left-[38%] top-[30%] h-1/2 w-1/3 rounded-full bg-ivory/10 blur-3xl"
      />
      {quiet ? (
        <p className="eyebrow absolute bottom-3 left-4 !text-[0.48rem] !text-ivory-faint">
          Photograph to come
        </p>
      ) : (
        <p className="absolute inset-x-0 bottom-0 p-5 text-[0.75rem] leading-relaxed text-ivory-faint">
          <span className="eyebrow eyebrow-gold mb-1 block">Photograph to come</span>
          {photo.brief}
        </p>
      )}
    </div>
  );
}
