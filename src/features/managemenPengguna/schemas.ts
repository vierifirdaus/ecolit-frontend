import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    phoneNumber: z.string(),
    job: z.string(),
    role: z.enum(["PEGAWAI", "ADMIN"]),
    password: z.string()
})

export const CreateUserSchema = UserSchema.omit({
    id: true
})

export const CreateUserDataSchema = CreateUserSchema.extend({
    confirmPassword: z.string()
})