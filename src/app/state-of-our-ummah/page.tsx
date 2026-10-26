import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";

export const metadata: Metadata = {
  title: "State of Our Ummah",
};

// TODO(owner): content for this page still to be supplied.
export default function StateOfOurUmmahPage() {
  return (
    <EditorialPage eyebrow="Aluwwah" title="State of Our Ummah">
      <p>This page is being prepared and will be published soon, in shaa Allah.</p>
    </EditorialPage>
  );
}
