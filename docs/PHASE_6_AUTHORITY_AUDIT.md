# Phase 6 authority-page audit

## Scope and method

Starting commit: `a493ce4`. The five Phase 2 routes were reviewed for intent, content, generator placement, navigation, metadata, visible/schema FAQs, and the path from explanation to export.

## Shared strengths

- Each route matches a distinct task and puts the shared working generator immediately after a unique H1 and introduction.
- Canonical, Open Graph, and Twitter metadata already use the production origin.
- Breadcrumbs, visible FAQs, matching FAQ schema, related tools, guides, and the general generator establish a sound conversion path.
- Content accurately distinguishes static codes and browser-side generation.

## Shared weaknesses

- The pages have only one practical example each and no explicit “use cases” heading.
- FAQ coverage is useful but narrow; device-specific behavior still requires hands-on testing.
- WebApplication schema was present globally but not emitted by each tool page.
- Related links were limited to the original five-tool registry.

## Page findings and opportunities

| Page | Strength | Weakness / risk | Improvement |
| --- | --- | --- | --- |
| WiFi | Exact SSID/security guidance and history privacy note | Scanner support and enterprise networks vary | Retain guest-network and final-print testing guidance; never imply guaranteed joining |
| URL | Clear direct/static destination model | No malware scanning or redirect control | Keep complete HTTPS and mobile destination checks; connect menu/social use cases |
| vCard | Enumerates actual vCard 3.0 fields | Contact apps map fields differently; public personal data risk | Keep minimum-data guidance and multi-app import tests |
| Logo | Explains obstruction and error correction | Styling can look successful while scanning fails | Retain final-size testing and quiet-zone/contrast warnings |
| Text | Clear offline payload distinction | Long or sensitive content creates risk | Retain concise-message and no-secrets guidance |

## Implemented recommendation

Preserve the early shared generator and unique copy, expand the registry to useful adjacent tools, emit per-page WebApplication schema, and keep visible FAQ/schema parity. The five existing pages already contain how-it-works, steps, a real example/use case, mistakes, limitations/privacy, FAQs, related tools, and relevant guides; Phase 6 strengthens their cross-links without adding filler.
