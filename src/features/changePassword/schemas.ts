import { z } from "zod";

export const DataSchema = z.object({
    atribut1: z.string(),
    atribut2: z.number()
})

export const ChangePasswordSchema = z.object({
    password: z.string(),
    newPassword: z.string(),
    confirmPassword: z.string()
})

export const DataChangePasswordSchema = z.object({  
    oldPassword: z.string(),
    newPassword: z.string(),
    confNewPassword: z.string()
})