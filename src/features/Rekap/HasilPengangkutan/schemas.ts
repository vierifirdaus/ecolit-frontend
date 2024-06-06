import { z } from "zod";

export const PengangkutanSampahResiduSchema = z.object({
    id: z.string(),
    date: z.date(),
    sampah_kebun: z.number(),
    sampah_makanan: z.number(),
    kertas: z.number(),
    kaca: z.number(),
    logam: z.number(),
    plastik_PET: z.number(),
    kresek: z.number(),
    multilayer_plastic: z.number(),
    plastik_lain: z.number(),
    residu: z.number(),
})

export const CreatePengangkutanSampahResiduSchema = PengangkutanSampahResiduSchema.omit({
    id: true
})
