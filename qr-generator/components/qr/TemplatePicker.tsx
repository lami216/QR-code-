import { qrSVGDataURL } from "../../lib/qr/svg";
import { applyQRTemplate, getTemplatesForType } from "../../lib/qr/templates";
import type { QRContent, QRStyling } from "../../types";

interface TemplatePickerProps {
  content: QRContent;
  styling: QRStyling;
  onChange: (styling: QRStyling) => void;
}
export function TemplatePicker({
  content,
  styling,
  onChange,
}: TemplatePickerProps) {
  return (
    <section
      aria-labelledby="template-heading"
      className="rounded-xl border border-gray-100 bg-white p-3 shadow-lg sm:p-6 dark:border-gray-700 dark:bg-gray-800"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-teal-700 dark:text-teal-400">
        Design templates
      </p>
      <h2
        id="template-heading"
        className="mt-1 text-xl font-semibold text-gray-900 dark:text-white"
      >
        Choose your QR style
      </h2>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Real previews use your current {content.type} data. Swipe to explore.
      </p>
      <div className="-mx-3 mt-4 flex snap-x gap-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 xl:grid-cols-4">
        {getTemplatesForType(content.type).map((template) => {
          const candidate = applyQRTemplate(styling, template.id);
          const selected = styling.template === template.id;
          return (
            <button
              key={template.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(candidate)}
              className={`w-36 shrink-0 snap-start rounded-xl border p-2 text-center transition sm:w-auto ${selected ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20 dark:bg-teal-950/30" : "border-gray-200 hover:border-teal-400 dark:border-gray-700"}`}
            >
              {/* biome-ignore lint/performance/noImgElement: renderer output is an in-memory SVG */}
              <img
                src={qrSVGDataURL(content, { ...candidate, size: 144 })}
                alt={`${template.name} QR preview`}
                width="144"
                height="144"
                className="mx-auto aspect-square w-full rounded-lg object-contain"
              />
              <span className="mt-2 block text-sm font-bold text-gray-900 dark:text-white">
                {template.name}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
