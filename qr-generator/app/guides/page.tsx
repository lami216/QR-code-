import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { GuideCard } from "@/components/seo/GuideCard";
import { ToolLinks } from "@/components/tools/ToolLinks";
import { guides } from "@/lib/seo/guides";
import { breadcrumbJsonLd, pageMetadata, safeJsonLd } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "QR Code Guides for Design, Print and Troubleshooting",
  description:
    "Practical QR code guides covering WiFi sharing, print sizing, scan problems, static and dynamic workflows, and logo design.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
          ]}
        />
        <header className="mt-10 max-w-3xl">
          <p className="font-bold text-teal-700 dark:text-teal-400">
            QR Studio resources
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Practical QR code guides
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Make better decisions before you publish. These focused guides
            explain testing, print production, privacy and design tradeoffs
            without hiding the limitations of static QR codes.
          </p>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
        <ToolLinks heading="Tools related to these guides" />
        <script type="application/ld+json">
          {safeJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
            ]),
          )}
        </script>
      </main>
    </div>
  );
}
