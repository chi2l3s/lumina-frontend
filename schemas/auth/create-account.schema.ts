import { z } from "zod";

export const createAccountSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  email: z.email().min(3).nonempty(),
  password: z.string().min(8, { error: "Используйте пароль от 8 символов!" }),
});

export type TypeCreateAccountSchema = z.infer<typeof createAccountSchema>