import Link from "next/link";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Price } from "@/components/Price";
import { products } from "@/content/catalog";
import { site } from "@/content/site";

const steps = [
  {
    n: "I",
    title: "Prepare",
    text: "Prepare the incense burner using a suitable heating method.",
  },
  {
    n: "II",
    title: "Release",
    text: "Gently warm a small piece of agarwood and release its aromatic compounds.",
  },
  {
    n: "III",
    title: "Experience",
    text: "Follow the fragrance as it changes.",
  },
];

export default function Home() {
  const chips = products["agarwood-chips"];
  const burner = products["incense-burner"];
  const ritual = products["the-complete-ritual"];

  return (
    <>
      {/* A — Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <PhotoSlot
          photo={{
            src: null,
            alt: "Agarwood chips in a handcrafted vessel with a thread of smoke",
            brief:
              "Hero: agarwood chips in a handcrafted vessel, dramatic low light, delicate smoke, deep plum shadows. Portrait crop for mobile.",
            width: 2400,
            height: 1400,
          }}
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-aubergine via-aubergine/40 to-transparent" />
        <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-40 sm:px-8 sm:pb-28">
          <p className="eyebrow mb-6">{site.name}</p>
          <h1 className="display max-w-4xl text-5xl sm:text-7xl lg:text-8xl">{site.tagline}</h1>
          <p className="display mt-5 text-2xl text-ivory-soft sm:text-3xl">
            Discover the Art of Agarwood
          </p>
          <p className="mt-6 max-w-md text-ivory-soft">
            Genuine agarwood chips for burning as incense, and a burner made to warm them slowly.
          </p>
          <Link href="/shop/agarwood-chips" className="btn btn-solid mt-10">
            Discover Our Agarwood
          </Link>
        </div>
      </section>

      {/* B — The Two Essentials */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="mb-16 max-w-xl">
          <p className="eyebrow mb-4">The Two Essentials</p>
          <h2 className="display text-4xl sm:text-5xl">Two things. Chosen with care.</h2>
        </div>
        <div className="grid gap-16 md:grid-cols-2 md:gap-10">
          {[chips, burner].map((p, i) => (
            <article key={p.id} className={i === 1 ? "md:mt-24" : ""}>
              <Link href={`/shop/${p.slug}`} className="group block">
                <PhotoSlot
                  photo={p.photos[0]}
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </Link>
              <div className="mt-6 flex items-start justify-between gap-6">
                <div>
                  <h3 className="display text-3xl">{p.name}</h3>
                  <p className="mt-2 max-w-sm text-sm text-ivory-soft">{p.summary}</p>
                </div>
                <Price cents={p.priceCents} className="shrink-0 tabular-nums" />
              </div>
              <Link href={`/shop/${p.slug}`} className="btn btn-line mt-6">
                View
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* C — The Ritual */}
      <section className="relative bg-gradient-to-b from-plum/70 via-[#42265a]/55 to-plum/40 shadow-[inset_0_1px_0_rgb(199_155_255/0.35),inset_0_-1px_0_rgb(199_155_255/0.25)]">
        <div className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
          <p className="eyebrow mb-4">The Ritual</p>
          <h2 className="display max-w-2xl text-4xl sm:text-5xl">
            Agarwood is warmed, never lit.
          </h2>
          <ol className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <li key={s.n} className="border-t border-gold-line pt-6">
                <span className="display text-3xl text-gold">{s.n}</span>
                <h3 className="display mt-4 text-3xl">{s.title}</h3>
                <p className="mt-3 max-w-xs text-ivory-soft">{s.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/ritual" className="btn btn-line mt-16">
            Explore the Ritual
          </Link>
        </div>
      </section>

      {/* D — The World of Agarwood */}
      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4">The World of Agarwood</p>
            <h2 className="display text-4xl sm:text-5xl">A fragrance with a geography.</h2>
            <p className="mt-6 max-w-md text-ivory-soft">
              Agarwood grows naturally across South and Southeast Asia, from the foothills of India
              to the forests of New Guinea. Explore where the trees grow and how the fragrance came
              to matter.
            </p>
            <Link href="/origins" className="btn btn-line mt-10">
              Explore the origins
            </Link>
          </div>
          <div
            aria-hidden
            className="relative aspect-[5/4] overflow-hidden border border-violet-line shadow-[0_0_60px_-12px_rgb(140_80_230/0.6)]"
            style={{
              backgroundImage:
                "linear-gradient(rgb(185 154 105 / 0.12) 1px, transparent 1px), linear-gradient(90deg, rgb(185 154 105 / 0.12) 1px, transparent 1px)",
              backgroundSize: "12.5% 14.28%",
            }}
          >
            <p className="eyebrow absolute bottom-4 left-4">Atlas · interactive map to follow</p>
          </div>
        </div>
      </section>

      {/* E — The Complete Ritual */}
      <section className="relative isolate overflow-hidden">
        <PhotoSlot photo={ritual.photos[0]} sizes="100vw" className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-aubergine/70" />
        <div className="mx-auto max-w-7xl px-5 py-32 sm:px-8 sm:py-44">
          <p className="eyebrow mb-4">The Complete Ritual</p>
          <h2 className="display max-w-3xl text-4xl sm:text-6xl">
            Two Essentials. One Extraordinary Ritual.
          </h2>
          <p className="mt-6 max-w-md text-ivory-soft">{ritual.summary}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/shop/the-complete-ritual" className="btn btn-solid">
              Discover the Complete Ritual
            </Link>
            <Price cents={ritual.priceCents} className="tabular-nums" />
          </div>
        </div>
      </section>
    </>
  );
}
