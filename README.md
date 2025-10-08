# nextjs-super-base

A modern Next.js starter template with tRPC, Superjson, Zod, and shadcn/ui.

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Superjson](https://github.com/blitz-js/superjson)** - Safely serialize JavaScript expressions
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI and Tailwind CSS
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Features

- ✅ Latest Next.js 15 with App Router
- ✅ tRPC for type-safe API routes
- ✅ Superjson for enhanced serialization (supports Date, Map, Set, etc.)
- ✅ Zod schema validation for inputs
- ✅ shadcn/ui components (Button, Card, Input)
- ✅ Tailwind CSS 4 for styling
- ✅ TypeScript for type safety
- ✅ ESLint for code quality
- ✅ pnpm for fast, efficient package management

## Package Management with pnpm

This project uses [pnpm](https://pnpm.io/) as the package manager for several benefits:

- **Fast**: pnpm is 2x faster than npm and yarn
- **Efficient**: Saves disk space by using a content-addressable store
- **Strict**: Creates a non-flat node_modules by default, helping to avoid dependency hell
- **Monorepo-friendly**: Built-in support for monorepos

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- pnpm 9.0.0 or later

You can install pnpm globally:
```bash
npm install -g pnpm
# or
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Verify your installation:
```bash
node --version
pnpm --version
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rowandh/nextjs-super-base.git
cd nextjs-super-base
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
nextjs-super-base/
├── app/                      # Next.js App Router
│   ├── api/trpc/[trpc]/     # tRPC API routes
│   ├── layout.tsx           # Root layout with TRPCProvider
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   └── example-component.tsx
├── lib/                     # Utilities
│   ├── trpc.ts             # tRPC server setup
│   ├── trpc-client.ts      # tRPC vanilla client
│   ├── trpc-provider.tsx   # tRPC React Query provider
│   └── utils.ts            # Utility functions
├── server/                  # Backend logic
│   ├── routers/            # tRPC routers
│   │   └── example.ts      # Example router with queries & mutations
│   └── index.ts            # Root app router
└── package.json
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## tRPC Usage

### Server-side (Router)

Define your tRPC routes in `server/routers/`:

```typescript
import { z } from 'zod';
import { publicProcedure, router } from '@/lib/trpc';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello ${input.name}!` };
    }),
});
```

### Client-side (React)

Use tRPC hooks in your components:

```typescript
'use client';

import { trpc } from '@/lib/trpc-provider';

export function MyComponent() {
  const helloQuery = trpc.example.hello.useQuery({ name: 'World' });
  
  return <div>{helloQuery.data?.greeting}</div>;
}
```

## Adding shadcn/ui Components

The project is configured with shadcn/ui. To add more components, manually copy them from [ui.shadcn.com](https://ui.shadcn.com/) into the `components/ui` directory.

Example components already included:
- Button
- Card
- Input

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [tRPC Documentation](https://trpc.io/docs) - learn about tRPC
- [Zod Documentation](https://zod.dev/) - learn about Zod schema validation
- [shadcn/ui](https://ui.shadcn.com/) - explore available components

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT

