import satellite from "@/assets/vietnam-satellite.jpg";
import { vnBorder, vnSize } from "@/content/vietnam-map";

/**
 * Satellite view of Vietnam with its border traced in gold and the land around
 * it softly dimmed. Imagery: NASA Blue Marble (scripts/build-vietnam-satellite.py),
 * border: Natural Earth (scripts/build-vietnam.mjs) — same projection, so they align.
 */
export function VietnamMap({ className = "", label = true }: { className?: string; label?: boolean }) {
  const { width, height } = vnSize;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Satellite image of Vietnam with its national border outlined in gold"
    >
      <defs>
        <filter id="vn-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <image href={satellite.src} width={width} height={height} preserveAspectRatio="none" />
      {/* Dim everything outside Vietnam so the country stands out. */}
      <path d={`M0 0H${width}V${height}H0Z ${vnBorder}`} fillRule="evenodd" fill="rgb(2 10 6 / 0.48)" />
      <path d={vnBorder} fill="none" stroke="#ecca82" strokeWidth="7" strokeOpacity="0.45" filter="url(#vn-glow)" />
      <path d={vnBorder} fill="rgb(236 202 130 / 0.07)" stroke="#f3d68f" strokeWidth={label ? 2 : 4} strokeLinejoin="round" />
      {label && (
      <text
        x="178"
        y="562"
        textAnchor="middle"
        fill="#fff6dc"
        fontFamily="var(--font-cinzel), serif"
        fontSize="24"
        letterSpacing="7"
        stroke="rgb(0 0 0 / 0.6)"
        strokeWidth="5"
        paintOrder="stroke"
      >
        VIETNAM
      </text>
      )}
    </svg>
  );
}
