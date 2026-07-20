# Phase 3 quality and reliability report

## Delivery record

- **Branch:** `phase-3-quality-reliability`
- **Starting commit:** `0a9933dc9ee8aeb62c0a33fd166963a5e40e7c29`
- **Scope:** generator types, serialization, SVG/downloads, history migration,
  accessibility semantics, privacy copy, tests, and technical documentation.
- **SEO pages:** none added.

## SVG status before and after

Before Phase 3, the SVG path placed the PNG data URL inside an SVG `<image>`;
the fallback duplicated the same behavior. It was not scalable vector artwork.
The new exporter builds the QR matrix from the serialized payload and emits SVG
`rect`/`circle` geometry with a viewBox, quiet zone, background/transparency,
solid or gradient colors, and module styling. Tests assert XML framing, vector
elements, and absence of `<image>` and PNG data URLs. PNG remains available and
PDF retains its existing PNG-backed jsPDF workflow. Logo compositing was not
functional in the existing renderer, so it remains a documented limitation.

## Correctness, privacy, and quality

- QR content is a discriminated union; generator title logic no longer uses
  `any` casts.
- WiFi escapes backslashes and reserved separators. vCard 3.0 and iCalendar text
  escape delimiters/newlines and use CRLF. Event local date-time syntax is
  compacted without making an unsupported timezone conversion.
- History load now removes all legacy WiFi records and writes the safe remainder
  back immediately. New WiFi items continue to be excluded.
- Content-type buttons expose pressed state and names, groups use fieldset/legend,
  download/share buttons have explicit types, and errors use an assertive alert.
- PDF remains dynamically imported. QR regeneration remains debounced and local;
  no third-party network or advertising integration was added.

## Browser testing

An attempt to install `@playwright/test` returned HTTP 403 from the configured npm
registry policy. Adding a non-runnable harness would be misleading, so no E2E
script was committed. Expanded Node tests cover route configuration, mode shapes,
structured serialization, vector output, privacy migration and canonical URLs.

## Validation results

### Before changes

- `npm install`: passed (dependencies already current).
- `npm run lint`: failed with 51 existing errors and 51 warnings, dominated by
  repository-wide formatting/import diagnostics outside Phase 3.
- `npm test`: passed, 5/5.
- `npm run build`: passed; all 23 static pages generated.

### After changes

- `npm run lint`: failed with 41 errors and 38 warnings in the full repository;
  touched Phase 3 files pass their focused Biome check. This is an improvement
  from baseline formatting caused by formatting touched files only, not an
  unrelated repository-wide cleanup.
- `npm test`: passed, 8/8.
- `npm run build`: passed; all 23 static pages generated and specialized routes,
  robots and sitemap remained present.
- `npm run test:e2e`: unavailable because Playwright installation was denied.

## Remaining risks and manual checks

- Scan exported PNG/SVG/PDF fixtures on multiple physical Android and iOS devices.
- Verify Safari/iOS Blob downloads, Web Share, localStorage migration, keyboard
  flow, dark mode, 320 px layout, touch targets and screen-reader announcements.
- Event VTIMEZONE output, vCard line folding, payload capacity feedback, full logo
  compositing and consolidated debounce behavior remain future work.
- Run Chromium, Firefox and WebKit automation once the dependency and browser
  binaries can be installed.

## Recommended Phase 4 scope

Phase 4 should remain a quality iteration: establish the cross-browser Playwright
matrix, add scanner-backed structured-payload fixtures, implement an explicit
logo/export contract, add capacity preflight, and resolve the remaining generator
debounce and timezone limitations before expanding content.
