import { z } from "zod";

export const schema = z.object({
  firstName: z.string().max(50).nullish(),
  lastName: z.string().max(50).nullish(),
  email: z.string().min(1, { message: "必須" }).nullish(),
  age: z.coerce
    .number()
    .max(9999, { message: "9999以下にしてください" })
    .nullish(),
  age2: z.coerce
    .number()
    .max(9999, { message: "9999以下にしてください" })
    .nullish(),
  age3: z.coerce
    .number()
    .max(9999, { message: "9999以下にしてください" })
    .nullish(),
  date: z.date().nullish(),
  address: z.string().nullish(),
  birthday: z.date().nullish(),
  tel: z.string().nullish(),
  baitai: z.string().nullish(),
  syokai: z.string().nullish(),
  kikan: z.string().nullish(),
  check: z.boolean().nullish(),
});

export type Schema = z.infer<typeof schema>;
