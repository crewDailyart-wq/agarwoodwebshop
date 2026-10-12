import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { products } from "@/content/catalog";

export const metadata: Metadata = {
  title: "Origins",
  description: "Where agarwood grows, and what we can and cannot yet say about ours.",
};

// General geography only. Species-per-region details are added once reviewed.
const regions = [
  "India and Bangladesh",
  "Sri Lanka",
  "Myanmar, Thailand, Laos, Cambodia and Vietnam",
  "Southern China",
  "Malaysia, Indonesia and Brunei",
  "The Philippines",
  "Papua New Guinea",
];

export default function OriginsPage() {
  const origin = products["agarwood-chips"].facts.find((f) => f.label === "Country of origin")?.value;
  return (
    <EditorialPage eyebrow="The World of Agarwood" title="A fragrance with a geography">
      <p>
        Agarwood comes from trees of the Aquilaria and Gyrinops genera. It grows naturally across
        South and Southeast Asia, and the resinous wood has been traded and prized for centuries.
      </p>
      <h2>Where the trees grow</h2>
      <ul className="divide-y divide-gold-line border-y border-gold-line">
        {regions.map((r) => (
          <li key={r} className="py-4">
            {r}
          </li>
        ))}
      </ul>
      <p className="text-sm text-ivory-faint">
        This list describes where agarwood trees occur in general. It does not mean we sell
        agarwood from each of these places.
      </p>
      <h2>Our agarwood</h2>
      <p>
        {origin
          ? `Our Signature Agarwood Chips come from ${origin}.`
          : "Documented details about the origin of our agarwood will be published here once verified. We will never state an origin we cannot document."}
      </p>
    </EditorialPage>
  );
}
