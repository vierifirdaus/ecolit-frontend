import { DotsThreeVertical, SlidersHorizontal, Trash } from "phosphor-react"
import Dialog from "../../../components/dialog"
import Search from "../../../components/search"
import Table from "../../../components/table"
import DialogEditPengguna from "./dialogEditPengguna"
import Popover from "../../../components/popover"
import ConfirmationDialog from "../../../components/confirmationDialog"
import Navbar from "../../../assets/ui/Navbar"
import Sidebar from "../../../assets/ui/sidebar"
import { useForm } from "react-hook-form"
import { CreateUserData } from "../types"
import { useMutation, useQuery } from "@tanstack/react-query"
import { createUser, deleteUser } from "../mutations"
import toast from "react-hot-toast"
import { getAllUsers } from "../queries"
import { useState } from "react"

function ManagemenPengguna() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("name")

    const {
        register,
        handleSubmit,
        reset
    } = useForm<CreateUserData>({
        defaultValues: {
            role: "PEGAWAI"
        }
    })

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-users", name, page, orderAttribute, isAsc],
        queryFn: () => getAllUsers(name, page, 10, orderAttribute, isAsc)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createUser
    })

    const { mutateAsync: deleteUserMutate } = useMutation({
        mutationFn: deleteUser
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync(data)
            toast.success("Berhasil menambahkan pegawai")
            refetch()
        }
        catch {
            toast.error("Gagal menambahkan pegawai")
        }
        reset()
    })

    return (
        <div className='flex w-screen'>
            <div className="absolute z-[100]">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full h-screen bg-[#F6F6F6] pl-[5vw]">
                <div className="flex justify-between items-center p-5">
                    <Navbar />
                </div>
                <div className="flex flex-col shadow-md bg-white rounded-md m-5 p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Managemen Pengguna</h1>
                        <div className="flex">
                            <Search value={name} onChange={(val: string) => setName(val)} placeholder="Cari Nama Pengguna" />
                            <Dialog
                                trigger={
                                    <button className="ml-2 p-2 text-sm bg-[#967C55] text-white rounded-md">
                                        TAMBAH PENGGUNA
                                    </button>
                                }
                                title="TAMBAH PENGGUNA"
                            >
                                <form className="m-2" onSubmit={onSubmit}>
                                    <input type="text" {...register("name", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Pengguna" required />
                                    <input type="email" {...register("email", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required />
                                    <input type="text" {...register("phoneNumber", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="No Handphone" required />
                                    <input type="text" {...register("job", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jabatan" required />
                                    <input type="password" {...register("password", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                                    <input type="password" {...register("confirmPassword", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Konfirmasi Password" required />
                                    <div className="flex justify-end">
                                        <button type="submit" className="mt-2 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
                                            SIMPAN
                                        </button>
                                    </div>
                                </form>
                            </Dialog>
                        </div>
                    </div>
                    {
                        isSuccess &&
                        <Table
                            className="mt-2"
                            headers={[
                                {
                                    name: "Nama",
                                    attributeName: "name",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "Email",
                                    attributeName: "email",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "No Handphone",
                                    attributeName: "phoneNumber",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "Jabatan",
                                    attributeName: "job",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Role",
                                    attributeName: "role",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <SlidersHorizontal size={24} />,
                                    attributeName: "",
                                    canBeOrdered: false
                                }
                            ]}
                            rows={
                                data?.data.data.map((user) => [
                                    user.name, user.email, user.phoneNumber, user.job, user.role,
                                    <Popover
                                        trigger={
                                            <button><DotsThreeVertical size={24} /></button>
                                        }
                                        children={
                                            <>
                                                <DialogEditPengguna data={user} refetch={refetch} />
                                                <ConfirmationDialog
                                                    title="Apakah anda yakin ingin menghapus pegawai ini?"
                                                    trigger={
                                                        <button className="flex mt-2">
                                                            <Trash className="mr-2" size={24} /> Hapus Pengguna
                                                        </button>
                                                    }
                                                    onConfirm={async () => {
                                                        try {
                                                            await deleteUserMutate(user.id)
                                                            refetch()
                                                            toast.success("Berhasil menghapus pegawai")
                                                        }
                                                        catch {
                                                            toast.error("Gagal menghapus pegawai")
                                                        }
                                                    }}
                                                />
                                            </>
                                        }
                                    />
                                ])
                            }
                            page={1}
                            setPage={setPage}
                            isAsc={isAsc}
                            setIsAsc={setIsAsc}
                            orderAttribute={orderAttribute}
                            setOrderAttribute={setOrderAttribute}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ManagemenPengguna