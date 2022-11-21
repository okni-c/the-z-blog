import { inputRegex } from "@tiptap/extension-image";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const getRouter = router({
  allPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
  }),
  newestPosts: publicProcedure
  .input(z.number())
  .query(({ ctx, input }) => {
    return ctx.prisma.post.findMany({
      take: input,
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
