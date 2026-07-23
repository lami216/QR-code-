import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-bold text-teal-700 dark:text-teal-300">
          Contact QR Studio
        </p>
        <h1 className="mt-3 text-4xl font-black">Questions and feedback</h1>
        <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
          QR Studio is a browser-based static QR code generator. Use the email
          below to report a problem, suggest an improvement, or ask about the
          site. Do not send passwords, private QR payloads, or other sensitive
          information.
        </p>
        <a
          className="mt-8 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-bold text-white"
          href="mailto:ahad06074@gmail.com"
        >
          Email the site maintainer
        </a>
        <section className="mt-12 rounded-2xl border border-slate-200 p-6 dark:border-slate-700">
          <h2 className="text-2xl font-black">Before contacting us</h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            QR payload creation happens in your browser. A contact email passes
            through your email provider and the recipient's provider; it is
            separate from QR generation. For data-handling details, read the{" "}
            <Link
              className="font-bold text-teal-700 underline dark:text-teal-300"
              href="/privacy"
            >
              privacy policy
            </Link>
            .
          </p>
        </section>
      </main>
    </div>
  );
}
