import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";

export const metadata: Metadata = {
  title: "The Ritual",
  description: "How to warm agarwood: prepare, release, experience.",
};

export default function RitualPage() {
  return (
    <EditorialPage eyebrow="The Ritual" title="Warmed, never lit">
      <p>
        Agarwood is not set alight. It is warmed gently, so that its aromatic compounds are
        released slowly and the scent can change as it heats.
      </p>
      <h2>I · Prepare</h2>
      <p>Prepare the incense burner using a suitable heating method.</p>
      <h2>II · Release</h2>
      <p>
        Place a small piece of agarwood on the plate and let the indirect heat release its
        fragrance. Start with one small chip.
      </p>
      <h2>III · Experience</h2>
      <p>
        Follow the fragrance as it evolves. When it fades, remove the chip; it can be used again.
      </p>
      <p className="pt-6">
        <Link href="/shop/the-complete-ritual" className="btn btn-line">
          Discover the Complete Ritual
        </Link>
      </p>
    </EditorialPage>
  );
}
