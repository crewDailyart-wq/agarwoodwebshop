import Image from "next/image";
import type { Photo } from "@/content/catalog";

/**
 * Smoke puffs drifting up around the edges of the frame. Positions are
 * percentages of the photo; negative values sit just outside the border so the
 * smoke seems to curl around it.
 */
type Puff = React.CSSProperties & Record<`--${string}`, string>;

const puffs: Puff[] = [
  { left: "-12%", bottom: "-14%", "--s": "46%", "--d": "13s", "--delay": "0s", "--dx": "10%" },
  { left: "28%", bottom: "-20%", "--s": "42%", "--d": "11s", "--delay": "-4s", "--dx": "-6%" },
  { right: "-10%", bottom: "-12%", "--s": "48%", "--d": "14s", "--delay": "-7s", "--dx": "-10%" },
  { left: "-16%", top: "30%", "--s": "36%", "--d": "12s", "--delay": "-2s", "--dx": "8%" },
  { right: "-16%", top: "22%", "--s": "38%", "--d": "15s", "--delay": "-9s", "--dx": "-8%" },
  { left: "6%", top: "-16%", "--s": "40%", "--d": "13s", "--delay": "-5s", "--dx": "12%" },
  { right: "8%", top: "-18%", "--s": "36%", "--d": "16s", "--delay": "-11s", "--dx": "-10%" },
  { left: "40%", bottom: "-8%", "--s": "34%", "--d": "10s", "--delay": "-3s", "--dx": "4%" },
];

function SmokeFrame({ fullBleed }: { fullBleed: boolean }) {
  // Full-width backgrounds are clipped by their section, so keep their smoke
  // off the bottom edge to avoid a hard seam against the next section.
  const list = fullBleed ? puffs.filter((p) => p.bottom === undefined) : puffs;
  return (
    <div aria-hidden className="smoke-frame">
      {list.map((style, i) => (
        <span key={i} className="smoke-puff" style={style} />
      ))}
    </div>
  );
}

/**
 * Shows the real photograph when `photo.src` is set. Until then it renders an
 * honest placeholder carrying the art-direction brief — never a fake photo of
 * the goods. Drop the file into /public/photos and set `src` in the catalog.
 *
 * Every photograph gets the same purple-lit frame and drifting smoke.
 */
export function PhotoSlot({
  photo,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  return (
    <div className={`${position} ${className}`}>
      {photo.src ? (
        <div className="absolute inset-0 overflow-hidden bg-plum shadow-[0_0_60px_-10px_rgb(140_80_230/0.55)]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`${photo.alt} (photograph to come)`}
          className="absolute inset-0 overflow-hidden bg-plum shadow-[0_0_60px_-10px_rgb(140_80_230/0.55)]"
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 70% 15%, rgb(168 112 255 / 0.3), transparent 55%), radial-gradient(90% 70% at 20% 100%, rgb(73 51 41 / 0.5), transparent 60%), linear-gradient(160deg, #3a2250 0%, #160f1d 100%)",
          }}
        >
          <p className="absolute inset-x-0 bottom-0 p-5 text-[0.68rem] leading-relaxed tracking-[0.12em] text-ivory-faint">
            <span className="eyebrow mb-1 block">Photograph to come</span>
            {photo.brief}
          </p>
        </div>
      )}
      <SmokeFrame fullBleed={position === ""} />
    </div>
  );
}
