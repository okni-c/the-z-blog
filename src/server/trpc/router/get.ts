import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const getRouter = router({
  allPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  newestPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      take: 3,
    });
  }),
  postBySlug: publicProcedure
  .input(z.string())
  .query(({ ctx, input }) => {
    return ctx.prisma.post.findUnique({
      where: {
        slug: input,
      }
    });
  }),
});
