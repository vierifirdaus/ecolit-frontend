import { z } from "zod";
import { CreatePengangkutanSampahResiduSchema, PengangkutanSampahResiduSchema } from "./schemas";

export type PengangkutanSampahResidu = z.infer<typeof PengangkutanSampahResiduSchema>

export type CreatePengangkutanSampahResidu = z.infer<typeof CreatePengangkutanSampahResiduSchema>
