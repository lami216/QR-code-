import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/ContentPage";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "How to Create a QR Code Online Free",
  description:
    "Learn how to create a QR code online: choose content, customize the design, test scanning and download a high-quality PNG, SVG or PDF.",
  path: "/create-qr-code",
});
export default function Page() {
  return (
    <ContentPage
      eyebrow="Step-by-step guide"
      title="How to create a QR code online"
      intro="A reliable QR code takes only a few steps: pick the right content type, design for easy scanning, test on real devices and export at the correct quality."
      sections={[
        {
          title: "1. Choose the destination",
          body: "Select URL, text, WiFi, email, phone, contact or event. Check spelling and use the final destination because a static code cannot be edited later.",
        },
        {
          title: "2. Set the visual style",
          body: "Match your brand with color and pattern controls, but preserve a quiet margin and high contrast. Add a logo only when it remains readable at the final size.",
        },
        {
          title: "3. Preview and test",
          body: "Scan the preview with more than one phone when possible. For print work, test a sample at its intended dimensions, distance and lighting.",
        },
        {
          title: "4. Download the right format",
          body: "Use PNG for common digital projects, SVG when artwork needs to scale, and PDF when it best suits your print or document process.",
        },
      ]}
    />
  );
}
