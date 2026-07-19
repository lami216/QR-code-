import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/generator",
    "/about",
    "/blog",
    "/privacy",
    "/terms",
    "/contact",
    "/guides/qr-code-not-scanning",
    "/guides/best-qr-code-size-for-print",
    "/guides/qr-code-quiet-zone",
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date("2026-07-19"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("generator") ? 0.9 : 0.7,
  }));
}
