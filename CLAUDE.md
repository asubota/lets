# CLAUDE.md

## Commands

- `npm run dev` — Vite on `https://localhost:8000/lets/`. HTTPS is required (PWA + service worker in dev): uses `localhost+2*.pem` if present, else `@vitejs/plugin-basic-ssl`.
- `npm run build` — `tsc && vite build` (type errors block the build).
- `npm run typecheck` — `tsc --noEmit` for app and `tsconfig.node.json`.
- `npm run lint` — ESLint flat config. No test runner exists.
- Deploys run via `.github/workflows/deploy.yml` on push to `master` (GitHub Pages).
- Node is pinned in `.nvmrc`; run `nvm use` before installing.

## Git workflow

- For any change, branch from the latest `origin/master` (`git fetch origin && git switch -c <branch> origin/master`). Main branch is `master` (no `main`); never work on it directly.
- Never commit without explicit user approval.
- Never use `--no-verify` (or skip hooks otherwise) without explicit user approval.

## Architecture

Vite + React 19 + TypeScript PWA for a bike-parts shop, served from GitHub Pages under `/lets/`. No backend in this repo: the browser and the service worker talk to Supabase directly.

### Service worker (`src/sw-custom.ts`)

- Not bundled by Vite: `compile-service-workers-ts.plugin.ts` compiles it with Rollup to `public/sw-custom.js` (on `buildStart`, `writeBundle`, `watchChange`, `handleHotUpdate`), and VitePWA `importScripts` it. If SW edits don't show up, suspect this pipeline.
- `runSupabaseSync` pages `active_products_snapshot` via raw PostgREST `fetch` (500/page) into IndexedDB and posts progress to the app.
- App ↔ SW talk only via `postMessage` with the `AppMessage` union in `src/types.ts`. Add a variant there for new cross-context behavior.
- Supabase URL/key live in both `localStorage` (app, `supabase-js`) and the IDB `metadata` store (SW can't read localStorage). `setSupabaseConfig` in `src/secrets.ts` writes both; the SW reads via `db.getConfig`. Keep them in sync.

### Data flow

1. `useData()` (`src/use-data.ts`) → React Query → `fetchProductsFromSupabase()` (`src/supabase-api.ts`).
2. That function does **not** hit the network: if sync is stale (>1h) or there's no SW controller, it asks the SW to sync, then returns current IDB contents.
3. `useListenToCacheUpdate` (mounted in `__root.tsx`) handles `SYNC_PROGRESS`/`SYNC_END`, drives `loadingProgress`, and invalidates `CACHE_BASE_KEY` on `SYNC_END`.
4. The `__meta__` SKU row holds vendor-freshness JSON in `name`; `use-data.ts` extracts it into the `app` store (`useMeta`, `useStaleVendors`).

Favorites, cart, and colors bypass the SW: `supabase-js` calls in `src/supabase-api-*.ts`, wrapped by hooks in `src/api.ts` / `src/cart-api.ts`. New mutations should follow their optimistic pattern (`onMutate` → `setQueryData`, rollback to `context.list` in `onError`).

### IndexedDB (`src/db.ts`)

DB `ShopDB`, stores `products` and `metadata`. Extend the `db` object instead of opening raw transactions elsewhere.

- Product `id` = `${vendorPrefix}-${sku}-${vendor}`, prefix `'0'` for vendor `base`, `'1'` otherwise, so `base` sorts first by native key order. Don't change it lightly.
- `onupgradeneeded` drops and recreates `products` and clears `last-sync`; config keys survive. Bumping `DB_VERSION` therefore forces a full resync.

### Routing

TanStack file-based routing in `src/routes/`; `src/routeTree.gen.ts` is generated, don't edit.

- `_layout.tsx` wraps `routes/_layout/*` with `<Container>` + `<AppBar />`.
- Use `*.lazy.tsx` for code-split routes.
- `basepath="/lets/"` in `src/app.tsx` must match `base` in `vite.config.ts`.
- `/` and unknown routes redirect to `/list`.

### State

- Zustand stores in `src/store/`. Actions live in a single `actions` object consumed via hooks like `useAppActions()` (stable references); follow this for new stores.
- The `app` store persists (`lets-bike-app`) only `view`, `theme`, `sort` via `partialize`. Don't add ephemeral fields there.
- React Query for server state; use the `CACHE_*_KEY` constants from `src/constants.ts`, never inline keys.

### Styling and build

- MUI v7 theme in `src/theme-mode-provider.tsx`; it also sets a `light`/`dark` class on `#root` for SCSS (`sass-embedded`).
- `vite.config.ts` `manualChunks`: add large deps that should be split.
- `vite.config.ts` `domains`: supplier image hosts cached by the PWA. Add new vendors with off-domain images.
