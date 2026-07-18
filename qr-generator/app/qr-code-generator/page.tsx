import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/ContentPage";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Free QR Code Generator for Custom Codes",
  description:
    "Use a free QR code generator to make custom codes for links, WiFi, contacts and more. Customize colors or a logo, then export PNG, SVG or PDF.",
  path: "/qr-code-generator",
});
export default function Page() {
  return (
    <ContentPage
      eyebrow="Free online tool"
      title="QR code generator for custom, downloadable codes"
      intro="Generate QR codes without signing up. QR Studio gives you a real-time preview, flexible design controls and useful export formats while keeping entered content in your browser."
      sections={[
        {
          title: "Static QR codes made simple",
          body: "A static code stores its destination directly in the pattern. It does not require a redirect service and does not expire, but the destination cannot be changed after creation.",
        },
        {
          title: "Customize with care",
          body: "Choose colors, shapes and an optional logo. Maintain strong foreground-to-background contrast and use a higher error-correction level when a logo covers part of the pattern.",
        },
        {
          title: "Designed for print and screen",
          body: "PNG works well for documents and social posts. SVG stays crisp when resized for signs or packaging, while PDF fits many print workflows.",
        },
        {
          title: "Privacy-first generation",
          body: "Generation runs locally on your device. Your URLs, WiFi credentials and contact details are not sent to our server to create the QR code.",
        },
      ]}
    />
  );
}
