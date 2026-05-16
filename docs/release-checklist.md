# Release Checklist (Scan-First Single-Marker MVP)

## Functional gate
- `npm run marker:generate` passes.
- `npm run build` passes.
- `npm run smoke:test` passes.
- `/` redirects to `/scan`.
- `/scan` opens full-screen AR camera flow.
- Product details + actions appear in-scan only when marker is locked.
- `2D` and `3D` tabs switch correctly inside the in-scan panel.

## Marker gate
- Marker reference exists at `public/assets/markers/mvp/macbook-air/reference.png`.
- Marker target exists at `public/assets/markers/mvp/macbook-air/target.mind`.
- Tracking lock is validated against the same marker source image.

## Mobile quality gate (strict)
- Passes on latest Chrome Android.
- Passes on latest Safari iPhone.
- No clipped controls around notch/safe area.
- Runtime transitions visible: requesting_camera → searching → found/lost/error.

## Deploy gate
- HTTPS preview URL is available for mobile QA.
- SPA rewrites work for `/scan`.
- Known limitations are communicated in `docs/known-limitations.md`.
