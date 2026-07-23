import { usePathname, useRouter } from "next/navigation";
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
import { QR_MODES } from "../../lib/qr/modes";
import { generatorTools } from "../../lib/seo/tools";
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
  "min-w-0 w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500";
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  // The interactive control is passed as a child, so the label wraps it at runtime.
  // biome-ignore lint/a11y/noLabelWithoutControl: controls are supplied through children
  <label className="block space-y-1.5">
    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
      {label}
    </span>
    {children}
  </label>
);

export const QRConfigurator: React.FC<QRConfiguratorProps> = ({
  content,
  onContentChange,
}) => {
  const router = useRouter();
  const pathname = usePathname();
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
  const contentTypes = generatorTools.map((tool) => ({
    tool,
    label:
      tool.slug === "qr-code-with-logo"
        ? "Logo"
        : QR_MODES[tool.initialType].label,
    icon: icons[tool.initialType],
  }));

  const handleContentTypeChange = (route: string) => {
    router.push(route);
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
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 dark:border-slate-700 dark:bg-slate-800">
      <div className="space-y-4">
        <fieldset>
          <legend className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            QR content type
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {contentTypes.map((type) => (
              <button
                type="button"
                key={type.tool.slug}
                onClick={() => handleContentTypeChange(type.tool.route)}
                aria-pressed={
                  pathname === type.tool.route ||
                  (pathname === "/generator" &&
                    type.tool.initialType === "url" &&
                    type.tool.slug === "url-qr-code-generator")
                }
                aria-label={`${type.label} QR code`}
                className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl border p-1.5 text-[11px] transition-colors sm:min-h-14 sm:p-3 sm:text-xs ${pathname === type.tool.route || (pathname === "/generator" && type.tool.slug === "url-qr-code-generator") ? "border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-200" : "border-slate-300 text-slate-600 hover:border-teal-300 dark:border-slate-600 dark:text-slate-300"}`}
              >
                <span className="text-base">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </fieldset>
        <div className="pt-4 border-t border-slate-200">
          {renderContentForm()}
        </div>
      </div>
    </div>
  );
};
