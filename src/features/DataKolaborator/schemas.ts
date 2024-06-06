import { z } from "zod";

export const KolaboratorSchema = z.object({
    id: z.string(),
    nama_lengkap: z.string(),
    email: z.string(),
    bentuk_kolab: z.string(),
    nama_organisasi: z.string(),
    nomor_wa: z.string(),
    akun_instagram: z.string(),
    jenis_kolab: z.string(),
    alamat: z.string(),
    alamat_drop_point: z.string(),
    longitude: z.number(),
    latitude: z.number()
})

export const CreateKolaboratorSchema = KolaboratorSchema.omit({
    id: true
})