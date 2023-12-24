import * as z from "zod";

export const TodoCreateProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type TodoCreateProps = z.infer<typeof TodoCreateProps>;

export const TodoUpdateProps = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export type TodoUpdateProps = z.infer<typeof TodoUpdateProps>;
