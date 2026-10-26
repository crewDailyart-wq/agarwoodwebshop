/**
 * Main menu. `lines` sets how a label stacks in the header bar (two short lines
 * keep the bar symmetrical); everywhere else the single `label` is used.
 */
export const nav: { href: string; label: string; lines: [string] | [string, string] }[] = [
  { href: "/", label: "Homepage", lines: ["Homepage"] },
  { href: "/origins", label: "Aluwwah (Agarwood)", lines: ["Aluwwah", "(Agarwood)"] },
  { href: "/collection", label: "Our Agarwood Assortment", lines: ["Our Agarwood", "Assortment"] },
  { href: "/state-of-our-ummah", label: "State of Our Ummah", lines: ["State of", "Our Ummah"] },
  { href: "/contact", label: "Contact", lines: ["Contact"] },
];
