# SEO internal linking architecture

## Intended hierarchy

- **Homepage (`/`)** introduces QR Studio and links to the broad generator, five popular tools and the guides hub.
- **Generator (`/generator`)** serves broad creation intent and links to specialized tools plus print, troubleshooting, logo and static/dynamic guidance.
- **Specialized tools** always link back to the all-purpose generator, two related tools and up to two guides selected by the guide registry.
- **Guides (`/guides/...`)** link to the tools needed to apply the advice, the all-purpose generator and two related guides.
- **Global navigation** exposes Generator, QR tools and Guides. The footer keeps a short curated list rather than a keyword directory.

## Implementation

Tool relationships live in `lib/seo/tools.ts`. Guide relationships and tool associations live in `lib/seo/guides.ts`. `ToolLinks`, `GuideCard`, `Breadcrumbs` and contextual sections render crawlable Next.js links with descriptive anchor text. The sitemap reads both registries, so a reviewed entry can be added once without duplicating route lists.

## Anchor and quality rules

- Describe the destination or task; avoid repeated exact-match keyword anchors in body copy.
- Link only when the destination helps complete the current task.
- Keep global navigation short and put detailed relationships in context.
- No orphaned indexable tools or guides.
- No hidden links, generated keyword clouds or oversized footer lists.
- When a guide or tool is retired, update both registries, incoming links and the sitemap in the same change.

## Validation checklist

1. Build every route with `npm run build`.
2. Inspect generated route output for the guide hub and all five guide slugs.
3. Search source `href` values and compare application routes.
4. Confirm breadcrumbs match both visible hierarchy and BreadcrumbList JSON-LD.
5. Confirm each specialized tool links to `/generator`, related tools and at least one relevant guide.
6. Confirm each guide links to at least one related tool.
