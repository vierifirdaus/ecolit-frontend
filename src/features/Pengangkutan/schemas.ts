import { z } from "zod";

export const PengangkutanSchema = z.object({
    id: z.string(),
    bulan: z.string(),
    pekan: z.number().optional(),
    date: z.date(),
    status: z.enum(["SKIP", "OFF", "ANGKUT"]),
    operator: z.string(),
    jam: z.string(),
    hitam: z.number(),
    surat_jalan: z.string(),
    keterangan: z.string()
})

export const CreatePengangkutanSchema = PengangkutanSchema.omit({
    id: true,
    surat_jalan: true
})

export const EditPengangkutanSchema = PengangkutanSchema.omit({
    surat_jalan: true
})