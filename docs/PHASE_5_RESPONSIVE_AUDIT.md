# Phase 5 responsive audit

## Scope and method

The shared layouts and components used by the home page, `/generator`, all five
specialized tools, guides, header, footer, forms, preview and downloads were
reviewed at 320, 360, 375, 390, 430, 768, 1024 and 1440 CSS pixels. The review
covered source-level responsive constraints and production builds. Automated
browser capture was unavailable because the package registry returned HTTP 403
for Playwright and no browser executable is installed, so no screenshots are
claimed.

## Findings and fixes

| Area | Severity | Problem | Fix applied |
| --- | --- | --- | --- |
| Main navigation | High | Generator, QR tools and Guides links were hidden below `md`, leaving only the create action. | Added a keyboard-operable shared mobile disclosure menu with 44px minimum target sizing and the same destinations as desktop. |
| QR preview | High | A fixed 256px minimum image plus nested card padding could overflow a 320px viewport. | Removed fixed minimum dimensions, added intrinsic width/height, a responsive maximum width and reduced narrow-screen card padding. |
| Generator cards | Medium | Repeated 24px nested padding cramped forms and preview on narrow phones. | Uses 16px padding on phones and restores 24px from `sm`. |
| Form controls | Medium | Flex/grid children and long native control values could exceed their column. | Added `min-width: 0`, full width and consistent dark-mode input styles. |
| Type selection | Medium | Seven compact type buttons had limited touch area. | Enforced a 56px minimum height while retaining the same shared control set. |
| Downloads | Medium | Three vertically stacked downloads required unnecessary scrolling. | Uses three compact, equal options on phones with larger spacing at `sm`; formats and behavior are unchanged. |
| Manual refresh | Low | The primary generator action was narrow and less convenient for thumbs. | Made it a full-width 48px-high action on phones and intrinsic width on larger screens. |
| Layout containment | Medium | Unexpected long descendants could create page-level horizontal scrolling. | Added clipping at the generator container as a final containment guard while fixing the known fixed-width source. |

## Route review

- Home and guides use shared max-width containers, responsive padding, wrapping
  card grids and the same `SiteHeader`/`SiteFooter`.
- `/generator` and all five specialized routes use the same `QRGenerator`;
  therefore content selection, customization, logo upload, preview and downloads
  retain identical behavior at every viewport.
- Specialized routes retain their initial type and server-rendered content; no
  mobile-only page, component or JavaScript viewport detection was introduced.
- Tablet and desktop retain the existing two-column generator at `lg`, including
  the sticky preview, while smaller widths stack in document order.

## Remaining issues

- Real-device Safari, Firefox and Chromium testing remains required.
- Menu dismissal on outside click is browser-native rather than enhanced; links,
  keyboard activation and focus remain functional.
- Lighthouse and visual-regression baselines should be captured in CI or a host
  with an installed browser.
