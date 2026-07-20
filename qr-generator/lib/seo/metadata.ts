import type { Metadata } from "next";
import type { Guide } from "./guides";

const productionOrigin = "https://studioqr.online";

export const siteConfig = {
  name: "QR Studio",
  description:
    "A free, privacy-friendly custom QR code generator for URLs, WiFi, text, contacts and more.",
  url: normalizeSiteOrigin(process.env.NEXT_PUBLIC_SITE_URL),
};

function normalizeSiteOrigin(value?: string): string {
  if (!value) return productionOrigin;

  try {
    const origin = new URL(value).origin;
    return origin === "null" ? productionOrigin : origin;
  } catch {
    return productionOrigin;
  }
}

export function siteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = siteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [
        {
          url: "/qr-code.png",
          width: 512,
          height: 512,
          alt: "QR Studio QR code generator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/qr-code.png"],
    },
  };
}

export const jsonLd = {
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    description: siteConfig.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList:
      "Generate QR codes for URLs, text, WiFi, email, phone, contacts and events; customize colors and logos; export PNG, SVG and PDF",
  },
  faq: (items: readonly { question: string; answer: string }[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }),
};

export function safeJsonLd(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

export function articleJsonLd(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updated,
    dateModified: guide.updated,
    author: { "@type": "Organization", name: "QR Studio maintainers" },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: siteUrl(`/guides/${guide.slug}`),
  };
}
