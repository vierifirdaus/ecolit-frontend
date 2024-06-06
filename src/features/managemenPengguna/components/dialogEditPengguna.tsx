import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { User } from "../types"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import { editUser } from "../mutations"
import toast from "react-hot-toast"

type DialogEditPenggunaProps = {
    data: User
    refetch: () => void
}

function DialogEditPengguna({ data, refetch }: DialogEditPenggunaProps){

    const {
        register,
        handleSubmit,
        reset
    } = useForm<User>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editUser
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync(data)
            refetch()
            toast.success("Berhasil mengubah data pegawai")
        }
        catch{
            toast.error("Gagal mengubah data pegawai")
        }
        reset()
    })

    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24}/> Edit Pengguna
                </button>
            }
            title="EDIT PENGGUNA"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <div className="flex justify-between items-center">
                    <label className="text-sm min-w-max mr-3" htmlFor="name">Nama Pengguna</label>
                    <input type="text" {...register("name")} id="name" className="mt-2 max-w-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Pengguna" required />
                </div>
                <div className="flex justify-between items-center">
                    <label className="text-sm min-w-max mr-3" htmlFor="email">Email</label>
                    <input type="text" {...register("email")} id="email" className="mt-2 max-w-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                </div>
                <div className="flex justify-between items-center">
                    <label className="text-sm min-w-max mr-3" htmlFor="phone">No Handphone</label>
                    <input type="text" {...register("phoneNumber")} id="phone" className="mt-2 max-w-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="No Handphone" required />
                </div>
                <div className="flex justify-between items-center">
                    <label className="text-sm min-w-max mr-3" htmlFor="jabatan">Jabatan</label>
                    <input type="text" {...register("job")} id="jabatan" className="mt-2 max-w-[70%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jabatan" required />
                </div>
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

export default DialogEditPengguna