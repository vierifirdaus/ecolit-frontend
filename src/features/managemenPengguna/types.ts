import { z } from "zod";
import { CreateUserDataSchema, CreateUserSchema, UserSchema } from "./schemas";

export type CreateUser = z.infer<typeof CreateUserSchema>
export type CreateUserData = z.infer<typeof CreateUserDataSchema>
export type User = z.infer<typeof UserSchema>