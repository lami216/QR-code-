import type { Metadata } from "next";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

export const siteConfig = {
  name: "QR Studio",
  description:
    "Create free custom QR codes for URLs, WiFi, text, contacts and more. Customize the design and download PNG, SVG or PDF without signing up.",
  url: configuredSiteUrl || "https://drqr.vercel.app",
};

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path === "/" ? "" : path}`;
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
  const url = absoluteUrl(path);

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
        "max-video-preview": -1,
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
          alt: "QR Studio custom QR code generator",
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

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const jsonLd = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/qr-code.png"),
  },
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@id": `${siteConfig.url}/#organization` },
    inLanguage: "en",
  },
  webApplication: {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${siteConfig.url}/#webapp`,
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript and a modern web browser",
    description: siteConfig.description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Generate QR codes for URLs, text, WiFi, email, phone, contacts and events",
      "Customize colors, patterns and logos",
      "Download PNG, SVG and PDF files",
      "Generate QR codes in the browser without an account",
    ],
    publisher: { "@id": `${siteConfig.url}/#organization` },
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
