import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteHeader } from "@/components/marketing/SiteHeader";
import { adsenseClient } from "@/lib/ads/config";
import { siteConfig } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "QR Studio — Free Custom QR Code Generator",
    template: "%s | QR Studio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "technology",
  manifest: "/manifest.json",
  icons: { icon: "/qr-code.png", apple: "/qr-code.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f766e",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {adsenseClient && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          />
        )}
      </head>

      <body className="h-full bg-slate-50 font-sans text-slate-950 antialiased dark:bg-slate-950 dark:text-slate-50">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
