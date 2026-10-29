/**
 * Bakhoor smoke rising in the black announcement strip.
 *
 * Thin threads of smoke start at the strip's lower edge and climb, curling,
 * widening and thinning out as they rise — as smoke does over a burner. Each
 * plume's curl comes from an SVG turbulence filter whose frequency drifts
 * slowly (so the shape keeps changing), while CSS lifts, sways and fades the
 * plume (`.strip-plume` in globals.css). Plumes behind the text are fainter so
 * "Worldwide shipping" always reads clearly. Decorative only.
 */
type Plume = {
  left: string; // position along the strip
  rise: string; // duration of one rise
  delay: string;
  sway: string; // duration of one side-to-side sway
  o: number; // peak opacity
  seed: number;
};

const plumes: Plume[] = [
  { left: "2%", rise: "6.5s", delay: "-1.2s", sway: "3.4s", o: 0.75, seed: 3 },
  { left: "8%", rise: "7.8s", delay: "-5.1s", sway: "4.1s", o: 0.62, seed: 17 },
  { left: "14%", rise: "6.1s", delay: "-3.3s", sway: "3.1s", o: 0.72, seed: 8 },
  { left: "21%", rise: "8.2s", delay: "-6.4s", sway: "4.4s", o: 0.6, seed: 25 },
  { left: "28%", rise: "6.9s", delay: "-2.2s", sway: "3.7s", o: 0.66, seed: 12 },
  { left: "35%", rise: "7.4s", delay: "-4.6s", sway: "3.9s", o: 0.34, seed: 31 },
  { left: "43%", rise: "8.6s", delay: "-0.6s", sway: "4.6s", o: 0.22, seed: 6 },
  { left: "51%", rise: "7.1s", delay: "-3.9s", sway: "3.5s", o: 0.22, seed: 21 },
  { left: "58%", rise: "8.0s", delay: "-6.9s", sway: "4.2s", o: 0.34, seed: 14 },
  { left: "65%", rise: "6.6s", delay: "-2.8s", sway: "3.3s", o: 0.66, seed: 9 },
  { left: "72%", rise: "7.6s", delay: "-5.6s", sway: "4.0s", o: 0.62, seed: 28 },
  { left: "79%", rise: "6.3s", delay: "-1.7s", sway: "3.2s", o: 0.72, seed: 4 },
  { left: "86%", rise: "8.4s", delay: "-4.2s", sway: "4.5s", o: 0.6, seed: 19 },
  { left: "93%", rise: "6.8s", delay: "-0.3s", sway: "3.6s", o: 0.74, seed: 11 },
];

export function StripSmoke({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {plumes.map((p, i) => (
        <div
          key={p.seed}
          className="strip-plume"
          style={
            { left: p.left, "--rise": p.rise, "--delay": p.delay, "--sway": p.sway, "--o": p.o } as React.CSSProperties
          }
        >
          <div className="strip-plume-sway">
            <svg viewBox="0 0 60 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`sp-g-${i}`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0" stopColor="#f3ead8" stopOpacity="0" />
                  <stop offset="0.08" stopColor="#f3ead8" stopOpacity="0.95" />
                  <stop offset="0.45" stopColor="#e6dcc6" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#d9cdb4" stopOpacity="0" />
                </linearGradient>
                <filter id={`sp-f-${i}`} filterUnits="userSpaceOnUse" x="-20" y="0" width="100" height="150">
                  <feTurbulence type="fractalNoise" baseFrequency="0.035 0.022" numOctaves="2" seed={p.seed}>
                    <animate
                      attributeName="baseFrequency"
                      values="0.035 0.022;0.05 0.03;0.03 0.018;0.035 0.022"
                      dur={`${(9 + (i % 5)) * 1}s`}
                      repeatCount="indefinite"
                    />
                  </feTurbulence>
                  <feDisplacementMap in="SourceGraphic" scale="26" />
                  <feGaussianBlur stdDeviation="1.6" />
                </filter>
              </defs>
              <g filter={`url(#sp-f-${i})`}>
                {/* a thin thread at the base that opens into a soft column */}
                <path d="M30 150C29 120 26 96 24 70C22 44 26 20 30 0C34 20 38 44 36 70C34 96 31 120 30 150Z" fill={`url(#sp-g-${i})`} />
                <path d="M31 150C32 122 37 100 40 78C43 56 40 34 36 14" stroke={`url(#sp-g-${i})`} strokeWidth="2.2" fill="none" />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
