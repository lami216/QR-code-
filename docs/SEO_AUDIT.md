# Technical SEO audit

Audit updated 2026-07-20 for Phase 1. The canonical production origin is `https://studioqr.online`, centralized in `qr-generator/lib/seo/metadata.ts`. Absolute canonical, Open Graph and structured-data URLs use the same URL builder as robots and sitemap. The environment must set `NEXT_PUBLIC_SITE_URL=https://studioqr.online`; preview hostnames must not be used as the canonical value.

The canonical indexable set remains the homepage, `/generator`, guide hub and existing guides, plus trust pages. Legacy generator aliases continue to redirect to `/generator` and are not sitemap entries. No specialized generator routes were created in this phase.

QR payload processing remains client-side. The generator is now reusable through a narrow typed client boundary so future pages can retain server-rendered metadata and route-specific content. Technical risks remain: no automated browser coverage, no field performance data, no deployed canonical/redirect smoke test, and no scanner compatibility suite. AdSense is optional and can introduce third-party requests and consent obligations when configured.

## Phase 2 update

Five indexable specialized tools now provide unique metadata, server-rendered introductions, visible FAQs and focused guidance. Their interactive boundary remains the shared generator. Breadcrumb and FAQ structured data mirror visible UI. Unit tests protect configuration uniqueness and production-origin URL generation. Deployment inspection, Search Console review and field performance remain external checks.
