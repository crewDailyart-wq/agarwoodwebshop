/**
 * The product catalog — the single source of truth for what is sold.
 *
 * At launch there are exactly TWO products plus ONE bundle, and Pure Camphor
 * (added Nov 2026 on the owner's say-so, with its own page at /camphor), and the three
 * High Oil Agarwood Chips from Southern China (large chips, middle size chips, granules;
 * added Nov 2026 on the owner's say-so).
 * Do not add others without the owner's say-so.
 *
 * Facts that need verification (origin, species, certificates, dimensions,
 * weight) are `null` until the owner supplies them. The UI only shows a fact
 * when it is set — nothing is ever invented.
 *
 * PRICES ARE PLACEHOLDERS. `pricesConfirmed` is false until the owner sets the
 * real prices; while false, every price on the site is labelled "preview price".
 */

export type ProductId =
  | "agarwood-chips"
  | "china-chips-large"
  | "china-chips-medium"
  | "china-granules"
  | "the-complete-ritual"
  | "pure-camphor";

export type Photo = {
  /** Path under /public, e.g. "/photos/chips-hero.jpg". `null` = placeholder shown. */
  src: string | null;
  alt: string;
  /** Art direction note shown on the placeholder, so the photographer knows the brief. */
  brief: string;
  width: number;
  height: number;
  /** Shape (width / height) of the main picture on the product page, when this is the first photo.
   *  The whole photo still opens in the enlarged view. */
  heroRatio?: number;
  /** CSS object-position for cropped views of this photo, e.g. "50% 52%". */
  focus?: string;
};

export type Product = {
  id: ProductId;
  slug: ProductId;
  name: string;
  /** Optional small line above the name on the product page and under it in the cart. */
  subtitle?: string;
  /** Show a small satellite map of the country of origin on the main product photo. */
  originMap?: "vietnam" | "china";
  /** A product with a page of its own (e.g. "/camphor") instead of /shop/<slug>. */
  href?: string;
  /** Short gold small-caps label on product cards. Must stay factual. */
  cardLabel: string;
  summary: string;
  /** Paragraphs; `{ narration }` drops a narration (by id, see narrations.ts) in between them. */
  description: (string | { narration: string })[];
  /** Open the product text with the Basmala. */
  bismillah?: boolean;
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
    name: "High Grade Vietnamese Agarwood Chips",
    originMap: "vietnam",
    cardLabel: "Resin-rich heartwood",
    summary:
      "Resin-rich agarwood chips, selected to be warmed slowly and enjoyed as the fragrance unfolds.",
    bismillah: true,
    description: [
      "We hereby offer our high grade Vietnamese agarwood chips. You can use them as incense to perfume yourself and your surroundings.",
      "The smoke of agarwood/aloeswood incense is said to have many benefits, including physical health benefits. The difference between quality of agarwood chips can be likened to the difference in fruits when they ripen, no doubt that when a fruit ripens more, it becomes more pleasing to us and is generally better for us. Prophet Muhammad \uFDFA used it to perfume himself as mentioned in the narration we put on our homepage. We know from the following narration that our deeds are by their intention:",
      { narration: "bukhari-6689" },
      "So whomsoever uses the agarwood to follow the tradition of Prophet Muhammad \uFDFA then he will be rewarded for it beyond the benefit he already gets by using it in the first place, but whomsoever uses it only for his own satisfaction then that will be his reward. As such we must try to set our intention straight with everything we do in our lives. Cleanliness and personal hygiene are highly encouraged in Islam.",
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
      { label: "Country of origin", value: "Vietnam" }, // owner, Oct 2026
      { label: "Botanical species", value: null },
      { label: "Net weight", value: null },
      { label: "Grade", value: null },
      { label: "Growth", value: null }, // e.g. plantation / wild — never assume
    ],
    sections: [], // the Fragrance / How to burn / Storage / Shipping panel was removed (owner, Oct 2026)
    related: [],
    seo: {
      title: "High Grade Vietnamese Agarwood Chips",
      description:
        "Genuine Vietnamese agarwood chips for burning as incense — resin-rich, warmed slowly, never lit.",
    },
  },

  "china-chips-large": {
    id: "china-chips-large",
    slug: "china-chips-large",
    name: "High Oil Agarwood Chips from Southern China",
    subtitle: "Large chips",
    originMap: "china",
    cardLabel: "Large chips",
    summary:
      "High oil agarwood chips, in large pieces from Southern China, selected to be warmed slowly and enjoyed as the fragrance unfolds.",
    bismillah: true,
    description: [
      "We hereby offer our high oil agarwood chips, in large pieces from Southern China. You can use them as incense to perfume yourself and your surroundings.",
      "The smoke of agarwood/aloeswood incense is said to have many benefits, including physical health benefits. The difference between quality of agarwood can be likened to the difference in fruits when they ripen, no doubt that when a fruit ripens more, it becomes more pleasing to us and is generally better for us. Prophet Muhammad \uFDFA used it to perfume himself as mentioned in the narration we put on our homepage. We know from the following narration that our deeds are by their intention:",
      { narration: "bukhari-6689" },
      "So whomsoever uses the agarwood to follow the tradition of Prophet Muhammad \uFDFA then he will be rewarded for it beyond the benefit he already gets by using it in the first place, but whomsoever uses it only for his own satisfaction then that will be his reward. As such we must try to set our intention straight with everything we do in our lives. Cleanliness and personal hygiene are highly encouraged in Islam.",
    ],
    priceCents: 9500, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: "/photos/china-chips-large-1.jpg",
        alt: "Large high oil agarwood chips from Southern China, laid out beside the ALUWWAH wooden box and cotton pouch",
        brief: "Overview of the large chips with the ALUWWAH box and pouch.",
        width: 1280,
        height: 960,
      },
      {
        src: "/photos/china-chips-large-2.jpg",
        alt: "ALUWWAH wooden box with the engraved gold tree logo, surrounded by large agarwood chips",
        brief: "The engraved ALUWWAH box among the large chips.",
        width: 1600,
        height: 1200,
      },
      {
        src: "/photos/china-chips-large-3.jpg",
        alt: "A long, slender piece of agarwood held in an open hand",
        brief: "A long slender chip held in the hand for scale.",
        width: 1600,
        height: 1200,
      },
      {
        src: "/photos/china-chips-large-4.jpg",
        alt: "A large piece of dark, oil-rich agarwood with dense grain held in the hand",
        brief: "A large dark chip with dense grain, held in the hand.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/photos/china-chips-large-5.jpg",
        alt: "A broad agarwood chip with resin-rich grain held in the hand",
        brief: "A broad chip with resin-rich grain, held in the hand.",
        width: 1200,
        height: 1600,
      },
    ],
    facts: [
      { label: "Country of origin", value: "Southern China" }, // owner, Nov 2026
      { label: "Botanical species", value: null },
      { label: "Net weight", value: null },
      { label: "Grade", value: null },
      { label: "Growth", value: null },
    ],
    sections: [],
    related: [],
    seo: {
      title: "High Oil Agarwood Chips from Southern China, Large chips",
      description:
        "High oil agarwood from Southern China, large chips, for burning as incense: warmed slowly, never lit.",
    },
  },

  "china-chips-medium": {
    id: "china-chips-medium",
    slug: "china-chips-medium",
    name: "High Oil Agarwood Chips from Southern China",
    subtitle: "Middle size chips",
    originMap: "china",
    cardLabel: "Middle size chips",
    summary:
      "High oil agarwood chips, in middle size pieces from Southern China, selected to be warmed slowly and enjoyed as the fragrance unfolds.",
    bismillah: true,
    description: [
      "We hereby offer our high oil agarwood chips, in middle size pieces from Southern China. You can use them as incense to perfume yourself and your surroundings.",
      "The smoke of agarwood/aloeswood incense is said to have many benefits, including physical health benefits. The difference between quality of agarwood can be likened to the difference in fruits when they ripen, no doubt that when a fruit ripens more, it becomes more pleasing to us and is generally better for us. Prophet Muhammad \uFDFA used it to perfume himself as mentioned in the narration we put on our homepage. We know from the following narration that our deeds are by their intention:",
      { narration: "bukhari-6689" },
      "So whomsoever uses the agarwood to follow the tradition of Prophet Muhammad \uFDFA then he will be rewarded for it beyond the benefit he already gets by using it in the first place, but whomsoever uses it only for his own satisfaction then that will be his reward. As such we must try to set our intention straight with everything we do in our lives. Cleanliness and personal hygiene are highly encouraged in Islam.",
    ],
    priceCents: 9500, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: "/photos/china-chips-medium-pile.jpg",
        alt: "A pile of middle size high oil agarwood chips from Southern China, with the ALUWWAH wooden box in the top left corner and a cotton pouch top right",
        brief: "Overview pile of the middle size chips with the ALUWWAH box and pouch.",
        width: 1600,
        height: 1200,
      },
      {
        src: "/photos/china-chips-medium-2.jpg",
        alt: "A long middle size agarwood chip held in an open hand, with the ALUWWAH box and chips behind it",
        brief: "A long middle size chip held in the hand for scale.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/photos/china-chips-medium-3.jpg",
        alt: "A flat middle size agarwood chip held in an open hand beside the ALUWWAH box with its engraved gold tree logo",
        brief: "A flat chip in the hand beside the engraved ALUWWAH box.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/photos/china-chips-medium-4.jpg",
        alt: "A thin flat agarwood chip resting in an open hand, with the ALUWWAH box and pouch behind it",
        brief: "A thin flat chip in the hand with the box and pouch.",
        width: 1200,
        height: 1600,
      },
    ],
    facts: [
      { label: "Country of origin", value: "Southern China" }, // owner, Nov 2026
      { label: "Botanical species", value: null },
      { label: "Net weight", value: null },
      { label: "Grade", value: null },
      { label: "Growth", value: null },
    ],
    sections: [],
    related: [],
    seo: {
      title: "High Oil Agarwood Chips from Southern China, Middle size chips",
      description:
        "High oil agarwood from Southern China, middle size chips, for burning as incense: warmed slowly, never lit.",
    },
  },

  "china-granules": {
    id: "china-granules",
    slug: "china-granules",
    name: "High Oil Agarwood Chips from Southern China",
    subtitle: "Agarwood granules",
    originMap: "china",
    cardLabel: "Agarwood granules",
    summary:
      "High oil agarwood granules from Southern China, selected to be warmed slowly and enjoyed as the fragrance unfolds.",
    bismillah: true,
    description: [
      "We hereby offer our high oil agarwood granules from Southern China. You can use them as incense to perfume yourself and your surroundings.",
      "The smoke of agarwood/aloeswood incense is said to have many benefits, including physical health benefits. The difference between quality of agarwood can be likened to the difference in fruits when they ripen, no doubt that when a fruit ripens more, it becomes more pleasing to us and is generally better for us. Prophet Muhammad \uFDFA used it to perfume himself as mentioned in the narration we put on our homepage. We know from the following narration that our deeds are by their intention:",
      { narration: "bukhari-6689" },
      "So whomsoever uses the agarwood to follow the tradition of Prophet Muhammad \uFDFA then he will be rewarded for it beyond the benefit he already gets by using it in the first place, but whomsoever uses it only for his own satisfaction then that will be his reward. As such we must try to set our intention straight with everything we do in our lives. Cleanliness and personal hygiene are highly encouraged in Islam.",
    ],
    priceCents: 9500, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: "/photos/china-granules-hd-1.jpg",
        alt: "High oil agarwood granules from Southern China scattered around the ALUWWAH wooden box with its engraved gold tree logo",
        brief: "Granules around the engraved ALUWWAH box.",
        width: 1200,
        height: 1600,
        heroRatio: 4 / 3,
        focus: "50% 52%",
      },
      {
        src: "/photos/china-granules-hd-2.jpg",
        alt: "A thin agarwood granule held between the fingers, with the ALUWWAH box, cotton pouch and granules behind it",
        brief: "A single thin granule held in the hand for scale.",
        width: 1200,
        height: 1600,
      },
      {
        src: "/photos/china-granules-hd-3.jpg",
        alt: "A heap of high oil agarwood granules beside the ALUWWAH wooden box and cotton pouch",
        brief: "Overview heap of granules with the ALUWWAH box and pouch.",
        width: 1200,
        height: 1600,
      },
    ],
    facts: [
      { label: "Country of origin", value: "Southern China" }, // owner, Nov 2026
      { label: "Botanical species", value: null },
      { label: "Net weight", value: null },
      { label: "Grade", value: null },
      { label: "Growth", value: null },
    ],
    sections: [],
    related: [],
    seo: {
      title: "High Oil Agarwood Chips from Southern China, Agarwood granules",
      description:
        "High oil agarwood from Southern China, agarwood granules, for burning as incense: warmed slowly, never lit.",
    },
  },

  "the-complete-ritual": {
    id: "the-complete-ritual",
    slug: "the-complete-ritual",
    name: "Complete Agarwood Set",
    subtitle: "Agarwood of your choice with all you need to use it",
    cardLabel: "Agarwood of your choice with all you need to use it",
    summary: "Agarwood of your choice, with all you need to use it — presented together.",
    description: [
      "Agarwood of your choice and The Incense Burner, together in one presentation. Nothing else to buy before the first evening.",
    ],
    priceCents: 13500, // owner, Oct 2026 (was 150)
    stock: null,
    variants: [],
    includes: [
      { id: "agarwood-chips", quantity: 1 },
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
    facts: [{ label: "Includes", value: "High Grade Vietnamese Agarwood Chips · The Incense Burner" }],
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
      title: "Complete Agarwood Set",
      description: "Agarwood of your choice with the incense burner — all you need to use it.",
    },
  },

  "pure-camphor": {
    id: "pure-camphor",
    slug: "pure-camphor",
    href: "/camphor",
    name: "Pure Camphor",
    cardLabel: "For mixing with agarwood",
    summary: "Pure camphor, to be mixed with agarwood in the tradition of Prophet Muhammad \uFDFA.",
    bismillah: true,
    description: [
      "We hereby offer our pure camphor, made by distilling the bark and wood of the Camphor tree (Cinnamomum Camphora). It offers a strong and cooling fragrance.",
      "When burning our camphor as incense you can use it by itself, or you can mix it with agarwood, as is found in the tradition of Prophet Muhammad \uFDFA. Either way you would need but a little, as it is very strong.",
      "Leaving the camphor exposed in any place causes it to perfume its surroundings, but it also evaporates quickly, because it undergoes sublimation, which means that it transfers immediately from a solid state to a gas state. This is caused by the outward vapor pressure of the camphor, which is stronger than the air resistance it undergoes, causing it to \u2018escape\u2019 into the air.",
      "Knowing and understanding these scientific processes should not in any way decrease us in our faith; rather it should make us contemplate more about our existence and increase us in our love for the One who created our complex reality.",
    ],
    priceCents: 1200, // PLACEHOLDER
    stock: null,
    variants: [],
    photos: [
      {
        src: "/photos/camphor-1.jpg",
        alt: "Large white pieces of pure camphor lying on the ALUWWAH wooden box with its engraved gold tree logo",
        brief: "Pieces of pure camphor on the engraved ALUWWAH box.",
        width: 1200,
        height: 1600,
        focus: "50% 42%",
      },
      {
        src: "/photos/camphor-2.jpg",
        alt: "A large piece of pure camphor held in an open hand, with the ALUWWAH box and more camphor behind it",
        brief: "A piece of camphor held in the hand for scale.",
        width: 1200,
        height: 1600,
        focus: "50% 48%",
      },
    ],
    facts: [
      { label: "Net weight", value: null },
      { label: "Origin", value: null },
    ],
    sections: [],
    related: [],
    seo: {
      title: "Pure Camphor",
      description:
        "Pure camphor to mix with agarwood, with the narrations of Prophet Muhammad \uFDFA and the verse of the Qur\u2019an that mention it.",
    },
  },
};

export const productList = Object.values(products);

/** Where a product's page lives. */
export function productHref(product: Pick<Product, "slug" | "href">): string {
  return product.href ?? `/shop/${product.slug}`;
}

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
