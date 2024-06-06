import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Trash } from "../types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { editTrash } from "../mutations"

type DialogEditSampahProps = {
    data: Trash
    refetch: () => void
}

function DialogEditSampah({ data, refetch }: DialogEditSampahProps){
    const {
        register,
        handleSubmit,
        reset
    } = useForm<Trash>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editTrash
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync({
                ...data,
                kaca: Number(data.kaca),
                kertas: Number(data.kertas),
                plastik: Number(data.plastik),
                residu: Number(data.residu),
                organik_cacah: Number(data.organik_cacah),
                organik_kebun: Number(data.organik_kebun),
                organik_sisa: Number(data.organik_sisa),
                trashbag: Number(data.trashbag)
            })
            refetch()
            toast.success("Berhasil mengubah data sampah")
        }
        catch{
            toast.error("Gagal mengubah data sampah")
        }
        reset()
    })
    
    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit Data Sampah
                </button>
            }
            title="EDIT DATA SAMPAH"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <h3 className="text-sm mb-1 font-bold">Tanggal Penanganan Sampah</h3>
                <div className="w-min p-2 border-2 rounded-md mb-3">
                    {(new Date(data.date)).toLocaleDateString()}
                </div>
                <h3 className="text-sm mb-1 font-bold">{"Massa Hasil Pemilahan Sampah (Kg)"}</h3>
                <div className="flex justify-between mb-3">
                    <div className="w-full mr-2">
                        <input type="number" step={0.01} {...register("kaca", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Botol, kaca, kaleng, cup" required />
                        <input type="number" step={0.01} {...register("plastik", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kresek, plastik bersih, sedotan" required />
                        <input type="number" step={0.01} {...register("kertas", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu, kertas nasi, plastik" required />
                        <input type="number" step={0.01} {...register("residu", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu, kertas nasi, plastik" required />
                    </div>
                    <div className="w-full">
                        <input type="number" step={0.01} {...register("organik_sisa", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik sisa makanan" required />
                        <input type="number" step={0.01} {...register("organik_kebun", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik kebun yang dikumpulkan" required />
                        <input type="number" step={0.01} {...register("organik_cacah", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik cacah" required />
                    </div>
                </div>
                <h3 className="text-sm mb-1 font-bold">Lain-lainnya</h3>
                <input type="number" step={1} {...register("residu", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jumlah trashbag" required />
                <textarea {...register("keterangan", {required: false})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan"/>    
                <div className="flex justify-end">
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

export default DialogEditSampah