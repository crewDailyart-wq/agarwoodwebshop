import type { Metadata } from "next";
import { CharitySection } from "@/components/CharitySection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Charity",
  description: `${site.charity.name}: Qur’ans, wells, orphan care and relief. With verses and narrations on giving in charity, and on the right of kith and kin.`,
  alternates: { canonical: "/charity" },
};

export default function CharityPage() {
  return <CharitySection standalone />;
}
