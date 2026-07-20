import type React from "react";
import { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaCalendarAlt,
  FaEnvelope,
  FaGlobe,
  FaLink,
  FaPhone,
  FaTextWidth,
  FaWifi,
} from "react-icons/fa";
import {
  createInitialQRContent,
  QR_MODES,
  QR_TYPE_KEYS,
} from "../../lib/qr/modes";
import type {
  EmailData,
  EventData,
  QRContent,
  VCardData,
  WiFiConfig,
} from "../../types";

interface QRConfiguratorProps {
  content: QRContent;
  onContentChange: (content: QRContent) => void;
}
const inputClass =
  "w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 placeholder:text-slate-400";
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <label className="block space-y-1.5">
    <span className="text-sm font-semibold text-slate-700">{label}</span>
    {children}
  </label>
);

export const QRConfigurator: React.FC<QRConfiguratorProps> = ({
  content,
  onContentChange,
}) => {
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>({
    ssid: "",
    password: "",
    encryption: "WPA",
  });
  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    title: "",
    website: "",
    address: "",
  });
  const [emailData, setEmailData] = useState<EmailData>({
    address: "",
    subject: "",
    body: "",
  });
  const [eventData, setEventData] = useState<EventData>({
    title: "",
    description: "",
    location: "",
    startTime: "",
    endTime: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  useEffect(() => {
    if (content.data && typeof content.data === "object") {
      if (content.type === "wifi") setWifiConfig(content.data as WiFiConfig);
      if (content.type === "vcard") setVcardData(content.data as VCardData);
      if (content.type === "email") setEmailData(content.data as EmailData);
      if (content.type === "event") setEventData(content.data as EventData);
    }
  }, [content.type, content.data]);

  const icons = {
    text: <FaTextWidth />,
    url: <FaLink />,
    email: <FaEnvelope />,
    phone: <FaPhone />,
    wifi: <FaWifi />,
    vcard: <FaAddressCard />,
    event: <FaCalendarAlt />,
  };
  const contentTypes = QR_TYPE_KEYS.map((value) => ({
    value,
    label: QR_MODES[value].label,
    icon: icons[value],
  }));

  const handleContentTypeChange = (type: QRContent["type"]) => {
    const nextContent = createInitialQRContent(type);
    if (type === "event" && typeof nextContent.data === "object") {
      nextContent.data.timezone =
        Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    onContentChange(nextContent);
  };

  const renderContentForm = () => {
    switch (content.type) {
      case "text":
        return (
          <div className="space-y-3">
            <Field label="Plain text or message">
              <textarea
                value={content.data as string}
                onChange={(e) =>
                  onContentChange({ ...content, data: e.target.value })
                }
                placeholder="Example: Scan this code to view our menu or save this note."
                className={`${inputClass} h-28 resize-none`}
              />
            </Field>
            <p className="text-xs text-slate-500">
              Characters: {(content.data as string)?.length || 0}
            </p>
          </div>
        );
      case "url":
        return (
          <Field label="Website URL">
            <div className="relative">
              <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="url"
                value={content.data as string}
                onChange={(e) =>
                  onContentChange({ ...content, data: e.target.value })
                }
                placeholder="https://example.com"
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>
        );
      case "email":
        return (
          <div className="space-y-3">
            <Field label="Recipient email address">
              <input
                type="email"
                value={emailData.address}
                onChange={(e) => {
                  const data = { ...emailData, address: e.target.value };
                  setEmailData(data);
                  onContentChange({ ...content, data });
                }}
                placeholder="name@example.com"
                className={inputClass}
              />
            </Field>
            <Field label="Email subject">
              <input
                value={emailData.subject}
                onChange={(e) => {
                  const data = { ...emailData, subject: e.target.value };
                  setEmailData(data);
                  onContentChange({ ...content, data });
                }}
                placeholder="Project inquiry"
                className={inputClass}
              />
            </Field>
            <Field label="Email message">
              <textarea
                value={emailData.body}
                onChange={(e) => {
                  const data = { ...emailData, body: e.target.value };
                  setEmailData(data);
                  onContentChange({ ...content, data });
                }}
                placeholder="Hello, I would like to learn more about your services."
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </div>
        );
      case "phone":
        return (
          <Field label="Phone number">
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="tel"
                value={content.data as string}
                onChange={(e) =>
                  onContentChange({ ...content, data: e.target.value })
                }
                placeholder="+123456789"
                className={`${inputClass} pl-10`}
              />
            </div>
          </Field>
        );
      case "wifi":
        return (
          <div className="space-y-3">
            <Field label="Network name (SSID)">
              <input
                value={wifiConfig.ssid}
                onChange={(e) => {
                  const data = { ...wifiConfig, ssid: e.target.value };
                  setWifiConfig(data);
                  onContentChange({ ...content, data });
                }}
                placeholder="Office WiFi"
                className={inputClass}
              />
            </Field>
            <Field label="WiFi password">
              <input
                type="password"
                value={wifiConfig.password}
                onChange={(e) => {
                  const data = { ...wifiConfig, password: e.target.value };
                  setWifiConfig(data);
                  onContentChange({ ...content, data });
                }}
                placeholder="Example: SecurePass123"
                className={inputClass}
              />
            </Field>
            <Field label="Security type">
              <select
                value={wifiConfig.encryption}
                onChange={(e) => {
                  const data = {
                    ...wifiConfig,
                    encryption: e.target.value as WiFiConfig["encryption"],
                  };
                  setWifiConfig(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No password</option>
              </select>
            </Field>
          </div>
        );
      case "vcard":
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="First name">
                <input
                  placeholder="John"
                  value={vcardData.firstName}
                  onChange={(e) => {
                    const data = { ...vcardData, firstName: e.target.value };
                    setVcardData(data);
                    onContentChange({ ...content, data });
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label="Last name">
                <input
                  placeholder="Smith"
                  value={vcardData.lastName}
                  onChange={(e) => {
                    const data = { ...vcardData, lastName: e.target.value };
                    setVcardData(data);
                    onContentChange({ ...content, data });
                  }}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Email address">
              <input
                type="email"
                placeholder="name@example.com"
                value={vcardData.email}
                onChange={(e) => {
                  const data = { ...vcardData, email: e.target.value };
                  setVcardData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Phone number">
              <input
                type="tel"
                placeholder="+123456789"
                value={vcardData.phone}
                onChange={(e) => {
                  const data = { ...vcardData, phone: e.target.value };
                  setVcardData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Company and title">
              <input
                placeholder="Acme Inc. — Marketing Manager"
                value={`${vcardData.company}${vcardData.title ? ` — ${vcardData.title}` : ""}`}
                onChange={(e) => {
                  const [company, title = ""] = e.target.value.split(" — ");
                  const data = { ...vcardData, company, title };
                  setVcardData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Website">
              <input
                placeholder="https://example.com"
                value={vcardData.website}
                onChange={(e) => {
                  const data = { ...vcardData, website: e.target.value };
                  setVcardData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Address">
              <input
                placeholder="123 Main Street, New York, NY"
                value={vcardData.address}
                onChange={(e) => {
                  const data = { ...vcardData, address: e.target.value };
                  setVcardData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
          </div>
        );
      case "event":
        return (
          <div className="space-y-3">
            <Field label="Event title">
              <input
                placeholder="Product launch webinar"
                value={eventData.title}
                onChange={(e) => {
                  const data = { ...eventData, title: e.target.value };
                  setEventData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <Field label="Event description">
              <textarea
                placeholder="Join us for a 30-minute live demo and Q&A."
                value={eventData.description}
                onChange={(e) => {
                  const data = { ...eventData, description: e.target.value };
                  setEventData(data);
                  onContentChange({ ...content, data });
                }}
                rows={2}
                className={`${inputClass} resize-none`}
              />
            </Field>
            <Field label="Location">
              <input
                placeholder="Online or 123 Conference Ave"
                value={eventData.location}
                onChange={(e) => {
                  const data = { ...eventData, location: e.target.value };
                  setEventData(data);
                  onContentChange({ ...content, data });
                }}
                className={inputClass}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Start date and time">
                <input
                  type="datetime-local"
                  value={eventData.startTime}
                  onChange={(e) => {
                    const data = { ...eventData, startTime: e.target.value };
                    setEventData(data);
                    onContentChange({ ...content, data });
                  }}
                  className={inputClass}
                />
              </Field>
              <Field label="End date and time">
                <input
                  type="datetime-local"
                  value={eventData.endTime}
                  onChange={(e) => {
                    const data = { ...eventData, endTime: e.target.value };
                    setEventData(data);
                    onContentChange({ ...content, data });
                  }}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center py-6 text-slate-500">
            Select a content type to begin
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-3 block text-slate-700">
            QR content type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {contentTypes.map((type) => (
              <button
                type="button"
                key={type.value}
                onClick={() => handleContentTypeChange(type.value)}
                className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1 transition-colors ${content.type === type.value ? "border-teal-500 bg-teal-50 text-teal-700" : "border-slate-300 text-slate-600 hover:border-teal-300"}`}
              >
                <span className="text-base">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-slate-200">
          {renderContentForm()}
        </div>
      </div>
    </div>
  );
};
