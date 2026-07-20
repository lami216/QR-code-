# QR Studio application

The Next.js App Router application for QR Studio. QR payloads and images are generated in the browser; generator history is stored in browser local storage. The shared client generator accepts a typed initial mode while route content and metadata remain server-rendered.

## Commands

```bash
npm install
npm run lint
npm run build
npm run dev
```

## Production configuration

Set `NEXT_PUBLIC_SITE_URL=https://studioqr.online`. Optional fixed-position AdSense uses `NEXT_PUBLIC_ADSENSE_CLIENT_ID` and the `NEXT_PUBLIC_ADSENSE_{BANNER,CONTENT,SIDEBAR,FAQ}_SLOT` variables. The AdSense script is omitted without a valid client ID, and individual slots are omitted without a slot ID. Do not add publisher IDs to source control.

See the repository README and `docs/` for the architecture audit, Phase 1 report, SEO decisions and manual validation requirements.
