import { z } from "zod";

export const PenjualanSchema = z.object({
    id : z.string(),
    date : z.string(),
    name : z.string(),
    gelas_botol_plastik : z.number(),
    kardus : z.number(),
    gelas_kaleng_alumunium : z.number(),
    bohlam : z.number(),
    kabel_dan_tembaga : z.number(), 
    koran_dan_kertas : z.number(),
    botol_kemasan : z.number(),
    barang_elektronik : z.number(),
    gelas_botol_kaca : z.number(),
    barang_lain : z.number(),
    harga_gelas_botol_plastik : z.number(),
    harga_kardus : z.number(),
    harga_gelas_kaleng_alumunium : z.number(),
    harga_bohlam : z.number(),
    harga_kabel_dan_tembaga : z.number(),
    harga_koran_dan_kertas : z.number(),
    harga_botol_kemasan : z.number(),
    harga_barang_elektronik : z.number(),
    harga_gelas_botol_kaca : z.number(),
    total_harga_barang_lain : z.number(),
    attachment : z.string().optional(),
    keterangan : z.string().optional()
})

export const CreatePenjualanSchema = PenjualanSchema.omit({
    id: true
})