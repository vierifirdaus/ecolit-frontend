import { z } from "zod";
import { CreatePenjualanSchema, PenjualanSchema } from "./schemas";

export type Penjualan = z.infer<typeof PenjualanSchema>

export type CreatePenjualan = z.infer<typeof CreatePenjualanSchema>