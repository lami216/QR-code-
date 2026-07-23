import type { QRStyling } from "../../types";

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  settings: Partial<QRStyling>;
}

/** The single source of truth for template selection, previews and QR output. */
export const qrTemplates: readonly QRTemplate[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean black and white squares for any use.",
    settings: {
      foreground: "#000000",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "square",
      eyeStyle: "square",
      errorCorrection: "M",
      margin: 4,
    },
  },
  {
    id: "modern",
    name: "Modern",
    description: "Rounded navy modules with a fresh teal accent.",
    settings: {
      foreground: "#0f172a",
      background: "#f0fdfa",
      colorMode: "gradient",
      gradientStart: "#0f172a",
      gradientEnd: "#0f766e",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      errorCorrection: "Q",
      margin: 4,
    },
  },
  {
    id: "business",
    name: "Business",
    description: "Professional, high-contrast and sharply defined.",
    settings: {
      foreground: "#172554",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "square",
      eyeStyle: "square",
      errorCorrection: "M",
      margin: 4,
    },
  },
  {
    id: "gradient",
    name: "Gradient",
    description: "A polished blue-to-purple rounded treatment.",
    settings: {
      foreground: "#2563eb",
      background: "#ffffff",
      colorMode: "gradient",
      gradientStart: "#0f766e",
      gradientEnd: "#7c3aed",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      errorCorrection: "Q",
      margin: 4,
    },
  },
  {
    id: "elegant",
    name: "Elegant",
    description: "Premium charcoal with a subtle warm accent.",
    settings: {
      foreground: "#18181b",
      background: "#fffbeb",
      colorMode: "gradient",
      gradientStart: "#18181b",
      gradientEnd: "#92400e",
      moduleStyle: "rounded",
      eyeStyle: "square",
      errorCorrection: "Q",
      margin: 5,
    },
  },
  {
    id: "colorful",
    name: "Colorful",
    description: "Bright, friendly colors made for social posts.",
    settings: {
      foreground: "#db2777",
      background: "#fff7ed",
      colorMode: "gradient",
      gradientStart: "#f97316",
      gradientEnd: "#db2777",
      moduleStyle: "dots",
      eyeStyle: "rounded",
      errorCorrection: "Q",
      margin: 4,
    },
  },
  {
    id: "logo-ready",
    name: "Logo Ready",
    description: "More recovery and quiet space for a center logo.",
    settings: {
      foreground: "#111827",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      errorCorrection: "H",
      margin: 8,
    },
  },
  {
    id: "print-safe",
    name: "Print Safe",
    description: "Maximum black-and-white contrast for print.",
    settings: {
      foreground: "#000000",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "square",
      eyeStyle: "square",
      errorCorrection: "H",
      margin: 6,
    },
  },
] as const;

export function applyQRTemplate(
  styling: QRStyling,
  templateId: string,
): QRStyling {
  const template = qrTemplates.find(({ id }) => id === templateId);
  return template
    ? {
        ...styling,
        ...template.settings,
        transparent: false,
        template: template.id,
      }
    : styling;
}

export function getQRTemplate(templateId?: string): QRTemplate | undefined {
  return qrTemplates.find(({ id }) => id === templateId);
}
