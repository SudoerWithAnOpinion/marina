import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';

export const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;


import PrinterAPIRouter from '$lib/trpc/routers/printer';

const appRouter = router({
  printer: PrinterAPIRouter,
});

export type AppRouter = typeof appRouter;
