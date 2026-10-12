import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";

export const metadata: Metadata = { title: "Privacy policy" };

export default function PrivacyPage() {
  return (
    <EditorialPage eyebrow="Care" title="Privacy policy">
      <p>
        We collect only what is needed to deliver an order: your name, address and email. Payment
        details are handled by our payment provider and never touch our servers.
      </p>
      <p>
        The full legal privacy policy (controller, retention, your rights) must be written or
        approved by the owner before launch.
      </p>
    </EditorialPage>
  );
}
