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

## AR target note
- Current v1 uses a default MindAR sample target (`card.mind`) to validate runtime stability.
- To use your own poster marker in production, replace `scanTarget.imageTargetSrc` in `src/content/appContent.ts` with your generated `.mind` target.

## QA policy
- Desktop is preview-only.
- Strict sign-off requires:
  - Chrome Android (latest)
  - Safari iPhone (latest)

## V1 scope
- Included: intro, full-screen scan, runtime states, hotspots, post-scan CTA.
- Excluded (planned v1.1): chatbot UI/runtime.
