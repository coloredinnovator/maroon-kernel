# maroon-kernel

**What this is:** the frontend design system for the Maroon ecosystem — CSS tokens (`tokens/base.json`) and Qwik primitives (`primitives/`). `onitas-market` mounts this repo as a git submodule at `packages/maroon-kernel/` so its web/admin apps share one visual system.

> **Naming collision, read before assuming this is the backend infra kernel:** `maroon-techo/maroon-kernel-` (trailing dash) is a *different* repo — the backend infra scaffold (envoy, OSB, cache, identity, ledger, truth-teller, etc). This repo is the frontend design system only. Both are legitimate, unrelated pieces — don't merge or confuse them.

## Build

```sh
npm install
npm run build
```

Produces:
- `tokens/base.css` — CSS custom properties flattened from `tokens/base.json` (generated, not committed — see `scripts/build-tokens.mjs`).
- `dist/index.qwik.mjs` + `.d.ts` — the compiled component library, importable as `@maroon/kernel`.

`index.html` is a static, no-build-step demo (`open index.html` after `npm run build:tokens`) — it uses a small vanilla custom-element fallback, not the real Qwik build. Real consumers import from `src/index.ts` instead.

## Adding a component
1. Add the component under `primitives/<name>/`, styled via the `--maroon-*` custom properties from `tokens/base.css` (see `maroon-button.tsx` for the pattern).
2. Re-export it from `src/index.ts`.
3. Grow this repo only as `onitas-market`'s actual screens need components — don't pre-build ahead of demand.
