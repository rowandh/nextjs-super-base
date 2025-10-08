import { router } from '@/lib/trpc';
import { exampleRouter } from './routers/example';

export const appRouter = router({
  example: exampleRouter,
});

export type AppRouter = typeof appRouter;
