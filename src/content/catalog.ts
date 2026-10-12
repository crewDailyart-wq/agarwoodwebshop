/**
 * The product catalog — the single source of truth for what is sold.
 *
 * At launch there are exactly TWO products plus ONE bundle. Do not add others
 * without the owner's say-so.
 *
 * Facts that need verification (origin, species, certificates, dimensions,
 * weight) are `null` until the owner supplies them. The UI only shows a fact
 * when it is set — nothing is ever invented.
 *
 * PRICES ARE PLACEHOLDERS. `pricesConfirmed` is false until the owner sets the
 * real prices; while false, every price on the site is labelled "preview price".
 */

export type ProductId = "agarwood-chips" | "incense-burner" | "the-complete-ritual";

export type Photo = {
  /** Path under /public, e.g. "/photos/chips-hero.jpg". `null` = placeholder shown. */
  src: string | null;
  alt: string;
  /** Art direction note shown on the placeholder, so the photographer knows the brief. */
  brief: string;
  width: number;
  height: number;
};

export type Product = {
  id: ProductId;
  slug: ProductId;
  name: string;
  /** One line under the name. */
  subtitle: string;
  summary: string;
  description: string[];
  priceCents: number;
  /** Units in stock. `null` = not tracked (always available). `0` = sold out. */
  stock: number | null;
  /** Weight/quantity options. Empty = single option. Only add real, supplied options. */
  variants: { id: string; label: string; priceCents: number }[];
  photos: Photo[];
  /** For bundles: the ids and quantities included. */
  includes?: { id: ProductId; quantity: number }[];
  /** Verified facts. `null` = unknown, not shown. */
  facts: {
    label: string;
    value: string | null;
  }[];
  sections: { title: string; body: string[] }[];
  related: ProductId[];
  seo: { title: string; description: string };
};

export const pricesConfirmed = false;

export const products: Record<ProductId, Product> = {
  "agarwood-chips": {
    id: "agarwood-chips",
    slug: "agarwood-chips",
    name: "Signature Agarwood Chips",
    subtitle: "Genuine agarwood, for burning",
    summary:
      "Resin-rich agarwood chips, selected to be warmed slowly and enjoyed as the fragrance unfolds.",
    description: [
      "Agarwood forms when a tree, wounded or infected, answers with a dark, fragrant resin. Over years it saturates the wood — and the chips we offer are cut from that resinous heartwood.",
      "Warmed gently, never lit, a single small chip releases a scent that moves from the first woody warmth to something deeper, sweeter, and longer-lasting.",
    ],
    priceCents: 9500, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: null,
        alt: "Close-up of dark, resin-rich agarwood chips",
        brief:
          "Macro of the chips on near-black plum. Warm side light, visible grain and glossy resin, a thread of smoke.",
        width: 1200,
        height: 1500,
      },
      {
        src: null,
        alt: "Agarwood chips in a handcrafted vessel",
        brief: "Chips in a small handmade vessel, dramatic low light, deep plum shadows.",
        width: 1200,
        height: 1500,
      },
      {
        src: null,
        alt: "Macro of agarwood grain and resin",
        brief: "Extreme macro: grain, resin veins, a freshly cut face.",
        width: 1200,
        height: 1500,
      },
    ],
    facts: [
      { label: "Country of origin", value: null },
      { label: "Botanical species", value: null },
      { label: "Net weight", value: null },
      { label: "Grade", value: null },
      { label: "Growth", value: null }, // e.g. plantation / wild — never assume
    ],
    sections: [
      {
        title: "Fragrance",
        body: [
          "A woody, resinous warmth that evolves while it heats. Agarwood is a natural material: no two chips smell exactly alike, and the character changes with temperature and time.",
        ],
      },
      {
        title: "How to burn",
        body: [
          "Agarwood is warmed, not burned. Heat the burner indirectly, place a small chip on the plate or mica, and let the aromatic resin release slowly.",
          "Start with one small chip. Remove it when the scent fades; chips can be reused.",
        ],
      },
      {
        title: "Storage",
        body: [
          "Keep in a closed container, away from direct sunlight, heat, and moisture. Store apart from other strong scents.",
        ],
      },
      {
        title: "Shipping",
        body: ["Shipping rules and delivery times are shown at checkout."],
      },
    ],
    related: ["incense-burner"],
    seo: {
      title: "Signature Agarwood Chips",
      description:
        "Genuine agarwood chips for burning as incense — resin-rich, warmed slowly, never lit.",
    },
  },

  "incense-burner": {
    id: "incense-burner",
    slug: "incense-burner",
    name: "The Incense Burner",
    subtitle: "Made to warm agarwood slowly",
    summary: "A refined burner designed for the gentle, indirect heat that agarwood deserves.",
    description: [
      "Agarwood is at its best when it is warmed, not burned. The burner holds the heat at a distance and lets the resin release gradually.",
      "Designed to sit quietly on a table or shelf, and to be used often.",
    ],
    priceCents: 6500, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: null,
        alt: "The incense burner on a dark surface",
        brief: "Hero shot of the burner, warm studio light, metalwork detail, soft smoke.",
        width: 1200,
        height: 1500,
      },
      {
        src: null,
        alt: "Detail of the incense burner's metalwork",
        brief: "Close detail of the material and finish.",
        width: 1200,
        height: 1500,
      },
    ],
    facts: [
      { label: "Material", value: null },
      { label: "Dimensions", value: null },
      { label: "Heating method", value: null },
    ],
    sections: [
      {
        title: "Heating methods",
        body: [
          "Compatible heating methods will be listed here once confirmed for the supplied burner.",
        ],
      },
      {
        title: "Care and cleaning",
        body: [
          "Let the burner cool completely before handling or cleaning. Wipe with a dry or slightly damp cloth; avoid abrasive cleaners.",
        ],
      },
      {
        title: "Safe handling",
        body: [
          "The burner becomes hot in use. Place on a stable, heat-resistant surface, keep away from children and pets, and never leave it unattended while hot.",
        ],
      },
    ],
    related: ["agarwood-chips"],
    seo: {
      title: "The Incense Burner",
      description: "An incense burner made for warming agarwood chips slowly and evenly.",
    },
  },

  "the-complete-ritual": {
    id: "the-complete-ritual",
    slug: "the-complete-ritual",
    name: "The Complete Ritual",
    subtitle: "Agarwood chips and incense burner, together",
    summary: "Both essentials, presented together — everything you need for the first ritual.",
    description: [
      "The Signature Agarwood Chips and The Incense Burner, together in one presentation. Nothing else to buy before the first evening.",
    ],
    priceCents: 15000, // PLACEHOLDER
    stock: null,
    variants: [],
    includes: [
      { id: "agarwood-chips", quantity: 1 },
      { id: "incense-burner", quantity: 1 },
    ],
    photos: [
      {
        src: null,
        alt: "The agarwood chips and incense burner with gift packaging",
        brief: "Both products with the aubergine gift box, understated gold branding.",
        width: 1200,
        height: 1500,
      },
    ],
    facts: [{ label: "Includes", value: "Signature Agarwood Chips · The Incense Burner" }],
    sections: [
      {
        title: "Presentation",
        body: [
          "Packaging is shown as a concept preview until the final box is produced.",
        ],
      },
    ],
    related: [],
    seo: {
      title: "The Complete Ritual",
      description: "Signature Agarwood Chips and The Incense Burner, presented together.",
    },
  },
};

export const productList = Object.values(products);

export function getProduct(id: string): Product | undefined {
  return (products as Record<string, Product>)[id];
}

export const brandFacts = {
  /** Fill in only with documentation in hand. `null` = nothing is claimed. */
  provenance: {
    citesDocumentation: null as string | null,
    certifications: null as string[] | null,
    sourcingStatement: null as string | null,
  },
};
