import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Create and Download a Custom QR Code",
  description:
    "Generate and customize a QR code for URLs, text, WiFi, contacts, email, phone or events. Download PNG, SVG or PDF free.",
  path: "/generator",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
