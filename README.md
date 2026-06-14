# Buddy Script — Frontend

A faithful Next.js (App Router) conversion of the Buddy Script social template
(login, registration, and the main feed), built to the architecture in
[`spec.md`](./spec.md).

## Tech stack

| Concern            | Choice                                                        |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js 16 (App Router, `/src`, TypeScript strict)           |
| Styling            | Tailwind CSS v4 + the ported design system (`src/styles/`)   |
| Server state / data| **TanStack Query** (primary) over an **Axios** core client   |
| Auth state         | **React Context API** (`AuthProvider`)                       |
| Other client state | **Zustand** isolated module micro-stores                     |
| Validation         | **Zod** schemas (forms + API payloads)                       |

## Getting started

```bash
pnpm install        # or npm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000>. The root redirects to `/feed`; unauthenticated
visitors are bounced to `/login`.

### Mock vs. live data

The app ships with a **mock data layer** so it runs without a backend
(`NEXT_PUBLIC_USE_MOCK=true`). Every service is written against the real NestJS
contract (`/auth/login`, `/auth/register`, `/auth/me`, `/posts`); set
`NEXT_PUBLIC_USE_MOCK=false` and point `NEXT_PUBLIC_API_URL` at the backend to
go live. Mock login accepts any email + password.

## Architecture

Context-Isolated Modularization (per `spec.md`): routing lives in `src/app`,
cross-cutting infra in `src/lib` / `src/providers` / `src/components`, and each
business domain is a self-contained module under `src/modules/<Domain>` with its
own `components / pages / hooks / services / store / types`.

```
src/
├── app/                      # App Router (route groups: (auth), (dashboard))
├── components/               # Domain-agnostic ui / feedback primitives
├── lib/                      # api-client (axios), auth-options, utils
├── providers/                # QueryProvider + AuthProvider (Context API)
├── modules/
│   ├── shared/               # Cross-module contracts
│   ├── auth/                 # Login + registration domain
│   └── feed/                 # Feed domain (header, sidebars, posts, …)
└── styles/                   # Tailwind entry + ported design system CSS
```

### Data flow

- **TanStack Query** owns fetching/caching. `usePosts` is an infinite query;
  `useCreatePost` is a mutation that invalidates the feed.
- **Axios** (`src/lib/api-client.ts`) is the single HTTP core — request
  interceptor attaches the bearer token, response interceptor unwraps the
  backend envelope and normalises errors.
- **Auth** is held in Context (`AuthProvider`): it rehydrates the session from
  the persisted token on mount and exposes `setSession` / `logout`.
- **Zustand** (`modules/feed/store/ui.store.ts`) holds presentational UI state
  (dark mode, which dropdown is open) the original handled with imperative DOM.

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
```
