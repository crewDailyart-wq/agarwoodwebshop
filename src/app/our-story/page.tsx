import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Our Story" };

export default function StoryPage() {
  return (
    <EditorialPage eyebrow="Our Story" title="Two things, chosen with care">
      <p>
        {site.name} offers one agarwood and one burner, deliberately. A small selection lets each
        be presented properly, and lets you know exactly what you are buying.
      </p>
      <p>The full story of the house will be written here by its owner.</p>
    </EditorialPage>
  );
}
