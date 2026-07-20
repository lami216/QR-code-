# Phase 1 report: clean foundation

- Branch: `phase-1-clean-foundation`
- Starting commit: `0767971` (`Document SEO audit and owner action plan (#6)`)
- Repository state: the checkout had only local branch `work` and no configured remote refs, so the supplied checkout was the only available latest branch state.

## Advertising cleanup

Removed the intrusive network loader from `app/layout.tsx` and deleted its third-party service worker at `public/sw.js`. Removed related privacy and documentation references. No fallback, commented loader, zone configuration, push, redirect or interstitial integration remains. The deleted service worker was entirely advertising-owned; no unrelated offline cache logic was present in it.

The manual AdSense architecture remains. A client ID is accepted only when it has the expected `ca-pub-` prefix. The global script renders once in the root layout only when that ID is valid. `AdSlot` returns `null` unless both client and slot are configured, and configured slots reserve format-specific height. Owner-selected banner/content/sidebar positions remain separated from essential generator and download controls.

Required production variables:

```dotenv
NEXT_PUBLIC_SITE_URL=https://studioqr.online
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-<owner-id>
NEXT_PUBLIC_ADSENSE_BANNER_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_FAQ_SLOT=<owner-slot>
```

AdSense and every slot are optional; no publisher or slot ID is supplied by the repository.

## Domain corrections

The canonical production fallback is `https://studioqr.online`. `lib/seo/metadata.ts` normalizes configured values to a URL origin (therefore removing paths and trailing slashes) and exposes `siteUrl` for safe absolute page URLs. Metadata base, canonicals, Open Graph, Twitter image resolution, breadcrumb/article/application structured data, robots and sitemap now share that configuration. Production must explicitly set the site URL variable above. Preview environments must not override it with a preview hostname; when the variable is absent, the production fallback remains canonical by design.

## Generator foundation

Added a typed source of truth for all seven existing modes, factories for safe initial payloads, runtime type guards and fallback resolution. The shared client shell accepts `initialType`, while the route entry remains a Server Component. Existing content switching, QR renderer, styling, logo flow, local history and PNG/SVG/PDF download implementations were preserved. See `GENERATOR_ARCHITECTURE_AUDIT.md` for findings and risks.

## Changed and deleted files

Changed: root and app READMEs; required SEO documents; privacy page; root layout; robots; sitemap; metadata/site configuration; ad configuration; generator page, shell, form, hook and shared types. Added this report, the architecture audit, `components/qr/QRGenerator.tsx`, and `lib/qr/modes.ts`. Deleted: `qr-generator/public/sw.js`.

## Baseline and unresolved risks

Before changes, `npm install` and `npm run build` passed. `npm run lint` failed with 59 errors and 66 warnings across pre-existing formatting and lint debt. There is no automated unit or browser suite. Deployed manual testing remains required for scanner output, every type, all downloads, logo output, dark mode, mobile layout, consent behavior and actual ad delivery.

## Phase 2 boundary and owner actions

Phase 2 should add regression tests, then create the five explicitly planned specialized Server Component routes around the shared API with unique metadata/content and deliberate navigation/internal links. It must not mass-generate thin pages. The owner must configure the canonical production environment variable, decide whether to configure AdSense, obtain legal review of privacy/consent requirements, test a deployed build, verify ownership in Search Console, and submit the sitemap only after deployment validation.
