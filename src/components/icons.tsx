/** Thin-line gold icons in the style of the reference design. Decorative unless labelled. */
type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** The agarwood tree: trunk, spreading branches, a full rounded crown. */
export function TreeMark({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden {...base} strokeWidth={1.3}>
      <path d="M24 54V30M24 38c-3-3-7-4-11-4M24 36c3-3 7-4 11-4M24 30c-2-4-6-6-10-7M24 30c2-4 6-6 10-7M24 30V18M24 24c-2-3-5-4-7-4M24 24c2-3 5-4 7-4" />
      <path d="M24 4c6 0 9 3 10 6 5 0 9 4 9 9 0 4-2 7-6 8 0 4-4 7-8 6-1 2-3 3-5 3s-4-1-5-3c-4 1-8-2-8-6-4-1-6-4-6-8 0-5 4-9 9-9 1-3 4-6 10-6Z" />
      <path d="M17 54h14M20 54c1-2 2-4 4-4s3 2 4 4" />
    </svg>
  );
}

export function SearchIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 5 5" />
    </svg>
  );
}

export function BagIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M5 8h14l-1.2 12H6.2L5 8Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </svg>
  );
}

export function CartIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base} strokeWidth={1.5}>
      <path d="M3 4h2.5l2.2 10.5h10.6L20.5 7H7" />
      <circle cx="9.5" cy="19" r="1.3" />
      <circle cx="17" cy="19" r="1.3" />
    </svg>
  );
}

export function ArrowIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...base}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

/** Tree with roots — "natural resin formation". */
export function RootsIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 30V16M24 22c-2-3-5-4-8-4M24 20c2-3 5-4 8-4" />
      <path d="M24 3c5 0 8 3 8 5 4 0 7 3 7 7s-3 7-7 7c-1 2-4 3-8 3s-7-1-8-3c-4 0-7-3-7-7s3-7 7-7c0-2 3-5 8-5Z" />
      <path d="M24 30c-2 4-6 6-11 7M24 30c2 4 6 6 11 7M24 30v8M24 34c-3 3-4 6-4 9M24 34c3 3 4 6 4 9M12 44h24" />
    </svg>
  );
}

/** A leaf — "gentle ritual". */
export function LeafIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M24 4C14 12 10 22 12 32c2 7 7 11 12 11s10-4 12-11c2-10-2-20-12-28Z" />
      <path d="M24 10v38M24 20l-6-5M24 20l6-5M24 28l-8-6M24 28l8-6M24 36l-7-5M24 36l7-5" />
    </svg>
  );
}

/** A flower — "considered selection". */
export function FlowerIcon({ className = "" }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="24" cy="24" r="4" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path key={a} d="M24 20c-3-4-3-10 0-14 3 4 3 10 0 14Z" transform={`rotate(${a} 24 24)`} />
      ))}
    </svg>
  );
}

/** Botanical line drawing that frames the hero's left edge. */
export function BotanicalSprig({ className = "" }: P) {
  const leaf = (x: number, y: number, r: number, s = 1) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0C10-8 26-8 38 0 26 8 10 8 0 0Z" />
      <path d="M2 0h33M10 0l5-4M18 0l5-4M26 0l4-3M10 0l5 4M18 0l5 4M26 0l4 3" strokeWidth={0.6} />
    </g>
  );
  return (
    <svg viewBox="0 0 160 520" className={className} aria-hidden {...base} strokeWidth={0.9}>
      <path d="M40 520C60 420 30 340 70 250S60 90 110 0" />
      <path d="M62 300c20-10 40-30 46-60M70 200c-20-14-36-34-40-60M84 120c18-6 34-22 40-44" />
      {leaf(56, 330, -150, 1.1)}
      {leaf(58, 300, -30, 1.2)}
      {leaf(70, 250, -165, 1)}
      {leaf(108, 242, -70, 0.9)}
      {leaf(68, 205, -20, 1.1)}
      {leaf(30, 142, -110, 0.9)}
      {leaf(86, 150, -140, 1)}
      {leaf(124, 78, -60, 0.8)}
      {leaf(94, 60, -10, 1)}
      {leaf(40, 400, -20, 1)}
      {leaf(48, 440, -160, 1.1)}
      <circle cx="108" cy="240" r="6" />
      <circle cx="108" cy="240" r="2.5" />
      <circle cx="30" cy="140" r="5" />
    </svg>
  );
}

/**
 * A gold branch climbing the right edge of a white product panel, drawn after the ALUWWAH logo:
 * slender pointed leaves in two-tone gold (light and deep half either side of a midrib), set in
 * alternating pairs along a gently swaying stem and ending in a single tip leaf. Purely
 * decorative; the panel puts it behind the text (`.paper-branch`).
 */
export function GoldBranch({ className = "" }: P) {
  const LIGHT = "#e6c479";
  const DEEP = "#cf9f40";
  const EDGE = "#9a6d1c";
  const stemX = (y: number) => 82 + 5 * Math.sin(y / 30);
  const stem = Array.from({ length: 50 }, (_, i) => {
    const y = 200 - i * 4;
    return `${i === 0 ? "M" : "L"}${stemX(y).toFixed(1)} ${y}`;
  }).join("");
  // x, y, rotation (degrees from straight up), scale
  const leaves: [number, number, number, number][] = [];
  for (let n = 0; n < 7; n++) {
    const y = 188 - n * 26;
    const k = 1 - n * 0.06;
    leaves.push([stemX(y), y, -52 + n * 2, k]);
    leaves.push([stemX(y - 12), y - 12, 52 - n * 2, k]);
  }
  leaves.push([stemX(4), 4, 4, 0.8]);
  return (
    <svg
      viewBox="0 0 112 200"
      preserveAspectRatio="xMaxYMax meet"
      className={className}
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={stem} stroke={EDGE} strokeWidth="1.6" strokeOpacity="0.7" />
      {leaves.map(([x, y, r, k], i) => (
        <g key={i} transform={`translate(${x.toFixed(1)} ${y}) rotate(${r}) scale(${k})`}>
          <path d="M0 0C-7-6-9-20 0-32Z" fill={LIGHT} fillOpacity="0.5" />
          <path d="M0 0C7-6 9-20 0-32Z" fill={DEEP} fillOpacity="0.5" />
          <path d="M0 0C-7-6-9-20 0-32 9-20 7-6 0 0Z" stroke={EDGE} strokeWidth="0.7" strokeOpacity="0.8" />
          <path d="M0 -2V-26" stroke={EDGE} strokeWidth="0.5" strokeOpacity="0.8" />
        </g>
      ))}
    </svg>
  );
}
