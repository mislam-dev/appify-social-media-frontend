# Frontend Architecture & Technical Specification

## Next.js Generic Enterprise Application Framework

---

## 1. Executive Summary & Core Philosophy

This document details the architectural specification, design patterns, directory topologies, and engineering principles for a scalable, enterprise-grade frontend application built on **Next.js**.

The fundamental architectural philosophy guiding this design is **Context-Isolated Modularization (CIM)**. Traditional monolithic frontend structures organize code strictly by _technical role_ (e.g., placing all components in a single folder, all state in another). While intuitive for small applications, this introduces tight coupling, cognitive overload, and merge conflicts as applications scale.

This specification combines the modern **Next.js App Router** (for routing, layouts, and server-first data optimization) with a **Module-Driven Core** (for domain isolation). By segregating the application into decoupled, self-contained business domains, we ensure high maintainability, strict boundaries, straightforward testability, and parallelized team workflows.

---

## 2. Global Architecture & Framework Foundations

The framework builds on a hybrid foundation utilizing Next.js features while keeping business rules decoupled from the presentation layer.

### 2.1 Rendering Strategy Matrix

To optimize Core Web Vitals (LCP, FID, CLS), components must explicitly declare their environment boundaries:

- **Server Components (RSC):** Default state. Used for data fetching, static structure, layouts, and SEO-heavy interfaces. No hooks, state, or browser APIs.
- **Client Components (`'use client'`):** Reserved strictly for interactive UI leaves (buttons, forms, real-time feedback, state consumers) and contextual dynamic mutations.

### 2.2 Global Technical Stack

- **Framework:** Next.js (App Router configured with `/src` directory)
- **Language:** TypeScript (Strict compliance mode enabled)
- **State Management:** Hybrid Model
  - _Server State / Cache:_ Next.js fetch cache + React Server Context
  - _Global Shared Client State:_ Zustand (lightweight, atomic, non-boilerplated)
  - _Server Cache Synchronization:_ TanStack Query (React Query) for complex client-side mutations/polling
- **Styling Layer:** Tailwind CSS paired with Shadcn/ui (Radix UI primitives)
- **Schema Validation / Type Safety:** Zod (for API payloads and form configurations)

---

## 3. Comprehensive Directory Topology

The workspace separates global cross-cutting utilities from domain-specific capabilities. Below is the strict structural layout representing the root of the frontend infrastructure.

```text
frontend/src/
├── app/                        # Next.js App Router Core Routing (Server-First)
│   ├── api/                    # Local BFF (Backend-for-Frontend) route handlers
│   ├── (auth)/                 # Route Group: Authenticated/Unauthenticated logical boundaries
│   │   ├── login/
│   │   └── layout.tsx
│   ├── (dashboard)/            # Route Group: Main App Workspaces
│   │   ├── overview/
│   │   └── layout.tsx
│   ├── error.tsx               # Global boundary for runtime faults
│   ├── layout.tsx              # Root HTML/Body shell & Global Providers
│   └── page.tsx                # Application Entry Point Redirector
├── components/                 # Atomic design structural components (Domain-Agnostic)
│   ├── ui/                     # Primitives (Buttons, Inputs, Dialogs via Shadcn/ui)
│   ├── feedback/               # Loaders, Modals, Toasts, Skeletons
│   └── layout/                 # Global Navigation, Sidebar, Footer components
├── layouts/                    # Multi-Page structural layout wrappers (Alternative view states)
├── lib/                        # Infrastructure, HTTP core clients, and base engine plugins
│   ├── api-client.ts           # Axios / Fetch base configuration with interceptors
│   ├── auth-options.ts         # Authentication configuration definitions
│   └── utils/                  # Global utilities
│       ├── formatters.ts       # Date, currency, and string transformers
│       ├── validators.ts       # Global string or regex validation patterns
│       └── cn.ts               # Tailwind merge class combining utility
├── modules/                    # Domain-Driven Core Engine (Context-Isolated Modules)
│   ├── shared/                 # Common domain building blocks shared exclusively between modules
│   └── Home/                   # Isolated feature module example
│       ├── components/         # Sub-atomic components localized to the Home domain
│       ├── pages/              # Composite structural views rendered inside app/ directory
│       ├── store/              # Isolated Zustand state micro-stores for Home logic
│       ├── types/              # Domain-specific contract mappings and interface definitions
│       ├── hooks/              # Isolated React Hooks containing module-only logic
│       └── services/           # Domain API client calls and mutation interceptors
├── pages/                      # Reserved for legacy Page Router migration (fallback only)
├── public/                     # Static assets (Vector graphics, manifest files, favicons)
└── styles/                     # Global stylesheet declarations
    ├── globals.css             # Tailwind directives and root CSS variable mappings
    └── variables.css           # Native design token properties
```

---

## 4. Domain Isolation & Module Design Pattern

The `modules/` folder is the core of this architecture. It prevents architectural degradation by enforcing high cohesion within a module and loose coupling between modules.

```text
[ app/ route controller ]
            │
            ▼  Imports
[ modules/ModuleName/pages ]
            │
   ┌────────┼────────┐
   ▼        ▼        ▼
[components] [store] [types]
```

### 4.1 Module Internals Breakdown (e.g., `modules/Home`)

1. **`components/`** — Houses discrete visual components used specifically inside the Home module. These elements build upon global primitives located in the root `components/ui/` folder but incorporate specific domain business rules.
2. **`pages/`** — These are _not_ Next.js file-system routes. Instead, they are composite layout containers or screen blueprints. Next.js router files (`src/app/page.tsx`) import these components and wrap them in server routing logic. This keeps routing definitions completely separate from UI layouts.
3. **`store/`** — Local state engines. Instead of generating a single global state model, each module maintains standalone micro-stores via Zustand to manage domain transactions (e.g., `useHomeStore`).
4. **`types/`** — Contains domain-specific TypeScript structures, data models, and Zod schemas. These definitions do not bleed into the global namespace.

### 4.2 Cross-Module Communication Contract

- **Isolation Policy:** `modules/Home` cannot import components, hooks, or stores directly from other distinct feature modules.
- **The Shared Fallback:** If functionality must be shared across multiple modules, it must be extracted and moved up into the `modules/shared/` or global `components/` path.
- **Interface Mapping:** Components interacting between boundaries must accept primitives or standard interfaces, preventing deep data model dependency chains.

---

## 5. Architectural Principles & Implementation

To maintain clean code quality across large teams, development must adhere to these structural paradigms.

### 5.1 Single Responsibility Principle (SRP)

Components must possess exactly one reason to change. Separate structural mutations from the presentation matrix. Use Server Components for high-level orchestrations, clean utility components for layout logic, and hooks for local interactive mutations.

### 5.2 Decoupled Data Fetching & State Separation

- **Server Operations:** Fetch data at the highest possible structural level inside Server Components (`app/` folders). Pass data down to client modules as immutable read-only props.
- **Client Modifications:** Perform local adjustments inside components using custom hooks backed by state managers. Avoid mutating global data states when local UI variables are sufficient.

### 5.3 Defensive Coding & Robust Boundary Topography

- **Schema Enforcement:** Validate all external API JSON payloads using Zod schemas before releasing data to the UI layer. This prevents unhandled errors from unexpected null properties or mismatched data types.
- **Error Isolation:** Wrap complex functional feature sets in localized React Error Boundaries. This ensures that an unexpected breakdown in one feature doesn't crash the entire user interface.

---

## 6. Implementation Reference Blueprints

### 6.1 Domain Module Service Contract (`modules/Home/types/index.ts`)

```typescript
import { z } from "zod";

export const HomeDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  metric: z.number(),
  variance: z.number(),
});

export type HomeDataType = z.infer<typeof HomeDataSchema>;
```

### 6.2 Module Presentation Component Blueprint (`modules/Home/components/SummaryCard.tsx`)

```tsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SummaryCardProps {
  title: string;
  metric: number;
  variance: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  metric,
  variance,
}) => {
  const isPositive = variance >= 0;

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
        <p
          className={`text-xs mt-1 ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
        >
          {isPositive ? "+" : ""}
          {variance}% vs trailing month
        </p>
      </CardContent>
    </Card>
  );
};
```

### 6.3 Routing Connection Layer Bridge (`app/(dashboard)/overview/page.tsx`)

```tsx
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/feedback/LoadingSkeleton";

// Next.js page metadata block
export const metadata = {
  title: "Dashboard Overview",
  description: "Enterprise monitoring dashboard metrics view",
};

export default async function OverviewPage() {
  return (
    <main className="container mx-auto py-6 px-4">
      <Suspense fallback={<LoadingSkeleton count={3} />}>
        {/* Dynamic modular pages import and injection maps here */}
        <div className="text-lg font-semibold text-gray-800">
          Overview Page Interface
        </div>
      </Suspense>
    </main>
  );
}
```

---

## 7. Performance Optimization & Production Standards

To maintain fast load times and smooth performance under high traffic, enforcement of the following execution metrics is mandatory:

- **Network Optimization:** Media assets must use the Next.js `<Image />` component for automatic WebP transcoding and responsive resolution scaling.
- **Code Splitting:** Dynamic route grouping and lazy dynamic packaging (`next/dynamic`) should be applied to heavy interactive elements.
- **Data Stale Management:** Configure explicit revalidation tags across server fetch chains to minimize unnecessary pressure on backend databases.
- **Bundle Size Limits:** Budget target bundles to stay under 100 kB for initial page entry points, ensuring snappy performance across lower-speed client connections.
