import type { EmailData, QRContent, VCardData } from "../../types";

export function serializeQRContent(content: QRContent): string {
  switch (content.type) {
    case "text":
      return content.data;
    case "url": {
      const url = content.data;
      return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    }
    case "email": {
      const email = content.data as EmailData;
      const params = new URLSearchParams();
      if (email.subject) params.append("subject", email.subject);
      if (email.body) params.append("body", email.body);
      return `mailto:${email.address}${params.size ? `?${params}` : ""}`;
    }
    case "phone":
      return `tel:${content.data as string}`;
    case "wifi": {
      const wifi = content.data;
      return `WIFI:S:${escapeWiFi(wifi.ssid)};T:${wifi.encryption};P:${escapeWiFi(wifi.password)};;`;
    }
    case "vcard":
      return serializeVCard(content.data);
    case "event": {
      const event = content.data;
      return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nSUMMARY:${escapeCalendar(event.title)}\r\nDTSTART:${formatCalendarDate(event.startTime)}\r\nDTEND:${formatCalendarDate(event.endTime)}\r\nLOCATION:${escapeCalendar(event.location)}\r\nDESCRIPTION:${escapeCalendar(event.description)}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    }
  }
}

export function serializeVCard(vcard: VCardData): string {
  const fullName = `${vcard.firstName} ${vcard.lastName}`.trim();
  return `BEGIN:VCARD\r\nVERSION:3.0\r\nN:${escapeVCard(vcard.lastName)};${escapeVCard(vcard.firstName)};;;\r\nFN:${escapeVCard(fullName)}\r\nEMAIL:${escapeVCard(vcard.email)}\r\nTEL:${escapeVCard(vcard.phone)}\r\nORG:${escapeVCard(vcard.company)}\r\nTITLE:${escapeVCard(vcard.title)}\r\nURL:${escapeVCard(vcard.website)}\r\nADR:;;${escapeVCard(vcard.address)};;;;\r\nEND:VCARD`;
}

const escapeWiFi = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");

const escapeCalendar = (value: string) =>
  value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/([;,])/g, "\\$1");

const escapeVCard = escapeCalendar;

const formatCalendarDate = (value: string) => value.replace(/[-:]/g, "");
