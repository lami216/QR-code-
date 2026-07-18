import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Read how QR Studio handles browser-based QR code generation, local data processing and privacy.",
  path: "/privacy",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
