import { router } from '@/lib/trpc';
import { exampleRouter } from './routers/example';
import { authRouter } from './routers/supabase';
import { testRouter } from './routers/test';

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  test: testRouter,
});

export type AppRouter = typeof appRouter;
