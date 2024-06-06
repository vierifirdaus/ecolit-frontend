import { NotePencil } from "phosphor-react"
import * as RadixDialog from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { SedekahSampah } from "../types"
import { editSedekahSampah } from "../mutations"
import Dialog from "../../../components/dialog"

type DialogEditSedekahSampahProps = {
    data: SedekahSampah
    refetch: () => void
}

function DialogEditSedekahSampah({ data, refetch }: DialogEditSedekahSampahProps) {
    const {
        register,
        handleSubmit,
        reset
    } = useForm<SedekahSampah>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editSedekahSampah
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutateAsync(data)
            refetch()
            toast.success("Berhasil mengubah data sampah residu")
        }
        catch {
            toast.error("Gagal mengubah data sampah residu")
        }
        reset()
    })

    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24} /> Edit Sampah Residu Sampah
                </button>
            }
            title="EDIT SAMPAH RESIDU SAMPAH"
        >
            <form className="m-2" onSubmit={onSubmit}>

                <h3 className="text-sm mb-1 font-bold">{"Tanggal Penjualan Sampah"}</h3>
                <input className="rounded-md mb-3" type="date" {...register("date", { required: true })} defaultValue={new Date().toDateString()} />
                <h3 className="text-sm mb-1 font-bold">{"Data Sampah (Kg) dan Harga Satuan (Rp/Kg)"}</h3>
                <div className="flex justify-between">
                    <div className="w-full mr-2">
                        <input type="number" step={0.01} {...register("gelas_botol_plastik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Plastik" required />
                        <input type="number" step={0.01} {...register("kardus", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kardus" required />
                        <input type="number" step={0.01} {...register("gelas_kaleng_alumunium", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Aluminium" required />
                        <input type="number" step={0.01} {...register("bohlam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bohlam" required />
                        <input type="number" step={0.01} {...register("kabel_dan_tembaga", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kabel Tembaga" required />
                        <input type="number" step={0.01} {...register("koran_dan_kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kertas & Koran" required />
                        <input type="number" step={0.01} {...register("botol_kemasan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Botol Kemasan" required />
                        <input type="number" step={0.01} {...register("barang_elektronik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Elektronik" required />
                        <input type="number" step={0.01} {...register("gelas_botol_kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Kaca" required />
                        <input type="number" step={0.01} {...register("barang_lain", { required: true })} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Lainnya" required />
                    </div>
                    <div className="w-full">
                        <input type="number" step={0.01} {...register("harga_gelas_botol_plastik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Wadah Plastik" required />
                        <input type="number" step={0.01} {...register("harga_kardus", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kardus" required />
                        <input type="number" step={0.01} {...register("harga_gelas_kaleng_alumunium", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Wadah Aluminium" required />
                        <input type="number" step={0.01} {...register("harga_bohlam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Bohlam" required />
                        <input type="number" step={0.01} {...register("harga_kabel_dan_tembaga", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kabel Tembaga" required />
                        <input type="number" step={0.01} {...register("harga_koran_dan_kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kertas & Koran" required />
                        <input type="number" step={0.01} {...register("harga_botol_kemasan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Botol Kemasan" required />
                        <input type="number" step={0.01} {...register("harga_barang_elektronik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Elektronik" required />
                        <input type="number" step={0.01} {...register("harga_gelas_botol_kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kaca" required />
                        <input type="number" step={0.01} {...register("total_harga_barang_lain", { required: true })} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Lainnya" required />
                    </div>
                </div>
                <h3 className="text-sm mb-(-1) mt-3 font-bold">Dokumentasi</h3>
                <div className='flex'>
                    <input type="text" step={0.01} {...register("attachment", { required: true })} className="mt-2 mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dokumentasi" required />
                    <input type="text" step={0.01} {...register("partisipan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Daftar Partisipan" required />
                </div>
                <textarea {...register("keterangan", { required: false })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan" required={false} />

                <div className="flex">
                    <RadixDialog.Close>
                        <button className="mt-2 p-2 px-4 mr-2 text-sm text-[#967C55] border-2 border-[#967C55] rounded-md">
                            CANCEL
                        </button>
                    </RadixDialog.Close>
                    <button type="submit" className="mt-2 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
                        SIMPAN
                    </button>
                </div>
            </form>
        </Dialog>
    )
}

export default DialogEditSedekahSampah