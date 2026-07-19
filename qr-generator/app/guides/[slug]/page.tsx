import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { guideBySlug, guides } from "@/lib/seo/guides";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
  safeJsonLd,
} from "@/lib/seo/metadata";

export function generateStaticParams() {
  return guides.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const guide = guideBySlug((await params).slug);
  if (!guide) return {};
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
  });
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-slate-600 dark:text-slate-400"
        >
          <Link href="/">Home</Link> / <Link href="/blog">Guides</Link> /{" "}
          <span aria-current="page">{guide.title}</span>
        </nav>
        <article>
          <header className="py-10">
            <p className="font-bold text-teal-700 dark:text-teal-400">
              QR Studio guide
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
              {guide.intro}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Reviewed and updated by the QR Studio maintainers on{" "}
              <time dateTime={guide.updated}>{guide.updated}</time>.
            </p>
          </header>
          {guide.sections.map((section) => (
            <section
              key={section.heading}
              className="border-t border-slate-200 py-8 dark:border-slate-800"
            >
              <h2 className="text-2xl font-black">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-8 text-slate-700 dark:text-slate-300"
                >
                  {paragraph}
                </p>
              ))}
              {section.steps && (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <aside className="my-10 rounded-2xl bg-teal-50 p-6 dark:bg-teal-950/40">
            <h2 className="text-xl font-black">
              Put the guidance into practice
            </h2>
            <p className="mt-2">
              Create the final code, export it and test it in its intended
              setting.
            </p>
            <Link
              className="mt-4 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-bold text-white"
              href="/generator"
            >
              Open the free QR generator
            </Link>
          </aside>
          <section>
            <h2 className="text-2xl font-black">Related guides</h2>
            <ul className="mt-4 space-y-3">
              {guide.related.map((slug) => {
                const item = guideBySlug(slug);
                return (
                  item && (
                    <li key={slug}>
                      <Link
                        className="font-semibold text-teal-700 underline dark:text-teal-300"
                        href={`/guides/${slug}`}
                      >
                        {item.title}
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </section>
        </article>
        <script type="application/ld+json">
          {safeJsonLd(articleJsonLd(guide))}
        </script>
        <script type="application/ld+json">
          {safeJsonLd(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/blog" },
              { name: guide.title, path },
            ]),
          )}
        </script>
      </main>
      <SiteFooter />
    </div>
  );
}
