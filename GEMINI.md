````md
# ENTERPRISE FRONTEND ARCHITECTURE STANDARD (v1.1)
> Authorized by: Dept. of Computer Science, Distributed Systems Lab.

---

## 0) Purpose
This document defines the official enterprise architecture standard for this React platform. It is **mandatory** for all new code and refactors to follow these rules to ensure scalability, maintainability, consistency, and team velocity.

---

## I. Architectural Philosophy: The “Colocation” Law
We adhere strictly to a **Feature-Based Architecture**:

- **Colocation Principle:** Code that changes together must live together.
- **Global Layer:** Only truly generic, reusable code with **zero business logic**.
- **Domain Layer:** All business logic and feature-specific UI must live inside `src/features`.

### Definitions
- **Business Logic:** Any logic tied to a specific domain rule, workflow, or backend entity (e.g., roles, users, schedules, inventory).
- **Global/Generic:** UI primitives, infrastructure, utilities, shared types, and framework-level hooks that are domain-agnostic.

---

## II. Tech Stack (Approved)
تم. في المستند استبدل **Mantine 8.3.11** بـ **Mantine 8.3.12** في قسم Tech Stack كالتالي:

```md
## II. Tech Stack (Approved)
- **Package Manager:** `npm`
- **Core:** React `^19.2.0`, `react-dom` `^19.2.0`, TypeScript, Vite
- **UI:** Mantine `8.3.12`  
  - `@mantine/core` `8.3.12`  
  - `@mantine/hooks` `8.3.12`
- **Icons:** `@tabler/icons`
- **Tables:** `mantine-datatable`
- **State Management:**
  - **Global (Cross-feature only):** Zustand
  - **Server State:** React Query (TanStack Query)
- **Routing:** `react-router-dom` `^7.9.4`
```
---

## III. Directory Structure (MANDATORY)
Create `.gitkeep` for empty directories.

```text
src/
├── app/                        # Application Orchestration Layer (composition root)
│   ├── App.tsx                 # Root component (high-level shell)
│   ├── main.tsx                # DOM entry point
│   ├── providers.tsx           # Provider composition (Mantine, QueryClient, etc.)
│   └── router.tsx              # Router composition and route registration
│
├── assets/                     # Static assets (optimized)
│
├── components/                 # GLOBAL DESIGN SYSTEM (pure UI, no business logic)
│   ├── ui/                     # Atoms & Molecules (Mantine wrappers)
│   ├── layouts/                # Structural layouts (Header, Sidebar, Shell)
│   └── index.ts                # Public API for global components
│
├── config/                     # Environment and routing configuration
│   ├── env.ts                  # Zod schema validation for env vars
│   └── paths.ts                # Route constants and path builders
│
├── features/                   # DOMAIN LOGIC (the core of the app)
│   └── .gitkeep
│
├── hooks/                      # GLOBAL framework-level hooks (logic only, no UI, no business logic)
│   └── use-disclosure.ts       # Example
│
├── lib/                        # Infrastructure / third-party adapters (singletons/config)
│   ├── axios.ts                # HTTP client singleton
│   ├── query-client.ts         # React Query client configuration
│   ├── mantine.ts              # Mantine theme configuration
│   └── index.ts                # Public API for lib
│
├── store/                      # Global Zustand state (cross-feature only)
│   └── index.ts
│
├── types/                      # Shared kernel types (app-wide)
│   └── api.d.ts
│
└── utils/                      # Pure deterministic functions (no side effects)
    ├── formatters.ts
    └── storage.ts
````

---

## IV. Import Boundaries (STRICT RULES)

These rules prevent coupling, circular dependencies, and architectural erosion.

### 1) Allowed Imports

* **`src/app/*`**

  * May import from anywhere in `src/` (composition root).
* **`src/features/{feature}/*`**

  * May import from:

    * Its own feature module (`src/features/{feature}/...`)
    * Global layers:
      `src/components/*`, `src/hooks/*`, `src/lib/*`, `src/config/*`, `src/types/*`, `src/utils/*`
* **`src/components/*`**

  * May import from:

    * `src/lib/*`, `src/types/*`, `src/utils/*`, Mantine packages
  * Must NOT import from `src/features/*`
* **`src/lib/*`**

  * May import from:

    * `src/config/*`, `src/types/*`, `src/utils/*`
  * Must NOT import from `src/features/*` or `src/components/*`

### 2) Forbidden Imports (Hard Violations)

* **Feature → Feature direct import is forbidden**

  * Example: `src/features/users` importing from `src/features/roles` is NOT allowed.
* **Global UI importing business logic**

  * `src/components/*` must not import any feature logic.
* **Circular dependencies**

  * Must be eliminated by restructuring and using public APIs.

---

## V. Public API Rule (MANDATORY)

To enforce clean imports and reduce deep coupling, every major layer and every feature must expose a public API via an `index.ts`.

### Required Index Files

* `src/components/index.ts`
* `src/lib/index.ts`
* `src/features/{feature}/index.ts`

### Usage Rule

Prefer importing from the public API instead of deep imports.

✅ Good:

```ts
import { AppButton } from "@/components";
import { usersRoutes } from "@/features/users";
import { http } from "@/lib";
```

❌ Bad:

```ts
import { AppButton } from "@/components/ui/button/AppButton";
import { usersRoutes } from "@/features/users/routes";
```

---

## VI. Feature Module Standard (MANDATORY)

Each feature in `src/features/{feature-name}` must follow this structure:

```text
src/features/{feature-name}/
├── components/          # Feature UI components (tables, forms, widgets)
├── hooks/               # Feature hooks (queries, controllers, derived logic)
├── pages/               # Feature pages/views (route-level components)
├── services/            # API calls for this feature (service layer)
├── validation/          # Zod schemas for feature inputs
├── types/               # (optional, recommended) feature-specific types
└── index.ts             # Feature public API (exports)
```

### Feature Rules

1. **No business logic outside `features/`**

   * Business logic must be colocated with its feature.
2. **Keep components small and focused**

   * UI components should not contain complex orchestration logic.
3. **Services are isolated**

   * API calls must be in `services/` and never embedded directly in UI components.

---

## VII. Identifier Rules (ID vs Code/Name)

### Backend Operations (CRUD)

All backend operations must use **system-generated unique `id`**:

* `getById(id)`
* `update(id, payload)`
* `delete(id)`

### UI Display

Human-readable identifiers (`code`, `name`) are for display only and must **not** replace the `id` for CRUD operations.

---

## VIII. Routing Strategy (ONE OFFICIAL PATTERN)

### Pattern: Feature Routes Export + Central Composition

* Each feature may export a `routes` fragment (or `*Routes`).
* `src/app/router.tsx` is the single place where routes are registered and composed.

Rules:

* **Route-level components** live in `src/features/{feature}/pages`.
* **No ad-hoc route definitions** inside random components.

Example:

```ts
// src/features/users/index.ts
export { usersRoutes } from "./routes";

// src/app/router.tsx
import { usersRoutes } from "@/features/users";
```

---

## IX. State Management Rules (Zustand + React Query)

### 1) React Query (Server State) — REQUIRED

All server state (API data) must be managed with React Query:

* Queries and mutations live behind custom hooks in `src/features/{feature}/hooks`.
* Query keys must be stable and consistent.
* Mutations must invalidate or update the cache correctly.

### 2) Zustand (Global Cross-Feature Only) — LIMITED

Zustand is allowed only for **cross-feature shared state**, such as:

* Authentication session/token
* Global UI state (sidebar, theme mode, global modals)
* Cross-feature selections or filters (only if truly shared)

Hard rule:

* **Do not store API entities in Zustand** when React Query is the correct tool.

Performance rule:

* Always use selectors to minimize re-renders:

```ts
const sidebarOpen = useUiStore((s) => s.sidebarOpen);
```

---

## X. UI System & Mantine Guidelines (ENFORCED)

All UI must follow Mantine best practices and the project’s Mantine documentation source (`llms-full.txt`).

### Core Principles

* **Use Mantine components directly** (`@mantine/core`, `@mantine/hooks`) as documented.
* **Wrappers belong in `src/components/ui/`** to enforce consistent styling/behavior.
* **Avoid inline styles**. Prefer:

  * Mantine Styles API
  * CSS Modules
  * CSS variables
  * Theme overrides
* **Use variants/sizes** as documented (xs/sm/md, filled/outline, etc.).
* **Accessibility is mandatory**

  * Add `aria-label` for icon-only controls.
  * Use semantic elements and proper roles.

### Theming

* Theme configuration must live in `src/lib/mantine.ts`.
* `MantineProvider` must be configured in `src/app/providers.tsx`.

### Icons & Tables

* Icons must use `@tabler/icons` for consistency.
* Tables must use `mantine-datatable` following its documentation.

---

## XI. Zod Validation & Schema Guidelines (ENFORCED)

All user input must be validated using Zod schemas placed under:

* `src/features/{feature}/validation/`

### JSON Schema Conversion (Zod ↔ JSON Schema)

Use Zod v4 APIs:

* `z.fromJSONSchema()` (experimental) for JSON Schema → Zod
* `z.toJSONSchema()` for Zod → JSON Schema

Key notes:

* Some Zod types are not representable in JSON Schema (e.g., `z.date()`, `z.bigint()`, transforms).
* Configure conversion using `z.toJSONSchema(schema, params)`:

  * `target`, `unrepresentable`, `cycles`, `reused`, `io`, and `override`.

### Codecs (Bidirectional Transforms)

Use Codecs for strongly-typed encode/decode:

* `z.encode()` / `z.decode()`
* Support nesting and async codecs as needed.

Example codec:

```ts
import * as z from "zod";

export const isoDatetimeToDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
});
```

---

## XII. Enforcement & Compliance

* All new features must follow this standard.
* Any PR that violates:

  * import boundaries,
  * directory structure,
  * public API rules,
  * or state management rules
    must be revised before approval.

---

## XIII. Summary (Non-Negotiables)

* Feature-based architecture with strict colocation.
* No business logic in global layers.
* Feature → Feature imports are forbidden.
* Public APIs (`index.ts`) are mandatory.
* React Query for server state; Zustand only for cross-feature global state.
* Mantine theming centralized; no inline styling.
* Zod validation required for all user inputs.

## XIV. File & Folder Naming Conventions (MANDATORY)

This section defines **strict** naming rules for files and folders. All new code and refactors must follow these conventions to ensure consistency, discoverability, and scalability.

---

### 1) Global Rules (Non-Negotiable)
- **Folders:** `kebab-case`  
  Examples: `role-management/`, `user-profile/`, `stream-layout/`
- **TypeScript files (.ts):** `kebab-case.ts`  
  Examples: `query-client.ts`, `role.service.ts`, `role.schema.ts`
- **React component files (.tsx):** `PascalCase.tsx`  
  Examples: `RoleTable.tsx`, `RoleForm.tsx`, `RoleManagementPage.tsx`

> **Rule:** Do not mix naming styles in the same layer. Consistency is mandatory.

---

### 2) Feature Module Naming (src/features/{feature-name})
Each feature folder must be `kebab-case` and must follow the standard internal structure.

#### A) `pages/` (Route-Level Components)
- **Purpose:** Route-level components only (top-level views registered in the router).
- **Naming:** `XxxPage.tsx`
- **Examples:**
  - `RoleManagementPage.tsx`
  - `RoleDetailsPage.tsx`
  - `UsersPage.tsx`

#### B) `components/` (Feature UI Components)
- **Purpose:** UI components specific to this feature (tables, forms, widgets, panels).
- **Naming:** `PascalCase.tsx`
- **Examples:**
  - `RoleTable.tsx`
  - `RoleForm.tsx`
  - `RoleFilters.tsx`
  - `RoleActionsMenu.tsx`

#### C) `hooks/` (Feature Hooks)
Hooks are categorized by responsibility and must not be mixed.

1) **React Query Hooks (Server State)**
- **Queries:** `useXxxQuery.ts`
- **Mutations:** `useXxxMutation.ts`
- **Examples:**
  - `useRolesQuery.ts`
  - `useRoleQuery.ts`
  - `useCreateRoleMutation.ts`
  - `useUpdateRoleMutation.ts`
  - `useDeleteRoleMutation.ts`

2) **Controller Hooks (Orchestration / UI Logic)**
- **Naming:** `useXxxController.ts`
- **Purpose:** Orchestrate UI state + forms + mutations (no direct JSX).
- **Examples:**
  - `useRoleFormController.ts`
  - `useRoleManagementController.ts`

3) **Utility / Domain Hooks (Feature Logic)**
- **Naming:** `useXxx.ts`
- **Purpose:** Reusable feature-specific logic (no API calls unless wrapped by query hooks).
- **Examples:**
  - `useRolePermissions.ts`
  - `useRoleColumns.ts`

#### D) `services/` (API Layer)
- **Purpose:** API interaction only (HTTP calls). No React, no React Query.
- **Naming:** `xxx.service.ts`
- **Examples:**
  - `role.service.ts`
  - `user.service.ts`

#### E) `validation/` (Zod Schemas)
- **Purpose:** Input validation schemas for this feature.
- **Naming:** `xxx.schema.ts`
- **Examples:**
  - `role.schema.ts`
  - `role-filters.schema.ts`

#### F) `types/` (Feature Types)
- **Purpose:** Types specific to this feature (DTOs, view models, local types).
- **Naming:** `xxx.types.ts`
- **Examples:**
  - `role.types.ts`
  - `user.types.ts`

#### G) Feature Public API (Required)
- **File:** `src/features/{feature-name}/index.ts`
- **Rule:** Export only what the rest of the app needs (avoid exporting internal-only modules).

---

### 3) Global Layers Naming (Outside features)

#### A) `src/lib/`
- **Purpose:** Infrastructure / adapters / configuration singletons.
- **Naming:** `kebab-case.ts`
- **Examples:**
  - `axios.ts`
  - `query-client.ts`
  - `mantine.ts`

#### B) `src/utils/`
- **Purpose:** Pure deterministic utilities (no side effects).
- **Naming:** `kebab-case.ts`
- **Examples:**
  - `formatters.ts`
  - `storage.ts`
  - `date.ts`

#### C) `src/hooks/` (Global Hooks)
- **Purpose:** Framework-level reusable hooks (no business logic).
- **Naming:** `use-xxx.ts`
- **Examples:**
  - `use-disclosure.ts`
  - `use-debounced-value.ts`
  - `use-mounted.ts`

---

### 4) Index (Barrel) Files
To reduce deep imports and enforce boundaries:
- `src/components/index.ts` exports global UI/public components.
- `src/lib/index.ts` exports shared infrastructure utilities.
- `src/features/{feature-name}/index.ts` exports feature public API.

✅ Good:
```ts
import { AppButton } from "@/components";
import { http } from "@/lib";
import { usersRoutes } from "@/features/users";

❌ Bad:

import { AppButton } from "@/components/ui/button/AppButton";
import { usersRoutes } from "@/features/users/routes";

### 5) File Naming Patterns (Cheat Sheet)

Use these exact patterns across the codebase:

#### React Components
- `PascalCase.tsx`
  - `RoleTable.tsx`
  - `RoleForm.tsx`
  - `SidebarLayout.tsx`

#### Pages (Route-level)
- `PascalCasePage.tsx`
  - `RoleManagementPage.tsx`
  - `RoleDetailsPage.tsx`

#### Hooks
- Query hooks: `useXxxQuery.ts`
  - `useRolesQuery.ts`
  - `useRoleQuery.ts`
- Mutation hooks: `useXxxMutation.ts`
  - `useCreateRoleMutation.ts`
  - `useUpdateRoleMutation.ts`
- Controller hooks: `useXxxController.ts`
  - `useRoleFormController.ts`
- Utility hooks: `useXxx.ts`
  - `useRoleColumns.ts`

#### Services (API)
- `xxx.service.ts`
  - `role.service.ts`
  - `user.service.ts`

#### Schemas (Zod)
- `xxx.schema.ts`
  - `role.schema.ts`
  - `role-filters.schema.ts`

#### Types
- `xxx.types.ts`
  - `role.types.ts`
  - `user.types.ts`

#### Constants / Config
- `kebab-case.ts`
  - `paths.ts`
  - `env.ts`

#### Utilities
- `kebab-case.ts`
  - `formatters.ts`
  - `storage.ts`

---

### 6) Export Rules (Public API Discipline)

To prevent messy imports and accidental coupling:

1) **Every feature MUST have `index.ts`**
- Export only:
  - feature route fragments (if needed)
  - page entry points (if router imports them)
  - public hooks needed by `app/`
  - strongly typed service exports if shared (rare)

2) **Internal modules remain private**
- Files under:
  - `components/`
  - `validation/`
  - internal-only hooks/controllers
  are not exported unless required.

3) **No wildcard exports by default**
- Avoid `export * from ...` in public APIs unless the feature is stable and curated.

✅ Recommended:
```ts
// src/features/roles/index.ts
export { rolesRoutes } from "./routes";
export { RoleManagementPage } from "./pages/RoleManagementPage";
❌ Not allowed (public API leakage):

export * from "./components";
export * from "./hooks";

7) Testing File Naming (If/When Tests Exist)

If the project includes tests, apply these rules:

Unit tests: *.test.ts / *.test.tsx

role.service.test.ts

RoleTable.test.tsx

Integration tests: *.spec.ts / *.spec.tsx (optional)

roles.integration.spec.ts

Mocks:

__mocks__/ folder or *.mock.ts

role.mock.ts

Rule: test files must live next to the code (colocated) unless a dedicated test strategy is defined.

8) Examples (Correct vs Incorrect)
Example A: Feature Folder Naming

✅ Correct:

src/features/role-management/


❌ Incorrect:

src/features/RoleManagement/
src/features/roleManagement/

Example B: Service Naming

✅ Correct:

src/features/roles/services/role.service.ts


❌ Incorrect:

src/features/roles/services/RoleService.ts
src/features/roles/services/roleService.ts

Example C: Hooks Naming

✅ Correct:

src/features/roles/hooks/useRolesQuery.ts
src/features/roles/hooks/useCreateRoleMutation.ts
src/features/roles/hooks/useRoleFormController.ts


❌ Incorrect:

src/features/roles/hooks/use-roles.ts
src/features/roles/hooks/roles.hook.ts
src/features/roles/hooks/useCreateRole.ts

9) Enforcement

Any PR that violates this naming standard must be revised before approval.

If a naming edge case arises, the default is:

follow the closest existing pattern in this document

document the new pattern explicitly in this section