import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { guideBySlug, guides } from "@/lib/seo/guides";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  pageMetadata,
  safeJsonLd,
} from "@/lib/seo/metadata";
import { toolPath, tools } from "@/lib/seo/tools";

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
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path },
          ]}
        />
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
                <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-700 dark:text-slate-300">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}
          <aside className="my-10 rounded-2xl bg-teal-50 p-6 dark:bg-teal-950/40">
            <h2 className="text-xl font-black">Use the relevant QR tools</h2>
            <p className="mt-2">
              Apply this guidance, then test the exact export in its intended
              setting.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {guide.relatedTools.map((slug) => (
                <Link
                  key={slug}
                  className="rounded-xl bg-teal-700 px-5 py-3 font-bold text-white"
                  href={toolPath(slug)}
                >
                  {tools[slug].heading}
                </Link>
              ))}
              <Link
                className="rounded-xl border border-teal-700 px-5 py-3 font-bold text-teal-800 dark:text-teal-200"
                href="/generator"
              >
                All-purpose generator
              </Link>
            </div>
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
              { name: "Guides", path: "/guides" },
              { name: guide.title, path },
            ]),
          )}
        </script>
      </main>
    </div>
  );
}
