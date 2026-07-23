# Future QR tool roadmap

## Criteria for adding a tool

Add a focused route only when the generator supports the payload end to end, users have a distinct task that is not adequately served by an existing page, and the team can maintain unique guidance. Candidate areas include email, phone, calendar, menus and social profiles, but this list is not a publishing schedule. Search volume alone is insufficient.

## SEO requirements

- One primary intent and a title, description and H1 distinct from the homepage and general generator.
- A self-canonical production URL plus unique Open Graph and Twitter metadata through `pageMetadata`.
- Visible breadcrumb and matching BreadcrumbList; FAQPage only when the exact Q&A is visible.
- Links from the appropriate discovery surface and contextual links to useful guides.
- Addition to the typed tool registry and sitemap only when the route is complete and indexable.
- No location swaps, near-duplicate keyword variants or unsupported superlatives.

## Content requirements

Explain what the payload contains, how to create it, a realistic example, testing steps, common mistakes, privacy implications and static limitations. Copy must be specific to the tool and reviewed against actual behavior. Do not publish a placeholder, paraphrase another tool page or invent reviews, usage totals or performance claims.

## Technical requirements

1. Add and test a payload mode, initial state, validation and safe serialization.
2. Confirm history handling is appropriate for the sensitivity of the payload.
3. Add a typed `ToolConfig`, page metadata and a server-rendered page around the existing generator.
4. Add relevant guide associations rather than hard-coded sitewide link lists.
5. Test accessibility, keyboard use, mobile layout, PNG/SVG/PDF export and representative scanner behavior.
6. Run lint, unit tests and production build; avoid new client boundaries or dependencies unless essential.
7. Measure bundle impact and preserve the early interactive generator.

## Suggested evaluation order

Email and phone modes already exist in the broad generator and could be evaluated first if users need focused instructions. Calendar needs careful interoperability testing. Menu and social-media routes should be rejected unless they introduce a genuinely distinct supported workflow rather than simply wrapping a URL.

## Phase 6 status (July 2026)

Implemented focused email (`mailto:`), phone (`tel:`), calendar (VCALENDAR), URL-based menu, and one-profile social URL tools through the shared generator. A hosted menu content system and hosted social multi-link pages remain intentionally out of scope; their data, ownership, publishing, abuse, privacy, and accessibility requirements are documented in `FUTURE_MENU_QR_REQUIREMENTS.md`.

Before expanding tool count again, prioritize calendar timezone-aware serialization, input validation, cross-device import fixtures, and user-controlled history/privacy settings.
