# MacBook AR Model Asset Contract

Place the final MacBook GLB model here:

- `public/assets/models/apple-macbook/model.glb`

Notes:
- Recommended format: single self-contained `.glb` with embedded textures.
- Runtime fallback is automatic: if `model.glb` fails to load, app keeps dummy mesh.
- Default transform is configured in `src/content/products/appleMacbook.ts` under `arModel`.
