import { router } from "../trpc";
import { getRouter } from "./get";
import { sendRouter } from "./send";

export const appRouter = router({
  get: getRouter,
  send: sendRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
