import type { MetadataRoute } from "next";
import { productHref, productList } from "@/content/catalog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/camphor", "/collection", "/craft", "/state-of-our-ummah", "/charity", "/ritual", "/our-story", "/contact", "/shipping-returns", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...productList.filter((p) => !p.href).map((p) => ({ url: `${site.url}${productHref(p)}` })),
  ];
}
