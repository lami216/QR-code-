import type {
  EmailData,
  EventData,
  QRContent,
  VCardData,
  WiFiConfig,
} from "../../types";

export function hasValidQRContent(content: QRContent): boolean {
  if (typeof content.data === "string") return content.data.trim().length > 0;
  switch (content.type) {
    case "wifi":
      return (content.data as WiFiConfig).ssid.trim().length > 0;
    case "email":
      return (content.data as EmailData).address.trim().length > 0;
    case "vcard": {
      const contact = content.data as VCardData;
      return Boolean(contact.firstName.trim() || contact.lastName.trim());
    }
    case "event":
      return (content.data as EventData).title.trim().length > 0;
    default:
      return false;
  }
}
