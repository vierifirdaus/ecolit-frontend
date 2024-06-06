import { z } from "zod";

export const TotalPenangananSchema = z.object({
    bulan: z.string(),
    kompos_salman: z.number(),
    kompos_pihak_ketiga: z.number(),
    total_kompos: z.number(),
    persentase_kompos: z.number(),
    persentase_kompos_pihak_ketiga: z.number(),
    persentase_kompos_salman: z.number(),
    daur_ulang_salman: z.number(),
    daur_ulang_pihak_ketiga: z.number(),
    total_daur_ulang_sampah: z.number(),
    persentase_daur_ulang_sampah: z.number(),
    persentase_daur_ulang_sampah_pihak_ketiga: z.number(),
    persentase_daur_ulang_sampah_salman: z.number(),
    total_residu: z.number(),
    persentase_residu: z.number(),
    total: z.number()
})