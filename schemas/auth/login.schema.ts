import z from "zod";

export const loginSchema = z.object({
    login: z.string(),
    password: z.string().min(8),
    pin: z.string().optional()
})

export type TypeLoginSchema = z.infer<typeof loginSchema>