import assert from "node:assert/strict";
import test from "node:test";
import { applyQRTemplate, qrTemplates } from "../lib/qr/templates";
import type { QRStyling } from "../types";

const baseStyling: QRStyling = {
  foreground: "#000000",
  background: "#ffffff",
  transparent: false,
  errorCorrection: "M",
  size: 320,
  margin: 4,
};

test("template registry contains the eight requested unique designs", () => {
  assert.deepEqual(
    qrTemplates.map(({ name }) => name),
    ["Minimal", "Modern", "Business", "Gradient", "Elegant", "Colorful", "Logo Ready", "Print Safe"],
  );
  assert.equal(new Set(qrTemplates.map(({ id }) => id)).size, 8);
  for (const template of qrTemplates) {
    assert.ok(template.description);
    assert.ok(template.settings.foreground);
    assert.ok(template.settings.background);
    assert.ok(template.settings.moduleStyle);
    assert.ok(template.settings.eyeStyle);
  }
});

test("applying a template preserves output size and updates all shared styling", () => {
  const selected = applyQRTemplate(baseStyling, "logo-ready");
  assert.equal(selected.template, "logo-ready");
  assert.equal(selected.errorCorrection, "H");
  assert.equal(selected.margin, 8);
  assert.equal(selected.size, 320);
});
