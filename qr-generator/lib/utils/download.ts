import type { QRContent, QRStyling } from "../../types";
import { generateQRSVG } from "../qr/svg";

export type DownloadFormat = "PNG" | "SVG" | "PDF";

export async function downloadQRCode(
  qrDataURL: string,
  format: DownloadFormat,
  styling: QRStyling,
  content: QRContent,
) {
  if (format === "PNG") return triggerDownload(qrDataURL, "png");
  if (format === "SVG") {
    const blob = new Blob([generateQRSVG(content, styling)], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    triggerDownload(url, "svg");
    setTimeout(() => URL.revokeObjectURL(url), 0);
    return;
  }

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const qrSize = Math.min(pageWidth * 0.8, styling.size);
  pdf.addImage(qrDataURL, "PNG", (pageWidth - qrSize) / 2, 40, qrSize, qrSize);
  pdf.text("Generated QR Code", pageWidth / 2, 30, { align: "center" });
  pdf.save(`qrcode-${Date.now()}.pdf`);
}

function triggerDownload(url: string, extension: string) {
  const link = document.createElement("a");
  link.download = `qrcode-${Date.now()}.${extension}`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
