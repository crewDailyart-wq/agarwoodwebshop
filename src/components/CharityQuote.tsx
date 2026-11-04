import type { Quote } from "@/content/charity";
import { withSalutation } from "./NarrationBody";

/** A small gold diamond between two rules, as used across the site. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`mx-auto flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-gold-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-10 bg-gold-line" />
    </span>
  );
}

/** One quotation: the Arabic, its English, and the source underneath. */
export function CharityQuote({ quote }: { quote: Quote }) {
  return (
    <blockquote className="text-center">
      <p lang="ar" dir="rtl" className="quran text-[1.3rem] leading-[2.05] sm:text-[1.45rem]">
        {quote.arabic}
      </p>
      <p className="mx-auto mt-3 max-w-[36rem] text-[1rem] italic leading-relaxed text-ivory">
        {withSalutation(quote.english)}
      </p>
      <footer className="eyebrow eyebrow-gold mt-3 !text-[0.56rem] !tracking-[0.24em]">{quote.ref}</footer>
    </blockquote>
  );
}

/** Several quotations shown together, one under the other, parted by an ornament. */
export function CharityQuotes({ quotes }: { quotes: Quote[] }) {
  return (
    <div>
      {quotes.map((quote, i) => (
        <div key={quote.ref}>
          {i > 0 && <Ornament className="my-6" />}
          <CharityQuote quote={quote} />
        </div>
      ))}
    </div>
  );
}
