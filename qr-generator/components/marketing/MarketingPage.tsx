import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { BannerAd } from "@/components/ads/BannerAd";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { GuideCard } from "@/components/seo/GuideCard";
import { ToolLinks } from "@/components/tools/ToolLinks";
import { displayAdSlots, hasSidebarAd } from "@/lib/ads/config";
import { faqItems, qrTypes } from "@/lib/seo/content";
import { guides } from "@/lib/seo/guides";

const benefits = [
  [
    "Private by design",
    "Your QR content is processed locally in your browser—no content upload is required.",
  ],
  [
    "Made for every screen",
    "Create and download from a phone, tablet or desktop with a responsive workflow.",
  ],
  [
    "Brand-ready controls",
    "Choose colors, module shapes, error correction, templates and an optional logo.",
  ],
  [
    "Useful exports",
    "Download PNG for everyday use, SVG for scalable artwork or PDF for print workflows.",
  ],
];

export function MarketingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      <main>
        <section className="relative overflow-hidden px-4 py-10 text-center sm:px-6 sm:py-28">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#ccfbf1,transparent_55%)] dark:bg-[radial-gradient(circle_at_top,#134e4a,transparent_50%)]" />
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 inline-flex rounded-full border border-teal-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-teal-800 sm:mb-5 sm:px-4 sm:py-2 sm:text-sm dark:border-teal-800 dark:bg-slate-900 dark:text-teal-300">
              Free • No signup • Browser-based
            </p>
            <h1 className="text-balance text-3xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              QR tools for creating codes that work in the real world
            </h1>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-6 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8 dark:text-slate-300">
              Use the all-purpose generator or a focused tool for links, WiFi,
              contacts, text and logos. Customize the result, export it and use
              practical guidance to test it before publishing.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
              <Link
                href="/generator"
                className="rounded-xl bg-teal-600 px-6 py-3 font-bold text-white shadow-xl shadow-teal-600/20 hover:bg-teal-700 sm:px-7 sm:py-4"
              >
                Generate a QR code free →
              </Link>
              <Link
                href="#how-it-works"
                className="rounded-xl border border-slate-300 bg-white px-7 py-4 font-bold text-slate-800 hover:border-teal-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              >
                See how it works
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-slate-600 sm:mt-8 sm:gap-x-6 sm:gap-y-2 sm:text-sm dark:text-slate-400">
              <span>✓ No watermark</span>
              <span>✓ No content upload</span>
              <span>✓ PNG, SVG & PDF</span>
            </div>
          </div>
        </section>
        <ToolLinks heading="Popular QR tools" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <BannerAd />
        </div>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
              Built for useful results
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              A custom QR code maker without the friction
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([title, text]) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-teal-100 font-bold text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  ✓
                </div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="how-it-works"
          className="bg-slate-50 py-12 sm:py-20 dark:bg-slate-900/50"
        >
          <div
            className={`mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 ${hasSidebarAd ? "lg:grid-cols-[1fr_300px]" : ""}`}
          >
            <div>
              <h2 className="text-3xl font-black sm:text-4xl">
                How to create a QR code
              </h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {[
                  [
                    "1",
                    "Choose content",
                    "Select a URL, text, WiFi, email, phone, contact or event.",
                  ],
                  [
                    "2",
                    "Customize",
                    "Adjust color, pattern, size and error correction; add a logo if needed.",
                  ],
                  [
                    "3",
                    "Test & download",
                    "Scan the preview, then export PNG, SVG or PDF for your project.",
                  ],
                ].map(([n, t, d]) => (
                  <article key={n}>
                    <span className="text-4xl font-black text-teal-600">
                      {n}
                    </span>
                    <h3 className="mt-2 font-bold">{t}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {d}
                    </p>
                  </article>
                ))}
              </div>
              <Link
                href="/generator"
                className="mt-9 inline-flex rounded-xl bg-slate-950 px-6 py-3 font-bold text-white dark:bg-teal-600"
              >
                Open the generator
              </Link>
            </div>
            <SidebarAd className="hidden lg:flex" />
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-black">Supported QR code types</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                One free online QR generator covers the everyday formats used by
                individuals, teams and small businesses.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {qrTypes.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black">What is a QR code?</h2>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                A QR (Quick Response) code is a two-dimensional barcode that
                stores information in a pattern readable by phone cameras and
                scanners. It can open a website, share contact details, connect
                to WiFi or prepare an email without manual typing.
              </p>
              <h3 className="mt-6 text-xl font-bold">
                Where QR codes are used
              </h3>
              <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                Common placements include menus, packaging, posters, business
                cards, event displays, classroom materials and product
                instructions. Keep adequate contrast and whitespace, and test
                the final printed size.
              </p>
            </div>
          </div>
        </section>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <AdSlot slot={displayAdSlots.content} format="rectangle" />
        </div>
        <section className="bg-slate-50 py-12 sm:py-20 dark:bg-slate-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black sm:text-4xl">
                Guides for reliable QR codes
              </h2>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                Learn how to choose a print size, diagnose scan failures and
                understand what a static QR code can—and cannot—do.
              </p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {guides.slice(0, 3).map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
            <Link
              className="mt-7 inline-flex font-bold text-teal-700 underline dark:text-teal-300"
              href="/guides"
            >
              Browse all QR code guides
            </Link>
          </div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-black sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Practical answers before you generate, publish and print.
            </p>
          </div>
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 px-6 dark:divide-slate-800 dark:border-slate-800">
            {faqItems.slice(0, 3).map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-bold">
                  {item.question}
                  <span className="float-right text-teal-600 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-8 leading-7 text-slate-600 dark:text-slate-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
          <AdSlot slot={displayAdSlots.faq} className="my-8" />{" "}
          <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 px-6 dark:divide-slate-800 dark:border-slate-800">
            {faqItems.slice(3).map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer list-none font-bold">
                  {item.question}
                  <span className="float-right text-teal-600 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-8 leading-7 text-slate-600 dark:text-slate-400">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="rounded-3xl bg-gradient-to-r from-teal-700 to-cyan-700 px-6 py-14 text-center text-white sm:px-12">
            <p className="text-sm font-bold uppercase tracking-widest text-teal-100">
              Ready when you are
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Turn your content into a QR code
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-teal-50">
              Create, customize, test and download in minutes. No account is
              required.
            </p>
            <Link
              href="/generator"
              className="mt-7 inline-flex rounded-xl bg-white px-7 py-4 font-bold text-teal-800"
            >
              Create my QR code
            </Link>
          </div>
          <BannerAd className="mt-10" />
        </section>
      </main>
    </div>
  );
}
