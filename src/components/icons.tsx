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
 * An ivy vine climbing the right edge of a white product panel: a wavy stem with lobed leaves
 * (deep green, a few in old gold), curling tendrils and small berries. Purely decorative; the
 * panel puts it behind the text (`.paper-ivy`).
 */
export function IvyVine({ className = "" }: P) {
  const leafPath =
    "M0 0C-4-3-13-2-14-10-9-10-7-13-10-18-4-16-3-20 0-32 3-20 4-16 10-18 7-13 9-10 14-10 13-2 4-3 0 0Z";
  // x, y, rotation, scale, gold
  const leaves: [number, number, number, number, boolean][] = [
    [88, 196, -40, 0.9, false],
    [72, 182, 80, 0.8, true],
    [92, 164, -10, 1.0, false],
    [66, 148, 100, 0.9, false],
    [90, 130, 30, 0.9, true],
    [64, 112, 85, 1.0, false],
    [88, 94, -25, 0.9, false],
    [62, 76, 110, 0.8, true],
    [90, 58, 10, 1.0, false],
    [68, 40, 95, 0.9, false],
    [88, 22, -20, 0.8, false],
    [72, 6, 60, 0.7, true],
  ];
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
      <path
        d="M96 200C76 188 92 170 80 154S66 128 82 112 94 84 78 68 70 36 84 20 80 6 80 0"
        stroke="#4d6b3a"
        strokeWidth="1.6"
      />
      <path
        d="M80 154c-12-4-20 0-22 8M82 112c12-2 20 4 20 12M78 68c-12-2-18 4-18 12M84 20c10-2 16 4 16 10"
        stroke="#4d6b3a"
        strokeWidth="0.8"
      />
      {leaves.map(([x, y, r, k, gold], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${k})`}>
          <path
            d={leafPath}
            fill={gold ? "#c9a05a" : "#3f7a4f"}
            fillOpacity={gold ? 0.4 : 0.34}
            stroke={gold ? "#9a6d1c" : "#2d5a3a"}
            strokeWidth="0.8"
          />
          <path
            d="M0 -2V-27M0-10l-6-4M0-10l6-4M0-18l-5-4M0-18l5-4"
            stroke={gold ? "#9a6d1c" : "#2d5a3a"}
            strokeWidth="0.5"
          />
        </g>
      ))}
      <g fill="#3a4f2c" fillOpacity="0.7">
        <circle cx="58" cy="162" r="2" />
        <circle cx="102" cy="124" r="2" />
        <circle cx="60" cy="80" r="2" />
        <circle cx="100" cy="30" r="1.8" />
      </g>
    </svg>
  );
}
