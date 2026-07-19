export type Guide = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; steps?: string[] }[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "qr-code-not-scanning",
    title: "Why Is My QR Code Not Scanning? A Practical Checklist",
    description:
      "Troubleshoot a QR code that will not scan by checking contrast, quiet zone, size, print quality, logo coverage and encoded content.",
    updated: "2026-07-19",
    intro:
      "A failed scan is usually a design, production or destination problem. Work through this checklist on the final physical or digital version—not only the preview.",
    sections: [
      {
        heading: "Start with the encoded content",
        paragraphs: [
          "Scan the code with two different camera apps. If it opens but the destination fails, the QR pattern is working and the URL, WiFi credentials or other payload needs correction. Static QR content cannot be edited after export; generate a replacement when the payload is wrong.",
        ],
        steps: [
          "Confirm the URL includes the intended protocol and opens directly.",
          "Check WiFi network name, password, capitalization and security type.",
          "Remove unnecessary text to reduce pattern density, then regenerate.",
        ],
      },
      {
        heading: "Restore contrast and the quiet zone",
        paragraphs: [
          "Use a dark foreground on a light, plain background. Keep an empty border around all four sides. A frame, photograph or text touching the modules can make it difficult for a scanner to locate the code.",
        ],
        steps: [
          "Try black on white as a control version.",
          "Remove transparency and gradients.",
          "Keep the generator margin rather than cropping to the outer modules.",
        ],
      },
      {
        heading: "Check size and production quality",
        paragraphs: [
          "There is no single size suitable for every placement. Viewing distance, payload density, camera quality, surface and lighting all matter. Print one sample at the intended size and scan it from the expected distance before producing a batch.",
        ],
        steps: [
          "Export SVG for artwork that will be resized.",
          "Avoid blur, compression and low-resolution screenshots.",
          "Check glare, folds, curved packaging and damaged modules.",
        ],
      },
      {
        heading: "Simplify logos and styling",
        paragraphs: [
          "A logo deliberately covers data. High error correction can improve tolerance but does not guarantee a scan. Reduce the logo, return module and eye shapes to simple settings, and test again.",
        ],
        steps: [
          "Select high error correction for logo designs.",
          "Keep the three position markers unobstructed.",
          "Test the exact exported file after it is placed in the final design.",
        ],
      },
    ],
    related: ["best-qr-code-size-for-print", "qr-code-quiet-zone"],
  },
  {
    slug: "best-qr-code-size-for-print",
    title: "How to Choose the Best QR Code Size for Print",
    description:
      "Choose a practical printed QR code size using viewing distance, data density, quiet zone and a real proof test.",
    updated: "2026-07-19",
    intro:
      "The best printed size depends on how the code will be used. Treat any rule of thumb as a starting point, then test the final artwork, material and viewing distance.",
    sections: [
      {
        heading: "Size for the real scanning distance",
        paragraphs: [
          "A code on a business card is scanned close up; a poster is not. Increase the code as viewing distance grows and leave enough surrounding space for a camera to isolate it.",
        ],
        steps: [
          "Define the expected minimum and maximum scanning distance.",
          "Create a physical proof at final dimensions.",
          "Test with more than one ordinary phone in realistic light.",
        ],
      },
      {
        heading: "Account for data density",
        paragraphs: [
          "Long content creates a denser grid with smaller modules at the same overall dimensions. Prefer a concise final URL and remove optional payload text. Do not use a URL shortener unless you trust its longevity and privacy implications.",
        ],
        steps: [
          "Compare the actual code rather than a placeholder.",
          "Enlarge dense codes instead of squeezing their modules.",
          "Keep the quiet zone outside the stated code dimensions.",
        ],
      },
      {
        heading: "Use a suitable export",
        paragraphs: [
          "SVG is the safest choice when a designer needs to scale artwork without pixelation. PNG can work when exported at sufficient resolution and placed without enlargement. PDF is convenient for documents, but confirm the application has not rasterized or compressed the code.",
        ],
        steps: [
          "Do not use a screenshot as print artwork.",
          "Lock proportions when resizing.",
          "Re-scan the exported and printed result.",
        ],
      },
      {
        heading: "Run a production proof",
        paragraphs: [
          "Paper, ink spread, lamination, gloss, folds and curved packaging can change performance. A screen preview cannot reproduce those conditions. Approve a real proof before ordering a large run.",
        ],
      },
    ],
    related: ["qr-code-not-scanning", "qr-code-quiet-zone"],
  },
  {
    slug: "qr-code-quiet-zone",
    title: "QR Code Quiet Zone Explained",
    description:
      "Understand the blank margin around a QR code, why scanners need it and how to protect it in digital and print layouts.",
    updated: "2026-07-19",
    intro:
      "The quiet zone is the clear border surrounding a QR code. It separates the code from nearby artwork so a scanner can identify its boundaries.",
    sections: [
      {
        heading: "What belongs in the quiet zone?",
        paragraphs: [
          "Nothing: no text, border, photograph, pattern or neighboring barcode. Use a consistent light area around all four edges. The margin control in the generator creates space inside the export; your page layout should preserve it too.",
        ],
      },
      {
        heading: "Common ways the margin gets lost",
        paragraphs: [
          "Design software may crop transparent or apparently empty pixels. A website container may place a border against the image. A print vendor may trim artwork. Check the final placed asset rather than assuming the exported margin survived.",
        ],
        steps: [
          "Turn off automatic image cropping.",
          "Keep backgrounds simple immediately around the code.",
          "Inspect all four sides in the final PDF or artwork.",
        ],
      },
      {
        heading: "Quiet zone and custom backgrounds",
        paragraphs: [
          "A visually quiet background can still lack sufficient contrast. The safest approach is a solid light panel larger than the QR symbol. If you use transparency, test the code over every background on which it will appear.",
        ],
      },
      {
        heading: "A pre-publication check",
        paragraphs: [
          "Export the design, place it in its real layout, and scan from the intended distance. Then print a proof if the campaign will be physical. This validates the whole composition, not just the isolated QR code.",
        ],
      },
    ],
    related: ["qr-code-not-scanning", "best-qr-code-size-for-print"],
  },
];

export const guideBySlug = (slug: string) =>
  guides.find((guide) => guide.slug === slug);
