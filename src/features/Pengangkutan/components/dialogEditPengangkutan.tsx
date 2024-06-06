import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { EditPengangkutan, Pengangkutan } from "../types"
import Select from "../../../components/select"
import { editPengangkutan } from "../mutations"
import toast from "react-hot-toast"

type DialogEditPengangkutanProps = {
    data: Pengangkutan
    refetch: () => void
}

function DialogEditPengangkutan({ data, refetch }: DialogEditPengangkutanProps){
    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<EditPengangkutan>({
        defaultValues: {
            id: data.id,
            bulan: data.bulan,
            pekan: data.pekan,
            date: data.date,
            status: data.status,
            operator: data.operator,
            jam: data.jam,
            hitam: data.hitam
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: editPengangkutan
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData()
            formData.append("id", data.id)
            formData.append("date", (data.date as any as string))
            formData.append("status", data.status)
            formData.append("operator", data.operator)
            formData.append("jam", data.jam)
            formData.append("hitam", data.hitam.toString())
            formData.append("bulan", data.bulan.toString())
            if(data.pekan){
                formData.append("pekan", data.pekan.toString())
            }
            console.log(formData)
            await mutateAsync(formData)
            refetch()
            toast.success("Berhasil mengubah data pengangkutan")
        }
        catch{
            toast.error("Gagal mengubah data pengangkutan")
        }
        reset()
    })
    
    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit Pengangkutan Sampah
                </button>
            }
            title="EDIT PENGANGKUTAN SAMPAH"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <h3 className="text-sm mb-1 font-bold">Tanggal Pengangkutan Sampah</h3>
                {/* <input type="date" {...register("date", {required: true})}/> */}
                <span>{new Date(data.date as any as string).toDateString()}</span>

                <h3 className="text-sm mb-1 mt-3 font-bold">Data Pengangkutan Sampah</h3>
                <div className="flex gap-x-2">
                    <input type="text" {...register("bulan", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bulan ke-" required />
                    <input type="text" {...register("pekan", {required: false})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pekan ke-" />
                    <Controller
                        control={control}
                        name="status"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Select
                                className="mt-2 bg-gray-50"
                                options={[{value:"SKIP", label: "SKIP"}, {value:"OFF", label: "OFF"}, {value:"ANGKUT", label: "ANGKUT"}]}
                                placeholder="Status"
                                value={value}
                                onChange={onChange}
                                invalid={!!error}
                                error={error?.message}
                                required
                            />
                        )}
                    />
                </div>
                <input type="text" {...register("operator", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Operator" required />
                <div className="flex gap-x-2">
                    <input type="text" {...register("jam", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jam" required />
                    <input type="text" {...register("hitam", {required: true})} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jumlah Trashbag" required />
                </div>

                <div className="flex justify-end mt-3">
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

export default DialogEditPengangkutan