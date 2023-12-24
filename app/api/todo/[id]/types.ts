import * as z from "zod";

export const TodoContext = z.object({
  params: z.object({
    id: z.string().cuid(),
  }),
});

export type TodoContext = z.infer<typeof TodoContext>;
