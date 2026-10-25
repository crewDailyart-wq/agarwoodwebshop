import satellite from "@/assets/asia-satellite.jpg";
import { landPaths, mapMarkers, mapSize, regionPaths } from "@/content/asia-map";

/**
 * Map of the regions where agarwood trees grow naturally.
 * `satellite` (default): true-colour satellite imagery (NASA Blue Marble,
 * public domain), reprojected by scripts/build-satellite.py to the same
 * Mercator frame as the Natural Earth outlines below, so they line up.
 * `atlas`: the earlier antique-atlas style.
 * Antique-atlas map of the regions where agarwood trees grow naturally.
 * Geography only: it does not say where our own agarwood comes from.
 */

/** Must match EXT in scripts/build-satellite.py. */
const SAT_EXT = 200;

type Label = { dx: number; dy: number; anchor?: "start" | "end"; line?: boolean };

// Label placement per marker, tuned so names don't collide.
const labels: Record<string, Label> = {
  Bangladesh: { dx: 14, dy: -8 },
  India: { dx: -16, dy: 6, anchor: "end" },
  "Sri Lanka": { dx: -16, dy: 6, anchor: "end" },
  Myanmar: { dx: -14, dy: -10, anchor: "end" },
  Thailand: { dx: -12, dy: 30, anchor: "end" },
  Laos: { dx: 62, dy: 4, line: true },
  Vietnam: { dx: 70, dy: -16, line: true },
  Cambodia: { dx: 62, dy: 10, line: true },
  "Southern China": { dx: 70, dy: 4, line: true },
  Philippines: { dx: 16, dy: 6 },
  Brunei: { dx: 52, dy: -14, line: true },
  Malaysia: { dx: -16, dy: -6, anchor: "end" },
  Singapore: { dx: 56, dy: 22, line: true },
  Indonesia: { dx: 18, dy: 30 },
  "Papua New Guinea": { dx: -16, dy: -20, anchor: "end" },
};

export function AsiaMap({
  className = "",
  variant = "satellite",
  cover = false,
}: {
  className?: string;
  variant?: "satellite" | "atlas";
  /** Fill the parent like object-fit: cover, showing extra imagery above and below. */
  cover?: boolean;
}) {
  const sat = variant === "satellite";
  const ext = sat && cover ? SAT_EXT : 0;
  const { width, height } = mapSize;
  return (
    <svg
      viewBox={`0 ${-ext} ${width} ${height + 2 * ext}`}
      preserveAspectRatio={cover ? "xMidYMid slice" : undefined}
      className={className}
      role="img"
      aria-label="Map of South and Southeast Asia showing the regions where agarwood trees grow: India, Bangladesh, Sri Lanka, Myanmar, Thailand, Laos, Cambodia, Vietnam, southern China, Malaysia, Singapore, Brunei, Indonesia, the Philippines and Papua New Guinea."
    >
      <defs>
        <radialGradient id="map-sea" cx="45%" cy="45%" r="70%">
          <stop offset="0" stopColor="#0f3a24" />
          <stop offset="1" stopColor="#04130b" />
        </radialGradient>
        <linearGradient id="map-region" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b88a4e" />
          <stop offset="1" stopColor="#6e4a26" />
        </linearGradient>
        <filter id="map-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="map-marker">
          <stop offset="0" stopColor="#fff3cf" stopOpacity="1" />
          <stop offset="0.4" stopColor="#ecca82" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c99a3f" stopOpacity="0" />
        </radialGradient>
      </defs>

      {sat ? (
        <image
          href={satellite.src}
          x="0"
          y={-SAT_EXT}
          width={width}
          height={height + 2 * SAT_EXT}
          preserveAspectRatio="none"
        />
      ) : (
        <rect width={width} height={height} fill="url(#map-sea)" />
      )}

      {!sat && (
      <>
      {/* faint graticule */}
      <g stroke="rgb(198 162 107 / 0.08)" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 100} y1="0" x2={(i + 1) * 100} y2={height} />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * 92} x2={width} y2={(i + 1) * 92} />
        ))}
      </g>

      <g fill="#0c2418" stroke="rgb(198 162 107 / 0.22)" strokeWidth="0.8">
        {landPaths.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>
      </>
      )}

      <g
        fill={sat ? "rgb(236 202 130 / 0.16)" : "url(#map-region)"}
        stroke={sat ? "#f3d68f" : "#e2bf85"}
        strokeWidth={sat ? 1.3 : 0.9}
        strokeLinejoin="round"
        filter={sat ? undefined : "url(#map-glow)"}
        opacity={sat ? 1 : 0.92}
      >
        {regionPaths.map((r) => (
          <path key={r.name} d={r.d}>
            <title>{r.name}</title>
          </path>
        ))}
      </g>

      {/* ocean and continent labels */}
      <g
        fill={sat ? "rgb(255 255 255 / 0.7)" : "rgb(239 228 211 / 0.55)"}
        fontFamily="var(--font-caps), serif"
        fontSize="15"
        letterSpacing="5"
        textAnchor="middle"
      >
        <text x="470" y="60" fill="rgb(239 228 211 / 0.85)" fontSize="18" letterSpacing="7">
          ASIA
        </text>
        <text x="190" y="520">INDIAN</text>
        <text x="190" y="542">OCEAN</text>
        <text x="830" y="250">PACIFIC</text>
        <text x="830" y="272">OCEAN</text>
      </g>

      {/* markers */}
      {mapMarkers.map((m) => {
        const l = labels[m.name] ?? { dx: 14, dy: 6 };
        const tx = m.x + l.dx;
        const ty = m.y + l.dy;
        return (
          <g key={m.name}>
            <circle className="marker-halo" cx={m.x} cy={m.y} r="16" fill="url(#map-marker)" />
            <circle cx={m.x} cy={m.y} r="4" fill="#fff6dc" />
            {l.line && (
              <>
                <line
                  x1={m.x + 7}
                  y1={m.y}
                  x2={tx - 8}
                  y2={ty - 6}
                  stroke="rgb(239 228 211 / 0.7)"
                  strokeWidth="1"
                />
                <circle cx={tx - 8} cy={ty - 6} r="2" fill="#efe4d3" />
              </>
            )}
            <text
              x={tx}
              y={ty}
              textAnchor={l.anchor ?? "start"}
              fill={sat ? "#ffffff" : "#efe4d3"}
              fontFamily="var(--font-garamond), serif"
              fontSize="21"
              stroke={sat ? "rgb(0 0 0 / 0.75)" : "#04130b"}
              strokeWidth={sat ? 3.5 : 4}
              paintOrder="stroke"
            >
              {m.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
