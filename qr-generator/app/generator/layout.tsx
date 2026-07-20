import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Free QR Code Generator — Create a QR Code Online",
  description:
    "Create a free static QR code for a URL, text, WiFi, contact, email, phone or event. Customize it and download PNG, SVG or PDF without signup.",
  path: "/generator",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
