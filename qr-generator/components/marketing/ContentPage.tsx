import Link from "next/link";
import { BannerAd } from "@/components/ads/BannerAd";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export type Section = { title: string; body: string };
export function ContentPage({
  eyebrow,
  title,
  intro,
  sections,
  cta = true,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Section[];
  cta?: boolean;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <main>
        <header className="border-b border-slate-200 bg-slate-50 px-4 py-20 text-center dark:border-slate-800 dark:bg-slate-900/50">
          <p className="font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
            {eyebrow}
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            {intro}
          </p>
          {cta && (
            <Link
              href="/generator"
              className="mt-8 inline-flex rounded-xl bg-teal-600 px-7 py-4 font-bold text-white"
            >
              Start creating free →
            </Link>
          )}
        </header>
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-2xl border border-slate-200 p-7 dark:border-slate-800 dark:bg-slate-900"
              >
                <h2 className="text-2xl font-black">{section.title}</h2>
                <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
          <BannerAd className="mt-12" />
          {cta && (
            <div className="mt-12 rounded-3xl bg-teal-700 p-10 text-center text-white">
              <h2 className="text-3xl font-black">
                Create a scannable code today
              </h2>
              <p className="mt-3 text-teal-50">
                Build it in your browser, test it on your phone and download the
                format you need.
              </p>
              <Link
                href="/generator"
                className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-teal-800"
              >
                Open QR Studio
              </Link>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
