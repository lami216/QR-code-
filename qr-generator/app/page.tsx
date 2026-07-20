import type { Metadata } from "next";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { faqItems } from "@/lib/seo/content";
import { jsonLd, pageMetadata, safeJsonLd } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "QR Studio — Private QR Tools for Web and Print",
  description:
    "Create, customize and test static QR codes with focused tools and practical guides for URLs, WiFi, contacts, text, logos and print.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json">
        {safeJsonLd(jsonLd.faq(faqItems))}
      </script>
      <MarketingPage />
    </>
  );
}
