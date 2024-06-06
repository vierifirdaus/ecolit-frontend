import { z } from "zod";
import { DataChangePasswordSchema, DataSchema } from "./schemas";

export type Data = z.infer<typeof DataSchema>

export type DataChangePassword = z.infer<typeof DataChangePasswordSchema>