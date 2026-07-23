import assert from "node:assert/strict";
import test from "node:test";
import { QR_MODES } from "../lib/qr/modes";
import { serializeQRContent } from "../lib/qr/serialize";
import { specializedTools, TOOL_SLUGS } from "../lib/seo/tools";

const sitemapSource = require("node:fs").readFileSync("app/sitemap.ts", "utf8");

test("Phase 6 registry has ten unique, metadata-complete supported tools", () => {
  assert.equal(TOOL_SLUGS.length, 10);
  assert.equal(new Set(TOOL_SLUGS).size, TOOL_SLUGS.length);
  for (const tool of specializedTools) {
    assert.ok(
      tool.title && tool.description && tool.heading && tool.faq.length,
    );
    assert.equal(QR_MODES[tool.initialType].supported, true);
  }
});

test("sitemap derives entries from the complete tool registry", () => {
  assert.match(sitemapSource, /specializedTools\.map/);
});

test("email serialization creates an encoded mailto draft", () => {
  assert.equal(
    serializeQRContent({
      type: "email",
      data: {
        address: "hello@example.com",
        subject: "A & B",
        body: "line one\nline two",
      },
    }),
    "mailto:hello@example.com?subject=A+%26+B&body=line+one%0Aline+two",
  );
});

test("phone serialization creates a tel URI", () => {
  assert.equal(
    serializeQRContent({ type: "phone", data: "+12025550123" }),
    "tel:+12025550123",
  );
});

test("event serialization escapes text and documents floating local times", () => {
  const value = serializeQRContent({
    type: "event",
    data: {
      title: "Launch, day",
      description: "Line 1\nLine 2",
      location: "Hall; A",
      startTime: "2026-08-01T09:30",
      endTime: "2026-08-01T10:30",
      timezone: "America/New_York",
    },
  });
  assert.match(value, /SUMMARY:Launch\\, day/);
  assert.match(value, /DTSTART:20260801T0930/);
  assert.match(value, /LOCATION:Hall\\; A/);
  assert.doesNotMatch(value, /TZID/);
});
