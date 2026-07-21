import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const source = (path: string) => readFileSync(path, "utf8");

test("the shared header keeps primary navigation available on mobile", () => {
  const header = source("components/marketing/SiteHeader.tsx");
  assert.match(header, /Open main navigation/);
  for (const destination of [
    "/generator",
    "/generator#qr-tools-heading",
    "/guides",
  ]) {
    assert.match(
      header,
      new RegExp(`href=["']${destination.replace("#", "\\#")}`),
    );
  }
});

test("generator preview and controls include narrow viewport constraints", () => {
  const generator = source("components/qr/QRGenerator.tsx");
  const preview = source("components/qr/QRPreview.tsx");
  const form = source("components/qr/ContentForm.tsx");
  assert.match(generator, /overflow-x-clip/);
  assert.match(preview, /max-w-full/);
  assert.match(form, /min-w-0 w-full/);
});
