import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo/metadata";
import { specializedTools, toolPath } from "@/lib/seo/tools";
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
    ...specializedTools.map((tool) => toolPath(tool.slug)),
  ];
  return routes.map((route) => ({
    url: siteUrl(route || "/"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("generator") ? 0.9 : 0.7,
  }));
}
