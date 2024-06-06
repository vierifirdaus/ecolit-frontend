import { z } from "zod";
import { DataSchema, LoginSchema } from "./schemas";

export type Data = z.infer<typeof DataSchema>

export type DataLogin = z.infer<typeof LoginSchema>