import type { MetadataRoute } from "next";
import { guides } from "@/lib/seo/guides";
import { siteUrl } from "@/lib/seo/metadata";
import { specializedTools, toolPath } from "@/lib/seo/tools";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/generator",
    "/about",
    "/guides",
    "/privacy",
    "/terms",
    "/contact",
    ...guides.map((guide) => `/guides/${guide.slug}`),
    ...specializedTools.map((tool) => toolPath(tool.slug)),
  ];
  return routes.map((route) => ({
    url: siteUrl(route || "/"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.includes("generator") ? 0.9 : 0.7,
  }));
}
