import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/qr-code-generator",
    "/create-qr-code",
    "/qr-code-maker",
    "/generator",
    "/about",
    "/blog",
    "/privacy",
    "/terms",
    "/contact",
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("generator") ? 0.9 : 0.7,
  }));
}
