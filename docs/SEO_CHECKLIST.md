# SEO checklist

| Check | Phase 1 status | Evidence / remaining action |
|---|---|---|
| Canonical production origin | Done in code | Central fallback and normalized URL builder use `https://studioqr.online`; verify deployed HTML |
| Absolute canonicals | Done in code | Shared metadata helper; inspect production routes |
| Robots and sitemap origin | Done in code | Both consume shared site configuration; fetch after deploy |
| Structured data origin | Done in code | Web application, breadcrumbs and articles share URL builder; validate deployed output |
| Legacy alias redirects | Preserved | Verify production HTTP status and destination |
| Intrusive advertising cleanup | Done in code | Loader and advertising service worker removed; inspect network after deploy |
| Optional display ads | Done in code | Valid client plus per-position slot required; consent/legal review remains |
| Reusable generator boundary | Done in code | Typed initial mode and server route wrapper; no specialized routes yet |
| Lint | Pre-existing failure | Formatting/lint debt remains outside Phase 1 scope |
| Build | Required | Run and record final production build |
| Browser/accessibility/scanner tests | Manual | Test deployed mobile, keyboard, dark mode, downloads, logo and every payload |
| Search Console and sitemap submission | Owner action | Complete only after production validation |

## Phase 2 checks

- [x] Exactly five specialized canonical routes configured and built.
- [x] Unique title, description, canonical, Open Graph and Twitter values derive from typed configuration.
- [x] Visible FAQ matches FAQPage JSON-LD; visible breadcrumbs match BreadcrumbList JSON-LD.
- [x] Homepage, generator, guide hub and specialized pages provide crawlable paths into the tool cluster.
- [x] Sitemap includes the five canonical routes and no specialized aliases or query URLs.
- [ ] Validate production-rendered metadata and structured data after deployment.
