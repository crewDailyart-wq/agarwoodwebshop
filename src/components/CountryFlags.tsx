import type { ReactNode } from "react";

/** A five-pointed star as SVG polygon points, centred at (cx, cy), outer radius r. */
function star(cx: number, cy: number, r: number, rotate = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const a = ((i * 36 + rotate - 90) * Math.PI) / 180;
    const d = i % 2 === 0 ? r : r * 0.382;
    pts.push(`${(cx + d * Math.cos(a)).toFixed(2)},${(cy + d * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

/** The flags, drawn as simple shapes on a 30 x 20 canvas. Keys match `silhouettes` regions. */
export const flagArt: Record<string, ReactNode> = {
  Vietnam: (
    <>
      <rect width="30" height="20" fill="#da251d" />
      <polygon points={star(15, 10.6, 6.2)} fill="#ffff00" />
    </>
  ),
  Malaysia: (
    <>
      {Array.from({ length: 14 }, (_, i) => (
        <rect key={i} y={(i * 20) / 14} width="30" height={20 / 14 + 0.02} fill={i % 2 ? "#ffffff" : "#cc0001"} />
      ))}
      <rect width="15" height={(20 / 14) * 8} fill="#010066" />
      <circle cx="6.2" cy="5.7" r="3.6" fill="#ffcc00" />
      <circle cx="7.3" cy="5.7" r="2.9" fill="#010066" />
      <polygon points={star(10.4, 5.7, 2.6)} fill="#ffcc00" />
    </>
  ),
  "Southern China": (
    <>
      <rect width="30" height="20" fill="#de2910" />
      <polygon points={star(5, 5, 3)} fill="#ffde00" />
      <polygon points={star(10, 2, 1, 20)} fill="#ffde00" />
      <polygon points={star(12, 4, 1, 45)} fill="#ffde00" />
      <polygon points={star(12, 7, 1, 20)} fill="#ffde00" />
      <polygon points={star(10, 9, 1, 0)} fill="#ffde00" />
    </>
  ),
  Indonesia: (
    <>
      <rect width="30" height="10" fill="#ff0000" />
      <rect y="10" width="30" height="10" fill="#ffffff" />
    </>
  ),
  Thailand: (
    <>
      <rect width="30" height="20" fill="#a51931" />
      <rect y={20 / 6} width="30" height={(20 / 6) * 4} fill="#f4f5f8" />
      <rect y={(20 / 6) * 2} width="30" height={(20 / 6) * 2} fill="#2d2a4a" />
    </>
  ),
  Philippines: (
    <>
      <rect width="30" height="10" fill="#0038a8" />
      <rect y="10" width="30" height="10" fill="#ce1126" />
      <polygon points="0,0 17.3,10 0,20" fill="#ffffff" />
      <circle cx="5" cy="10" r="2.3" fill="#fcd116" />
      <polygon points={star(1.6, 2.6, 1.3)} fill="#fcd116" />
      <polygon points={star(1.6, 17.4, 1.3)} fill="#fcd116" />
      <polygon points={star(13.2, 10, 1.3)} fill="#fcd116" />
    </>
  ),
  "Papua New Guinea": (
    <>
      <rect width="30" height="20" fill="#000000" />
      <polygon points="0,0 30,0 30,20" fill="#ce1126" />
      <ellipse cx="21.5" cy="7" rx="4.2" ry="2.2" fill="#fcd116" transform="rotate(-25 21.5 7)" />
      <polygon points={star(5, 14.5, 1.3)} fill="#ffffff" />
      <polygon points={star(8.5, 11.5, 1.1)} fill="#ffffff" />
      <polygon points={star(8.5, 17.5, 1.1)} fill="#ffffff" />
      <polygon points={star(12, 14.5, 1.3)} fill="#ffffff" />
      <polygon points={star(9, 14.5, 0.6)} fill="#ffffff" />
    </>
  ),
};
