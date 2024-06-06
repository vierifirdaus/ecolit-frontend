import { NotePencil } from "phosphor-react"
import Dialog from "../../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { PengangkutanSampahResidu } from "../types"
import { editSampahResidu } from "../mutations"

type DialogEditSampahResiduProps = {
    data: PengangkutanSampahResidu
    refetch: () => void
}

function DialogEditSampahResidu({ data, refetch }: DialogEditSampahResiduProps){
    const {
        register,
        handleSubmit,
        reset
    } = useForm<PengangkutanSampahResidu>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editSampahResidu
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutateAsync(data)
            refetch()
            toast.success("Berhasil mengubah data sampah residu")
        }
        catch{
            toast.error("Gagal mengubah data sampah residu")
        }
        reset()
    })
    
    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit Sampah Residu Sampah
                </button>
            }
            title="EDIT SAMPAH RESIDU SAMPAH"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <h3 className="text-sm mb-1 font-bold">Bulan Rekap Pengangkutan</h3>
                <input className="rounded-md mb-3" type="date" {...register("date", {required: true})} defaultValue={new Date().toDateString()}/>
                <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Hijau (Kg)"}</h3>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("sampah_kebun", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sampah Kebun" required />
                    <input type="number" step={0.001} {...register("sampah_makanan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sampah Makanan" required />
                </div>
                <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Biru (Kg)"}</h3>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kertas" required />
                </div>
                <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Kuning (Kg)"}</h3>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kaca" required />
                    <input type="number" step={0.001} {...register("logam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Logam" required />
                </div>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("plastik_PET", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plastik PET" required />
                    <input type="number" step={0.001} {...register("plastik_lain", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plastik Lainnya" required />
                </div>
                <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Merah (Kg)"}</h3>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("kresek", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kresek" required />
                    <input type="number" step={0.001} {...register("multilayer_plastic", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Multilayer PLastic" required />
                </div>
                <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Hitam (Kg)"}</h3>
                <div className="flex justify-between gap-x-2">
                    <input type="number" step={0.001} {...register("residu", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu" required />
                </div>
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

export default DialogEditSampahResidu