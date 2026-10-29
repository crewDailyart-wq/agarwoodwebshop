/**
 * Bakhoor smoke drifting through the black announcement strip.
 *
 * Each wisp is a soft horizontal band that an SVG turbulence filter twists
 * into curling smoke. The filter is drawn once; CSS only moves and fades the
 * wisp (see `.strip-wisp` in globals.css), so it stays light on the GPU.
 */
type Wisp = { seed: number; duration: string; delay: string; top: string; opacity: number; width: string };

const wisps: Wisp[] = [
  { seed: 4, duration: "34s", delay: "-3s", top: "-60%", opacity: 0.5, width: "36vw" },
  { seed: 13, duration: "41s", delay: "-19s", top: "-40%", opacity: 0.42, width: "30vw" },
  { seed: 8, duration: "37s", delay: "-11s", top: "-75%", opacity: 0.46, width: "40vw" },
  { seed: 21, duration: "45s", delay: "-31s", top: "-50%", opacity: 0.38, width: "28vw" },
  { seed: 2, duration: "39s", delay: "-25s", top: "-65%", opacity: 0.44, width: "34vw" },
];

export function StripSmoke({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {wisps.map((w, i) => (
        <div
          key={w.seed}
          className="strip-wisp"
          style={
            { top: w.top, width: w.width, "--d": w.duration, "--delay": w.delay, "--o": w.opacity } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 800 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`sw-fade-${i}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#e9e2d2" stopOpacity="0" />
                <stop offset="0.3" stopColor="#e9e2d2" stopOpacity="0.7" />
                <stop offset="0.7" stopColor="#d8cdb6" stopOpacity="0.85" />
                <stop offset="1" stopColor="#d8cdb6" stopOpacity="0" />
              </linearGradient>
              <filter id={`sw-curl-${i}`} filterUnits="userSpaceOnUse" x="0" y="0" width="800" height="160">
                <feTurbulence type="fractalNoise" baseFrequency="0.006 0.03" numOctaves="3" seed={w.seed} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="70" />
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>
            <g filter={`url(#sw-curl-${i})`}>
              <ellipse cx="400" cy="84" rx="330" ry="9" fill={`url(#sw-fade-${i})`} />
              <ellipse cx="470" cy="70" rx="210" ry="5" fill={`url(#sw-fade-${i})`} />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
