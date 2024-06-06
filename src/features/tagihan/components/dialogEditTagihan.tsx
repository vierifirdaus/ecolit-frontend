import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { TagihanData } from "../types"
import Select from "../../../components/select"
import { useMutation } from "@tanstack/react-query"
import { editTagihan } from "../mutations"
import moment from "moment"

type DialogEditTagihanProps = {
    data: TagihanData
    refetch: () => void
}

export type EditType = {
    id: string
    start: Date
    end:  Date
    trash_bag: number
    hari_angkut: number
    harga_normal: number
    trash_bag_tambahan: number
    harga_tambahan: number
    status: "DONE" | "NOT_PAID" | "ON_PROGRESS" | "NOT_STARTED"
    invoice: FileList
}

function DialogEditTagihan({ data, refetch }: DialogEditTagihanProps){
    const {
        register,
        control,
        handleSubmit,
        reset
    } = useForm<EditType>({
        defaultValues: {
            id: data.id,
            start: data.start,
            end: data.end,
            trash_bag: data.trash_bag,
            trash_bag_tambahan: data.trash_bag_tambahan,
            hari_angkut: data.hari_angkut,
            harga_normal: data.harga_normal,
            harga_tambahan: data.harga_tambahan,
            status: data.status,
            invoice: undefined
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: editTagihan
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData()
            formData.append("id", data.id)
            formData.append("start", data.start as any as string)
            formData.append("end", data.end as any as string)
            formData.append("trash_bag", data.trash_bag.toString())
            formData.append("trash_bag_tambahan", data.trash_bag_tambahan.toString())
            formData.append("hari_angkut", data.hari_angkut.toString())
            formData.append("harga_normal", data.harga_normal.toString())
            formData.append("harga_tambahan", data.harga_tambahan.toString())
            formData.append("status", data.status)
            formData.append("file", data.invoice[0])
            await mutateAsync(formData)
            refetch()
            toast.success("Berhasil mengubah data tagihan")
        }
        catch{
            toast.error("Gagal mengubah data tagihan")
        }
        reset()
    })
    
    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit Tagihan
                </button>
            }
            title="EDIT TAGIHAN"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <h3 className="text-sm mb-1 font-bold">Bulan Tagihan</h3>
                <p>{moment(data.start).format("MMMM")}</p>
                <h3 className="text-sm mb-1 mt-3 font-bold">Status Tagihan</h3>
                <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <Select
                            className="mt-2 bg-gray-50"
                            options={[{value:"DONE", label: "DONE"}, {value:"NOT_STARTED", label: "NOT STARTED"}, {value:"ON_PROGRESS", label: "ON PROGRESS"}, {value:"NOT_PAID", label: "NOT PAID"}]}
                            placeholder="Sebagai"
                            value={value}
                            onChange={onChange}
                            invalid={!!error}
                            error={error?.message}
                            required
                        />
                    )}
                />
                <h3 className="text-sm mb-1 mt-3 font-bold">Upload Invoice</h3>
                <input type="file" {...register("invoice")}/>
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

export default DialogEditTagihan