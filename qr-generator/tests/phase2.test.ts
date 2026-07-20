import assert from "node:assert/strict";
import test from "node:test";
import { historyWithSafeItem } from "../lib/qr/history";
import {
  createInitialQRContent,
  QR_TYPE_KEYS,
  resolveQRType,
} from "../lib/qr/modes";
import { serializeQRContent } from "../lib/qr/serialize";
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
    "BEGIN:VCARD\nVERSION:3.0\nFN:Ada Lovelace\nEMAIL:ada@example.com\nTEL:+44123\nORG:Analytical\nTITLE:Programmer\nURL:https://example.com\nADR:London\nEND:VCARD",
  );
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
