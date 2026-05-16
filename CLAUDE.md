# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on `https://localhost:8000` (HTTPS via `localhost+2*.pem`; required because the app is a PWA and a service worker is part of dev). The base path is `/lets/`, so open `https://localhost:8000/lets/`.
- `npm run build` — `tsc && vite build` (typecheck blocks the build).
- `npm run typecheck` — `tsc --noEmit` only.
- `npm run lint` — ESLint (flat config, `eslint.config.js`). There is no test runner configured.
- `npm run preview` — preview the production build.
- `npm run deploy` — `gh-pages -d dist`. In practice deploys happen automatically via `.github/workflows/deploy.yml` on push to `master`.
- Node version is pinned in `.nvmrc` (22.13.1). Use `nvm use` before installing.

## Architecture

This is a Vite + React 19 + TypeScript PWA for a Ukrainian bike-parts shop ("Lets Bike"). It ships to GitHub Pages under the `/lets/` base path. There is no traditional backend in this repo — data lives in Supabase, and the app talks to it directly from the browser (and from the service worker).

### Two execution contexts: app + service worker

The non-obvious thing about this codebase is that a meaningful amount of logic runs **inside the service worker**, not just in the React app.

- `src/sw-custom.ts` is a real TypeScript service worker. It is **not** bundled by Vite. A custom plugin in `compile-service-workers-ts.plugin.ts` runs Rollup separately to compile it into `public/sw-custom.js` on `buildStart`, `writeBundle`, `watchChange`, and `handleHotUpdate`. `vite.config.ts` then tells VitePWA to `importScripts` that output file. If you edit `sw-custom.ts` and changes don't appear, suspect this pipeline.
- The SW owns the heavy "load all products from Supabase" job. It paginates `active_products_snapshot` via raw PostgREST `fetch` (page size 500), writes batches to IndexedDB, and posts progress messages back to the app. See `runSupabaseSync` in `sw-custom.ts`.
- App and SW communicate exclusively via `postMessage` using the `AppMessage` discriminated union in `src/types.ts` (`SYNC_START`, `SYNC_PROGRESS`, `SYNC_END`, `SYNC_ERROR`, `GET_SYNC_STATUS`, `cache-reset-request`, `cache-reset-done`, `navigate`, `push-me`). When adding cross-context behavior, add a variant there.
- Supabase credentials are duplicated into **both** `localStorage` (for the app via `supabase-js`) **and** IndexedDB metadata store (so the SW can read them — SWs can't see localStorage). `setSupabaseConfig` in `src/secrets.ts` writes both; the SW reads via `db.getConfig`. Keep these two paths in sync.

### Data flow

1. UI calls `useData()` (`src/use-data.ts`) → React Query.
2. `queryFn` calls `fetchProductsFromSupabase()` (`src/supabase-api.ts`). This **does not actually fetch from Supabase from the app**. It checks IDB sync metadata; if stale (>1h) or no controller, it pings the SW to start a sync, then returns whatever is currently in IDB via `db.getAllProducts()`.
3. SW does the network work, batches into IDB, and posts `SYNC_PROGRESS`/`SYNC_END` back.
4. `useListenToCacheUpdate` (mounted at the root) listens for those messages, drives the global `loadingProgress` state, and invalidates the `CACHE_BASE_KEY` query on `SYNC_END` so the UI re-reads from IDB.
5. A magic `__meta__` SKU row carries JSON in its `name` field — vendor freshness info — extracted in `use-data.ts` and stored in the Zustand `app` store (`useMeta`, `useStaleVendors`).

Favorites, cart, and color settings, by contrast, are **not** SW-routed — they go through `supabase-js` directly from the app (`src/supabase-api-*.ts`, called by hooks in `src/api.ts` and `src/cart-api.ts`). Those hooks all use React Query with optimistic updates (`onMutate` → `setQueryData`, rollback via `context.list` in `onError`). Follow that pattern for new mutations.

### IndexedDB (`src/db.ts`)

Single DB `ShopDB` with two stores: `products` and `metadata`. The `db` object exposes a small typed API — prefer extending it over opening raw transactions elsewhere. Two things to know:

- Product `id` is synthesized as `${vendorPrefix}-${sku}-${vendor}`, where `vendorPrefix` is `'0'` for the `base` vendor and `'1'` for everything else. This is intentional: it makes `base` sort first using IndexedDB's native key ordering (see commit `64e906e`). Don't change `id` without re-thinking that ordering.
- The `products` object store is **dropped and recreated on every `onupgradeneeded`** (current `DB_VERSION` is 4). Bumping `DB_VERSION` wipes products; `last-sync` is also cleared so a fresh sync runs. Config keys (Supabase URL/key) survive.

### Routing

File-based via `@tanstack/router-plugin/vite`. Routes live in `src/routes/`; `src/routeTree.gen.ts` is generated — do not hand-edit. Route conventions:

- `_layout.tsx` wraps child routes with `<AppBar />` + `<Container>`. Anything inside `routes/_layout/` is under that shell.
- `*.lazy.tsx` files are code-split (e.g. `cart.lazy.tsx`, `stats.lazy.tsx`); heavy areas should follow that pattern.
- Router is created in `src/app.tsx` with `basepath="/lets/"`; the matching `base` is set in `vite.config.ts`. Keep these aligned.
- `routes/index.tsx` redirects `/` → `/list`; `__root.tsx` redirects unknown routes to `/list`.

### State

- **Zustand** for app-level UI state: `src/store/app.ts` (view mode, theme, sort, meta, sync progress), plus `appliedFilters`, `history`, `search`, `table`. The `app` store uses `persist` middleware (`name: 'lets-bike-app'`) and intentionally `partialize`s — only `view`, `theme`, `sort` are persisted. Don't add ephemeral fields to the partialize allowlist.
- **React Query** for all server state. Cache keys are the `CACHE_*_KEY` constants in `src/constants.ts`. Use them; don't inline strings.
- Actions are exposed via a single `actions` object on the store and consumed through `useAppActions()` — this pattern keeps action references stable. Match it for new stores.

### Styling

- MUI v7 with a custom theme in `src/theme-mode-provider.tsx` (Outfit/Inter font, primary `#ea2b06`, rounded shape, light/dark). Theme is toggled via the `setTheme` action and also toggles a `light`/`dark` class on `#root` for SCSS to hook into.
- SCSS via `sass-embedded` (`api: 'modern-compiler'`).

### Lint rules worth knowing

`eslint.config.js` enforces several non-default rules — match them before opening PRs:

- `@typescript-eslint/no-explicit-any: error` — no `any`.
- `React.FC` / `FC` / `React.FunctionComponent` are banned via `no-restricted-types` (write `const X = (props: Props) => …`).
- `react-compiler/react-compiler: error` — React Compiler is enabled via Babel plugin in `vite.config.ts`; avoid breaking memoization assumptions (mutating refs/objects passed as props, etc.).
- `import/order` is strict: groups are `builtin / external / internal / parent-sibling-index / object / type`, alphabetized, `newlines-between: always`, and `react` is forced to the top of `external`. Run lint before committing — manual reordering is tedious.
- `consistent-type-imports` with inline style: write `import { type Foo } from './x'`, not separate `import type` statements.

### Build output details

`vite.config.ts` defines manual chunks (`react`, `swiper`, `html2canvas`, `popper`, `tanstack`, `mui`) — when adding a large dep that should be split, add it there. The PWA `runtimeCaching` includes a hand-maintained list of supplier `domains` (velogo, paul-lange-ukraine, etc.) used to build a regex that aggressively caches product images. New vendors with off-domain images need to be added there.
