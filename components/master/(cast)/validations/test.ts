import { z } from "zod";

export const schema = z.object({
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().min(1, { message: "必須" }),
  age: z.coerce.number().max(9999, { message: "9999以下にしてください" }),
  age2: z.coerce.number().max(9999, { message: "9999以下にしてください" }),
  age3: z.coerce.number().max(9999, { message: "9999以下にしてください" }),
  date: z.date(),
  address: z.string(),
  birthday: z.date(),
  tel: z.string(),
  baitai: z.string(),
  syokai: z.string(),
  kikan: z.string(),
});

export type Schema = z.infer<typeof schema>;
