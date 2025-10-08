import { z } from 'zod';
import { publicProcedure, router } from '@/lib/trpc';

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string().optional() }))
    .query(({ input }: { input: { name?: string } }) => {
      return {
        greeting: `Hello ${input.name ?? 'World'}!`,
      };
    }),
  
  getUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }: { input: { id: number } }) => {
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
    .mutation(({ input }: { input: { name: string; email: string } }) => {
      return {
        id: Math.floor(Math.random() * 1000),
        name: input.name,
        email: input.email,
        createdAt: new Date(),
      };
    }),
});
