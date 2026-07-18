import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/ContentPage";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "QR Code Maker with Logo and Custom Styles",
  description:
    "Make a custom QR code with logo, colors and pattern styles. Preview instantly and download high-quality PNG, SVG or PDF files.",
  path: "/qr-code-maker",
});
export default function Page() {
  return (
    <ContentPage
      eyebrow="Custom design tool"
      title="A QR code maker built for your brand"
      intro="Turn useful content into a clear, recognizable QR code. Customize visual details without giving up the scan-friendly structure that makes the code work."
      sections={[
        {
          title: "Add a logo",
          body: "Upload a brand mark from your device and pair it with high error correction. The image is handled locally. Always scan-test the completed design.",
        },
        {
          title: "Choose brand colors",
          body: "Apply a solid color or gradient while keeping enough contrast against the background. Dark patterns on a light background are the safest starting point.",
        },
        {
          title: "Select pattern styles",
          body: "Try square, rounded or dot modules and alternative eye styles. Preview choices at the real placement size before committing to a campaign.",
        },
        {
          title: "Static vs. dynamic QR codes",
          body: "QR Studio creates static codes. Dynamic QR codes use a managed redirect so their destination can change and scans may be measured; they require an ongoing service.",
        },
      ]}
    />
  );
}
