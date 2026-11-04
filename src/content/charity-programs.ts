/**
 * The six programs of Madinah Global Foundation, shown one at a time in the charity section.
 *
 * Titles and tags are as they appear on madinahglobal.org (checked Nov 2026); each description
 * is a short paraphrase of the foundation's own, without amounts. Nothing here is a claim by
 * ALUWWAH: the tags (for example "Zakat-eligible") are the foundation's own.
 */

export type ProgramIcon = "quran" | "well" | "orphan" | "relief" | "dawah" | "waqf";

export type CharityProgram = {
  id: string;
  icon: ProgramIcon;
  /** The small label above the title, as the foundation gives it. */
  tag: string;
  title: string;
  text: string;
};

export const charityPrograms: CharityProgram[] = [
  {
    id: "quran-distribution",
    icon: "quran",
    tag: "Sadaqah jariyah",
    title: "Qur’an Distribution",
    text: "Mushafs printed and placed in masjids, schools and prisons, and in the hands of new Muslims.",
  },
  {
    id: "water-wells",
    icon: "well",
    tag: "Sadaqah jariyah",
    title: "Water Wells",
    text: "Tube wells and hand pumps for remote villages without clean water, as a full well or a shared contribution.",
  },
  {
    id: "orphan-care",
    icon: "orphan",
    tag: "Zakat-eligible",
    title: "Orphan Care · Bangladesh",
    text: "Food, shelter, schooling and Hifz ul Qur’an for orphans in Bangladesh, as a one-time or a recurring gift.",
  },
  {
    id: "humanitarian-relief",
    icon: "relief",
    tag: "Zakat-eligible · Urgent",
    title: "Humanitarian Relief",
    text: "Emergency food, water, medical aid and shelter for families in crisis abroad, through trusted local partners.",
  },
  {
    id: "global-dawah-support",
    icon: "dawah",
    tag: "Sadaqah",
    title: "Global Dawah Support",
    text: "Literature, media and outreach that present Islam, and support for those who are new to the faith.",
  },
  {
    id: "grave-waqf",
    icon: "waqf",
    tag: "Waqf · USA",
    title: "Grave Waqf & Sponsorship",
    text: "A grave in a U.S. Muslim cemetery for yourself or a loved one, or sponsored for someone whose family cannot afford one.",
  },
];
