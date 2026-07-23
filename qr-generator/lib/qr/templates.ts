import type { QRStyling } from "../../types";
import type { QRType } from "./modes";

export interface QRTemplate {
  id: string;
  name: string;
  description: string;
  category: "general" | "website" | "business" | "wifi" | "event" | "contact";
  compatibleTypes: readonly QRType[];
  settings: Partial<QRStyling>;
}

/** The single source of truth for template selection, previews and QR output. */
const allTypes: readonly QRType[] = [
  "text",
  "url",
  "phone",
  "email",
  "wifi",
  "vcard",
  "event",
];
const common = (
  id: string,
  name: string,
  description: string,
  settings: Partial<QRStyling>,
): QRTemplate => ({
  id,
  name,
  description,
  category: "general",
  compatibleTypes: allTypes,
  settings,
});

export const qrTemplates: readonly QRTemplate[] = [
  common(
    "minimal-classic",
    "Minimal Classic",
    "Maximum readability in timeless black and white.",
    {
      foreground: "#000000",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "square",
      eyeStyle: "square",
      errorCorrection: "M",
      margin: 4,
      eyeColor: "#000000",
      frameStyle: "none",
      labelStyle: "none",
      logoSupport: false,
    },
  ),
  common(
    "rounded-modern",
    "Rounded Modern",
    "Premium rounded styling for modern products.",
    {
      foreground: "#0f172a",
      background: "#f0fdfa",
      colorMode: "gradient",
      gradientStart: "#0f172a",
      gradientEnd: "#0f766e",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      errorCorrection: "Q",
      margin: 4,
      eyeColor: "#0f172a",
      frameStyle: "none",
      labelStyle: "none",
      logoSupport: false,
    },
  ),
  common(
    "brand-card",
    "Brand Card",
    "Brand-ready color, eyes and protected logo space.",
    {
      foreground: "#1d4ed8",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      eyeColor: "#7c3aed",
      errorCorrection: "H",
      margin: 5,
      logoSupport: true,
      frameStyle: "card",
      labelStyle: "none",
    },
  ),
  common(
    "social-gradient",
    "Social Gradient",
    "Bright gradient dots made for social sharing.",
    {
      foreground: "#2563eb",
      background: "#ffffff",
      colorMode: "gradient",
      gradientStart: "#0f766e",
      gradientEnd: "#7c3aed",
      moduleStyle: "dots",
      eyeStyle: "rounded",
      eyeColor: "#7c3aed",
      frameStyle: "none",
      labelStyle: "none",
      logoSupport: false,
      errorCorrection: "Q",
      margin: 4,
    },
  ),
  common(
    "print-safe",
    "Print Safe",
    "High contrast and generous quiet zone for print.",
    {
      foreground: "#000000",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "square",
      eyeStyle: "square",
      errorCorrection: "H",
      margin: 6,
      eyeColor: "#000000",
      frameStyle: "none",
      labelStyle: "none",
      logoSupport: false,
    },
  ),
  common(
    "scan-me-frame",
    "Scan Me Frame",
    "A clear external frame with a call to action.",
    {
      foreground: "#0f172a",
      background: "#ffffff",
      colorMode: "solid",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      eyeColor: "#0f766e",
      errorCorrection: "Q",
      margin: 4,
      logoSupport: false,
      frameStyle: "border",
      labelStyle: "scan-me",
    },
  ),
  {
    id: "website-launch",
    name: "Website Launch",
    description: "A polished frame for website links.",
    category: "website",
    compatibleTypes: ["url"],
    settings: {
      foreground: "#075985",
      background: "#f0f9ff",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      eyeColor: "#0369a1",
      colorMode: "solid",
      errorCorrection: "Q",
      margin: 4,
      frameStyle: "card",
      labelStyle: "scan-me",
    },
  },
  {
    id: "business-card",
    name: "Business Card",
    description: "Professional contact sharing.",
    category: "business",
    compatibleTypes: ["vcard"],
    settings: {
      foreground: "#1e293b",
      background: "#ffffff",
      moduleStyle: "square",
      eyeStyle: "rounded",
      eyeColor: "#0f766e",
      colorMode: "solid",
      errorCorrection: "H",
      margin: 5,
      logoSupport: true,
      frameStyle: "card",
      labelStyle: "contact",
    },
  },
  {
    id: "wifi-connect",
    name: "WiFi Connect",
    description: "Friendly signage for home or business WiFi.",
    category: "wifi",
    compatibleTypes: ["wifi"],
    settings: {
      foreground: "#164e63",
      background: "#ecfeff",
      moduleStyle: "dots",
      eyeStyle: "rounded",
      eyeColor: "#0891b2",
      colorMode: "solid",
      errorCorrection: "Q",
      margin: 5,
      frameStyle: "border",
      labelStyle: "connect",
    },
  },
  {
    id: "event-ticket",
    name: "Event Ticket",
    description: "Ticket-inspired event check-in design.",
    category: "event",
    compatibleTypes: ["event"],
    settings: {
      foreground: "#4c1d95",
      background: "#faf5ff",
      moduleStyle: "rounded",
      eyeStyle: "rounded",
      eyeColor: "#7e22ce",
      colorMode: "gradient",
      gradientStart: "#4c1d95",
      gradientEnd: "#db2777",
      errorCorrection: "H",
      margin: 4,
      frameStyle: "ticket",
      labelStyle: "event",
    },
  },
  {
    id: "email-contact",
    name: "Email Contact",
    description: "A clean invitation to get in touch.",
    category: "contact",
    compatibleTypes: ["email"],
    settings: {
      foreground: "#1e3a8a",
      background: "#eff6ff",
      moduleStyle: "rounded",
      eyeStyle: "square",
      eyeColor: "#2563eb",
      colorMode: "solid",
      errorCorrection: "Q",
      margin: 4,
      frameStyle: "card",
      labelStyle: "contact",
    },
  },
] as const;

export const getTemplatesForType = (type: QRType) =>
  qrTemplates.filter((template) => template.compatibleTypes.includes(type));

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
