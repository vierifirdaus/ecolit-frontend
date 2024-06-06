import { z } from "zod";

export const TagihanSchema = z.object({
    id: z.string(),
    start: z.date(),
    end:  z.date(),
    trash_bag: z.number(),
    hari_angkut: z.number(),
    harga_normal: z.number(),
    trash_bag_tambahan: z.number(),
    harga_tambahan: z.number(),
    status: z.enum(["DONE", "NOT_PAID", "ON_PROGRESS", "NOT_STARTED"]),
    invoice: z.string(),
})

export const CreateTagihanSchema = TagihanSchema.omit({
    id: true
})