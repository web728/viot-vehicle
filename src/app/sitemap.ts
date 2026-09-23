import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { solutions } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://viot.in";
  const paths = ["", "/about", "/products", ...products.map(({ slug }) => `/products/${slug}`), "/solutions", ...solutions.map(({ slug }) => `/solutions/${slug}`), "/platform", "/contact", "/privacy"];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path ? "monthly" : "weekly", priority: path === "/privacy" ? 0.4 : path ? 0.8 : 1 }));
}
