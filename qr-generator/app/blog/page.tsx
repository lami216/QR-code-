import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { ToolLinks } from "@/components/tools/ToolLinks";
import { guides } from "@/lib/seo/guides";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Practical QR Code Guides",
  description:
    "Original, practical guides for troubleshooting, sizing, designing, printing and testing QR codes.",
  path: "/blog",
});
export default function Page() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="font-bold text-teal-700 dark:text-teal-400">
            QR Studio guides
          </p>
          <h1 className="mt-3 text-4xl font-black sm:text-6xl">
            Practical QR code guides
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Solve scanning and print problems with focused guidance, real checks
            and clear limitations.
          </p>
        </header>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {guides.map((guide) => (
            <article
              key={guide.slug}
              className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
            >
              <h2 className="text-2xl font-black">
                <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              </h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                {guide.description}
              </p>
              <Link
                className="mt-5 inline-flex font-bold text-teal-700 dark:text-teal-300"
                href={`/guides/${guide.slug}`}
              >
                Read the guide →
              </Link>
            </article>
          ))}
        </div>
        <ToolLinks heading="Create the QR code you need" />
      </main>
      <SiteFooter />
    </div>
  );
}
