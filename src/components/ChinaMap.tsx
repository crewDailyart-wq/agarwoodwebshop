import satellite from "@/assets/china-satellite.jpg";
import { cnBorder, cnSize } from "@/content/china-map";

/**
 * Satellite view of China with its border traced in gold and the land around it softly dimmed.
 * Imagery: NASA Blue Marble (scripts/build-china-satellite.py), border: Natural Earth
 * (scripts/build-china.mjs) — same projection, so they align. Made like VietnamMap.
 */
export function ChinaMap({ className = "" }: { className?: string }) {
  const { width, height } = cnSize;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Satellite image of China with its national border outlined in gold"
    >
      <defs>
        <filter id="cn-glow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>
      <image href={satellite.src} width={width} height={height} preserveAspectRatio="none" />
      {/* Dim everything outside China so the country stands out. */}
      <path d={`M0 0H${width}V${height}H0Z ${cnBorder}`} fillRule="evenodd" fill="rgb(2 10 6 / 0.48)" />
      <path d={cnBorder} fill="none" stroke="#ecca82" strokeWidth="7" strokeOpacity="0.45" filter="url(#cn-glow)" />
      <path d={cnBorder} fill="rgb(236 202 130 / 0.07)" stroke="#f3d68f" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
