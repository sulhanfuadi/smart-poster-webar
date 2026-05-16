# Mobile QA Matrix (Scan-First Single-Marker MVP)

## Devices and browsers
- Chrome Android (latest)
- Safari iPhone (latest)

## Mandatory test paths
1. `/` (must redirect to `/scan`)
2. `/scan`

## Scenario checklist
- Redirect from `/` to `/scan` works without breaking camera flow.
- Camera permission prompt appears and can be granted.
- Marker locks when scanning `public/assets/markers/mvp/macbook-air/reference.png`.
- Runtime state transitions are visible (`searching`, `found`, `lost`, `error`).
- In-scan product panel appears only when marker is locked.
- `Details`, `Contact`, `Buy` links open expected targets.
- `2D` and `3D` tabs switch correctly and render content.
- Retry and fallback camera controls work when AR runtime fails.

## Fail criteria
- AR viewport is not full-screen on mobile.
- Controls overlap with notch/safe-area.
- Marker lock never occurs under normal lighting.
- Action links are broken or point to wrong targets.
