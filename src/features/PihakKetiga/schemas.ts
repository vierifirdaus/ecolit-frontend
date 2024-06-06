import { z } from "zod";

export const PihakKetigaSchema = z.object({ 
    id: z.string(),
    nama_organisasi: z.string(), 
    sebagai: z.enum(["Pengangkut Sampah", "Penjual Sampah"]), 
    start_kerjasama: z.date(), 
    periode_kerjasama: z.number(), 
    nama_contact_person: z.string(), 
    nomer_contact_person: z.string(), 
    status: z.number(),
    jatah_trashbag_bulanan : z.number(),
    biaya_normal : z.number(),
    harga_trashbag_tambahan_per_tb : z.number()
})

export const CreatePihakKetigaSchema = PihakKetigaSchema.omit({
    id: true
})