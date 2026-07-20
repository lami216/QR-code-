# QR Studio

QR Studio is a browser-based static QR code generator built with Next.js App Router. It creates URL, text, WiFi, email, phone, vCard and calendar-event codes, supports visual customization and logo placement, and exports PNG, SVG and PDF.

## Local development

```bash
cd qr-generator
npm install
npm run dev
```

The only production origin is `https://studioqr.online`. Production must set:

```dotenv
NEXT_PUBLIC_SITE_URL=https://studioqr.online
```

The value is normalized to an origin without a trailing slash. Do not set preview deployments to their preview hostname because that would intentionally change their metadata origin.

## Optional display advertising

Only fixed, owner-selected Google AdSense slots are supported. No popup, push, redirect or interstitial advertising code is present. The script and each slot stay hidden unless their required values exist; IDs are never supplied by this repository.

```dotenv
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-<owner-id>
NEXT_PUBLIC_ADSENSE_BANNER_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_CONTENT_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT=<owner-slot>
NEXT_PUBLIC_ADSENSE_FAQ_SLOT=<owner-slot>
```

## Validation and architecture

```bash
npm run lint
npm run build
```

There is currently no automated unit or browser-test suite. See `docs/GENERATOR_ARCHITECTURE_AUDIT.md`, `docs/PHASE_1_REPORT.md` and the SEO documents for validation limitations and owner actions. No specialized tool routes are included in Phase 1.

## Specialized tools (Phase 2)

QR Studio provides exactly five focused Server Component routes: WiFi, URL, vCard, logo and text generators. Each uses the shared `QRGenerator` with a typed initial mode. Run `npm test` for the lightweight Node/TypeScript regression suite. WiFi payloads are intentionally excluded from browser history.
