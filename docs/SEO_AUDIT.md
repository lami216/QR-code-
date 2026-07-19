# SEO audit

## Executive summary and baseline
The starting site had a useful generator but split its principal transactional intent among `/`, `/generator`, `/qr-code-generator`, `/qr-code-maker`, and `/create-qr-code`. Three were copy-only variants. `/generator` is now the dominant tool URL, the variants redirect permanently, `/` remains a product overview, and `/blog` is a real guide hub.

Review date: 2026-07-19. Starting commit: `6f23a398b5560c34d8463fa9586ce47261085d39` (`Fix Monetag script verification (#5)`). The checkout contained only branch `work`; neither `main`, `seo-audit-2026`, nor remote refs existed. Local `main` was created at the supplied latest commit to create the requested working branch. Consequently, unique SEO-branch changes and rebase safety could not be inspected. Monetag/advertising commits `6aca7ce`, `1f10b86`, and `6f23a39` were present and preserved.

Baseline `npm install` passed. Baseline `npm run lint` failed with 68 errors and 69 warnings (existing formatting/import issues and explicit `any`); its chained build did not run and was rerun separately during validation.

## Complete initial route inventory
Counts are visible-word estimates. Incoming/outgoing links summarize site-owned links.

| URL | purpose; target query | metadata/canonical/robots | H1; H2s | words | tool / rendering / schema | links in → out | uniqueness, risk, quality | action |
|---|---|---|---|---:|---|---|---|---|
| `/` | overview; free QR code generator | unique; self; index/follow | Free QR code generator…; benefits, steps, types, FAQ | ~850 | no tool; server; WebApplication + visible FAQ | global → generator/guides/trust | strong but overlaps tool | KEEP as supporting overview |
| `/generator` | transaction; free QR code generator | unique; self; index/follow | QR Studio; content, preview, confidence | ~250 + UI | working tool; client component pre-rendered; none | CTAs/global → home/guides | unique function; initially weak H1/copy | IMPROVE; primary intent |
| `/qr-code-generator` | keyword landing; QR code generator | variant; self; index/follow | generator…; static/customize/print/privacy | ~260 | no; server; none | header → generator | near duplicate, high cannibalization | REDIRECT `/generator` |
| `/qr-code-maker` | styling landing; QR maker/logo | variant; self; index/follow | maker…; logo/colors/styles/static | ~260 | no; server; none | header → generator | functionality absent, high risk | REDIRECT after preserving cautions |
| `/create-qr-code` | short how-to; create QR code | variant; self; index/follow | how to…; four steps | ~260 | no; server; none | global → generator | limited distinction, high overlap | REDIRECT after preserving steps |
| `/blog` | guide summary; QR guides | unique; self; index/follow | practical guides; four summaries | ~250 | no; server; none | global → generator | initially thin/non-hub | IMPROVE |
| `/about` | trust; about QR Studio | unique; self; index/follow | useful creation; approach/privacy/use | ~280 | no; server; none | footer → home | maintainer unavailable | IMPROVE/PARTIAL |
| `/privacy` | disclosure; privacy | layout metadata; self; index/follow | Privacy Policy; processing/storage/services | ~350 | no; initially client; none | footer → contact | inaccurate analytics/tracking claims | IMPROVE urgently |
| `/terms` | terms | layout metadata; self; index/follow | Terms; use/liability | ~500 | no; client; none | footer → home | needs owner/legal review | PARTIAL |
| `/contact` | support | layout metadata; self; index/follow | Get In Touch; email/location/availability | ~250 | presentation only; client; none | footer → home | legacy emails/claims | BLOCKED on owner facts |
| not-found | missing-route UI | inherited | Page not found | low | server | runtime → home | genuine 404 UI | KEEP; validate status |
| `/robots.txt` | crawler controls | technical | n/a | n/a | metadata route | discovery → sitemap | blocked `_next` unnecessarily | IMPROVE |
| `/sitemap.xml` | URL discovery | technical | n/a | n/a | metadata route | robots → routes | redirect URLs/current build dates | IMPROVE |

Post-implementation canonical pages: `/`, `/generator`, `/blog`, three `/guides/...` pages, `/about`, `/privacy`, `/terms`, and `/contact`. Important overview/guide copy is server HTML. Generator client content is pre-rendered by Next. No translated pages exist, so hreflang was not added. No Core Web Vitals result is claimed; manual keyboard, screen-reader, mobile, dark-mode and reduced-motion validation remains.
