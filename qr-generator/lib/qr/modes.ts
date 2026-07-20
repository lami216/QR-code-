import type {
  EmailData,
  EventData,
  QRContent,
  VCardData,
  WiFiConfig,
} from "../../types";

export const QR_TYPE_KEYS = [
  "text",
  "url",
  "email",
  "phone",
  "wifi",
  "vcard",
  "event",
] as const;

export type QRType = (typeof QR_TYPE_KEYS)[number];

export type QRModeDefinition = {
  key: QRType;
  label: string;
  supported: true;
  createInitialContent: () => QRContent;
};

const emailData = (): EmailData => ({ address: "", subject: "", body: "" });
const wifiData = (): WiFiConfig => ({
  ssid: "",
  password: "",
  encryption: "WPA",
});
const vcardData = (): VCardData => ({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  title: "",
  website: "",
  address: "",
});
const eventData = (): EventData => ({
  title: "",
  description: "",
  location: "",
  startTime: "",
  endTime: "",
  timezone: "UTC",
});

export const QR_MODES = {
  text: {
    key: "text",
    label: "Text",
    supported: true,
    createInitialContent: () => ({ type: "text", data: "" }),
  },
  url: {
    key: "url",
    label: "Website",
    supported: true,
    createInitialContent: () => ({ type: "url", data: "" }),
  },
  email: {
    key: "email",
    label: "Email",
    supported: true,
    createInitialContent: () => ({ type: "email", data: emailData() }),
  },
  phone: {
    key: "phone",
    label: "Phone",
    supported: true,
    createInitialContent: () => ({ type: "phone", data: "" }),
  },
  wifi: {
    key: "wifi",
    label: "WiFi",
    supported: true,
    createInitialContent: () => ({ type: "wifi", data: wifiData() }),
  },
  vcard: {
    key: "vcard",
    label: "Contact",
    supported: true,
    createInitialContent: () => ({ type: "vcard", data: vcardData() }),
  },
  event: {
    key: "event",
    label: "Event",
    supported: true,
    createInitialContent: () => ({ type: "event", data: eventData() }),
  },
} satisfies Record<QRType, QRModeDefinition>;

export function isQRType(value: unknown): value is QRType {
  return typeof value === "string" && value in QR_MODES;
}

export function resolveQRType(value: unknown): QRType {
  return isQRType(value) ? value : "text";
}

export function createInitialQRContent(value?: unknown): QRContent {
  return QR_MODES[resolveQRType(value)].createInitialContent();
}
