import assert from "node:assert/strict";
import test from "node:test";
import { generateQRSVG } from "../lib/qr/svg";
import {
  applyQRTemplate,
  getTemplatesForType,
  qrTemplates,
} from "../lib/qr/templates";
import type { QRContent, QRStyling } from "../types";

const baseStyling: QRStyling = {
  foreground: "#000000",
  background: "#ffffff",
  transparent: false,
  errorCorrection: "M",
  size: 320,
  margin: 4,
};
const url: QRContent = { type: "url", data: "https://example.com" };

test("registry contains complete, uniquely identified design presets", () => {
  assert.equal(
    new Set(qrTemplates.map(({ id }) => id)).size,
    qrTemplates.length,
  );
  for (const template of qrTemplates) {
    assert.ok(template.category);
    assert.ok(template.compatibleTypes.length);
    assert.ok(template.settings.foreground);
    assert.ok(template.settings.background);
    assert.ok(template.settings.moduleStyle);
    assert.ok(template.settings.eyeStyle);
    assert.ok(template.settings.eyeColor);
    assert.ok(template.settings.frameStyle);
    assert.ok(template.settings.labelStyle);
    assert.ok(template.settings.errorCorrection);
  }
});

test("selection changes the canonical rendered design while preserving export size", () => {
  const minimal = applyQRTemplate(baseStyling, "minimal-classic");
  const modern = applyQRTemplate(baseStyling, "rounded-modern");
  assert.equal(modern.size, 320);
  assert.notEqual(generateQRSVG(url, minimal), generateQRSVG(url, modern));
  assert.match(generateQRSVG(url, modern), /linearGradient/);
});

test("type-specific registries only expose relevant specialized templates", () => {
  const urlIds = getTemplatesForType("url").map(({ id }) => id);
  const vcardIds = getTemplatesForType("vcard").map(({ id }) => id);
  assert.ok(urlIds.includes("website-launch"));
  assert.ok(!urlIds.includes("business-card"));
  assert.ok(vcardIds.includes("business-card"));
  assert.ok(!vcardIds.includes("website-launch"));
});

test("frame and label are part of canonical SVG used by previews and export", () => {
  const styling = applyQRTemplate(baseStyling, "scan-me-frame");
  const svg = generateQRSVG(url, styling);
  assert.match(svg, /SCAN ME/);
  assert.match(svg, /stroke-width/);
});

test("uploaded images are embedded and templates preserve scan-safe settings", () => {
  const withLogo: QRStyling = {
    ...baseStyling,
    logoDataUrl: "data:image/webp;base64,dGVzdA==",
    logoSize: 18,
    margin: 1,
  };
  const minimal = applyQRTemplate(withLogo, "minimal-classic");
  assert.equal(minimal.errorCorrection, "H");
  assert.ok(minimal.margin >= 4);
  assert.equal(minimal.logoSupport, true);
  const svg = generateQRSVG(url, minimal);
  assert.match(svg, /<image href="data:image\/webp;base64,dGVzdA=="/);
  assert.match(svg, /fill="#ffffff"/);
});
