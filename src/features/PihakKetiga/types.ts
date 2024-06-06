import { z } from "zod";
import { PihakKetigaSchema, CreatePihakKetigaSchema } from "./schemas";

export type PihakKetiga = z.infer<typeof PihakKetigaSchema>

export type CreatePihakKetiga = z.infer<typeof CreatePihakKetigaSchema>