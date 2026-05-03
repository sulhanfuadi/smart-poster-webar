# Next Steps TODO

## 1) Replace placeholder marker targets
Replace each placeholder `.mind` file with the final compiled target from the real poster image:
- `public/assets/markers/products/apple-airpods/target.mind`
- `public/assets/markers/products/apple-ipad/target.mind`
- `public/assets/markers/products/apple-iphone/target.mind`
- `public/assets/markers/products/apple-macbook/target.mind`
- `public/assets/markers/products/apple-watch/target.mind`

## 2) Replace placeholder marker references
Replace each placeholder reference image with the final marker/poster reference image:
- `public/assets/markers/products/apple-airpods/reference.svg|png|jpg`
- `public/assets/markers/products/apple-ipad/reference.svg|png|jpg`
- `public/assets/markers/products/apple-iphone/reference.svg|png|jpg`
- `public/assets/markers/products/apple-macbook/reference.svg|png|jpg`
- `public/assets/markers/products/apple-watch/reference.svg|png|jpg`

## 3) Run strict mobile QA per product
Test all routes:
- `/scan?product=apple-iphone`
- `/scan?product=apple-macbook`
- `/scan?product=apple-airpods`
- `/scan?product=apple-ipad`
- `/scan?product=apple-watch`

Validate runtime transitions and camera fallback behavior.

## 4) Update release docs after final targets are in place
- Update `docs/known-limitations.md` (remove sample-target notes when done)
- Update `docs/release-checklist.md` (mark product coverage complete)

## 5) Final publish prep
- Verify `npm run build`
- Verify `npm run smoke:test`
- Generate final public HTTPS preview for sign-off
