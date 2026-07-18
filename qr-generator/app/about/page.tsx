import type { Metadata } from "next";
import { ContentPage } from "@/components/marketing/ContentPage";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "About QR Studio — Private QR Code Creation",
  description:
    "Learn about QR Studio, a privacy-friendly browser-based QR code maker focused on simple customization and dependable downloads.",
  path: "/about",
});
export default function Page() {
  return (
    <ContentPage
      eyebrow="About QR Studio"
      title="Useful QR code creation, without unnecessary friction"
      intro="QR Studio is built around a simple idea: people should be able to create a polished static QR code quickly, understand how it works and keep sensitive content on their device."
      sections={[
        {
          title: "Our approach",
          body: "We prioritize clear controls, accessible layouts, honest explanations and practical export options instead of requiring an account for basic QR creation.",
        },
        {
          title: "Privacy by design",
          body: "QR code content is processed by browser-side generator logic. No upload is needed to turn entered data into a downloadable code.",
        },
        {
          title: "Responsible use",
          body: "Creators are responsible for the destinations they encode. We encourage testing every code and using QR codes only for lawful, transparent purposes.",
        },
        {
          title: "Built for improvement",
          body: "QR Studio continues to improve its usability, performance and educational resources while preserving the core free generator experience.",
        },
      ]}
      cta={false}
    />
  );
}
