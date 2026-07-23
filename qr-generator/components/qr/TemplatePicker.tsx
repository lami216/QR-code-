import { applyQRTemplate, qrTemplates } from "../../lib/qr/templates";
import type { QRStyling } from "../../types";

interface TemplatePickerProps {
  styling: QRStyling;
  onChange: (styling: QRStyling) => void;
}

export function TemplatePicker({ styling, onChange }: TemplatePickerProps) {
  return (
    <section
      aria-labelledby="template-heading"
      className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
        Quick QR Templates
      </p>
      <h2
        id="template-heading"
        className="mt-1 text-xl font-semibold text-gray-900 dark:text-white"
      >
        Choose your QR style
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Pick a ready-made design. Your preview and downloads update
        automatically.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
        {qrTemplates.map((template) => {
          const selected = styling.template === template.id;
          const gradient = template.settings.colorMode === "gradient";
          return (
            <button
              key={template.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(applyQRTemplate(styling, template.id))}
              className={`group min-w-0 rounded-xl border p-2 text-left transition sm:p-3 ${selected ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20 dark:bg-teal-950/30" : "border-gray-200 hover:border-teal-400 dark:border-gray-700"}`}
            >
              <span
                className="mb-2 grid h-14 place-items-center rounded-lg"
                style={{ background: template.settings.background }}
              >
                <span
                  className="h-10 w-10 rounded-md border-4 border-current bg-[repeating-conic-gradient(currentColor_0_25%,transparent_0_50%)] bg-[length:8px_8px]"
                  style={{
                    color: gradient
                      ? template.settings.gradientEnd
                      : template.settings.foreground,
                  }}
                />
              </span>
              <span className="block text-sm font-bold text-gray-900 dark:text-white">
                {template.name}
              </span>
              <span className="mt-0.5 hidden text-xs leading-4 text-gray-500 sm:block dark:text-gray-400">
                {template.description}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
