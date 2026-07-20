# Google Search Console setup for studioqr.online

This document prepares owner actions; it does not claim verification, submission or indexing has occurred.

## Verify the domain

1. Add a **Domain property** for `studioqr.online` in Search Console.
2. Copy Google's DNS TXT record into the authoritative DNS provider.
3. Wait for DNS propagation and select **Verify**.
4. Keep the record in DNS after verification. Limit Search Console access to appropriate owners and users.

A URL-prefix property can supplement the domain property, but it does not replace domain-wide verification.

## Submit and inspect

1. Open **Sitemaps** and submit `https://studioqr.online/sitemap.xml`.
2. Confirm Google can fetch it and that listed canonical URLs use HTTPS and the production host.
3. Use **URL Inspection** for the homepage, `/generator`, `/guides` and each completed specialized tool.
4. Request indexing for important new or substantially updated pages; do not repeatedly request unchanged URLs.
5. Test `robots.txt`, canonical selection and rendered HTML when inspection reports a discrepancy.

## Monitor

- Review Performance queries and pages by intent; do not interpret impressions as guaranteed rankings.
- Watch Page indexing reasons, sitemap processing and canonical exclusions.
- Review Core Web Vitals by mobile and desktop URL groups, then validate fixes only after deployment.
- Check HTTPS and manual action/security reports.
- Annotate releases so changes in clicks, coverage or vitals can be assessed against deployments.
- Use observed questions and task failures to prioritize content; do not create thin pages for every query variation.
