import z from "zod";

export const AuthSchena = z.object({
    id: z.number().min(1),
    username: z.string(),
    email: z.email(),
    firstName: z.string(),
    lastName: z.string(),
    gender: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
})

export type AuthType = z.infer<typeof AuthSchena>;