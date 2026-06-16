# Buddy Script — Frontend

A faithful Next.js (App Router) conversion of the Buddy Script social template
(login, registration, and the main feed with posts, comments, replies, and
likes), built to the architecture in [`spec.md`](./spec.md).

## Tech stack

| Concern             | Choice                                                        |
| ------------------- | ------------------------------------------------------------ |
| Framework           | Next.js 16 (App Router, `/src`, TypeScript strict)           |
| Styling             | Tailwind CSS v4 + the ported design system (`src/styles/`)   |
| Server state / data | **TanStack Query** (primary) over an **Axios** core client   |
| Auth state          | **React Context API** (`AuthProvider`)                       |
| Other client state  | **Zustand** isolated module micro-stores                     |
| Validation          | **Zod** schemas + **react-hook-form** (`@hookform/resolvers`)|

> **Heads up:** This is Next.js 16, which carries breaking changes from earlier
> versions (see [`AGENTS.md`](./AGENTS.md)). Check the bundled guides in
> `node_modules/next/dist/docs/` before changing routing or data-fetching code.

## Getting started

```bash
pnpm install        # or npm install
cp .env.example .env.local
pnpm dev
```

Open <http://localhost:3000>. The root (`app/page.tsx`) redirects to `/feed`;
unauthenticated visitors are bounced to `/login`.

### Environment variables

| Variable                | Description                                               | Default                 |
| ----------------------- | -------------------------------------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL`   | Base URL of the NestJS backend                           | `http://localhost:4000` |
| `NEXT_PUBLIC_USE_MOCK`  | `false` hits the real backend; any other value uses mock | mock enabled            |

### Mock vs. live data

The app ships with a **mock data layer** so it runs without a backend
(`NEXT_PUBLIC_USE_MOCK=true`). Every service is written against the real NestJS
contract (`/auth/login`, `/auth/register`, `/auth/me`, `/posts`, nested
comments/replies/likes, `/file-upload`); set `NEXT_PUBLIC_USE_MOCK=false` and
point `NEXT_PUBLIC_API_URL` at the backend to go live. Mock login accepts any
email + password.

## Architecture

Context-Isolated Modularization (per `spec.md`): routing lives in `src/app`,
cross-cutting infra in `src/lib` / `src/providers` / `src/components`, and each
business domain is a self-contained module under `src/modules/<Domain>` with its
own `components / pages / hooks / api / store / schema / types`.

```
src/
├── app/                      # App Router
│   ├── (auth)/               # Route group: login, register (+ layout)
│   ├── (dashboard)/          # Route group: feed (+ layout)
│   ├── layout.tsx            # Root shell + global providers
│   ├── page.tsx              # Entry redirect → /feed
│   ├── error.tsx             # Global error boundary
│   └── globals.css
├── components/               # Domain-agnostic primitives
│   ├── ui/                   # Button, Input, AppImage
│   └── feedback/             # Spinner, LoadingSkeleton, ErrorBoundary
├── lib/                      # api-client (axios), auth-options, token-storage, utils
├── providers/                # AppProvider → QueryProvider + AuthProvider (Context API)
├── modules/
│   ├── shared/               # Cross-module contracts (User, etc.)
│   ├── auth/                 # Login + registration domain
│   ├── feed/                 # Feed domain (posts, comments, replies, likes, layout)
│   └── user/                 # User lookup (profile by id)
└── styles/                   # Tailwind entry + ported design system CSS
```

### Module breakdown

- **`auth/`** — `LoginForm` / `RegisterForm` (react-hook-form + Zod schemas in
  `schema/`), `useAuthMutations` for login/register, `auth.api.ts` against
  `/auth/*`, and decorative `AuthShapes`.
- **`feed/`** — the core domain:
  - `api/` — one client per resource (`posts`, `comments`, `replies`,
    `post-likes`, `comment-likes`, `upload`) sharing `http.ts`, with all paths
    centralised in `endpoints.ts` and DTOs in `dto.ts`.
  - `hooks/` — TanStack Query hooks: `usePosts` (infinite query) /
    `useCreatePost`, `useComments` + CRUD, `useReplies` + CRUD,
    `usePostLikes` / `useTogglePostLike`, `useCommentLikes` /
    `useToggleCommentLike`, `useUploadImage`; cache keys in `queryKeys.ts`.
  - `components/` — `layout/` (Header, Left/Right sidebars, dropdowns, theme
    toggle, mobile nav), `post/` (`PostCard`, `PostComposer`, `PostList`,
    `StoryCarousel`), and `comment/` (threaded comment + reply UI).
  - `store/ui.store.ts` — Zustand store for presentational UI state (dark mode,
    open dropdown) the original template handled with imperative DOM.
- **`user/`** — `useUser(id)` query + `user.api.ts` for profile lookups.
- **`shared/`** — cross-module types (e.g. `User`).

### Data flow

- **TanStack Query** owns fetching/caching. `usePosts` is an infinite query;
  mutations (`useCreatePost`, comment/reply CRUD, like toggles) invalidate the
  relevant query keys.
- **Axios** (`src/lib/api-client.ts`) is the single HTTP core — a request
  interceptor attaches the bearer token, a response interceptor unwraps the
  backend envelope (`{ status_code, message, data, meta, _links }`) and
  normalises errors into `ApiError`.
- **Auth** is held in Context (`AuthProvider`): it rehydrates the session from
  the persisted token (`token-storage.ts`) on mount and exposes `setSession` /
  `logout`.
- **Providers** compose top-down: `AppProvider` wraps `QueryProvider` and
  `AuthProvider` and is mounted once in the root layout.

## Design decisions & trade-offs

- **TanStack Query for data fetching and caching.** It owns all server state —
  fetching, caching, invalidation, infinite scroll, and mutations — giving the
  app fine-grained, client-side control over cache lifetimes and refetching
  without hand-rolling that logic.
- **Deliberately not using Next.js's built-in caching / SSR.** Leaning on the
  Next.js fetch cache and server rendering would add architectural complexity
  and couple the app tightly to Vercel's runtime. This product needs neither SEO
  nor server-side rendering, so the cost isn't worth it — a client-driven SPA
  over TanStack Query keeps the architecture simpler and portable.
- **Pragmatic fidelity to the original design.** Some details of the source
  template were intentionally dropped where they added effort without
  meaningful value, in favour of a clean, maintainable component structure.
- **Likes now, reactions later.** Only the "like" reaction is wired up for the
  current scope, but the `ReactionButtons` component and the underlying
  toggle/like API are structured so additional reaction types (love, haha,
  etc.) can be added without reworking the architecture.

## Scripts

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm typecheck    # tsc --noEmit
```

## Related

- [`spec.md`](./spec.md) — full architecture & technical specification.
- Backend API — see the backend project's `README.md` for endpoints, the
  response envelope, and the data model this frontend is built against.
