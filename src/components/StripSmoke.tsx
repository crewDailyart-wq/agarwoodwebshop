/**
 * Bakhoor smoke rising in the black announcement strip.
 *
 * Thin threads of smoke start at the strip's lower edge and climb, curling,
 * widening and thinning out as they rise — as smoke does over a burner. Each
 * plume's curl comes from an SVG turbulence filter whose frequency drifts
 * slowly (so the shape keeps changing), while CSS lifts, sways and fades the
 * plume (`.strip-plume` in globals.css). Plumes behind the text are a little fainter so
 * the messages always read clearly. Decorative only.
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
  { left: "1%", rise: "6.5s", delay: "-0.2s", sway: "3.4s", o: 0.94, seed: 3 },
  { left: "5%", rise: "7.8s", delay: "-1.6s", sway: "3.7s", o: 0.91, seed: 10 },
  { left: "9%", rise: "6.1s", delay: "-2.9s", sway: "4.2s", o: 0.87, seed: 17 },
  { left: "13%", rise: "8.2s", delay: "-4.3s", sway: "4.4s", o: 0.83, seed: 24 },
  { left: "17%", rise: "6.9s", delay: "-5.7s", sway: "3.5s", o: 0.8, seed: 31 },
  { left: "21%", rise: "7.4s", delay: "-7.1s", sway: "3.1s", o: 0.76, seed: 38 },
  { left: "25%", rise: "8.6s", delay: "-1.4s", sway: "4.6s", o: 0.72, seed: 4 },
  { left: "29%", rise: "7.1s", delay: "-2.8s", sway: "4.1s", o: 0.69, seed: 11 },
  { left: "33%", rise: "8.0s", delay: "-4.2s", sway: "3.9s", o: 0.65, seed: 18 },
  { left: "37%", rise: "6.5s", delay: "-5.5s", sway: "3.4s", o: 0.62, seed: 25 },
  { left: "41%", rise: "7.8s", delay: "-6.9s", sway: "3.7s", o: 0.58, seed: 32 },
  { left: "45%", rise: "6.1s", delay: "-1.3s", sway: "4.2s", o: 0.55, seed: 39 },
  { left: "49%", rise: "8.2s", delay: "-2.6s", sway: "4.4s", o: 0.51, seed: 5 },
  { left: "53%", rise: "6.9s", delay: "-4.0s", sway: "3.5s", o: 0.53, seed: 12 },
  { left: "57%", rise: "7.4s", delay: "-5.4s", sway: "3.1s", o: 0.56, seed: 19 },
  { left: "61%", rise: "8.6s", delay: "-6.8s", sway: "4.6s", o: 0.6, seed: 26 },
  { left: "65%", rise: "7.1s", delay: "-1.1s", sway: "4.1s", o: 0.64, seed: 33 },
  { left: "69%", rise: "8.0s", delay: "-2.5s", sway: "3.9s", o: 0.67, seed: 40 },
  { left: "73%", rise: "6.5s", delay: "-3.9s", sway: "3.4s", o: 0.71, seed: 6 },
  { left: "77%", rise: "7.8s", delay: "-5.2s", sway: "3.7s", o: 0.74, seed: 13 },
  { left: "81%", rise: "6.1s", delay: "-6.6s", sway: "4.2s", o: 0.78, seed: 20 },
  { left: "85%", rise: "8.2s", delay: "-1.0s", sway: "4.4s", o: 0.81, seed: 27 },
  { left: "89%", rise: "6.9s", delay: "-2.3s", sway: "3.5s", o: 0.85, seed: 34 },
  { left: "93%", rise: "7.4s", delay: "-3.7s", sway: "3.1s", o: 0.89, seed: 41 },
  { left: "97%", rise: "8.6s", delay: "-5.1s", sway: "4.6s", o: 0.92, seed: 7 },
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
                  <stop offset="0" stopColor="#fffaf0" stopOpacity="0" />
                  <stop offset="0.08" stopColor="#fffaf0" stopOpacity="1" />
                  <stop offset="0.5" stopColor="#f5ecd8" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#e8dcc2" stopOpacity="0" />
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
                  <feGaussianBlur stdDeviation="0.9" />
                </filter>
              </defs>
              <g filter={`url(#sp-f-${i})`}>
                {/* a thin thread at the base that opens into a soft column */}
                <path d="M30 150C29 120 26 96 24 70C22 44 26 20 30 0C34 20 38 44 36 70C34 96 31 120 30 150Z" fill={`url(#sp-g-${i})`} />
                <path d="M31 150C32 122 37 100 40 78C43 56 40 34 36 14" stroke={`url(#sp-g-${i})`} strokeWidth="3.6" fill="none" />
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
