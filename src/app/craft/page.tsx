import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";

export const metadata: Metadata = {
  title: "Craft",
  description: "How agarwood forms, and how it is meant to be enjoyed.",
};

export default function CraftPage() {
  return (
    <EditorialPage eyebrow="The craft" title="A Rarity Born of Time">
      <p>
        Agarwood begins with a wound. When an Aquilaria or Gyrinops tree is damaged or infected, it
        defends itself by producing a dark, fragrant resin. Over years, sometimes decades, that resin
        saturates the heartwood — and only that resinous wood becomes agarwood.
      </p>
      <h2>Natural resin formation</h2>
      <p>
        The depth of colour and the weight of a piece say something about how much resin it holds.
        No two pieces are alike: agarwood is a natural material, and its character varies from chip
        to chip.
      </p>
      <h2>A gentle ritual</h2>
      <p>
        Agarwood is warmed, never lit. Gentle, indirect heat releases its aromatic compounds slowly,
        so the fragrance can unfold and change over time.
      </p>
      <h2>Considered selection</h2>
      <p>
        We offer two things — one agarwood and one burner made for it — so that each can be
        presented properly and you know exactly what you are buying.
      </p>
      <p className="pt-6">
        <Link href="/ritual" className="btn btn-line">
          Explore the ritual
        </Link>
      </p>
    </EditorialPage>
  );
}
