import { z } from "zod";

export const DataSchema = z.object({
    atribut1: z.string(),
    atribut2: z.number()
})

export const LoginSchema = z.object({
    email: z.string(),
    password : z.string()
})