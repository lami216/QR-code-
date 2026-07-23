import type { QRContent, QRStyling } from "../../types";
import { generateQRSVG } from "../qr/svg";

export type DownloadFormat = "PNG" | "SVG" | "PDF";

export async function downloadQRCode(
  qrDataURL: string,
  format: DownloadFormat,
  styling: QRStyling,
  content: QRContent,
) {
  if (format === "PNG")
    return triggerDownload(await rasterize(qrDataURL, styling.size), "png");
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
  const png = await rasterize(qrDataURL, Math.max(512, styling.size));
  pdf.addImage(png, "PNG", (pageWidth - qrSize) / 2, 40, qrSize, qrSize);
  pdf.text("Generated QR Code", pageWidth / 2, 30, { align: "center" });
  pdf.save(`qrcode-${Date.now()}.pdf`);
}

function rasterize(url: string, width: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      const ratio = image.naturalHeight / image.naturalWidth;
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = Math.round(width * ratio);
      const context = canvas.getContext("2d");
      if (!context) return reject(new Error("Unable to create export canvas"));
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => reject(new Error("Unable to rasterize QR design"));
    image.src = url;
  });
}

function triggerDownload(url: string, extension: string) {
  const link = document.createElement("a");
  link.download = `qrcode-${Date.now()}.${extension}`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
