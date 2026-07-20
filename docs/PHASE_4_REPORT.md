# Phase 4 report: SEO growth architecture

## Release identity

- Branch: `phase-4-seo-growth`
- Starting commit: `4bcca87873276f62aed0562975e9e2f6a1c31d63`
- Production domain: `https://studioqr.online`
- Work date: 2026-07-20

## SEO and architecture changes

The homepage now acts as a product and discovery page rather than trying to own every generator phrase. `/generator` is the broad creation landing page, with the working interface kept before supporting sections. A canonical `/guides` hub and a five-guide, registry-driven architecture connect problem-solving content to real tools. Reusable server components cover breadcrumbs, guide cards and FAQs.

## Homepage changes

- Differentiated metadata and H1 around QR Studio's tool platform.
- Added early popular-tool discovery, concise value/trust content and a guide preview.
- Preserved one H1, real capability statements and crawlable links.
- Kept the FAQ structured data aligned to the visible FAQ.

## Generator changes

- Added a broad, clear H1, short explanation and browser-processing message immediately before the interface.
- Added useful sections for definition, types, steps, customization, exports, static behavior, privacy, use cases and FAQ.
- Added contextual links to specialized tools and relevant guides.
- Added WebApplication, FAQPage and BreadcrumbList JSON-LD matching visible content.

## Guides created

- `/guides`
- `/guides/how-to-create-wifi-qr-code`
- `/guides/qr-code-size-for-print`
- `/guides/qr-code-not-scanning`
- `/guides/static-vs-dynamic-qr-code`
- `/guides/qr-code-with-logo-best-practices`

`/blog` permanently redirects to `/guides`. The former quiet-zone-only article was consolidated into the print and troubleshooting guidance rather than retained as a thin overlapping page.

## Internal linking and navigation

The header exposes Generator, QR tools and Guides; the footer offers a short curated tool/resource list. Tool pages link to the all-purpose generator, related tools and registry-selected guides. Guides link to relevant tools and related guides. Breadcrumb UI and schema now use `/guides` consistently. The sitemap derives guide routes from the content registry.

## Metadata and schema

Every new indexable route uses the shared metadata helper for unique title, description, canonical, Open Graph and Twitter data. Accurate WebApplication schema moved to the broad generator context. FAQPage appears only where the corresponding FAQ is visible. Guides retain Article and BreadcrumbList markup without ratings or reviews.

## Baseline results

- `npm test`: passed 10 tests after Phase 4 coverage was added (8 tests at baseline).
- `npm run build`: passed and generated 23 static routes/pages at baseline and 26 after Phase 4.
- `npm run lint`: failed on 41 pre-existing formatting/import/a11y diagnostics and 38 warnings across legacy files. The same 41 errors and 38 warnings remain repository-wide; a scoped Biome check of all Phase 4 application files passes.

## Performance protection

Guide and SEO components are server components with no new runtime dependency. Guide content is static data, images and heavy media were not added, and the interactive generator remains early in `/generator`. The work does not introduce a CMS or client-side content bundle architecture.

## Remaining opportunities and risks

- Validate production rendering and scanner behavior after deployment; this repository cannot confirm Search Console indexing.
- The shared application bundle remains material and should be profiled with field Core Web Vitals.
- Legacy repository-wide Biome debt can obscure new regressions until separately remediated.
- Some legacy alias routes remain and should be reviewed for redirect/canonical consistency in a later technical cleanup.
- Content should be updated only when product behavior, standards or observed user needs change.

## Phase 5 recommendation

Prioritize measurement and quality rather than more pages: deploy, complete Search Console owner actions, establish Core Web Vitals and query baselines, run accessibility and internal-link crawls, and collect real support questions. Consider one future tool only after those signals show a distinct supported workflow. A technical cleanup of legacy lint debt and alias routes should precede broader expansion.
