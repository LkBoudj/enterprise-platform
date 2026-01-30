import z from "zod";

export const LoginSchema = z.object({
   username: z.string({ message: "Invalid email address" }),
   password:z.string().min(6),
   rememberMe:z.boolean().default(true)
})

export type LoginDto = z.infer<typeof LoginSchema>