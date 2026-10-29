/**
 * Ornaments for the white header bar, drawn in the style of the ALUWWAH logo:
 * a branch of the tree of life with solid metallic-gold leaves and a fine vein,
 * curling root tendrils beneath, and an eight-point-star lattice behind.
 * Purely decorative.
 */

type Pt = [number, number];

// Branch: a cubic curve rising from the outer end toward the menu (180 x 96 box).
const P0: Pt = [8, 70];
const P1: Pt = [56, 64];
const P2: Pt = [118, 30];
const P3: Pt = [174, 40];

function at(t: number) {
  const u = 1 - t;
  const x = u ** 3 * P0[0] + 3 * u * u * t * P1[0] + 3 * u * t * t * P2[0] + t ** 3 * P3[0];
  const y = u ** 3 * P0[1] + 3 * u * u * t * P1[1] + 3 * u * t * t * P2[1] + t ** 3 * P3[1];
  const dx = 3 * u * u * (P1[0] - P0[0]) + 6 * u * t * (P2[0] - P1[0]) + 3 * t * t * (P3[0] - P2[0]);
  const dy = 3 * u * u * (P1[1] - P0[1]) + 6 * u * t * (P2[1] - P1[1]) + 3 * t * t * (P3[1] - P2[1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}
const r = (n: number) => Math.round(n * 10) / 10;

// A tapered branch outline: offset the curve by a shrinking half-width on each side.
const STEPS = 28;
const side = (sign: 1 | -1) =>
  Array.from({ length: STEPS + 1 }, (_, i) => {
    const t = i / STEPS;
    const { x, y, angle } = at(t);
    const a = ((angle + 90) * Math.PI) / 180;
    const w = 2.6 * (1 - t) + 0.5;
    return `${r(x + sign * w * Math.cos(a))},${r(y + sign * w * Math.sin(a))}`;
  });
const BRANCH = `M${side(1).join("L")}L${side(-1).reverse().join("L")}Z`;

// Leaves fan up and out like the logo's canopy; pairs, larger at the base.
const leaves = Array.from({ length: 12 }, (_, i) => {
  const t = 0.1 + Math.floor(i / 2) * 0.15 + (i % 2) * 0.05;
  const { x, y, angle } = at(Math.min(t, 0.97));
  const up = i % 2 === 0;
  const s = 1.15 - t * 0.5;
  return { x: r(x), y: r(y), rot: r(angle + (up ? -48 : 34)), s: r(s * 100) / 100 };
});
// The tip leaf, continuing the branch.
const tip = at(1);

// Root tendrils under the base, curling like the roots of the logo.
const ROOTS = [
  "M12 70C20 76 22 84 16 89C12 92 8 89 10 86",
  "M22 69C34 74 40 82 36 89C34 92 30 91 31 88",
  "M34 67C46 70 56 76 56 83C56 87 52 88 51 85",
];

const LEAF = "M0 0C6-8 24-10 36 0C24 10 6 8 0 0Z";

export function AgarwoodBranch({ id, className = "" }: { id: string; className?: string }) {
  const gold = `${id}-gold`;
  return (
    <svg viewBox="0 0 196 96" className={className} aria-hidden>
      <defs>
        <linearGradient id={gold} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor="#f6dc9c" />
          <stop offset="0.5" stopColor="#d9a94e" />
          <stop offset="1" stopColor="#9a6d1c" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${gold})`} strokeWidth="1.6" strokeLinecap="round">
        {ROOTS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <path d={BRANCH} fill={`url(#${gold})`} />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rot}) scale(${l.s})`}>
          <path d={LEAF} fill={`url(#${gold})`} stroke="#9a6d1c" strokeWidth="0.5" />
          <path d="M3 0Q18-1.5 32 0" fill="none" stroke="#8a5f14" strokeWidth="0.8" strokeOpacity="0.75" />
        </g>
      ))}
      <g transform={`translate(${r(tip.x)} ${r(tip.y)}) rotate(${r(tip.angle - 8)}) scale(0.7)`}>
        <path d={LEAF} fill={`url(#${gold})`} stroke="#9a6d1c" strokeWidth="0.5" />
        <path d="M3 0Q18-1.5 32 0" fill="none" stroke="#8a5f14" strokeWidth="0.8" strokeOpacity="0.75" />
      </g>
    </svg>
  );
}

/** Eight-point-star lattice, as in Islamic geometric patterns. */
export function StarLattice({ className = "" }: { className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <defs>
        <pattern id="star-lattice" width="44" height="44" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="0.9">
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

