/**
 * Aquilaria species shown in the slideshow behind the "True Agarwood" heading: one per region,
 * each for two seconds. Where a `photo` is set the photograph is shown; until then the slide
 * shows the region's outline instead (never a stand-in photograph of another plant).
 *
 * To add a photograph: put the file in /public/species, then set `photo` on its entry, e.g.
 *   photo: { src: "/species/aquilaria-crassna.jpg", alt: "…", credit: "Photo: Name, CC BY-SA 4.0" }
 */
export type SpeciesSlide = {
  id: string;
  /** Latin name, without the author. */
  species: string;
  /** Region as it is named on the shop's map (a key of `silhouettes`). */
  region: string;
  /** Region as shown in the caption. */
  regionLabel: string;
  photo?: { src: string; alt: string; credit?: string };
};

export const speciesSlides: SpeciesSlide[] = [
  { id: "crassna", species: "Aquilaria crassna", region: "Vietnam", regionLabel: "Vietnam" },
  { id: "malaccensis", species: "Aquilaria malaccensis", region: "Malaysia", regionLabel: "Malaysia" },
  { id: "sinensis", species: "Aquilaria sinensis", region: "Southern China", regionLabel: "Southern China" },
  { id: "beccariana", species: "Aquilaria beccariana", region: "Indonesia", regionLabel: "Indonesia (Borneo)" },
  { id: "subintegra", species: "Aquilaria subintegra", region: "Thailand", regionLabel: "Thailand" },
  { id: "cumingiana", species: "Aquilaria cumingiana", region: "Philippines", regionLabel: "Philippines" },
  { id: "filaria", species: "Aquilaria filaria", region: "Papua New Guinea", regionLabel: "Papua New Guinea" },
];
