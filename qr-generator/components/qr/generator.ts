import { qrSVGDataURL } from "../../lib/qr/svg";
import type { QRContent, QRStyling } from "../../types";

/** Compatibility facade for the canonical SVG renderer. */
export class QRGenerator {
  static generateQRCode(content: QRContent, styling: QRStyling): string {
    return qrSVGDataURL(content, styling);
  }
}
