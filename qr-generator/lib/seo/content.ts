export const faqItems = [
  {
    question: "Is this QR code generator free?",
    answer:
      "Yes. You can create, customize and download QR codes without creating an account.",
  },
  {
    question: "Is my information uploaded?",
    answer:
      "No. QR Studio generates the code in your browser, so the content you enter is not uploaded to our servers.",
  },
  {
    question: "Which QR code types are supported?",
    answer:
      "You can make codes for web links, plain text, WiFi networks, email, phone numbers, contact cards and calendar events.",
  },
  {
    question: "Can I create a QR code with a logo?",
    answer:
      "Yes. Add a logo in the design controls. Use high error correction and always test the finished code before publishing it.",
  },
  {
    question: "Which download formats are available?",
    answer:
      "QR Studio supports PNG, SVG and PDF downloads for digital and print workflows.",
  },
  {
    question: "Do generated QR codes expire?",
    answer:
      "Static QR codes created here do not expire. Their encoded destination cannot be edited after download, unlike a managed dynamic QR code.",
  },
] as const;

export const qrTypes = [
  "Website URL",
  "Plain text",
  "WiFi access",
  "Email message",
  "Phone number",
  "vCard contact",
  "Calendar event",
];
