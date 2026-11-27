import type { Metadata } from "next";
import Link from "next/link";
import { EditorialPage } from "@/components/Page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What personal data ALUWWAH collects, why, and your rights.",
};

export default function PrivacyPage() {
  const l = site.legal;
  return (
    <EditorialPage eyebrow="Information" title="Privacy policy">
      <p className="pb-1">
        <span lang="ar" dir="rtl" className="quran block text-left text-[1.7rem] leading-[1.8]">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
        <span className="mt-1 block italic text-ivory">(Bismillah Ar-Rahman Ar-Rahiem)</span>
      </p>
      <p>
        On this page will be mentioned what is legally required in the country from which we
        currently operate, all success comes from our One Creator Allah.
      </p>

      <h2>Who is responsible</h2>
      <p>
        {l.legalName ?? site.name}, trading as {site.name}
        {l.address ? `, ${l.address}` : ""}
        {l.kvk ? `, KvK ${l.kvk}` : ""}, is responsible for your personal data. Questions about
        privacy can be sent to{" "}
        {site.contactEmail && <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>}.
      </p>

      <h2>What we collect and why</h2>
      <p>
        <strong>When you order:</strong> your name, address, e-mail address and what you ordered.
        We need this to deliver your order, confirm it and keep the records the law requires.
      </p>
      <p>
        <strong>If you create an account:</strong> your name, e-mail address and a password. The
        password is stored only in scrambled (hashed) form, so we cannot read it. An account lets
        you see your orders and manage your details.
      </p>
      <p>
        <strong>When you write to us:</strong> the e-mail or message you send and our reply, so
        that we can help you.
      </p>
      <p>
        We use your data to carry out your order (the agreement between us), to meet legal duties
        such as bookkeeping, and, for your account and our replies, to serve you as you asked.
      </p>

      <h2>Who receives it</h2>
      <p>We share data only with those who help us serve you, and only as far as needed:</p>
      <ul className="list-disc space-y-1 pl-6">
        <li>Mollie, which processes online payments. Your card or bank details go to Mollie, not to us.</li>
        <li>Resend, which sends our e-mails (order confirmations, account e-mails).</li>
        <li>Vercel, which hosts this website, and Neon, which hosts our database.</li>
        <li>The postal or courier service that delivers your parcel, which receives your name and address.</li>
        <li>Our accountant, and authorities where the law requires it.</li>
      </ul>
      <p>
        Some of these providers may process data outside the European Economic Area. Where they do,
        this is covered by appropriate safeguards, such as the European Commission&apos;s standard
        contractual clauses.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Order data is kept for 7 years, as Dutch tax law requires. Your account is kept until you
        delete it; you can do this yourself in your account. E-mails with us are kept as long as
        needed to help you.
      </p>

      <h2>Cookies and storage</h2>
      <p>
        We use only what the shop needs to work: a sign-in cookie if you have an account, and your
        browser&apos;s own storage to remember your cart. We do not use advertising or tracking
        cookies, so no cookie banner is needed. When you watch the video in our footer, YouTube
        (Google) may place its own cookies once you press play.
      </p>

      <h2>Your rights</h2>
      <p>
        You may ask us to show you your data, correct it, delete it, limit its use, or give it to
        you in a usable form, and you may object to its use. Write to us at the address above and
        we will answer within one month. If you are not satisfied, you may complain to the Dutch
        Data Protection Authority (Autoriteit Persoonsgegevens) at autoriteitpersoonsgegevens.nl.
      </p>

      <h2>Security</h2>
      <p>
        We protect your data with an encrypted connection (HTTPS), hashed passwords and limited
        access. No system is perfect; if a breach affects you, we will inform you and the authority
        as the law requires.
      </p>

      <p>
        See also our <Link href="/terms">terms and conditions</Link>.
      </p>
    </EditorialPage>
  );
}
