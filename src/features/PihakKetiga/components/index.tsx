import Dialog from "../../../components/dialog"
import Search from "../../../components/search"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from "../../../assets/ui/Navbar"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { CreatePihakKetiga } from "../types"
import { getAllPihakKetiga } from "../queries"
import Select from "../../../components/select"
import { createPihakKetiga, deletePihakKetiga } from "../mutations"
import Table from "../../../components/table"
import Popover from "../../../components/popover"
import { DotsThreeVertical, SlidersHorizontal, Trash } from "phosphor-react"
import DialogEditPihakKetiga from "./dialogEditPihakKetiga"
import ConfirmationDialog from "../../../components/confirmationDialog"

function PihakKetiga() {
    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("nama_organisasi")
    const [toggle, setToggle] = useState(false)

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<CreatePihakKetiga>()

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-trashes", page, orderAttribute, isAsc, filter],
        queryFn: () => getAllPihakKetiga(page, 10, orderAttribute, isAsc, filter)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createPihakKetiga
    })

    const { mutateAsync: deleteTrashMutate } = useMutation({
        mutationFn: deletePihakKetiga
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutateAsync({ ...data, biaya_normal: Number(data.biaya_normal), harga_trashbag_tambahan_per_tb: Number(data.harga_trashbag_tambahan_per_tb), status: 1 })
            refetch()
            toast.success("Berhasil menambahkan data pihak ketiga")
        }
        catch {
            toast.error("Gagal menambahkan data pihak ketiga")
        }
        reset()
    })

    return (
        <div className='flex w-screen'>
            <div className="absolute z-[100]">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full h-screen bg-[#F6F6F6] pl-[5vw]">
                <div className="flex justify-between items-center bg-white p-3">
                    <Navbar />
                </div>
                <div className="flex flex-col shadow-md bg-white rounded-md m-5 p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Pendataan Pihak Ketiga</h1>
                        <div className="flex">
                            <div className="border-2 mr-2 border-[#967C55] flex rounded-md text-[#967C55] font-medium">
                                <button className={`w-28 border-r-2 border-[#967C55] hover:opacity-80 ${!toggle && "bg-[#967C55] text-white"}`} onClick={() => setToggle(false)}>
                                        PIHAK KETIGA
                                </button>
                                <button className={`w-28 hover:opacity-8 ${toggle && "bg-[#967C55] text-white"}`} onClick={() => setToggle(true)}>
                                        SKEMA
                                </button>
                            </div>
                            <Search value={filter} onChange={setFilter} placeholder="Cari Nama Organisasi" />
                            <Dialog
                                trigger={
                                    <button className="ml-2 p-2 text-sm bg-[#967C55] text-white rounded-md">
                                        TAMBAH DATA
                                    </button>
                                }
                                title="TAMBAH PENDATAAN PIHAK KETIGA"
                            >
                                <form className="m-2" onSubmit={onSubmit}>
                                <h3 className="text-sm mb-1 font-bold">Data Organisasi</h3>
                                    <div className="flex gap-x-2">
                                        <input type="text" {...register("nama_organisasi", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama Organisasi" required />
                                        <Controller
                                            control={control}
                                            name="sebagai"
                                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                                <Select
                                                    className="mt-2 bg-gray-50"
                                                    options={[{ value: "Pengangkut Sampah", label: "Pengangkut Sampah" }, { value: "Penjual Sampah", label: "Penjual Sampah" }]}
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
                                    <h3 className="text-sm mt-3 mb-1 font-bold">Tanggal dan Periode Kerjasama</h3>
                                    <input className="rounded-md mb-1" type="date" {...register("start_kerjasama", { required: true })} defaultValue={new Date().toDateString()}/>
                                    <input type="number" step={1} {...register("periode_kerjasama", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-6/12" placeholder="Bulan" required />
                                    <h3 className="text-sm mt-3 font-bold">Narahubung</h3>
                                    <div className="flex gap-x-2">
                                        <input type="text" {...register("nama_contact_person", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Contact Person" required />
                                        <input type="text" {...register("nomer_contact_person", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nomor CP" required />
                                    </div>
                                    <h3 className="text-sm mt-3 font-bold">Skema Kerjasama</h3>
                                    <div className="flex gap-x-2">
                                        <input type="number" {...register("jatah_trashbag_bulanan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jatah Trashbag/Bulan" required />
                                        <input type="number" {...register("biaya_normal", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Biaya Normal/Bulan" required />
                                    </div>
                                    <input type="number" {...register("harga_trashbag_tambahan_per_tb", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-6/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Biaya Tambahan/Trashbag" required />
                                    <div className="flex justify-end mt-2">
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
                        (
                            !toggle ?
                            <Table
                                className="mt-2"
                                headers={[
                                    {
                                        name: "No",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Nama Organisasi",
                                        attributeName: "nama_organisasi",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Sebagai",
                                        attributeName: "sebagai",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Mulai Kerjasama",
                                        attributeName: "start_kerjasama",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Periode Kerjasama",
                                        attributeName: "periode_kerjasama",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Nama Kontak Person",
                                        attributeName: "nama_contact_person",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "No Kontak Person",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Status",
                                        attributeName: "status",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: <SlidersHorizontal size={24} />,
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                ]}
                                rows={
                                    data?.data.data.map((pihakKetiga, i) => [
                                        page*10+i+1, pihakKetiga.nama_organisasi, pihakKetiga.sebagai, (new Date(pihakKetiga.start_kerjasama)).toLocaleDateString(), `${pihakKetiga.periode_kerjasama as number} Bulan`, pihakKetiga.nama_contact_person, pihakKetiga.nomer_contact_person, pihakKetiga.status as number === 1 ? "ACTIVE" : "INACTIVE",
                                        <Popover
                                            trigger={
                                                <button><DotsThreeVertical size={24} /></button>
                                            }
                                            children={
                                                <>
                                                    <DialogEditPihakKetiga data={pihakKetiga} refetch={refetch} />
                                                    <ConfirmationDialog
                                                        title="Apakah anda yakin ingin menghapus data Pihak Ketiga ini?"
                                                        trigger={
                                                            <button className="flex mt-2">
                                                                <Trash className="mr-2" size={24} /> Hapus Data Pihak ketiga
                                                            </button>
                                                        }
                                                        onConfirm={async () => {
                                                            try {
                                                                await deleteTrashMutate(pihakKetiga.id)
                                                                refetch()
                                                                toast.success("Berhasil menghapus data Pihak Ketiga")
                                                            }
                                                            catch {
                                                                toast.error("Gagal menghapus data Pihak Ketiga")
                                                            }
                                                        }}
                                                    />
                                                </>
                                            }
                                        />
                                    ])
                                }
                                page={page}
                                setPage={setPage}
                                isAsc={isAsc}
                                setIsAsc={setIsAsc}
                                orderAttribute={orderAttribute}
                                setOrderAttribute={setOrderAttribute}
                            />
                            :
                            <Table
                                className="mt-2"
                                headers={[
                                    {
                                        name: "No",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Nama Organisasi",
                                        attributeName: "nama_organisasi",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Sebagai",
                                        attributeName: "sebagai",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Jatah Tb/Bln",
                                        attributeName: "jatah_trashbag_bulanan",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Harga Normal",
                                        attributeName: "biaya_normal",
                                        canBeOrdered: true
                                    },
                                    {
                                        name: "Harga Tb Tambahan",
                                        attributeName: "harga_trashbag_tambahan_per_tb",
                                        canBeOrdered: true
                                    },
                                ]}
                                rows={
                                    data?.data.data.map((pihakKetiga, i) => [
                                        page*10+i+1, pihakKetiga.nama_organisasi, pihakKetiga.sebagai, pihakKetiga.jatah_trashbag_bulanan, pihakKetiga.biaya_normal, pihakKetiga.harga_trashbag_tambahan_per_tb
                                    ])
                                }
                                page={page}
                                setPage={setPage}
                                isAsc={isAsc}
                                setIsAsc={setIsAsc}
                                orderAttribute={orderAttribute}
                                setOrderAttribute={setOrderAttribute}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default PihakKetiga