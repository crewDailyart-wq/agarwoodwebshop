import type { MetadataRoute } from "next";
import { productList } from "@/content/catalog";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/origins", "/ritual", "/our-story", "/contact", "/shipping-returns", "/privacy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...productList.map((p) => ({ url: `${site.url}/shop/${p.slug}` })),
  ];
}
