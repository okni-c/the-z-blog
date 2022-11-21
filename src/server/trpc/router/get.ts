import { inputRegex } from "@tiptap/extension-image";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const getRouter = router({
  // hello: publicProcedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? "world"}`,
  //     };
  //   }),
  allPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany();
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
