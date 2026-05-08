# Apple Devices AR-Enhanced WebAR Demo (V2)

A modern AR-first WebAR demo for Apple-device AR-enhanced digital poster campaigns, rebuilt with React + TypeScript + MindAR for stable mobile presentation flow.

## Core architecture
- Vite + React + TypeScript
- React Router (route-based flow)
- Tailwind CSS + Apple-inspired design tokens
- MindAR + Three.js for image-target AR runtime

## Route flow
- `/` minimal intro screen
- `/scan` full-screen AR scan session
- `/after-scan` conversion handoff (offer CTA)

## Multi-product URL contract
- Product is selected via query param: `?product=<productId>`
- Available product IDs:
  - `apple-iphone`
  - `apple-macbook`
  - `apple-airpods`
  - `apple-ipad`
  - `apple-watch`
- Example links:
  - `/scan?product=apple-iphone`
  - `/scan?product=apple-macbook`
  - `/scan?product=apple-airpods`
  - `/scan?product=apple-ipad`
  - `/scan?product=apple-watch`
- Invalid or missing product falls back to default with a non-blocking notice.

## Marker placement
- Local marker map is preconfigured to:
  - `public/assets/markers/products/<productId>/target.mind`
  - `public/assets/markers/products/<productId>/reference.png`
- Product source images live in `public/assets/products/source`
- Generated marker cards are saved as `public/assets/markers/products/<productId>/reference.png`
- For tracking validation, scan the generated `reference.png` (or printed copy) for the matching product.
- You can regenerate all marker targets using:

```bash
npm run markers:generate
```

- Detailed template: `public/assets/markers/products/README.md`.

## 3D model placement
- MacBook product can render a real GLB model when this file exists:
  - `public/assets/models/apple-macbook/model.glb`
- If model load fails or file is missing, runtime keeps default fallback mesh (no crash).

## Run locally
```bash
npm install
npm run dev
```

## Build and checks
```bash
npm run build
npm run preview
npm run smoke:test
```

## Product config note
- Product configs are split into `src/content/products/` (one file per product).
- Registry export is `src/content/products/index.ts`.
- For each product, set:
  - copy (intro/scan/after-scan)
  - `scanTarget.mindTargetUrl`
  - `scanTarget.referenceImageUrl`
  - `offerCTA` and `hotspots`

## QA policy
- Desktop is preview-only.
- Strict sign-off requires:
  - Chrome Android (latest)
  - Safari iPhone (latest)

## V1 scope
- Included: intro, full-screen scan, runtime states, hotspots config, post-scan CTA.
- Excluded (planned v1.1): chatbot UI/runtime.
