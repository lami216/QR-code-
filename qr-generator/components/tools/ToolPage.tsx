import Link from "next/link";
import type { ReactNode } from "react";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { guides } from "@/lib/seo/guides";
import {
  breadcrumbJsonLd,
  jsonLd,
  safeJsonLd,
  siteUrl,
} from "@/lib/seo/metadata";
import { type ToolConfig, toolPath, tools } from "@/lib/seo/tools";

export function ToolPage({
  tool,
  children,
}: {
  tool: ToolConfig;
  children: ReactNode;
}) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "QR tools", path: "/generator" },
    { name: tool.heading, path: toolPath(tool.slug) },
  ];
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <script type="application/ld+json">
        {safeJsonLd(breadcrumbJsonLd(crumbs))}
      </script>
      <script type="application/ld+json">
        {safeJsonLd(jsonLd.faq(tool.faq))}
      </script>
      <script type="application/ld+json">
        {safeJsonLd({
          ...jsonLd.webApplication,
          name: tool.heading,
          url: siteUrl(toolPath(tool.slug)),
          description: tool.description,
        })}
      </script>
      <Breadcrumbs items={crumbs} />
      <main>
        <header className="mx-auto max-w-4xl px-4 pb-3 pt-3 sm:px-6 sm:pb-4 sm:pt-6">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            {tool.heading}
          </h1>
          <p className="mt-3 text-base leading-6 text-slate-600 sm:mt-4 sm:text-lg sm:leading-8 dark:text-slate-300">
            {tool.introduction}
          </p>
        </header>
        <QRGenerator
          key={tool.slug}
          initialType={tool.initialType}
          showHeader={false}
        />
        <div className="mx-auto max-w-5xl space-y-7 px-4 py-8 sm:space-y-10 sm:px-6 sm:py-12">
          {children}
          <section aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-2xl font-black sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-5 space-y-3">
              {tool.faq.map((item) => (
                <details
                  key={item.question}
                  className="rounded-xl border border-slate-200 p-4 sm:p-5 dark:border-slate-700"
                >
                  <summary className="cursor-pointer font-bold">
                    {item.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
          <section aria-labelledby="related-heading">
            <h2 id="related-heading" className="text-2xl font-black">
              Related QR tools and guides
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {tool.related.map((slug) => (
                <li key={slug}>
                  <Link
                    className="block rounded-xl border border-slate-200 p-4 font-bold text-teal-700 hover:border-teal-500 dark:border-slate-700 dark:text-teal-300"
                    href={toolPath(slug)}
                  >
                    {tools[slug].heading}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  className="block rounded-xl border border-slate-200 p-4 font-bold text-teal-700 dark:border-slate-700 dark:text-teal-300"
                  href="/generator"
                >
                  Open the all-purpose QR generator
                </Link>
              </li>
              {guides
                .filter((guide) => guide.relatedTools.includes(tool.slug))
                .slice(0, 2)
                .map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      className="block rounded-xl border border-slate-200 p-4 font-bold text-teal-700 dark:border-slate-700 dark:text-teal-300"
                      href={`/guides/${guide.slug}`}
                    >
                      {guide.title}
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  className="block rounded-xl border border-slate-200 p-4 font-bold text-teal-700 dark:border-slate-700 dark:text-teal-300"
                  href="/guides/qr-code-not-scanning"
                >
                  Troubleshoot scanning problems
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export function Steps({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-600 dark:text-slate-300">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  );
}
export function NoteGrid({
  mistakes,
  limitations,
}: {
  mistakes: readonly string[];
  limitations: readonly string[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <section>
        <h2 className="text-2xl font-black">Common mistakes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300">
          {mistakes.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-black">Limitations and privacy</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300">
          {limitations.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
