/**
 * Bakhoor smoke drifting up through the black background, behind all content.
 *
 * Each plume is a tall, soft column that an SVG turbulence filter twists into
 * curling smoke. The filter is rendered once; the CSS animation only moves and
 * fades the plume (see `.bakhoor` in globals.css). Decorative only.
 */
type Plume = {
  left: string;
  width: string;
  seed: number;
  duration: string;
  delay: string;
  drift: string;
  opacity: number;
};

const plumes: Plume[] = [
  { left: "-6%", width: "34vw", seed: 3, duration: "38s", delay: "-4s", drift: "6vw", opacity: 0.32 },
  { left: "18%", width: "26vw", seed: 11, duration: "46s", delay: "-27s", drift: "-4vw", opacity: 0.22 },
  { left: "40%", width: "30vw", seed: 7, duration: "42s", delay: "-15s", drift: "5vw", opacity: 0.26 },
  { left: "62%", width: "28vw", seed: 19, duration: "50s", delay: "-36s", drift: "-6vw", opacity: 0.24 },
  { left: "78%", width: "34vw", seed: 5, duration: "40s", delay: "-9s", drift: "-3vw", opacity: 0.3 },
];

export function BakhoorSmoke() {
  return (
    <div aria-hidden className="bakhoor">
      {plumes.map((p, i) => (
        <div
          key={p.seed}
          className="bakhoor-plume"
          style={
            {
              left: p.left,
              width: p.width,
              "--d": p.duration,
              "--delay": p.delay,
              "--dx": p.drift,
              "--o": p.opacity,
            } as React.CSSProperties
          }
        >
          <svg viewBox="0 0 400 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`bk-fade-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9cde6" stopOpacity="0" />
                <stop offset="0.35" stopColor="#d9cde6" stopOpacity="0.55" />
                <stop offset="0.75" stopColor="#c4b2d8" stopOpacity="0.8" />
                <stop offset="1" stopColor="#c4b2d8" stopOpacity="0" />
              </linearGradient>
              <filter
                id={`bk-curl-${i}`}
                filterUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="400"
                height="1000"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.018 0.006"
                  numOctaves="3"
                  seed={p.seed}
                  result="noise"
                />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="150" />
                <feGaussianBlur stdDeviation="11" />
              </filter>
            </defs>
            <g filter={`url(#bk-curl-${i})`}>
              <ellipse cx="200" cy="540" rx="18" ry="380" fill={`url(#bk-fade-${i})`} />
              <ellipse cx="186" cy="680" rx="10" ry="240" fill={`url(#bk-fade-${i})`} />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
