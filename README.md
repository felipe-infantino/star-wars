# Star Wars Explorer

A SWAPI browser to explore every Star Wars resource — films, people, planets, species, starships, and vehicles — with search, pagination, and full cross-resource navigation through their relationships.

## Tech Stack

- **Next.js 16.2.9** (App Router) · **React 19.2.4** · **TypeScript** · **Tailwind CSS v4**
- **TanStack React Query 5** — data fetching, caching, request deduplication, and batched queries
- **Motion 12** (`motion/react`) — list and state-transition animations
- **Tooling** — Vitest 4 + Testing Library (unit), Playwright 1.61 (e2e), ESLint

## Getting Started

```bash
nvm use      # Node v24.11.1 (.nvmrc)
npm i
npm run dev  # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Testing

```bash
npm run test       # Vitest (watch) — unit tests, co-located *.test.ts(x)
npm run test:run   # Vitest single run (CI)
npm run test:e2e   # Playwright e2e (e2e/) — runs against the real SWAPI
npm run test:e2e:ui
```

## Architecture & Technical Decisions

The six resource types share identical page mechanics (fetch, paginate, search, render properties and relationships). Rather than duplicate that logic six times, two generic factory functions produce each page from a small, declarative config. This keeps every resource consistent and reduces a page to a description of *what* to show, not *how* to fetch and render it.

### `createResourceListPage<T>` — `components/ResourceListPage.tsx`

Takes `{ title, path, renderItem }` and returns a client page with URL-persisted pagination and search, plus loading and error states.

### `createResourceDetailPage<T>` — `components/ResourceDetailPage.tsx`

Takes `{ path, getTitle, getProps, getDescription?, relations }`. It fetches the single resource, batch-fetches every HATEOAS relation URL via `useSwapiResources` (`useQueries`), groups the results back per relation, and renders a properties grid plus a relation accordion for each link group.

### Supporting layer

- **`lib/swapi.ts`** — `fetchSwapi` (paginated list with optional `search`) and `fetchSwapiByUrl` (a single resource by its HATEOAS URL).
- **`hooks/useSwapi.ts`** — `useSwapiList`, `useSwapiResource`, and `useSwapiResources` (batched `useQueries` for relations).
- **`app/providers.tsx`** — the `QueryClient` (retry once, no refetch on window focus).

## Requirements

- [x] **All SWAPI data displayed** — every field is shown in the detail props grid, with relationships rendered as accordions, across all six resource types.
- [x] **Search & pagination, persisted in the URL** — `?page=` and `?search=` are the source of truth via `useSearchParams` / `router.push`; the search input is debounced (`hooks/useDebounce.ts`).
- [x] **Detail page for every resource** — renders all data and its related resources.
- [x] **Cyclic navigation** — e.g. People → Vehicles → Film → People works in both directions; because navigation is URL-driven, browser back/forward history is preserved.
- [x] **Sanitization of absent data** — `sanitizeProp` (`lib/sanitize.ts`) maps `null` / `undefined` / empty values to a readable fallback, with an optional unit suffix.
- [x] **Fetch only what's needed** — lists fetch a single page at a time; a resource's relationships are fetched lazily, only when its detail page is opened.

## Gotchas

- **SWAPI returns 403 on server-side requests.** All data components are `'use client'` and fetch from the browser through React Query — there is no SSR fetch or proxy route handler.
- **The API is HATEOAS.** Resources reference related resources by URL rather than embedding them. We never fetch the whole graph up front: lists show summary data, and a detail page lazily batch-fetches its linked resources via `useSwapiResources`.
- **Base URL:** `https://swapi.py4e.com/api`.

## Project Structure

```
app/                    # App Router — one folder per resource (films, people, ...)
  <resource>/
    page.tsx            # list page  (createResourceListPage)
    [id]/page.tsx       # detail page (createResourceDetailPage)
    <resource>Item.tsx  # item renderer
    types.ts            # resource interface
  providers.tsx         # React Query provider
  layout.tsx            # root layout + Navbar
components/             # ResourceListPage / ResourceDetailPage factories + shared UI
hooks/                  # useSwapi, useDebounce
lib/                    # swapi client, sanitize, searchParams
e2e/                    # Playwright specs
test/                   # test helpers (renderWithClient)
```
