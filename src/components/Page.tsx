import type { ReactNode } from "react";

/** Shared shell for the quiet editorial pages (story, ritual, policies…). */
export function EditorialPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-12 pt-14 sm:px-8 sm:pt-20">
      <p className="eyebrow eyebrow-gold mb-4">{eyebrow}</p>
      <h1 className="display text-5xl sm:text-6xl">{title}</h1>
      <div className="mt-12 space-y-6 text-ivory-soft [&_h2]:display [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:text-ivory">
        {children}
      </div>
    </div>
  );
}
