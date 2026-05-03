# Mobile QA Matrix (Strict, Multi-Product)

## Target devices
- Android phone (latest Chrome)
- iPhone (latest Safari)

## Mandatory scenarios
1. Open `/?product=apple-iphone` and confirm one clear CTA (`Start AR Scan`).
2. Tap CTA and verify route changes to `/scan?product=apple-iphone`.
3. Camera permission prompt appears and state changes accordingly.
4. AR scan viewport is full-screen and controls remain tappable.
5. Marker runtime states can be observed (searching/found/lost/error).
6. Continue to `/after-scan?product=apple-iphone` and verify offer CTA visibility.
7. Repeat scenarios 1–6 with:
   - `apple-macbook`
   - `apple-airpods`
   - `apple-ipad`
   - `apple-watch`
8. Open `/scan?product=unknown` and verify fallback notice + default product behavior.

## Fail criteria
- Multiple page sections visible simultaneously.
- AR viewport not full-screen on mobile.
- Controls clipped by safe-area/notch.
- Route flow broken or requires page refresh to continue.
- Product query is dropped when moving between intro/scan/after-scan pages.
