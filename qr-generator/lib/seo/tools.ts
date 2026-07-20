import type { QRType } from "../qr/modes";

export const TOOL_SLUGS = [
  "wifi-qr-code-generator",
  "url-qr-code-generator",
  "vcard-qr-code-generator",
  "qr-code-with-logo",
  "text-qr-code-generator",
] as const;
export type ToolSlug = (typeof TOOL_SLUGS)[number];
export type FAQItem = { question: string; answer: string };
export type ToolConfig = {
  slug: ToolSlug;
  initialType: QRType;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  breadcrumbLabel: string;
  related: readonly ToolSlug[];
  faq: readonly FAQItem[];
  supported: true;
};

export const tools = {
  "wifi-qr-code-generator": {
    slug: "wifi-qr-code-generator",
    initialType: "wifi",
    supported: true,
    title: "WiFi QR Code Generator — Share Network Access",
    description:
      "Create a static WiFi QR code for a WPA/WPA2-style, WEP or open network. Test it before sharing; WiFi credentials are not saved to QR Studio history.",
    heading: "WiFi QR code generator",
    introduction:
      "Enter a network name, security type and password to make a scannable WiFi sign. The generator appears first so you can create and test the code before sharing it.",
    breadcrumbLabel: "WiFi QR generator",
    related: ["url-qr-code-generator", "text-qr-code-generator"],
    faq: [
      {
        question: "What is an SSID?",
        answer:
          "The SSID is the WiFi network name shown in a device's network list. Enter it exactly, including capitalization.",
      },
      {
        question: "Are WiFi passwords saved in browser history?",
        answer:
          "No. QR Studio does not add WiFi QR content to its local QR history. The code is still rendered in your browser while you use the tool.",
      },
      {
        question: "Can I change the password in a downloaded code?",
        answer:
          "No. This is a static QR code. Generate and distribute a new code after changing the network name, security type or password.",
      },
    ],
  },
  "url-qr-code-generator": {
    slug: "url-qr-code-generator",
    initialType: "url",
    supported: true,
    title: "URL QR Code Generator — Create a Website QR",
    description:
      "Turn a complete HTTPS web address into a static URL QR code, customize it, and export PNG, SVG or PDF after checking the destination.",
    heading: "URL QR code generator",
    introduction:
      "Paste the final HTTPS address for your website, form or landing page. Check the destination and redirects, then customize and export the static code.",
    breadcrumbLabel: "URL QR generator",
    related: ["qr-code-with-logo", "text-qr-code-generator"],
    faq: [
      {
        question: "Can I edit the destination after downloading?",
        answer:
          "No. The URL is encoded directly in this static QR code. Generate a new code to use a different destination.",
      },
      {
        question: "Does QR Studio inspect a URL for malware?",
        answer:
          "No. QR Studio encodes the address you enter and does not provide URL safety scanning. Verify the final destination yourself.",
      },
      {
        question: "Which export should I choose?",
        answer:
          "PNG suits many screens, SVG scales for design and print workflows, and PDF is convenient for documents. Test the actual exported file in its intended setting.",
      },
    ],
  },
  "vcard-qr-code-generator": {
    slug: "vcard-qr-code-generator",
    initialType: "vcard",
    supported: true,
    title: "vCard QR Code Generator — Share Contact Details",
    description:
      "Create a static vCard 3.0 QR code with name, email, phone, company, role, website and address fields for contact import testing.",
    heading: "vCard QR code generator",
    introduction:
      "Package selected contact details into one QR code that compatible phone apps can offer to import. Include only information you intend to distribute.",
    breadcrumbLabel: "vCard QR generator",
    related: ["text-qr-code-generator", "url-qr-code-generator"],
    faq: [
      {
        question: "Which contact fields are included?",
        answer:
          "The current form supports first and last name, email, phone, company, title, website and address in a vCard 3.0 payload.",
      },
      {
        question: "Will every contacts app import it identically?",
        answer:
          "Import behavior varies. Test the exported code on the device and contacts apps your audience is likely to use.",
      },
      {
        question: "Can I update the embedded contact later?",
        answer:
          "No. Create and share a new static QR code when the embedded contact details change.",
      },
    ],
  },
  "qr-code-with-logo": {
    slug: "qr-code-with-logo",
    initialType: "url",
    supported: true,
    title: "QR Code With Logo — Customize and Export",
    description:
      "Create a URL QR code with browser-side logo customization, error correction and styling controls, then test the exported result carefully.",
    heading: "Create a QR code with a logo",
    introduction:
      "Start with a useful URL code, then open the design controls to add a logo. Keep the mark modest, preserve contrast and test the exported result before publishing.",
    breadcrumbLabel: "QR code with logo",
    related: ["url-qr-code-generator", "wifi-qr-code-generator"],
    faq: [
      {
        question: "Does adding a logo always scan safely?",
        answer:
          "No. A logo covers QR modules and can reduce reliability. Keep it reasonably small, use suitable error correction and test the final export.",
      },
      {
        question: "Where is my logo processed?",
        answer:
          "The existing customization workflow handles the selected logo in the browser; QR Studio does not add an upload backend for this tool.",
      },
      {
        question: "Which error correction should I use?",
        answer:
          "The tool exposes L, M, Q and H levels. A higher level can tolerate more obstruction but creates a denser code; testing remains necessary.",
      },
    ],
  },
  "text-qr-code-generator": {
    slug: "text-qr-code-generator",
    initialType: "text",
    supported: true,
    title: "Text QR Code Generator — Encode Plain Text",
    description:
      "Embed a short message, instruction or identifier directly in a static text QR code and export it without sending the content to a QR API.",
    heading: "Text QR code generator",
    introduction:
      "Encode a short plain-text message directly in a QR code. Concise content usually creates a less dense code that is easier to reproduce and test.",
    breadcrumbLabel: "Text QR generator",
    related: ["url-qr-code-generator", "wifi-qr-code-generator"],
    faq: [
      {
        question: "Does a text QR code need internet access to display?",
        answer:
          "The text is embedded in the code itself, so a scanner can read the payload without opening a web destination.",
      },
      {
        question: "Can downloaded text be edited?",
        answer:
          "No. A static text QR contains the exact exported payload. Generate a new code to make a change.",
      },
      {
        question: "Should I put passwords or secrets in it?",
        answer:
          "No. Anyone who scans or photographs the code may read its text, so do not use it for secrets.",
      },
    ],
  },
} as const satisfies Record<ToolSlug, ToolConfig>;

export const specializedTools = TOOL_SLUGS.map((slug) => tools[slug]);
export function toolPath(slug: ToolSlug) {
  return `/${slug}` as const;
}
