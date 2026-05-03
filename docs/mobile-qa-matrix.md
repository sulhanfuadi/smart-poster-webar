# Mobile QA Matrix (Strict)

## Target devices
- Android phone (latest Chrome)
- iPhone (latest Safari)

## Mandatory scenarios
1. Open `/` and confirm one clear CTA (`Start AR Scan`).
2. Tap CTA and verify route changes to `/scan`.
3. Camera permission prompt appears and state changes accordingly.
4. AR scan viewport is full-screen and controls remain tappable.
5. Marker runtime states can be observed (searching/found/lost/error).
6. Continue to `/after-scan` and verify offer CTA visibility.

## Fail criteria
- Multiple page sections visible simultaneously.
- AR viewport not full-screen on mobile.
- Controls clipped by safe-area/notch.
- Route flow broken or requires page refresh to continue.
