/**
 * Line-art ornaments for the white header bar: an agarwood (Aquilaria) branch
 * with long pointed leaves, small flower buds and drops of resin, and a faint
 * eight-point-star lattice behind it. Purely decorative.
 */

type Pt = [number, number];

// The stem: one cubic curve across a 200 x 96 box.
const P0: Pt = [6, 74];
const P1: Pt = [62, 40];
const P2: Pt = [128, 88];
const P3: Pt = [194, 30];
const STEM = `M${P0} C${P1} ${P2} ${P3}`;

function at(t: number): { x: number; y: number; angle: number } {
  const u = 1 - t;
  const x = u * u * u * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t * t * t * P3[0];
  const y = u * u * u * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t * t * t * P3[1];
  const dx = 3 * u * u * (P1[0] - P0[0]) + 6 * u * t * (P2[0] - P1[0]) + 3 * t * t * (P3[0] - P2[0]);
  const dy = 3 * u * u * (P1[1] - P0[1]) + 6 * u * t * (P2[1] - P1[1]) + 3 * t * t * (P3[1] - P2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

const r = (n: number) => Math.round(n * 10) / 10;

// Leaves alternate above and below, shrinking toward the tip.
const leaves = Array.from({ length: 9 }, (_, i) => {
  const t = 0.08 + i * 0.1;
  const { x, y, angle } = at(t);
  const up = i % 2 === 0;
  const size = 1.25 - t * 0.6;
  return { x: r(x), y: r(y), rot: r(angle + (up ? -42 : 42)), s: r(size * 100) / 100 };
});

// Little clusters of buds and a few resin drops hanging from the stem.
const buds = [0.28, 0.9].map((t) => at(t));
const drops = [0.45, 0.72].map((t) => at(t));

const LEAF = "M0 0C7-6 20-7 32 0C20 7 7 6 0 0Z";

export function AgarwoodBranch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 96" className={className} aria-hidden fill="none">
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <path d={STEM} strokeWidth="1.6" />
        {leaves.map((l, i) => (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
            <path d={LEAF} strokeWidth="1.1" fill="currentColor" fillOpacity="0.16" />
            <path d="M2 0H28" strokeWidth="0.7" />
          </g>
        ))}
        {buds.map((b, i) => (
          <g key={i} transform={`translate(${r(b.x)} ${r(b.y)})`} strokeWidth="0.9">
            <path d="M0 0L-3 -9M0 0L3 -10M0 0L7 -6" />
            <circle cx="-3" cy="-10.5" r="1.6" fill="currentColor" />
            <circle cx="3" cy="-11.5" r="1.6" fill="currentColor" />
            <circle cx="7.8" cy="-7.2" r="1.4" fill="currentColor" />
          </g>
        ))}
        {drops.map((d, i) => (
          <g key={i} transform={`translate(${r(d.x)} ${r(d.y)})`} strokeWidth="0.9">
            <path d="M0 1V7" />
            <path d="M0 8C-2.6 11.5-2.6 14 0 14S2.6 11.5 0 8Z" fill="currentColor" fillOpacity="0.55" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Faint eight-point-star lattice, as in Islamic geometric patterns. */
export function StarLattice({ className = "" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id="star-lattice" width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.8">
            <rect x="12" y="12" width="20" height="20" />
            <rect x="12" y="12" width="20" height="20" transform="rotate(45 22 22)" />
            <path d="M0 0L7.9 7.9M44 0L36.1 7.9M0 44L7.9 36.1M44 44L36.1 36.1" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#star-lattice)" />
    </svg>
  );
}
