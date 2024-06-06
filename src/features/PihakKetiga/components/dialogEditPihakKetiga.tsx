import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import Select from "../../../components/select"
import toast from "react-hot-toast"
import { PihakKetiga } from "../types"
import { editPihakKetiga } from "../mutations"

type DialogEditPihakKetigaProps = {
    data: PihakKetiga
    refetch: () => void
}

function DialogEditPihakKetiga({ data, refetch }: DialogEditPihakKetigaProps){
    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<PihakKetiga>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editPihakKetiga
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync({...data, periode_kerjasama: Number(data.periode_kerjasama)})
            refetch()
            toast.success("Berhasil mengubah data PihakKetiga")
        }
        catch{
            toast.error("Gagal mengubah data PihakKetiga")
        }
        reset()
    })
    
    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit PihakKetiga Sampah
                </button>
            }
            title="EDIT PihakKetiga SAMPAH"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <p>Data Organisasi</p>
                <div className="flex gap-x-2">
                    <input type="text" {...register("nama_organisasi", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Organisasi" required />
                    <Controller
                        control={control}
                        name="sebagai"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Select
                            className="mt-2 bg-gray-50"
                            options={[{value:"Pengangkut Sampah", label: "Pengangkut Sampah"}, {value:"Penjual Sampah", label: "Penjual Sampah"}]}
                            placeholder="Sebagai"
                            value={value}
                            onChange={onChange}
                            invalid={!!error}
                            error={error?.message}
                            required
                            />
                            )}
                    />
                </div>
                <p>Tanggal Mulai Kerjasama</p>
                <input type="date" {...register("start_kerjasama", {required: true})}/>
                <input type="number" step={1} {...register("periode_kerjasama", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bulan" required />
                <div className="flex gap-x-2">
                    <input type="text" {...register("nama_contact_person", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama CP" required />
                    <input type="text" {...register("nomer_contact_person", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor CP" required />
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

export default DialogEditPihakKetiga