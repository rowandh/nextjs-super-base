import { initTRPC } from '@trpc/server';
import superjson from 'superjson';

// Simple context without any specific properties
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Context {}

export async function createTRPCContext(): Promise<Context> {
  return {};
}

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure - authentication will be handled inside each procedure
export const protectedProcedure = t.procedure;
