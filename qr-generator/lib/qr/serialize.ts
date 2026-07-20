import type {
  EmailData,
  EventData,
  QRContent,
  VCardData,
  WiFiConfig,
} from "../../types";

export function serializeQRContent(content: QRContent): string {
  switch (content.type) {
    case "text":
      return content.data as string;
    case "url": {
      const url = content.data as string;
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
      const wifi = content.data as WiFiConfig;
      return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
    }
    case "vcard":
      return serializeVCard(content.data as VCardData);
    case "event": {
      const event = content.data as EventData;
      return `BEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.startTime}\nDTEND:${event.endTime}\nLOCATION:${event.location}\nDESCRIPTION:${event.description}\nEND:VEVENT`;
    }
  }
}

export function serializeVCard(vcard: VCardData): string {
  return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcard.firstName} ${vcard.lastName}\nEMAIL:${vcard.email}\nTEL:${vcard.phone}\nORG:${vcard.company}\nTITLE:${vcard.title}\nURL:${vcard.website}\nADR:${vcard.address}\nEND:VCARD`;
}
