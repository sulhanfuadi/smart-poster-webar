# Operator Runbook (V2)

## Pre-demo setup
- Use Vercel preview URL (HTTPS) or localhost over mobile.
- Open demo on a modern mobile browser.
- Prepare marker reference image used by current MindAR target.

## Live flow
1. Start at `/` and set context quickly.
2. Tap `Start AR Scan` and grant camera permission.
3. Keep marker stable for lock; narrate hotspots.
4. Continue to `/after-scan` and close with offer CTA.

## Troubleshooting
- Camera denied: re-enable site camera permission and retry.
- Marker not locking: improve lighting, reduce glare, stabilize frame.
- Lost tracking: re-center full marker and hold still briefly.
- Desktop opened by mistake: return to mobile device for actual scan.
