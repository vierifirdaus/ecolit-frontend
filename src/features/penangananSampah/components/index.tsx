import { DotsThreeVertical, Download, SlidersHorizontal, Trash } from "phosphor-react"
import Dialog from "../../../components/dialog"
import Table from "../../../components/table"
import Popover from "../../../components/popover"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from "../../../assets/ui/Navbar"
import { useRef, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getAllTrashes, getExcelTrashes } from "../queries"
import { useForm } from "react-hook-form"
import { CreateTrash } from "../types"
import { createTrash, deleteTrash } from "../mutations"
import toast from "react-hot-toast"
import DialogEditSampah from "./dialogEditSampah"
import ConfirmationDialog from "../../../components/confirmationDialog"
import moment from "moment"

function PenangananSampah() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("kaca")
    const [blobString, setBlobString] = useState('');
    const downloadRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset
    } = useForm<CreateTrash>({
        defaultValues: {
            date: (new Date()).toDateString(),
            kaca: undefined,
            kertas: undefined,
            plastik: undefined,
            residu: undefined,
            trashbag: undefined,
            organik_cacah: undefined,
            organik_kebun: undefined,
            organik_sisa: undefined,
        }
    })

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-trashes", page, 10, orderAttribute, isAsc],
        queryFn: () => getAllTrashes(page, 10, orderAttribute, isAsc)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createTrash
    })

    const { mutateAsync: deleteTrashMutate } = useMutation({
        mutationFn: deleteTrash
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
            toast.success("Berhasil menambahkan data sampah")
        }
        catch {
            toast.error("Gagal menambahkan data sampah")
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
                        <h1 className="text-3xl font-bold">Penanganan Sampah</h1>
                    </div>
                    <div className="flex justify-end">
                        <a href={`${import.meta.env.VITE_API_URL}/download-excel-sampah`}>
                            <button 
                                className="flex items-center py-2 px-4 text-[#967C55] border border-[#967C55] rounded-md hover:opacity-80"
                            >
                                <Download className="mr-2"/>
                                Export
                            </button>
                        </a>
                        <div className="flex">
                            <Dialog
                                trigger={
                                    <button className="min-w-max ml-2 py-2 px-4 text-sm bg-[#967C55] text-white rounded-md hover:opacity-80">
                                        TAMBAH PENANGANAN
                                    </button>
                                }
                                title="TAMBAH DATA PENANGANAN SAMPAH"
                            >
                                <form className="m-2" onSubmit={onSubmit}>
                                    <h3 className="text-sm mb-1 font-bold">Tanggal Penanganan Sampah</h3>
                                    <input className="rounded-md mb-3" type="date" {...register("date", { required: true })} defaultValue={new Date().toDateString()}/>
                                    
                                    <h3 className="text-sm mb-1 font-bold">{"Massa Hasil Pemilahan Sampah (Kg)"}</h3>
                                    <div className="flex justify-between mb-3">
                                        <div className="w-full mr-2">
                                            <input type="number" step={0.01} {...register("kaca", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Botol, kaca, kaleng, cup" required />
                                            <input type="number" step={0.01} {...register("plastik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kresek, plastik bersih, sedotan" required />
                                            <input type="number" step={0.01} {...register("kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu, kertas nasi, plastik" required />
                                            <input type="number" step={0.01} {...register("residu", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu, kertas nasi, plastik" required />
                                        </div>
                                        <div className="w-full">
                                            <input type="number" step={0.01} {...register("organik_sisa", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik sisa makanan" required />
                                            <input type="number" step={0.01} {...register("organik_kebun", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik kebun yang dikumpulkan" required />
                                            <input type="number" step={0.01} {...register("organik_cacah", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Organik cacah" required />
                                        </div>
                                    </div>
                                    <h3 className="text-sm mb-1 font-bold">{"Lain-lainnya"}</h3>
                                    <input type="number" step={1} {...register("trashbag", { required: true })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jumlah trashbag" required />
                                    <textarea {...register("keterangan", { required: false })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan"/>
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
                                    name: "No",
                                    canBeOrdered: false,
                                    attributeName: ""
                                },
                                {
                                    name: <div className="min-w-28 text-center">Tanggal</div>,
                                    canBeOrdered: true,
                                    attributeName: "date"
                                },
                                {
                                    name: <div className="min-w-32 p-2 bg-orange-300 rounded-md">{"Botol, Kaca, Kaleng, Cup (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "kaca"
                                },
                                {
                                    name: <div className="min-w-32 p-2 bg-blue-300 rounded-md">{"Kertas, Karton, Dus, Koran (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "kertas"
                                },
                                {
                                    name: <div className="min-w-40 p-2 bg-red-300 rounded-md">{"Kresek, Plastik Bersih, Sedotan (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "plastik"
                                },
                                {
                                    name: <div className="min-w-28 p-2 bg-green-300 rounded-md">{"Organik Sisa Makanan (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "organik_sisa"
                                },
                                {
                                    name: <div className="min-w-40 p-2 bg-green-300 rounded-md">{"Organik Kebun yang Dikumpulkan (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "organik_kebun"
                                },
                                {
                                    name: <div className="min-w-28 p-2 bg-green-300 rounded-md">{"Organik yang Dicacah (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "organik_cacah"
                                },
                                {
                                    name: <div className="min-w-48 p-2 bg-slate-300 rounded-md">{"Residu, Kertas Nasi, Plastik Berbumbu (Kg)"}</div>,
                                    canBeOrdered: true,
                                    attributeName: "residu"
                                },
                                {
                                    name: "Jumlah Trashbag",
                                    canBeOrdered: true,
                                    attributeName: "trashbag"
                                },
                                {
                                    name: "Total (Kg)",
                                    canBeOrdered: false,
                                    attributeName: ""
                                },
                                {
                                    name: <SlidersHorizontal size={24} />,
                                    canBeOrdered: false,
                                    attributeName: ""
                                }]}
                            rows={
                                data?.data.data.map((trash, i) => [
                                    (page-1)*10+i+1, moment(trash.date).format("dddd, DD MMMM YYYY"), trash.kaca, trash.kertas, trash.plastik, trash.organik_sisa, trash.organik_kebun, trash.organik_cacah, trash.residu, trash.trashbag, trash.kaca + trash.kertas + trash.plastik + trash.organik_sisa + trash.organik_kebun + trash.organik_cacah + trash.residu,
                                    <Popover
                                        trigger={
                                            <button><DotsThreeVertical size={24} /></button>
                                        }
                                        children={
                                            <>
                                                <DialogEditSampah data={trash} refetch={refetch} />
                                                <ConfirmationDialog
                                                    title="Apakah anda yakin ingin menghapus data sampah ini?"
                                                    trigger={
                                                        <button className="flex mt-2">
                                                            <Trash className="mr-2" size={24} /> Hapus Data Sampah
                                                        </button>
                                                    }
                                                    onConfirm={async () => {
                                                        try {
                                                            await deleteTrashMutate(trash.id)
                                                            refetch()
                                                            toast.success("Berhasil menghapus data sampah")
                                                        }
                                                        catch {
                                                            toast.error("Gagal menghapus data sampah")
                                                        }
                                                    }}
                                                />
                                            </>
                                        }
                                    />
                                ])
                            }
                            page={page}
                            setIsAsc={setIsAsc}
                            setOrderAttribute={setOrderAttribute}
                            setPage={setPage}
                            isAsc={isAsc}
                            orderAttribute={orderAttribute}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default PenangananSampah