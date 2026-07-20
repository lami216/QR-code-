import assert from "node:assert/strict";
import test from "node:test";
import { historyWithSafeItem, sanitizeHistory } from "../lib/qr/history";
import {
  createInitialQRContent,
  QR_TYPE_KEYS,
  resolveQRType,
} from "../lib/qr/modes";
import { serializeQRContent } from "../lib/qr/serialize";
import { generateQRSVG } from "../lib/qr/svg";
import { siteUrl } from "../lib/seo/metadata";
import { specializedTools, toolPath } from "../lib/seo/tools";
import type { QRHistoryItem, QRStyling } from "../types";

const style: QRStyling = {
  foreground: "#000",
  background: "#fff",
  transparent: false,
  errorCorrection: "M",
  size: 256,
  margin: 4,
};

test("every supported mode resolves with its matching initial shape", () => {
  for (const type of QR_TYPE_KEYS) {
    assert.equal(resolveQRType(type), type);
    assert.equal(createInitialQRContent(type).type, type);
  }
  assert.equal(resolveQRType("unknown"), "text");
  assert.deepEqual(createInitialQRContent("unknown"), {
    type: "text",
    data: "",
  });
});

test("specialized configuration has exactly five complete unique routes", () => {
  assert.equal(specializedTools.length, 5);
  assert.equal(new Set(specializedTools.map((x) => x.slug)).size, 5);
  assert.equal(new Set(specializedTools.map((x) => toolPath(x.slug))).size, 5);
  for (const tool of specializedTools) {
    assert.ok(QR_TYPE_KEYS.includes(tool.initialType));
    assert.ok(
      tool.title && tool.description && tool.heading && tool.faq.length,
    );
  }
});

test("serializes URL, text, WiFi and current vCard 3.0 output", () => {
  assert.equal(
    serializeQRContent({ type: "url", data: "example.com/path" }),
    "https://example.com/path",
  );
  assert.equal(
    serializeQRContent({ type: "text", data: "Short note" }),
    "Short note",
  );
  assert.equal(
    serializeQRContent({
      type: "wifi",
      data: { ssid: "Guest", password: "coffee", encryption: "WPA" },
    }),
    "WIFI:S:Guest;T:WPA;P:coffee;;",
  );
  assert.equal(
    serializeQRContent({
      type: "vcard",
      data: {
        firstName: "Ada",
        lastName: "Lovelace",
        email: "ada@example.com",
        phone: "+44123",
        company: "Analytical",
        title: "Programmer",
        website: "https://example.com",
        address: "London",
      },
    }),
    "BEGIN:VCARD\r\nVERSION:3.0\r\nN:Lovelace;Ada;;;\r\nFN:Ada Lovelace\r\nEMAIL:ada@example.com\r\nTEL:+44123\r\nORG:Analytical\r\nTITLE:Programmer\r\nURL:https://example.com\r\nADR:;;London;;;;\r\nEND:VCARD",
  );
});

test("serialization safely preserves unicode and escapes structured formats", () => {
  for (const text of ["English text", "مرحبا بالعالم", "QR 😀"]) {
    assert.equal(serializeQRContent({ type: "text", data: text }), text);
  }
  assert.equal(
    serializeQRContent({
      type: "url",
      data: "https://example.com/path?a=1&b=2",
    }),
    "https://example.com/path?a=1&b=2",
  );
  assert.equal(
    serializeQRContent({
      type: "wifi",
      data: { ssid: "Office; 5G", password: 'p\\a:ss;"', encryption: "WPA" },
    }),
    'WIFI:S:Office\\; 5G;T:WPA;P:p\\\\a\\:ss\\;\\";;',
  );
  const event = serializeQRContent({
    type: "event",
    data: {
      title: "Launch, Europe",
      description: "Line one\nLine two; details",
      location: "Café",
      startTime: "2026-08-01T09:30",
      endTime: "2026-08-01T10:30",
      timezone: "Europe/Paris",
    },
  });
  assert.match(event, /DTSTART:20260801T0930\r\n/);
  assert.match(event, /DESCRIPTION:Line one\\nLine two\\; details/);
});

test("SVG export is valid vector structure without embedded raster data", () => {
  const svg = generateQRSVG({ type: "text", data: "Vector test مرحبا" }, style);
  assert.match(svg, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(svg, /<svg[^>]+viewBox=/);
  assert.match(svg, /<(rect|circle)\b/);
  assert.doesNotMatch(svg, /<image\b|data:image\/png/i);
  assert.equal((svg.match(/<svg\b/g) ?? []).length, 1);
  assert.equal((svg.match(/<\/svg>/g) ?? []).length, 1);
});

test("legacy history migration removes only WiFi entries", () => {
  const safe: QRHistoryItem = {
    id: "text",
    content: { type: "text", data: "keep me" },
    styling: style,
    timestamp: 2,
  };
  const legacyWifi: QRHistoryItem = {
    id: "wifi",
    content: {
      type: "wifi",
      data: { ssid: "Home", password: "old-secret", encryption: "WPA" },
    },
    styling: style,
    timestamp: 1,
  };
  const migrated = sanitizeHistory([legacyWifi, safe]);
  assert.deepEqual(migrated, [safe]);
  assert.doesNotMatch(JSON.stringify(migrated), /old-secret/);
});

test("WiFi payloads are never added to local history data", () => {
  const wifi: QRHistoryItem = {
    id: "wifi",
    content: {
      type: "wifi",
      data: { ssid: "Guest", password: "secret", encryption: "WPA" },
    },
    styling: style,
    timestamp: 1,
  };
  assert.deepEqual(historyWithSafeItem(wifi, []), []);
  assert.doesNotMatch(JSON.stringify(historyWithSafeItem(wifi, [])), /secret/);
});

test("site helpers keep canonical tool URLs on production origin", () => {
  assert.equal(
    siteUrl("/wifi-qr-code-generator"),
    "https://studioqr.online/wifi-qr-code-generator",
  );
  for (const tool of specializedTools)
    assert.ok(
      siteUrl(toolPath(tool.slug)).startsWith("https://studioqr.online/"),
    );
});
