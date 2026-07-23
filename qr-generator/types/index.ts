export type QRContent =
  | { type: "text" | "url" | "phone"; data: string }
  | { type: "email"; data: EmailData }
  | { type: "wifi"; data: WiFiConfig }
  | { type: "vcard"; data: VCardData }
  | { type: "event"; data: EventData };

export interface QRStyling {
  foreground: string;
  background: string;
  transparent: boolean;
  errorCorrection: "L" | "M" | "Q" | "H";
  size: number;
  margin: number;
  colorMode?: "solid" | "gradient";
  gradientStart?: string;
  gradientEnd?: string;
  moduleStyle?: "square" | "rounded" | "dots";
  eyeStyle?: "square" | "rounded" | "dots";
  eyeColor?: string;
  logoSupport?: boolean;
  frameStyle?: "none" | "border" | "ticket" | "card";
  labelStyle?: "none" | "scan-me" | "connect" | "contact" | "event";
  previewStyle?: "card" | "phone" | "poster";
  template?: string;
  logo?: File | null;
  logoDataUrl?: string;
  logoSize?: number;
  logoPosition?: "center" | "top" | "bottom";
  logoPadding?: number;
  logoBackground?: "white" | "transparent";
}

export interface QRHistoryItem {
  id: string;
  content: QRContent;
  styling: QRStyling;
  timestamp: number;
  title?: string;
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
}

export interface VCardData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  website: string;
  address: string;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface EventData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  timezone: string;
}
