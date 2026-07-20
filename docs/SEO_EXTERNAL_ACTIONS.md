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
