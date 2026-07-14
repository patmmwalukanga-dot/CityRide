# Next.js Project Template

A production-minded Next.js App Router template with TypeScript, Material UI, styled-components, MobX, Zod, i18n, Vitest, and native `fetch` service patterns.

This starter follows a modular folder structure inspired by the Panuka Hub codebase while keeping the implementation generic enough for new products.

## Getting Started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
yarn dev          # Start the development server
yarn build        # Build for production
yarn start        # Start the production server
yarn lint         # Run ESLint
yarn type-check   # Run TypeScript without emitting files
yarn test         # Run Vitest
```

## Project Structure

```text
src/
├── app/              # Next.js app router pages, layouts, and route handlers
├── api/              # Feature-level API wrappers
├── assets/           # Static imports, images, fonts, and media helpers
├── components/       # Shared components
│   ├── styled/       # styled-components primitives
│   └── ui/           # Base UI components
├── config/           # App-wide configuration
├── constants/        # Constant values and option lists
├── features/         # Feature-first modules
├── hooks/            # Reusable React hooks
├── layouts/          # Layout components
├── lib/              # Framework/library setup and utilities
├── middleware/       # Middleware helpers
├── services/         # External service clients
├── state/            # MobX stores and state providers
├── styles/           # Theme tokens and global styling helpers
├── types/            # Shared TypeScript types
└── utils/            # Generic utilities
```

## Import Aliases

```ts
import { AppButton } from "@components/ui/button";
import { appLinks } from "@config/app-links";
import { apiClient } from "@services/api-client";
import { useStore } from "@state/root-store";
```

## Standards

- Use TypeScript for all new code.
- Prefer feature-first modules under `src/features`.
- Keep components presentational and move logic into hooks.
- Use MobX for client state that is shared across screens.
- Use native `fetch`, route handlers, and server actions for data flow.
- Do not add React Query unless the project explicitly chooses that architecture later.
- Validate forms and payloads with Zod.
- Keep user-facing text in the translation resources.
- Centralize route paths in `src/config/app-links.ts`.
- Use base UI components before importing directly from MUI in product code.

## GitHub Template Usage

After this repository is marked as a template on GitHub, create new projects from the GitHub UI with **Use this template**, then update:

- `package.json` name and description
- `README.md` product details
- `.env.example` variables
- `src/config/app-config.ts`
- `src/lib/i18n/resources.ts`

## Validation

Before opening a pull request, run:

```bash
yarn lint
yarn type-check
yarn test
yarn build
```
