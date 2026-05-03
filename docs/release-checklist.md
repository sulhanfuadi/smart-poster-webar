# Release Checklist (V2 Rewrite)

## Functional gate
- `npm run build` passes.
- `npm run smoke:test` passes.
- `/` shows minimal intro with single dominant CTA.
- `/scan` opens full-screen AR interface with visible runtime state.
- `/after-scan` shows clean conversion handoff CTA.

## Mobile quality gate (strict)
- Passes on latest Chrome Android.
- Passes on latest Safari iPhone.
- No overlap, hidden-view leakage, or collapsed layout on narrow screens.
- Runtime transitions observable: requesting_camera → searching → found/lost/error.

## Deploy gate
- Vercel preview URL available for QA (HTTPS).
- SPA route rewrites work for `/scan` and `/after-scan`.
- Known limitations communicated in `docs/known-limitations.md`.
