import z from "zod";
import { CreateUserSchema } from "./create.user.validation";

export const UpdateUserSchema = CreateUserSchema.partial()

export type UpdateUserType = z.infer<typeof UpdateUserSchema >