import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const sendRouter = router({
  newPost: publicProcedure
    .input(z.object({ title: z.string(), slug: z.string(), thumbnail: z.string(), author: z.string(), body: z.string(), Date: z.string(), id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.upsert({
        where: {
          id: input.id
        },
        create: {
          title: input.title,
          slug: input.slug,
          thumbnail: input.thumbnail,
          author: input.author,
          body: input.body,
          Date: input.Date,
        },
        update: {
          title: input.title,
          slug: input.slug,
          thumbnail: input.thumbnail,
          author: input.author,
          body: input.body,
          Date: input.Date,
        },
      });
    }),
  destroyPost: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.post.delete({
        where: {
          id: input.id
        }
      });
    }),
});
