import { z } from "zod";

export const PemilihanMandiriSchema = z.object({
    bulan: z.string(),
    label_hijau: z.number(),
    label_kuning: z.number(),
    label_biru: z.number(),
    label_merah: z.number(),
    label_hitam: z.number(),
    kompos_persentase: z.number(),
    daur_ulang_persentase: z.number(),
    residu_persentase: z.number(),
    total: z.number()
})