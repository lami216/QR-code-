# SEO and owner actions

1. Set `NEXT_PUBLIC_SITE_URL=https://studioqr.online` in production and do not substitute a preview URL.
2. Deploy the committed build, fetch rendered HTML, and verify canonical, Open Graph, JSON-LD, robots and sitemap URLs.
3. Test redirects from all three legacy generator aliases.
4. Decide whether to configure AdSense. If enabled, supply only owner-controlled environment IDs and implement the consent behavior required for served regions.
5. Have qualified counsel review privacy, advertising, contact and retention disclosures; repository text is not a compliance certification.
6. Manually test every payload type, scanner behavior, PNG/SVG/PDF downloads, logo output, local-history clearing, keyboard navigation, dark mode and responsive layout.
7. Measure Lighthouse and real-user Core Web Vitals; do not infer performance from build success.
8. Verify the canonical domain in Google Search Console and submit `/sitemap.xml` after production checks pass.
9. Monitor crawl, indexing and canonical reports before expanding content from real search data.

## Phase 2 deployment checks

- Fetch all five production tool routes and validate canonical, Open Graph, Twitter, BreadcrumbList and FAQPage output.
- Perform keyboard, small-screen, dark-mode and screen-reader spot checks.
- Scan representative WiFi, URL, vCard, logo and text exports on relevant physical devices; unit tests do not establish scanner compatibility.
- Confirm WiFi entries never appear in local history on browsers that already have older history; clear any historic sensitive entries created before Phase 2.
