import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { PhotoSlot } from "@/components/PhotoSlot";
import { QuantityOptions } from "@/components/QuantityOptions";
import { Price } from "@/components/Price";
import { getProduct, productList, products } from "@/content/catalog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return productList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.seo.title,
    description: product.seo.description,
    alternates: { canonical: `/shop/${product.slug}` },
  };
}

export default async function ProductPage(props: PageProps<"/shop/[slug]">) {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) notFound();

  const soldOut = product.stock === 0;
  const facts = product.facts.filter((f) => f.value);
  const related = product.related.map((id) => products[id]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo.description,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: (product.priceCents / 100).toFixed(2),
      availability: soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: `${site.url}/shop/${product.slug}`,
    },
  };

  return (
    <div className="velvet">
    <article className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pt-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
        {/* Photographs */}
        <div className="space-y-4">
          <PhotoSlot
            photo={product.photos[0]}
            priority
            className="aspect-[4/5] w-full"
            sizes="(min-width: 1024px) 55vw, 100vw"
          />
          {product.photos.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.photos.slice(1).map((photo) => (
                <PhotoSlot
                  key={photo.brief}
                  photo={photo}
                  className="aspect-square w-full"
                  sizes="(min-width: 1024px) 27vw, 50vw"
                />
              ))}
            </div>
          )}
        </div>

        {/* Purchase */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow mb-4">{product.subtitle}</p>
          <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
          <Price cents={product.priceCents} className="mt-6 block text-xl tabular-nums" />

          <div className="mt-8 space-y-4 text-ivory-soft">
            {product.bismillah && (
              <p className="pb-1">
                <span lang="ar" dir="rtl" className="quran block text-[1.7rem] leading-[1.8]">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </span>
                <span className="mt-1 block italic text-ivory">(Bismillah Ar-Rahman Ar-Rahiem)</span>
              </p>
            )}
            {product.description.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {product.includes && (
            <ul className="mt-8 space-y-2 border-y border-gold-line py-5">
              {product.includes.map((inc) => {
                const part = products[inc.id];
                return (
                  <li key={inc.id} className="flex justify-between gap-4 text-sm">
                    <Link href={`/shop/${part.slug}`} className="hover:text-gold">
                      {inc.quantity} × {part.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-8">
            <QuantityOptions product={product} />
          </div>

          <div className="mt-5">
            <AddToCart id={product.id} soldOut={soldOut} />
          </div>

          {facts.length > 0 && (
            <dl className="mt-10 divide-y divide-gold-line border-y border-gold-line text-sm">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 py-3">
                  <dt className="text-ivory-faint">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 divide-y divide-gold-line border-y border-gold-line">
            {product.sections.map((s) => (
              <details key={s.title} className="group py-4">
                <summary className="eyebrow !text-ivory flex min-h-11 cursor-pointer list-none items-center justify-between">
                  {s.title}
                  <span aria-hidden className="text-gold transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 space-y-3 text-sm text-ivory-soft">
                  {s.body.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <aside className="mt-32 border-t border-gold-line pt-12">
          <p className="eyebrow mb-6">Pairs with</p>
          <div className="flex flex-wrap items-center justify-between gap-6">
            {related.map((r) => (
              <div key={r.id} className="flex flex-1 flex-wrap items-center justify-between gap-6">
                <div>
                  <Link href={`/shop/${r.slug}`} className="display text-3xl hover:text-gold">
                    {r.name}
                  </Link>
                  <p className="mt-1 text-sm text-ivory-soft">{r.summary}</p>
                </div>
                <div className="flex items-center gap-6">
                  <Price cents={r.priceCents} className="tabular-nums" />
                  <Link href={`/shop/${r.slug}`} className="btn btn-line">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </aside>
      )}
    </article>
    </div>
  );
}
