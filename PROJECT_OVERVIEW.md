# Project Overview

This document provides a comprehensive summary of the Enterprise Platform frontend. It is intended to help any team member, new or existing, quickly understand the project's architecture, technology stack, and coding conventions.

## 1. Core Libraries & Technology Stack

The project is a modern React application built with TypeScript. The stack is carefully chosen to prioritize developer experience, maintainability, and a consistent UI.

### Frameworks & UI
- **React (v19)**: The core library for building the user interface.
- **Vite**: The build tool and development server, providing a fast and lean development experience.
- **Mantine (v8.3)**: A comprehensive React components library used for UI, layout, forms, modals, and notifications. It provides a solid design system out of the box. Key components used are `@mantine/core`, `@mantine/hooks`, and `mantine-datatable`.
- **React Router (v7)**: Handles all client-side routing and navigation.

### State Management
- **TanStack Query (React Query v5)**: Manages server state, including data fetching, caching, and synchronization. It is the standard for handling asynchronous operations.
- **Zustand (v5)**: A lightweight global state management solution. It is used for managing UI state that needs to be shared across components, such as the sidebar's collapsed state (`useSidebarStore`).
- **Custom Hooks**: Local and feature-specific state logic is encapsulated within custom hooks (e.g., `useUserPageController`) to promote reusability and separation of concerns.

### Data & Validation
- **Axios**: The HTTP client used for making API requests. It is wrapped in a custom `apiClient` for centralized configuration.
- **Zod**: A TypeScript-first schema declaration and validation library. It is used with `mantine-form-zod-resolver` to ensure type-safe and robust form validation.

### Tooling & Quality
- **TypeScript**: Ensures type safety across the entire codebase.
- **ESLint & Prettier**: Enforce a consistent code style and quality. The configuration (`eslint-config-mantine`) aligns with Mantine's best practices.
- **Vitest**: The testing framework for running unit and integration tests.
- **Storybook**: Used for developing and documenting UI components in isolation.

## 2. Completed Pages & Features

The application currently has a solid foundation with a primary focus on user administration.

### Core Layout (`MainLayout.tsx`)
- A responsive application shell (`AppShell`) that adapts to mobile and desktop screens.
- A persistent, collapsible sidebar (`SideBar.tsx`) for primary navigation. Its state is managed globally by a Zustand store.
- A main content area where the different pages are rendered via `react-router-dom`.

### Pages (`router.tsx`)
- **Home Page (`/`)**: The main landing page after login.
- **User Management Page (`/users`)**: A full-featured CRUD interface for managing users.
  - **Data Table**: Uses `mantine-datatable` to display a list of users with sorting and filtering capabilities.
  - **CRUD Operations**: A `GenericCrudPage` component provides the framework for create, read, update, and delete operations.
  - **Forms & Modals**: Modals with integrated forms (`UserCreateForm`, `UserEditForm`) are used for adding and editing users.
  - **Actions**: Includes "Import" and "Export" buttons.
  - **Stats**: A `StatsGroup` component displays key metrics about the user data.
- **User View Page (`/users/:code`)**: A dedicated page for viewing the details of a single user.

## 3. Architecture & Writing Style

The project follows modern best practices for building scalable and maintainable frontend applications.

### Folder Structure
- **`src/app`**: Core application setup, including the main entry point (`main.tsx`), router (`router.tsx`), and global styles.
- **`src/components`**: Contains reusable UI components (`ui/`) and layouts (`layouts/`).
- **`src/features`**: Implements "feature-sliced" architecture. Each business domain (e.g., `users`) is a self-contained module with its own components, hooks, pages, and services.
- **`src/hooks`**: Home to generic, reusable hooks (e.g., `use-dataTableState.ts`).
- **`src/lib`**: Shared library functions and client instances, such as the configured `axios` client (`apiClient.ts`), `query-client.ts`, and `mantine.ts` theme setup.
- **`src/pages`**: Simple pages that compose components and features.
- **`src/store`**: Global state management stores (Zustand).

### Coding Style & Patterns
- **Functional Components & Hooks**: The entire codebase uses functional components with React Hooks.
- **Separation of Concerns**: Logic is cleanly separated from the UI. Custom hooks (`useUserPageController`) contain the business logic, state management, and event handlers, keeping the JSX in the components clean and declarative.
- **Composition**: The UI is built by composing smaller, single-purpose components. The `GenericCrudPage` is a prime example of composing different UI elements to create a reusable page structure.
- **TypeScript Everywhere**: All code is strongly typed, including component props, API responses, and form values.
- **Absolute Imports**: Uses `tsconfig.json` path aliases (`@/*`) for clean and consistent imports.
- **Centralized Configuration**: API clients, theme settings, and routing are all configured in central locations, making them easy to manage.
