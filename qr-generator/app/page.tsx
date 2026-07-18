import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { faqItems } from "@/lib/seo/content";
import { jsonLd, pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Free QR Code Generator — Create Custom QR Codes",
  description:
    "Create a free custom QR code online for URLs, WiFi, text, email and contacts. Style it, add a logo and download PNG, SVG or PDF—no signup required.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd.webApplication)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(jsonLd.faq(faqItems))}
      </script>
      <MarketingPage />
    </>
  );
}
