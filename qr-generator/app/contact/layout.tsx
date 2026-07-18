import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
export const metadata: Metadata = pageMetadata({
  title: "Contact QR Studio",
  description:
    "Contact the QR Studio team with feedback or questions about the QR code generator.",
  path: "/contact",
});
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
