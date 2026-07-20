# Generator architecture audit

Date: 2026-07-20. Scope: Phase 1 foundation only; no specialized routes were added.

## Current architecture

`app/generator/page.tsx` is a Server Component entry point. It renders the shared `components/qr/QRGenerator.tsx` Client Component, which owns interactive content, styling, preview, advertising positions and download controls. `useQRGenerator` owns browser state, debounced generation and local history integration. Content forms remain in `ContentForm`; styling, preview and downloads remain separate components. QR payload encoding and canvas rendering stay in the existing browser-only generator class.

## Supported types and exports

The typed source of truth in `lib/qr/modes.ts` contains text, URL, email, phone, WiFi, vCard and calendar-event modes. Forms collect the corresponding data structures from `types/index.ts`. The QR canvas supports solid or gradient colors, module/eye styles, sizes, margins, transparency and the existing logo preview flow. Download controls continue to provide PNG, SVG and PDF.

## Initial selection

Previously, `useQRGenerator` hard-coded text state, and the form duplicated its own type list and default payloads. There was no prop from a route to the hook, so a specialized route could not select a mode without copying the page or adding client-side query logic.

Now `QRGenerator` accepts `initialType?: QRType`; `useQRGenerator` initializes and resets with that value. `createInitialQRContent` resolves definitions through `QR_MODES`, and unknown runtime values fall back to text. Users can still switch modes in the shared form. Route metadata remains server-rendered and does not depend on query parameters.

## Coupling and duplication

The large interactive shell still coordinates validity checks, form state, auto-generation, ads and layout. Type-specific form markup and payload serialization use switches, which is reasonable at the current scale but should be split carefully as modes grow. There are two generation timing paths in the hook, and the validity checks are separate from the encoder. The advanced logo helper is not the primary generation path; logo compositing occurs in the preview component. Local-history writes are coupled to generation.

## Safe refactoring plan

1. Build future route Server Components with unique metadata and useful route-specific content.
2. Render the existing shared client shell with a compile-time checked `initialType`.
3. Move validation into typed per-mode functions only after regression tests cover every payload encoding.
4. Split individual forms only when doing so reduces coupling without changing serialized payloads.
5. Add browser tests for type switching, logo output, history and all three downloads before altering stable encoding or canvas code.

## Risks

Payload escaping for WiFi, vCard and events is limited and must not be changed casually. SVG currently wraps the PNG rather than producing vector QR modules. PDF relies on a browser dynamic import. Logo placement, gradients and non-square previews require scanner testing. Local storage may retain sensitive payloads. There is no automated browser suite, so build success alone cannot prove downloads or scanner compatibility.

## Recommended reusable public API

```tsx
import { QRGenerator } from "@/components/qr/QRGenerator";

<QRGenerator initialType="wifi" />
```

The prop type is `QRType`, derived from `QR_TYPE_KEYS`. Route/config values from untyped sources should pass through `isQRType` or `resolveQRType`; invalid values safely become `text`. Future route files should remain Server Components and place unique content around this client boundary rather than duplicating the generator.
