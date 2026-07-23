# Phase 6 report — authority pages

## Delivery

- **Branch:** `phase-6-authority-pages`
- **Starting commit:** `a493ce4`
- **Strategy:** strengthen the five existing authority pages, then add exactly five task-focused routes through the shared generator.

## Pages improved

The WiFi, URL, vCard, logo, and text routes retain their early generator, unique explanations, steps, practical example, mistakes, limitations/privacy, visible FAQs, and guide/tool links. The shared template now also emits page-specific WebApplication structured data, and its related-tool registry now spans all ten tools.

## Pages added

- `/email-qr-code-generator` uses the supported `email` mode and accurately describes `mailto:` drafts.
- `/phone-qr-code-generator` uses `phone` and explains `tel:` device behavior and international formatting.
- `/calendar-qr-code-generator` uses `event` and documents its VCALENDAR fields and floating-local-time limitation.
- `/menu-qr-code-generator` honestly uses a URL to an existing hosted menu; QR Studio does not host menu content.
- `/social-media-qr-code-generator` honestly uses one direct public profile URL; it is not a multi-link service.

No requested page was rejected because the existing URL mode supports the deliberately narrow menu and social implementations. Hosted menu and multi-link functionality was rejected and not faked; future architecture requirements are documented separately.

## Architecture, SEO, and internal links

All pages instantiate the shared server-rendered `ToolPage` and shared client generator, with no copied generator logic or new dependency. Registry-derived tool lists and sitemap generation automatically include the five routes. Each registry entry supplies a unique intent-led title, description, H1, introduction, FAQs, breadcrumb label, initial type, and related routes. `pageMetadata` supplies canonical, Open Graph, and Twitter values. Tool pages emit visible FAQ content plus matching FAQPage, BreadcrumbList, and WebApplication JSON-LD.

The homepage and generator already render the shared tool list and now expose all ten focused routes. Every focused page links to related tools, the all-purpose generator, relevant matching guides when available, and troubleshooting guidance. The contact page now describes QR Studio and email-provider boundaries without unsupported availability or business claims. About and privacy were reviewed and already accurately distinguish browser processing, local history, and optional configured advertising.

## Validation results

### Baseline at `a493ce4`

- `npm run lint`: failed with 41 pre-existing Biome errors and 38 warnings across legacy files.
- `npm test`: passed 12/12.
- `npm run build`: passed; 26 static pages generated.

### Phase 6

- `npm test`: passed 17/17, including registry uniqueness, supported initial types, metadata completeness, registry-based sitemap inclusion, and email/phone/event serialization.
- `npm run build`: passed; all five new routes were statically generated (31 pages total).
- `npm run lint`: still fails on the pre-existing repository-wide Biome backlog (39 errors, 38 warnings). Phase 6 files produce no diagnostic in the captured lint output; the contact rewrite removed two legacy errors.
- Route generation, sitemap derivation, canonical metadata, visible/schema FAQ parity, and shared-generator preservation were checked through tests and production build output.

## Remaining risks

- Calendar date-times are floating local values: the current timezone field is not serialized as `TZID` and values are not converted to UTC. Cross-timezone use requires explicit testing.
- Scanner, mail, dialer, contact, and calendar behavior varies by platform; automated serialization tests cannot replace a physical-device matrix.
- URL-based menu and social pages depend on third-party destinations remaining public, safe, mobile-friendly, and stable.
- Non-WiFi QR payloads can remain in local browser history; the finished static pattern is readable by anyone who obtains it.
- Repository-wide lint debt remains outside Phase 6.

## Phase 7 recommendation

Prioritize reliability rather than more landing pages: add timezone-aware iCalendar serialization and validation, test fixtures from major calendar/mail/scanner apps, explicit local-history controls, automated metadata/JSON-LD assertions against rendered pages, and a small physical-device accessibility and print test matrix. Do not add hosted menu or multi-link products without the ownership, data, abuse, privacy, and publishing architecture in the future-requirements document.
