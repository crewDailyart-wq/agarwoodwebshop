import type { Metadata } from "next";
import { EditorialPage } from "@/components/Page";
import { NarrationBody } from "@/components/NarrationBody";
import { contactNarration } from "@/content/narrations";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ALUWWAH for any question or help: by telephone for a quick response, or by e-mail.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <EditorialPage
      eyebrow="Contact"
      title="You can contact us for any question or help to do with anything"
    >
      <section aria-labelledby="contact-phone" className="space-y-5">
        <h2 id="contact-phone" className="eyebrow eyebrow-gold !mt-0 !text-[0.72rem] !font-normal !tracking-[0.3em]">
          By telephone
        </h2>
        <p>For quick responses, you can contact us on either of the following telephone numbers:</p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {site.wholesalePhones.map((phone) => (
            <li key={phone.tel}>
              <a
                href={`tel:${phone.tel}`}
                className="frame flex min-h-14 items-center justify-center bg-night/50 px-4 font-[family-name:var(--font-display)] text-2xl tabular-nums text-gold-bright transition-colors hover:border-gold hover:text-ivory"
              >
                {phone.display}
              </a>
            </li>
          ))}
        </ul>
        <p>
          We will try and respond as quickly as possible, insha Allah. You can contact us for anything to do with
          our online webshop, or for yourself, and we will try to help you as best as we can with anything, so do
          not hesitate to contact us.
        </p>
      </section>

      {site.contactEmail && (
        <section aria-labelledby="contact-email" className="space-y-5 pt-6">
          <h2 id="contact-email" className="eyebrow eyebrow-gold !mt-0 !text-[0.72rem] !font-normal !tracking-[0.3em]">
            By e-mail
          </h2>
          <p>You can also contact us through our e-mail:</p>
          <p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-[family-name:var(--font-display)] text-2xl text-gold-bright underline decoration-gold-line underline-offset-8 hover:text-ivory"
            >
              {site.contactEmail}
            </a>
          </p>
          <p>We will try to respond the same day, insha Allah.</p>
        </section>
      )}

      <section aria-label="A narration on helping others" className="space-y-5 border-t border-gold-line pt-8">
        <p>
          We know from the following noble narration that God helps him who helps his brother, so one should
          always be eager to help others, as there lies great virtue in it with his Creator.
        </p>
        <figure className="frame relative bg-night/45 px-5 py-6 text-center sm:px-8">
          <span aria-hidden className="pointer-events-none absolute inset-1.5 border border-gold-hair" />
          <div className="relative">
            <NarrationBody narration={contactNarration} large />
          </div>
        </figure>
      </section>
    </EditorialPage>
  );
}
