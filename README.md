# Apple Devices Smart Poster AR Demo (V2)

A modern AR-first web demo for Apple-device poster campaigns, rebuilt with React + TypeScript + MindAR for stable mobile presentation flow.

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
- Example links:
  - `/?product=apple-iphone`
  - `/scan?product=apple-iphone`
  - `/scan?product=apple-macbook`
- Invalid or missing product falls back to default with a non-blocking notice.

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
- Multi-product content is defined in `src/content/appContent.ts` (`products` registry).
- For each product, set:
  - copy (intro/scan/after-scan)
  - `scanTarget.mindTargetUrl` (public HTTPS `.mind` file)
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
