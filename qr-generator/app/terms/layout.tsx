import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Review the terms that apply when using the QR Studio QR code generator.",
  path: "/terms",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
