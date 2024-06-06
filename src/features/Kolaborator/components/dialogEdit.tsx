import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import Select from "../../../components/select"
import { ReportWadah } from "../types"
import { editReportWadah } from "../mutations"

type DialogEditProps = {
    data: ReportWadah
    refetch: () => void
}

function DialogEdit({ data, refetch }: DialogEditProps) {

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<ReportWadah>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editReportWadah
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync(data)
            refetch()
            toast.success("Berhasil mengubah ")
        }
        catch {
            toast.error("Gagal mengubah ")
        }
        reset()
    })

    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24} /> Edit 
                </button>
            }
            title="EDIT "
        >
            <form className="m-2" onSubmit={onSubmit}>
                <h3>{data.email}</h3>
                <Controller
                        control={control}
                        name="status"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Select
                                className="mt-2 bg-gray-50"
                                options={[{ value: "REVISION", label: "REVISE" }, { value: "VERIFIED", label: "VERIFIED" }, { value: "WAITING", label: "WAITING" }]}
                                placeholder="Status"
                                value={value}
                                onChange={onChange}
                                invalid={!!error}
                                error={error?.message}
                                required
                            />
                        )}
                    />
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

export default DialogEdit