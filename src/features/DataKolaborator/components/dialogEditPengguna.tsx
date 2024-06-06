import { NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Kolaborator } from "../types"
import { editKolaborator } from "../mutations"
import Select from "../../../components/select"

type DialogEditKolaboratorProps = {
    data: Kolaborator
    refetch: () => void
}

function DialogEditKolaborator({ data, refetch }: DialogEditKolaboratorProps) {

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<Kolaborator>({
        defaultValues: data
    })

    const { mutateAsync } = useMutation({
        mutationFn: editKolaborator
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync({...data, longitude: parseFloat(data.longitude as any as string), latitude: parseFloat(data.latitude as any as string)})
            refetch()
            toast.success("Berhasil mengubah kolaborator")
        }
        catch {
            toast.error("Gagal mengubah kolaborator")
        }
        reset()
    })

    return (
        <Dialog
            trigger={
                <button className="flex">
                    <NotePencil className="mr-2" size={24} /> Edit Kolaborator
                </button>
            }
            title="EDIT Kolaborator"
        >
            <form className="m-2" onSubmit={onSubmit}>
                <input type="text" {...register("nama_organisasi", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Organisasi" required />
                <div className="flex">
                    <Controller
                        control={control}
                        name="bentuk_kolab"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Select
                                className="mt-2 bg-gray-50"
                                options={[{ value: "pribadi", label: "Pribadi" }, { value: "lembaga", label: "Lembaga" }]}
                                placeholder="Bentuk Kolaborasi"
                                value={value}
                                onChange={onChange}
                                invalid={!!error}
                                error={error?.message}
                                required
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="jenis_kolab"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <Select
                                className="mt-2 bg-gray-50"
                                options={[{ value: "publikasi", label: "Publikasi" }, { value: "pengumpul wadah", label: "Pengumpul Wadah" }]}
                                placeholder="Jenis Kolaborasi"
                                value={value}
                                onChange={onChange}
                                invalid={!!error}
                                error={error?.message}
                                required
                            />
                        )}
                    />
                </div>
                <div className="flex">
                    <input type="text" {...register("akun_instagram", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Instagram" required />
                    <input type="email" {...register("email", { required: false })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                </div>
                <div className="flex">
                    <input type="text" {...register("alamat", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Alamat" required />
                    <input type="text" {...register("alamat_drop_point", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Alamat Drop Point" required />
                </div>
                <div className="flex">
                    <input type="text" {...register("nama_lengkap", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Lengkap" required />
                    <input type="text" {...register("nomor_wa", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="No HP" required />
                </div>
                <div className="flex">
                    <input type="text" {...register("longitude", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Longitude" required />
                    <input type="text" {...register("latitude", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Latitude" required />
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

export default DialogEditKolaborator