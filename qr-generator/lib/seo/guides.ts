import type { ToolSlug } from "./tools";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; steps?: string[] }[];
  related: string[];
  relatedTools: ToolSlug[];
};

export const guides: Guide[] = [
  {
    slug: "how-to-create-wifi-qr-code",
    title: "How to Create a WiFi QR Code Safely",
    description:
      "Create and test a WiFi QR code while handling network names, security settings and passwords carefully.",
    updated: "2026-07-20",
    intro:
      "A WiFi QR code can save guests from typing a long password, but it also contains the credentials needed to join that network. Use a guest network where practical and treat the finished code like a printed password.",
    sections: [
      {
        heading: "Collect the exact network details",
        paragraphs: [
          "Copy the SSID exactly as devices display it, including capitalization and spaces. Confirm whether the network uses WPA/WPA2-style security, legacy WEP or no password. A mismatch can produce a valid code that still cannot connect.",
        ],
        steps: [
          "Open the WiFi QR tool.",
          "Enter the exact SSID and select the matching security type.",
          "Enter the current password only when the network requires one.",
          "Generate the code and scan it with at least two devices.",
        ],
      },
      {
        heading: "Choose what network to share",
        paragraphs: [
          "A separate guest network limits what visitors can reach and makes credential rotation easier. Do not place a private-network code where unintended people can photograph it. QR Studio excludes WiFi payloads from its local history, but anyone who obtains the finished code may read its contents.",
        ],
      },
      {
        heading: "Make a sign that scans",
        paragraphs: [
          "Use a dark pattern on a light background, retain the empty margin around the code and avoid placing a logo over important modules. Test the exported file and a physical proof at the intended size rather than relying only on the on-screen preview.",
        ],
      },
      {
        heading: "Update it when credentials change",
        paragraphs: [
          "QR Studio makes static codes. The password is embedded in the pattern and cannot be edited later. When the SSID, password or security changes, generate a new code and remove old signs.",
        ],
      },
    ],
    related: ["qr-code-not-scanning", "qr-code-size-for-print"],
    relatedTools: ["wifi-qr-code-generator"],
  },
  {
    slug: "qr-code-size-for-print",
    title: "How to Choose a QR Code Size for Print",
    description:
      "Choose a practical printed QR code size using viewing distance, content density, quiet space and a production proof.",
    updated: "2026-07-20",
    intro:
      "There is no universal print size. The reliable choice depends on scanning distance, the amount of encoded data, the material, lighting and the phones your audience uses.",
    sections: [
      {
        heading: "Start with scanning distance",
        paragraphs: [
          "A business card is scanned close up while a poster may be scanned from several steps away. Make the code larger as the expected distance increases, and ensure a person can comfortably frame the whole code in their camera.",
        ],
      },
      {
        heading: "Account for pattern density",
        paragraphs: [
          "Long URLs and detailed contact cards create more modules. At the same physical size, each module becomes smaller and harder to reproduce. Use the final payload during testing, remove unnecessary text and enlarge a dense code rather than compressing it.",
        ],
      },
      {
        heading: "Protect the quiet space",
        paragraphs: [
          "Keep a clear, consistent light border around all four sides. Nearby text, artwork, folds or trim can interfere with detection. Do not crop the margin supplied by the generator when placing the asset in design software.",
        ],
      },
      {
        heading: "Export and proof correctly",
        paragraphs: [
          "SVG is appropriate when artwork must scale without pixelation. PNG is suitable when exported at adequate resolution and not enlarged later. Always test the placed artwork and a real proof on the final material.",
        ],
        steps: [
          "Place the final code at its intended dimensions.",
          "Check that the layout did not crop or distort it.",
          "Print one proof using the production material and finish.",
          "Scan from realistic distances with multiple phones.",
        ],
      },
    ],
    related: ["qr-code-not-scanning", "qr-code-with-logo-best-practices"],
    relatedTools: ["url-qr-code-generator", "vcard-qr-code-generator"],
  },
  {
    slug: "qr-code-not-scanning",
    title: "Why Is My QR Code Not Scanning?",
    description:
      "Troubleshoot content, contrast, margins, sizing, print quality and logo obstruction with a practical checklist.",
    updated: "2026-07-20",
    intro:
      "A failed scan usually comes from the encoded content, visual design or final production. Diagnose the exact exported or printed version—not only the generator preview.",
    sections: [
      {
        heading: "Separate scanning from destination problems",
        paragraphs: [
          "Try two camera apps. If the scan reveals a URL but the page fails, the QR code works and the destination needs attention. Confirm URL protocols, redirects, WiFi capitalization and other payload details before changing the design.",
        ],
      },
      {
        heading: "Return to a simple control version",
        paragraphs: [
          "Generate black modules on a white background with square shapes, a normal margin and no logo. If this scans, restore customizations one at a time to identify the problem.",
        ],
        steps: [
          "Increase foreground-to-background contrast.",
          "Restore the clear border around every edge.",
          "Remove gradients, transparency and busy backgrounds.",
          "Reduce or remove the logo.",
        ],
      },
      {
        heading: "Inspect the final medium",
        paragraphs: [
          "Screens can introduce glare or show a code too small. Print can add blur, ink spread, folds, curvature or reflective lamination. Export again rather than using a screenshot, and test under the lighting and distance people will encounter.",
        ],
      },
      {
        heading: "Regenerate when content is too dense",
        paragraphs: [
          "A large payload creates smaller modules at a fixed size. Shorten unnecessary content or enlarge the code. Static content cannot be repaired after download; replace the asset if its payload is wrong.",
        ],
      },
    ],
    related: ["qr-code-size-for-print", "qr-code-with-logo-best-practices"],
    relatedTools: ["url-qr-code-generator", "text-qr-code-generator"],
  },
  {
    slug: "static-vs-dynamic-qr-code",
    title: "Static vs Dynamic QR Codes: What Changes?",
    description:
      "Understand payload storage, editable destinations, tracking, longevity and privacy before choosing a QR code workflow.",
    updated: "2026-07-20",
    intro:
      "The visual pattern does not tell you whether a workflow is static or dynamic. The key difference is whether the code directly contains the final payload or points through a managed redirect service.",
    sections: [
      {
        heading: "How static QR codes work",
        paragraphs: [
          "A static code directly stores a URL, text, WiFi configuration or contact card. It continues to encode that value without a QR service account, but the embedded value cannot be changed. QR Studio creates static QR codes in the browser.",
        ],
      },
      {
        heading: "How dynamic services work",
        paragraphs: [
          "A dynamic workflow usually encodes a provider-controlled short URL. The provider can redirect scans to a new destination and may offer analytics. That flexibility depends on the provider, its terms, the redirect domain and the subscription remaining available.",
        ],
      },
      {
        heading: "Choose based on the job",
        paragraphs: [
          "Static codes suit stable destinations, offline text and WiFi credentials that will be replaced when changed. A managed dynamic service may suit campaigns that require editable destinations or scan measurement, after evaluating cost, data handling and continuity.",
        ],
        steps: [
          "Decide whether the destination must change without reprinting.",
          "Decide whether scan analytics are genuinely required.",
          "Review who controls the redirect and how long it will remain active.",
          "Document a replacement plan for printed assets.",
        ],
      },
      {
        heading: "Privacy and longevity questions",
        paragraphs: [
          "A direct static URL avoids a QR redirect provider, although the destination website can still collect normal visit data. Dynamic services can observe redirect requests. For either choice, use a destination you maintain and test it periodically.",
        ],
      },
    ],
    related: ["qr-code-size-for-print", "qr-code-not-scanning"],
    relatedTools: ["url-qr-code-generator", "text-qr-code-generator"],
  },
  {
    slug: "qr-code-with-logo-best-practices",
    title: "QR Code With Logo: Design Best Practices",
    description:
      "Add a logo without ignoring contrast, obstruction, error correction, export quality and real-world scan testing.",
    updated: "2026-07-20",
    intro:
      "A logo can make a QR code recognizable, but it covers data modules. Error correction improves tolerance; it does not make every design reliable.",
    sections: [
      {
        heading: "Keep the logo restrained",
        paragraphs: [
          "Start small and centered, away from the three large position markers. A simple mark with a clear boundary is easier to integrate than fine text or a complex photograph. Never assume a familiar logo compensates for a failed scan.",
        ],
      },
      {
        heading: "Use error correction deliberately",
        paragraphs: [
          "Higher error correction can recover from more missing or damaged modules, but it also makes the pattern denser. Select high correction as a starting point for logo designs, then validate the exact content and dimensions.",
        ],
      },
      {
        heading: "Preserve contrast and spacing",
        paragraphs: [
          "Use a dark QR foreground and light background, keep the quiet border clear, and avoid low-contrast brand colors. Do not cover the position markers or place the code over uncontrolled imagery.",
        ],
      },
      {
        heading: "Test the exported artwork",
        paragraphs: [
          "Test more than the browser preview. Scan the PNG, SVG or PDF after it is placed in the final layout, then test a physical proof if it will be printed.",
        ],
        steps: [
          "Test without a logo to establish a working baseline.",
          "Add the logo at a modest size with high correction.",
          "Scan on multiple phones and at the expected distance.",
          "Repeat after every layout or production change.",
        ],
      },
    ],
    related: ["qr-code-not-scanning", "qr-code-size-for-print"],
    relatedTools: ["qr-code-with-logo", "url-qr-code-generator"],
  },
];

export const guideBySlug = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
