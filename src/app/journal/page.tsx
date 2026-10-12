import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on agarwood, its history and its ritual.",
};

export default function JournalPage() {
  return (
    <EditorialPage eyebrow="Journal" title="Notes on Agarwood">
      <p>
        The journal will gather writing on agarwood — its history, its geography, and the ritual of
        warming it. The first entries are being prepared.
      </p>
      <p className="pt-4">
        <Link href="/craft" className="btn btn-line">
          Read about the craft
        </Link>
      </p>
    </EditorialPage>
  );
}
