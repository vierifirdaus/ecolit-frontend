import { DotsThreeVertical, Download, SlidersHorizontal, Trash } from "phosphor-react"
import Dialog from "../../../components/dialog"
import Table from "../../../components/table"
import Popover from "../../../components/popover"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from "../../../assets/ui/Navbar"
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import ConfirmationDialog from "../../../components/confirmationDialog"
import Select from "../../../components/select"
import { getAllPengangkutan } from "../queries"
import { CreatePengangkutan } from "../types"
import { createPengangkutan, deletePengangkutan } from "../mutations"
import DialogEditPengangkutan from "./dialogEditPengangkutan"
import clsx from "clsx"
import moment from "moment"

function PengangkutanSampah() {
    const [filter, setFilter] = useState("ALL")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("bulan")

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<CreatePengangkutan>({
        defaultValues: {
            bulan: moment().format("MMMM")
        }
    })

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-pengangkutan", page, orderAttribute, isAsc, filter],
        queryFn: () => getAllPengangkutan(page, 10, orderAttribute, isAsc, filter)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createPengangkutan
    })

    const { mutateAsync: deletePengangkutanMutate } = useMutation({
        mutationFn: deletePengangkutan
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            const formData = new FormData()
            formData.append("file", data.surat_jalan[0])
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
            toast.success("Berhasil menambahkan data pengangkutan")
        }
        catch {
            toast.error("Gagal menambahkan data pengangkutan")
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
                        <h1 className="text-3xl font-bold">Pengangkutan Sampah</h1>
                    </div>
                    <div className="flex justify-end">
                        <div className="text-[#967C55] text-xs min-w-max mt-3 mr-2">
                            Filter Status by:
                        </div>
                        <div className="w-28 mr-2 border rounded-md border-[#967C55] text-[#967C55]">
                            <Select
                                className="border-none"
                                value={filter}
                                options={[
                                    {
                                        value: "SKIP",
                                        label: "SKIP"
                                    },
                                    {
                                        value: "OFF",
                                        label: "OFF"
                                    },
                                    {
                                        value: "ANGKUT",
                                        label: "ANGKUT"
                                    },
                                    {
                                        value: "ALL",
                                        label: "ALL"
                                    }
                                ]}
                                onChange={(val) => setFilter(val)}
                            />
                        </div>
                        <a href={`${import.meta.env.VITE_API_URL}/download-excel-pengangkutan`}>
                            <button
                                className="flex items-center py-2 px-4 text-[#967C55] border border-[#967C55] rounded-md hover:opacity-80"
                            >
                                <Download className="mr-2" />
                                Export
                            </button>
                        </a>
                        <Dialog
                            trigger={
                                <button className="min-w-max ml-2 py-2 px-4 text-sm bg-[#967C55] text-white rounded-md hover:opacity-80">
                                    TAMBAH PENGANGKUTAN
                                </button>
                            }
                            title="TAMBAH PENGANGKUTAN"
                        >
                            <form className="m-2" onSubmit={onSubmit}>
                                <h3 className="text-sm mb-1 font-bold">Tanggal Pengangkutan Sampah</h3>
                                <input type="date" {...register("date", { required: true })} />

                                <h3 className="text-sm mb-1 mt-3 font-bold">Data Pengangkutan Sampah</h3>
                                <div className="flex gap-x-2">
                                    <input type="text" {...register("bulan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bulan ke-" required />
                                    <input type="text" {...register("pekan", { required: false })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pekan ke-" />
                                    <Controller
                                        control={control}
                                        name="status"
                                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                                            <Select
                                                className="mt-2 bg-gray-50"
                                                options={[{ value: "SKIP", label: "SKIP" }, { value: "OFF", label: "OFF" }, { value: "ANGKUT", label: "ANGKUT" }]}
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
                                <input type="text" {...register("operator", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Operator" required />
                                <div className="flex gap-x-2">
                                    <input type="text" {...register("jam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jam" required />
                                    <input type="text" {...register("hitam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jumlah Trashbag" required />
                                </div>
                                <h3 className="text-sm mb-1 mt-3 font-bold">Upload Surat Jalan</h3>
                                <input type="file" {...register("surat_jalan", { required: true })} />
                                <div className="flex justify-end">
                                    <button type="submit" className="mt-2 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
                                        SIMPAN
                                    </button>
                                </div>
                            </form>
                        </Dialog>
                    </div>
                    {
                        isSuccess &&
                        <Table
                            className="mt-2"
                            headers={[
                                {
                                    name: "No",
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Bulan",
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Pekan",
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Tanggal",
                                    attributeName: "date",
                                    canBeOrdered: true
                                },
                                {
                                    name: "Status",
                                    attributeName: "status",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Operator",
                                    attributeName: "operator",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Jam",
                                    attributeName: "jam",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Jumlah Trashbag",
                                    attributeName: "hitam",
                                    canBeOrdered: true
                                },
                                {
                                    name: "Surat Jalan",
                                    attributeName: "surat_jalan",
                                    canBeOrdered: false
                                },
                                {
                                    name: <SlidersHorizontal size={24} />,
                                    attributeName: "",
                                    canBeOrdered: false
                                }
                            ]}
                            rows={
                                data?.data.data.map((pengangkutan, i) => [
                                    (page-1)*10+i+1, pengangkutan.bulan, pengangkutan.pekan == 0 ? "-" : pengangkutan.pekan, moment(pengangkutan.date).format("dddd, DD MMMM YYYY"),
                                    <span className={clsx("block w-28 py-1 rounded-lg", pengangkutan.status == "ANGKUT" ? "bg-green-300" : pengangkutan.status == "OFF" ? "bg-red-300" : "bg-slate-300")}>{pengangkutan.status}</span>,
                                    pengangkutan.operator, moment(pengangkutan.jam).format("LT"), pengangkutan.hitam,
                                    <a className="block w-28 py-1 bg-slate-300 hover:opacity-80 rounded-md" href={pengangkutan.surat_jalan} target="_blank">Surat Jalan</a>,
                                    <Popover
                                        trigger={
                                            <button><DotsThreeVertical size={24} /></button>
                                        }
                                        children={
                                            <>
                                                <DialogEditPengangkutan data={pengangkutan} refetch={refetch} />
                                                <ConfirmationDialog
                                                    title="Apakah anda yakin ingin menghapus data pengangkutan ini?"
                                                    trigger={
                                                        <button className="flex mt-2">
                                                            <Trash className="mr-2" size={24} /> Hapus Data Pengangkutan
                                                        </button>
                                                    }
                                                    onConfirm={async () => {
                                                        try {
                                                            await deletePengangkutanMutate(pengangkutan.id)
                                                            refetch()
                                                            toast.success("Berhasil menghapus data pengangkutan")
                                                        }
                                                        catch {
                                                            toast.error("Gagal menghapus data pengangkutan")
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
                    }
                </div>
            </div>
        </div>
    )
}

export default PengangkutanSampah