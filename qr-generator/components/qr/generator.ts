import QRCode from 'qrcode-generator';
import type { QRContent, QRStyling } from '../../types';
import { serializeQRContent } from '../../lib/qr/serialize';

export class QRGenerator {
  static generateQRCode(content: QRContent, styling: QRStyling): string {
    const qr = QRCode(0, styling.errorCorrection);
    qr.addData(serializeQRContent(content));
    qr.make();

    const moduleCount = qr.getModuleCount();
    const cellSize = Math.max(1, Math.floor((styling.size - styling.margin * 2) / moduleCount));
    const qrSize = cellSize * moduleCount;
    const canvasSize = qrSize + styling.margin * 2;
    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to render QR code');

    if (!styling.transparent) {
      ctx.fillStyle = styling.background;
      ctx.fillRect(0, 0, canvasSize, canvasSize);
    }

    const fill = this.getFillStyle(ctx, styling, canvasSize);
    const eyeStyle = styling.eyeStyle ?? 'square';
    const moduleStyle = styling.moduleStyle ?? 'square';

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!qr.isDark(row, col) || this.isEyeArea(row, col, moduleCount)) continue;
        this.drawModule(ctx, styling.margin + col * cellSize, styling.margin + row * cellSize, cellSize, moduleStyle, fill);
      }
    }

    this.drawEye(ctx, styling.margin, styling.margin, cellSize, eyeStyle, fill, styling.background, styling.transparent);
    this.drawEye(ctx, styling.margin + (moduleCount - 7) * cellSize, styling.margin, cellSize, eyeStyle, fill, styling.background, styling.transparent);
    this.drawEye(ctx, styling.margin, styling.margin + (moduleCount - 7) * cellSize, cellSize, eyeStyle, fill, styling.background, styling.transparent);

    return canvas.toDataURL('image/png');
  }

  private static getFillStyle(ctx: CanvasRenderingContext2D, styling: QRStyling, size: number): string | CanvasGradient {
    if (styling.colorMode !== 'gradient') return styling.foreground;
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, styling.gradientStart ?? styling.foreground);
    gradient.addColorStop(1, styling.gradientEnd ?? styling.foreground);
    return gradient;
  }

  private static drawModule(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, style: QRStyling['moduleStyle'], fill: string | CanvasGradient) {
    ctx.fillStyle = fill;
    if (style === 'dots') {
      ctx.beginPath();
      ctx.arc(x + size / 2, y + size / 2, size * 0.42, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    if (style === 'rounded') {
      this.roundRect(ctx, x + size * 0.08, y + size * 0.08, size * 0.84, size * 0.84, size * 0.22);
      ctx.fill();
      return;
    }
    ctx.fillRect(x, y, size, size);
  }

  private static drawEye(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, style: QRStyling['eyeStyle'], fill: string | CanvasGradient, bg: string, transparent: boolean) {
    const drawShape = (offset: number, modules: number, color: string | CanvasGradient) => {
      ctx.fillStyle = color;
      const pos = x + offset * size;
      const top = y + offset * size;
      const length = modules * size;
      if (style === 'dots') {
        ctx.beginPath();
        ctx.arc(pos + length / 2, top + length / 2, length / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (style === 'rounded') {
        this.roundRect(ctx, pos, top, length, length, size * 0.8);
        ctx.fill();
      } else {
        ctx.fillRect(pos, top, length, length);
      }
    };
    drawShape(0, 7, fill);
    if (!transparent) drawShape(1, 5, bg);
    else ctx.clearRect(x + size, y + size, size * 5, size * 5);
    drawShape(2, 3, fill);
  }

  private static roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  private static isEyeArea(row: number, col: number, count: number): boolean {
    return (row < 7 && col < 7) || (row < 7 && col >= count - 7) || (row >= count - 7 && col < 7);
  }

}
