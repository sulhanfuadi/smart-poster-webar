# Operator Runbook (V2 Multi-Product)

## Pre-demo setup
- Use Vercel preview URL (HTTPS) or localhost over mobile.
- Open demo on a modern mobile browser.
- Pick active product via URL query, for example:
  - `/scan?product=apple-iphone`
  - `/scan?product=apple-macbook`
  - `/scan?product=apple-airpods`
  - `/scan?product=apple-ipad`
  - `/scan?product=apple-watch`
- Prepare marker reference image used by the selected product target.

## Live flow
1. Start at `/?product=<productId>` and set context quickly.
2. Tap `Start AR Scan` and grant camera permission.
3. Keep marker stable for lock; narrate product hotspots.
4. Continue to `/after-scan?product=<productId>` and close with offer CTA.

## Add new product
1. Add a new product file in `src/content/products/`.
2. Export product from `src/content/products/index.ts`.
3. Set `scanTarget.mindTargetUrl` to a public HTTPS `.mind` file.
4. Set `scanTarget.referenceImageUrl` and product-specific copy/CTA/hotspots.
5. Validate with `/scan?product=<newProductId>` on mobile HTTPS.

## Troubleshooting
- Camera denied: re-enable site camera permission and retry.
- Marker not locking: improve lighting, reduce glare, stabilize frame.
- Lost tracking: re-center full marker and hold still briefly.
- Product query invalid: app falls back to default product and shows a small notice.
- Desktop opened by mistake: return to mobile device for actual scan.
