# QR Studio

QR Studio is a browser-based static QR code generator built with Next.js App Router. It creates URL, text, WiFi, email, phone, vCard and calendar-event codes, supports visual customization and logo placement, and exports PNG, SVG and PDF.

## Local development

```bash
cd qr-generator
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS production origin. AdSense is optional and requires `NEXT_PUBLIC_ADSENSE_CLIENT_ID` plus the relevant slot variables. The repository also contains the project's existing Monetag integration; review advertising, consent and privacy obligations before deployment.

## Validation

```bash
npm run lint
npm run build
```

There is currently no automated unit or browser-test suite. Do not infer test coverage from these two checks. See `docs/` for the SEO audit, implementation status and owner actions.
