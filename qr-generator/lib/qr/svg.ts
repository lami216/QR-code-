import QRCode from "qrcode-generator";
import type { QRContent, QRStyling } from "../../types";
import { serializeQRContent } from "./serialize";

const xml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const labelText: Record<NonNullable<QRStyling["labelStyle"]>, string> = {
  none: "",
  "scan-me": "SCAN ME",
  connect: "CONNECT",
  contact: "SAVE CONTACT",
  event: "EVENT PASS",
};

function shape(
  style: QRStyling["moduleStyle"] | QRStyling["eyeStyle"],
  x: number,
  y: number,
  size: number,
) {
  if (style === "dots")
    return `<circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size * 0.42}"/>`;
  if (style === "rounded")
    return `<rect x="${x + size * 0.06}" y="${y + size * 0.06}" width="${size * 0.88}" height="${size * 0.88}" rx="${size * 0.24}"/>`;
  return `<rect x="${x}" y="${y}" width="${size}" height="${size}"/>`;
}

/** Canonical renderer used by template cards, the main preview and every export. */
export function generateQRSVG(content: QRContent, styling: QRStyling): string {
  const qr = QRCode(0, styling.errorCorrection);
  qr.addData(serializeQRContent(content));
  qr.make();
  const count = qr.getModuleCount();
  const quiet = Math.max(0, styling.margin);
  const framed = (styling.frameStyle ?? "none") !== "none";
  const labelled = (styling.labelStyle ?? "none") !== "none";
  const inset = framed ? 2 : 0;
  const footer = labelled ? 5 : 0;
  const codeSize = count + quiet * 2;
  const width = codeSize + inset * 2;
  const height = width + footer;
  const foreground = xml(styling.foreground);
  const eyeColor = xml(styling.eyeColor ?? styling.foreground);
  const fill =
    styling.colorMode === "gradient" ? "url(#qr-gradient)" : foreground;
  const modules: string[] = [];
  const isEye = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= count - 7) || (r >= count - 7 && c < 7);
  for (let row = 0; row < count; row++)
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col) && !isEye(row, col))
        modules.push(
          shape(
            styling.moduleStyle ?? "square",
            inset + quiet + col,
            inset + quiet + row,
            1,
          ),
        );
    }
  const eyes: string[] = [];
  const drawEye = (x: number, y: number) => {
    const style = styling.eyeStyle ?? "square";
    eyes.push(shape(style, x, y, 7));
    eyes.push(
      `<g fill="${xml(styling.background)}">${shape(style, x + 1, y + 1, 5)}</g>`,
    );
    eyes.push(shape(style, x + 2, y + 2, 3));
  };
  drawEye(inset + quiet, inset + quiet);
  drawEye(inset + quiet + count - 7, inset + quiet);
  drawEye(inset + quiet, inset + quiet + count - 7);
  const bg = styling.transparent
    ? ""
    : `<rect width="${width}" height="${height}" rx="${styling.frameStyle === "card" ? 2 : 0}" fill="${xml(styling.background)}"/>`;
  const defs =
    styling.colorMode === "gradient"
      ? `<defs><linearGradient id="qr-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${xml(styling.gradientStart ?? styling.foreground)}"/><stop offset="1" stop-color="${xml(styling.gradientEnd ?? styling.foreground)}"/></linearGradient></defs>`
      : "";
  const dash =
    styling.frameStyle === "ticket" ? ` stroke-dasharray="1.5 1"` : "";
  const frame = framed
    ? `<rect x=".7" y=".7" width="${width - 1.4}" height="${height - 1.4}" rx="1.5" fill="none" stroke="${eyeColor}" stroke-width=".7"${dash}/>`
    : "";
  const label = labelled
    ? `<text x="${width / 2}" y="${height - 1.5}" text-anchor="middle" font-family="Arial,sans-serif" font-size="2.4" font-weight="700" fill="${eyeColor}">${labelText[styling.labelStyle ?? "none"]}</text>`
    : "";
  const logoSpace = styling.logoSupport
    ? `<rect x="${inset + quiet + count / 2 - 3}" y="${inset + quiet + count / 2 - 3}" width="6" height="6" rx="1" fill="${xml(styling.background)}"/>`
    : "";
  const logo = styling.logoDataUrl
    ? `<image href="${xml(styling.logoDataUrl)}" x="${inset + quiet + count / 2 - 2.5}" y="${inset + quiet + count / 2 - 2.5}" width="5" height="5" preserveAspectRatio="xMidYMid meet"/>`
    : "";
  return `<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="${styling.size}" height="${Math.round((styling.size * height) / width)}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Generated QR code">${defs}${bg}${frame}<g fill="${fill}">${modules.join("")}</g><g fill="${eyeColor}">${eyes.join("")}</g>${logoSpace}${logo}${label}</svg>`;
}

export const qrSVGDataURL = (content: QRContent, styling: QRStyling) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(generateQRSVG(content, styling))}`;
