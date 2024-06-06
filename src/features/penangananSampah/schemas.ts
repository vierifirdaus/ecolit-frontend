import { z } from "zod";

export const TrashSchema = z.object({
    id: z.string(),
    nama: z.string(),
    date: z.string(),
    kaca: z.number(),
    kertas: z.number(),
    plastik: z.number(),
    organik_sisa: z.number(),
    organik_kebun: z.number(),
    organik_cacah: z.number(),
    residu: z.number(),
    trashbag: z.number(),
    keterangan: z.string().optional()
})

export const CreateTrashSchema = TrashSchema.omit({
    id: true
})