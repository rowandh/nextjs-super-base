import { z } from 'zod';
import { publicProcedure, router } from '@/lib/trpc';

export const testRouter = router({
  // Simple test query that doesn't use Supabase
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }: { input: { name?: string } }) => {
      return {
        message: `Hello ${input.name ?? 'World'}! tRPC integration is working.`,
      };
    }),
});