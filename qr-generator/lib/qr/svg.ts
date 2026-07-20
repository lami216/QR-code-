import QRCode from "qrcode-generator";
import type { QRContent, QRStyling } from "../../types";
import { serializeQRContent } from "./serialize";

const xml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Build a self-contained, genuinely vector QR image without raster image tags. */
export function generateQRSVG(content: QRContent, styling: QRStyling): string {
  const qr = QRCode(0, styling.errorCorrection);
  qr.addData(serializeQRContent(content));
  qr.make();

  const count = qr.getModuleCount();
  const quietZone = Math.max(0, styling.margin);
  const viewSize = count + quietZone * 2;
  const moduleStyle = styling.moduleStyle ?? "square";
  const foreground = xml(styling.foreground);
  const gradient = styling.colorMode === "gradient";
  const fill = gradient ? "url(#qr-gradient)" : foreground;
  const shapes: string[] = [];

  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (!qr.isDark(row, col)) continue;
      const x = quietZone + col;
      const y = quietZone + row;
      if (moduleStyle === "dots") {
        shapes.push(`<circle cx="${x + 0.5}" cy="${y + 0.5}" r="0.42"/>`);
      } else if (moduleStyle === "rounded") {
        shapes.push(
          `<rect x="${x + 0.08}" y="${y + 0.08}" width="0.84" height="0.84" rx="0.22"/>`,
        );
      } else {
        shapes.push(`<rect x="${x}" y="${y}" width="1" height="1"/>`);
      }
    }
  }

  const background = styling.transparent
    ? ""
    : `<rect width="${viewSize}" height="${viewSize}" fill="${xml(styling.background)}"/>`;
  const defs = gradient
    ? `<defs><linearGradient id="qr-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${xml(styling.gradientStart ?? styling.foreground)}"/><stop offset="1" stop-color="${xml(styling.gradientEnd ?? styling.foreground)}"/></linearGradient></defs>`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${styling.size}" height="${styling.size}" viewBox="0 0 ${viewSize} ${viewSize}" shape-rendering="geometricPrecision" role="img" aria-label="Generated QR code">${defs}${background}<g fill="${fill}">${shapes.join("")}</g></svg>`;
}
