import { z } from "zod";

export const schema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().min(1, { message: "必須" }),
  age: z.coerce.number().min(10, { message: "10以上にしてください" }),
  check: z.boolean(),
});

export type Schema = z.infer<typeof schema>;
