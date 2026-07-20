import Link from "next/link";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h1 className="text-4xl font-black">Privacy Policy</h1>
        <p className="mt-3 text-sm text-slate-500">
          Effective and last updated: July 20, 2026
        </p>
        <p className="mt-6 leading-8">
          This policy separates the QR information you enter from data that
          advertising providers may process. It describes the current codebase;
          the site owner must review it against the final hosting and consent
          configuration before launch.
        </p>
        <section className="mt-10">
          <h2 className="text-2xl font-black">QR payload processing</h2>
          <p className="mt-3 leading-8">
            QR Studio creates QR images in your browser. The URL, text, WiFi
            password, email, phone, contact or event information entered in the
            generator is not sent to a QR-generation server by the application.
            Information encoded in a downloaded static code can be read by
            anyone who scans or obtains that code.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-black">Browser storage</h2>
          <p className="mt-3 leading-8">
            The generator can save QR generation history in local storage on
            your device, except WiFi payloads, which are not added to history.
            When the generator loads, it also removes any WiFi entries saved by
            older versions while leaving other history entries intact. Saved
            history remains until you clear it using the interface or browser
            controls. Do not use a shared device for sensitive payloads unless
            you clear its storage afterward.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-black">
            Advertising and third-party requests
          </h2>
          <p className="mt-3 leading-8">
            Google AdSense is the only advertising integration supported by this
            codebase. Its script loads only when the site owner configures a
            valid public client ID, and an individual ad position appears only
            when its slot ID is also configured. If enabled, Google may receive
            device, network, cookie or advertising information under its own
            policies. Advertising requests are separate from local QR payload
            generation. The site owner must obtain legal review and provide any
            consent mechanism, regional disclosures or vendor controls required
            for the deployed market.
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-black">Analytics and contact</h2>
          <p className="mt-3 leading-8">
            No dedicated analytics integration is present in this repository.
            Hosting, email and any configured advertising providers may still
            produce operational, security or aggregate records. The public
            contact method is email; sending email shares the information in
            your message with the relevant email providers. See the{" "}
            <Link
              className="text-teal-700 underline dark:text-teal-300"
              href="/contact"
            >
              contact page
            </Link>
            .
          </p>
        </section>
        <section className="mt-10">
          <h2 className="text-2xl font-black">Your choices and changes</h2>
          <p className="mt-3 leading-8">
            You can clear local storage, use browser privacy controls, or avoid
            entering sensitive data. If advertising is enabled, its controls
            depend on Google, browser settings, consent configuration and
            region. Material policy changes should receive a new effective date.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
