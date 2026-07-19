# SEO implementation plan

## Search intent and redirect decision (written before redirect implementation)
| cluster | dominant URL | supporting content | decision / preserved value |
|---|---|---|---|
| free QR code generator / QR code generator / create QR code | `/generator` | `/` overview | actual tool dominates; home retains steps; generator retains test/download guidance |
| QR maker / custom QR / logo | `/generator` | future tested logo guide | tool already has styles/logo; preserve contrast/error-correction cautions |
| scanning failures | `/guides/qr-code-not-scanning` | generator | distinct troubleshooting task |
| print size | `/guides/best-qr-code-size-for-print` | generator | distinct print workflow |
| quiet zone | `/guides/qr-code-quiet-zone` | related guides | distinct concept |

| source | destination | permanent? | internal migration |
|---|---|---|---|
| `/qr-code-generator` | `/generator` | yes | header/sitemap point directly to destination |
| `/qr-code-maker` | `/generator` | yes | styling guidance retained at destination |
| `/create-qr-code` | `/generator` | yes | steps retained on home/tool |

No redirect chains are intended. Specialized type routes were deliberately not published: the generator does not yet accept a reliable server-selected initial mode, and eight template pages would violate the useful-tool threshold. Refactor a typed reusable client first, then review pages individually.

Execution: baseline/inventory → consolidate intents → improve tool → brief all guides and publish only defensible priorities → technical/schema/linking corrections → trust/README corrections → lint/build/output validation.
