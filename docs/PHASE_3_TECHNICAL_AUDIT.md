# Phase 3 technical audit

## Current architecture

The client-side `QRGenerator` composes typed content controls, styling controls,
canvas preview, downloads, and local history. `useQRGenerator` owns state and a
debounced generation path. Mode definitions create initial discriminated content
shapes. Serialization is centralized in `lib/qr/serialize.ts`; both canvas and
SVG generation consume it. The `qrcode-generator` library selects the smallest
QR version that fits and applies the requested error correction level.

## Findings and fixes

- **Export:** SVG previously embedded the PNG preview in an `<image>`. SVG is now
  generated from the QR matrix using vector rectangles or circles, a viewBox,
  quiet zone, colors, transparency, and optional gradient. PNG and PDF retain
  their established raster workflows. Logo fields exist in styling, but the
  current renderer does not composite a logo in any format; no false SVG logo
  support was added.
- **Serialization:** WiFi reserved characters are escaped. vCard 3.0 now uses
  CRLF, structured `N`/`ADR` fields, and text escaping. iCalendar output now has
  VCALENDAR framing, CRLF, escaped text, and compact local date-time values.
  Unicode is passed through unchanged.
- **Privacy:** WiFi history remains disabled. On history load, legacy WiFi items
  are removed and safe, unrelated items are immediately written back.
- **Types:** QR content is now a discriminated union rather than a record of
  `any`, eliminating unsafe title-generation casts.

## Known risks and limitations

- QR payload capacity depends on content bytes and error correction; the UI does
  not yet present a preflight byte/capacity meter.
- Event times are floating local times. The stored timezone is not emitted as a
  VTIMEZONE definition; consumers may interpret them in the importing device's
  zone.
- vCard line folding for very long values is not implemented.
- Browser downloads depend on Blob URLs and programmatic anchors. Safari/iOS
  download and Web Share behavior still require physical-device checks.
- PDF is intentionally raster-backed. SVG is vector, but logo compositing is not
  implemented because logo rendering was not functional before this phase.
- Browser automation could not be installed because the package registry denied
  `@playwright/test` with HTTP 403. Unit/integration coverage was expanded, but
  Chrome, Firefox, WebKit, mobile viewport, dark mode, keyboard, and scanner
  checks remain manual.

## Performance and compatibility review

Generation is local and the 300 ms debounce limits matrix/canvas work. PDF stays
behind a dynamic import. AdSense remains conditional and no ad network was
added. The second 800 ms component delay remains technical debt because it adds
latency on top of the hook debounce. File/blob APIs, canvas, localStorage, and
Web Share should be tested on the supported browser matrix before release.

## Recommended follow-up

Install Playwright when registry access is available; run Chromium, Firefox,
WebKit, and mobile projects. Add scanner fixtures for all structured payloads,
implement timezone-aware event export and line folding, define intentional logo
behavior for every export, and consolidate the duplicate debounce paths.
