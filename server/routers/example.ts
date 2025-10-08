import { z } from 'zod';
import { publicProcedure, router } from '@/lib/trpc';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.name ?? 'World'}!`,
      };
    }),
  
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      return {
        id: input.id,
        name: `User ${input.id}`,
        email: `user${input.id}@example.com`,
      };
    }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      })
    )
    .mutation(({ input }) => {
      return {
        id: Math.floor(Math.random() * 1000),
        name: input.name,
        email: input.email,
        createdAt: new Date(),
      };
    }),
});
