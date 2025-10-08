# nextjs-super-base

A modern Next.js starter template with tRPC, Supabase, Superjson, Zod, and shadcn/ui.

## Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative
- **[Superjson](https://github.com/blitz-js/superjson)** - Safely serialize JavaScript expressions
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix UI and Tailwind CSS
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Features

- ✅ Latest Next.js 15 with App Router
- ✅ tRPC for type-safe API routes
- ✅ Supabase integration with authentication and database
- ✅ Magic link authentication
- ✅ Real-time subscriptions
- ✅ Row Level Security (RLS)
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

3. Set up Supabase (see [Supabase Setup](#supabase-setup) below)

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project
5. Wait for the project to be set up (this can take a few minutes)

### 2. Get Your Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (something like `https://your-project.supabase.co`)
   - **Project API Key** (anon/public key)

### 3. Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Database Setup

In your Supabase project dashboard, go to the **SQL Editor** and run the SQL schema:

You can either:
1. **Copy and paste** the contents of `supabase/schema.sql` into the SQL Editor, or
2. **Upload the file** directly using the SQL Editor's import feature

This will create a minimal database schema ready for your custom tables.

### 5. Configure Authentication

1. In your Supabase project, go to **Authentication** → **Settings**
2. Under **Site URL**, add your development URL: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/auth/callback`
4. For production, add your production URLs as well

### 6. Test Your Setup

After completing the setup, you can:

1. Visit `/login` to test magic link authentication
2. Check the dashboard example with user authentication (no profiles, just basic user info)

## Project Structure

```
nextjs-super-base/
├── app/                      # Next.js App Router
│   ├── api/trpc/[trpc]/     # tRPC API routes
│   ├── auth/                # Authentication pages & callbacks
│   ├── login/               # Login page
│   ├── layout.tsx           # Root layout with TRPCProvider
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── dashboard-example.tsx # Supabase + tRPC example
│   └── example-component.tsx
├── lib/                     # Utilities
│   ├── supabase/           # Supabase client configurations
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Auth middleware
│   ├── trpc.ts             # tRPC server setup with Supabase context
│   ├── trpc-client.ts      # tRPC vanilla client
│   ├── trpc-provider.tsx   # tRPC React Query provider
│   ├── database.types.ts   # Database type definitions
│   └── utils.ts            # Utility functions
├── server/                  # Backend logic
│   ├── routers/            # tRPC routers
│   │   ├── example.ts      # Example router
│   │   └── supabase.ts     # Auth router with Supabase (no profiles)
│   └── index.ts            # Root app router
├── supabase/               # Supabase configuration
│   └── schema.sql          # Database schema and policies
├── middleware.ts           # Next.js middleware for auth
├── .env.example           # Environment variables example
└── package.json
```

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## tRPC + Supabase Usage

This project demonstrates how to integrate tRPC with Supabase for a fully type-safe full-stack experience.

### Authentication Example

```typescript
'use client';

import { createClient } from '@/lib/supabase/client';
import { trpc } from '@/lib/trpc-client';

export function AuthExample() {
  const supabase = createClient();
  
  // Magic link sign in
  const handleSignIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  // Get current user using tRPC
  const { data: user } = trpc.auth.getUser.useQuery();

  // Sign out using tRPC
  const signOut = trpc.auth.signOut.useMutation();
  
  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => signOut.mutate()}>
            Sign Out
          </button>
        </div>
      ) : (
        <div>Please sign in</div>
      )}
    </div>
  );
}
```

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

