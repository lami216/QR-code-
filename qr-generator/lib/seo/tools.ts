import type { QRType } from "../qr/modes";

export const TOOL_SLUGS = [
  "wifi-qr-code-generator",
  "url-qr-code-generator",
  "vcard-qr-code-generator",
  "qr-code-with-logo",
  "text-qr-code-generator",
  "email-qr-code-generator",
  "phone-qr-code-generator",
  "calendar-qr-code-generator",
  "menu-qr-code-generator",
  "social-media-qr-code-generator",
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
  "email-qr-code-generator": {
    slug: "email-qr-code-generator",
    initialType: "email",
    supported: true,
    title: "Email QR Code Generator — Create a Mailto Code",
    description:
      "Create a mailto QR code with a recipient, subject and message. Preview and export it locally without QR Studio storing your email details on a server.",
    heading: "Email QR code generator",
    introduction:
      "Create a QR code that asks a compatible device to open its email app with a recipient and optional draft text. It prepares a draft; it never sends the message.",
    breadcrumbLabel: "Email QR generator",
    related: ["phone-qr-code-generator", "vcard-qr-code-generator"],
    faq: [
      {
        question: "Does scanning send the email?",
        answer:
          "No. A mailto QR asks a compatible device to open an email app with draft fields. The person must review and send it.",
      },
      {
        question: "Are email details uploaded?",
        answer:
          "QR Studio generates the payload in your browser and does not send it to a QR-generation service. Non-WiFi codes may remain in local browser history.",
      },
      {
        question: "Will every email app open?",
        answer:
          "No. Behavior depends on the scanner, device and whether an email app is configured. Test on likely recipient devices.",
      },
    ],
  },
  "phone-qr-code-generator": {
    slug: "phone-qr-code-generator",
    initialType: "phone",
    supported: true,
    title: "Phone QR Code Generator — Create a Call Link",
    description:
      "Turn a phone number into a tel QR code for compatible phones, with guidance for international formatting, testing and safe use.",
    heading: "Phone QR code generator",
    introduction:
      "Encode a phone number as a tel link so compatible phones can offer to dial it. Use an international number and verify the prompt before publishing.",
    breadcrumbLabel: "Phone QR generator",
    related: ["email-qr-code-generator", "vcard-qr-code-generator"],
    faq: [
      {
        question: "Does scanning place a call automatically?",
        answer:
          "Normally the device shows a call action or dialer first, but behavior varies. QR Studio does not place calls.",
      },
      {
        question: "What number format should I use?",
        answer:
          "Use the plus sign, country code and number where possible, such as +12025550123, and test it in the destination region.",
      },
      {
        question: "Can I use this for emergency access?",
        answer:
          "Do not rely on a QR code as an emergency calling method. Devices, scanners, connectivity and accessibility can fail.",
      },
    ],
  },
  "calendar-qr-code-generator": {
    slug: "calendar-qr-code-generator",
    initialType: "event",
    supported: true,
    title: "Calendar QR Code Generator — Create an Event Code",
    description:
      "Create an iCalendar event QR with a title, start and end time, location and description, then test imports and timezone interpretation.",
    heading: "Calendar event QR code generator",
    introduction:
      "Package event details into an iCalendar payload that compatible scanner and calendar apps can offer to import. Test dates and times carefully before distribution.",
    breadcrumbLabel: "Calendar QR generator",
    related: ["url-qr-code-generator", "email-qr-code-generator"],
    faq: [
      {
        question: "Is the event added automatically?",
        answer:
          "No. A compatible scanner may offer an import, and the user must confirm it. App behavior varies.",
      },
      {
        question: "How are timezones handled?",
        answer:
          "The current payload encodes local date-time values without a TZID or UTC conversion. The timezone field is informational, so test in every relevant timezone.",
      },
      {
        question: "Can the event be updated later?",
        answer:
          "No. This static code contains the exported details. Create a new code when the schedule changes.",
      },
    ],
  },
  "menu-qr-code-generator": {
    slug: "menu-qr-code-generator",
    initialType: "url",
    supported: true,
    title: "Menu QR Code Generator — Link to a Restaurant Menu",
    description:
      "Create a URL-based restaurant menu QR code that links to your existing mobile-friendly menu, with practical placement and update guidance.",
    heading: "Restaurant menu QR code generator",
    introduction:
      "Link diners to an existing HTTPS menu page. QR Studio encodes the URL—it does not host, upload or build the menu—so you retain control of the page behind the code.",
    breadcrumbLabel: "Menu QR generator",
    related: ["url-qr-code-generator", "qr-code-with-logo"],
    faq: [
      {
        question: "Does QR Studio host my menu?",
        answer:
          "No. This tool creates a static QR code for an existing menu URL. Your website or menu provider hosts the content.",
      },
      {
        question: "Can I change menu items without reprinting?",
        answer:
          "Yes, if the same encoded URL continues to work and you edit the page at that URL. Changing the URL requires a new code.",
      },
      {
        question: "Should a QR code be the only menu option?",
        answer:
          "No. Provide an accessible alternative for guests who cannot or prefer not to scan, and keep pricing and allergen information accurate.",
      },
    ],
  },
  "social-media-qr-code-generator": {
    slug: "social-media-qr-code-generator",
    initialType: "url",
    supported: true,
    title: "Social Media QR Code Generator — Share One Profile",
    description:
      "Create a static QR code for one public social profile URL. Verify the destination and share it without a fake multi-link or redirect service.",
    heading: "Social media profile QR code generator",
    introduction:
      "Turn one public social profile URL into a QR code. This is a direct URL tool—not a hosted profile page, multi-link service or follower-tracking system.",
    breadcrumbLabel: "Social profile QR generator",
    related: ["url-qr-code-generator", "qr-code-with-logo"],
    faq: [
      {
        question: "Can one code contain several social profiles?",
        answer:
          "Not with this tool. It encodes one profile URL and does not create or host a multi-link page.",
      },
      {
        question: "Does it track scans or followers?",
        answer:
          "No. QR Studio creates a static direct link and provides no scan analytics or platform follower data.",
      },
      {
        question: "What if my username changes?",
        answer:
          "If the profile URL changes, generate and distribute a new code. Confirm the public destination before printing.",
      },
    ],
  },
} as const satisfies Record<ToolSlug, ToolConfig>;

export const specializedTools = TOOL_SLUGS.map((slug) => tools[slug]);
export function toolPath(slug: ToolSlug) {
  return `/${slug}` as const;
}
