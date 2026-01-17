import z from "zod";
import { UserSchema } from "./read.user.validation";

export const CreateUserSchema = UserSchema.omit({id:true,lastActive:true})

export type CreateUserType = z.infer<typeof CreateUserSchema >