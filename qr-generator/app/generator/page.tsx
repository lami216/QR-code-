import Link from "next/link";
import { QRGenerator } from "@/components/qr/QRGenerator";
import { FAQSection } from "@/components/seo/FAQSection";
import { ToolLinks } from "@/components/tools/ToolLinks";
import { faqItems, qrTypes } from "@/lib/seo/content";
import { breadcrumbJsonLd, jsonLd, safeJsonLd } from "@/lib/seo/metadata";

const uses = [
  [
    "Print and packaging",
    "Connect product labels, flyers and signs to durable web destinations. Proof the final material before a production run.",
  ],
  [
    "Guest WiFi",
    "Share guest network details without asking visitors to type them. Replace the code whenever credentials change.",
  ],
  [
    "Contacts and events",
    "Package contact-card or calendar details for compatible scanner apps, then verify how common devices interpret them.",
  ],
  [
    "Instructions and reference",
    "Encode short plain text for labels, equipment notes or classroom material that can be read without opening a website.",
  ],
];

export default function GeneratorPage() {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <header className="mx-auto max-w-5xl px-4 pb-2 pt-10 text-center sm:px-6">
        <p className="font-bold text-teal-700 dark:text-teal-400">
          No signup · Browser-based generation
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-6xl">
          Free QR code generator for custom, static codes
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Choose your content, adjust the design and download a QR code for
          screen or print. Your entered content is processed in this browser
          rather than sent to a QR generation API.
        </p>
      </header>
      <QRGenerator initialType="url" showHeader={false} />
      <main className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6">
        <section className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black">
              What is a QR code generator?
            </h2>
            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              A QR generator converts a URL, message or structured payload into
              a two-dimensional barcode. A camera app reads the pattern and
              offers the appropriate action, such as opening a page, joining
              WiFi or saving a contact. QR Studio creates static codes: the
              value is stored directly in the pattern.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-black">Supported QR code types</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {qrTypes.map((type) => (
                <li
                  className="rounded-full bg-teal-50 px-4 py-2 font-semibold text-teal-800 dark:bg-teal-950 dark:text-teal-200"
                  key={type}
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-black">
            How to create a QR code online
          </h2>
          <ol className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              [
                "1",
                "Choose and enter content",
                "Select the matching type and enter the final value. Shorter payloads generally produce less dense patterns.",
              ],
              [
                "2",
                "Customize carefully",
                "Choose colors, shapes, size and error correction. Add a modest logo only when it supports the design.",
              ],
              [
                "3",
                "Scan, export and test",
                "Scan the preview, download the needed format, then test the actual placed or printed asset.",
              ],
            ].map(([number, title, body]) => (
              <li
                className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
                key={number}
              >
                <span className="text-3xl font-black text-teal-600">
                  {number}
                </span>
                <h3 className="mt-2 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-black">Customization options</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Adjust foreground and background colors, module and eye styles,
              margin, size and error correction. Strong contrast and an
              unobstructed border matter more than decoration.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Download formats</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Use PNG at its exported resolution for common digital needs, SVG
              for scalable vector artwork, or PDF for convenient document
              placement. Avoid screenshots.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-black">Static means not editable</h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              The code directly contains its payload. It does not expire through
              QR Studio, but its destination cannot be changed after export.
              Generate a replacement when the content changes.
            </p>
            <Link
              className="mt-3 inline-flex font-bold text-teal-700 underline dark:text-teal-300"
              href="/guides/static-vs-dynamic-qr-code"
            >
              Compare static and dynamic QR codes
            </Link>
          </div>
        </section>
        <section className="rounded-3xl bg-slate-50 p-8 dark:bg-slate-900">
          <h2 className="text-3xl font-black">
            Privacy: what stays in your browser
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
            QR creation is performed locally without sending the payload to a QR
            generation service. Non-WiFi creations may appear in local browser
            history for convenience; WiFi payloads are excluded. The exported
            pattern itself contains your information, so do not encode secrets
            and share the finished file only with its intended audience.
          </p>
          <Link
            className="mt-4 inline-flex font-bold text-teal-700 underline dark:text-teal-300"
            href="/privacy"
          >
            Read the privacy policy
          </Link>
        </section>
        <section>
          <h2 className="text-3xl font-black">Common ways to use a QR code</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {uses.map(([title, body]) => (
              <article
                className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800"
                key={title}
              >
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>
        <FAQSection items={faqItems} />
        <ToolLinks heading="Choose a specialized QR tool" />
        <section>
          <h2 className="text-3xl font-black">Plan for a reliable scan</h2>
          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              className="rounded-xl border border-slate-300 px-5 py-3 font-bold"
              href="/guides/qr-code-not-scanning"
            >
              Troubleshoot a QR code
            </Link>
            <Link
              className="rounded-xl border border-slate-300 px-5 py-3 font-bold"
              href="/guides/qr-code-size-for-print"
            >
              Choose a print size
            </Link>
            <Link
              className="rounded-xl border border-slate-300 px-5 py-3 font-bold"
              href="/guides/qr-code-with-logo-best-practices"
            >
              Use a logo safely
            </Link>
          </div>
        </section>
      </main>
      <script type="application/ld+json">
        {safeJsonLd(jsonLd.webApplication)}
      </script>
      <script type="application/ld+json">
        {safeJsonLd(jsonLd.faq(faqItems))}
      </script>
      <script type="application/ld+json">
        {safeJsonLd(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "QR generator", path: "/generator" },
          ]),
        )}
      </script>
    </div>
  );
}
