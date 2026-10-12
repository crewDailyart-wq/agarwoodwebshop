import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <EditorialPage eyebrow="Contact" title="We're glad to help">
      {site.contactEmail ? (
        <p>
          Write to us at{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-gold underline underline-offset-4">
            {site.contactEmail}
          </a>
          .
        </p>
      ) : (
        <p>Contact details will be published here shortly.</p>
      )}
    </EditorialPage>
  );
}
