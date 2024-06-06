import Table from "../../../../components/table"
import Sidebar from "../../../../assets/ui/sidebar"
import Navbar from "../../../../assets/ui/Navbar"
import Dialog from "../../../../components/dialog";
import { CreatePengangkutanSampahResidu } from "../types";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllSampahResidu } from "../queries";
import { createSampahResidu, deleteSampahResidu } from "../mutations";
import toast from "react-hot-toast";
import Popover from "../../../../components/popover";
import { DotsThreeVertical, SlidersHorizontal, Trash } from "phosphor-react";
import ConfirmationDialog from "../../../../components/confirmationDialog";
import DialogEditSampahResidu from "./dialogEditSampahResidu";
import { useState } from "react";
import moment from "moment";
import { useIntl } from "react-intl";

function HasilPengangkutanSampahResidu() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("kaca")

    const intl=useIntl()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<CreatePengangkutanSampahResidu>()

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-trash-residu", page, orderAttribute, isAsc],
        queryFn: () => getAllSampahResidu(page, 10, orderAttribute, isAsc)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createSampahResidu
    })

    const { mutateAsync: deleteTrashMutate } = useMutation({
        mutationFn: deleteSampahResidu
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await mutateAsync(data)
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
                <div className="flex justify-between items-center p-5">
                    <Navbar />
                </div>
                <div className="flex flex-col shadow-md bg-white rounded-md m-5 p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Hasil Total Pengangkutan Sampah Residu</h1>
                        <div className="flex">
                            <Dialog
                                trigger={
                                    <button className="ml-2 p-2 text-sm bg-[#967C55] text-white rounded-md">
                                        TAMBAH DATA
                                    </button>
                                }
                                title="PENAMBAHAN REKAP PENGANGKUTAN SAMPAH RESIDU"
                            >
                                <form className="m-2" onSubmit={onSubmit}>
                                    <h3 className="text-sm mb-1 font-bold">Bulan Rekap Pengangkutan</h3>
                                    <input className="rounded-md mb-3" type="date" {...register("date", { required: true })} defaultValue={new Date().toDateString()} />
                                    <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Hijau (Kg)"}</h3>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("sampah_kebun", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sampah Kebun" required />
                                        <input type="number" step={0.001} {...register("sampah_makanan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sampah Makanan" required />
                                    </div>
                                    <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Biru (Kg)"}</h3>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kertas" required />
                                    </div>
                                    <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Kuning (Kg)"}</h3>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kaca" required />
                                        <input type="number" step={0.001} {...register("logam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Logam" required />
                                    </div>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("plastik_PET", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plastik PET" required />
                                        <input type="number" step={0.001} {...register("plastik_lain", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Plastik Lainnya" required />
                                    </div>
                                    <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Merah (Kg)"}</h3>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("kresek", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kresek" required />
                                        <input type="number" step={0.001} {...register("multilayer_plastic", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Multilayer PLastic" required />
                                    </div>
                                    <h3 className="text-sm mb-(-2) mt-2 font-bold">{"Label Hitam (Kg)"}</h3>
                                    <div className="flex justify-between gap-x-2">
                                        <input type="number" step={0.001} {...register("residu", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Residu" required />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="mt-6 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
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
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Bulan",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="p-2 bg-green-300 rounded-md">{"Sampah Kebun (Kg)"}</div>,
                                    attributeName: "sampah_kebun",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-green-300 rounded-md">{"Sampah Makanan (Kg)"}</div>,
                                    attributeName: "sampah_makanan",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "Total Kompos (Kg)",
                                    attributeName: "residu",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-blue-300 rounded-md">{"Kertas (Kg)"}</div>,
                                    attributeName: "kwrtas",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-orange-300 rounded-md">{"Kaca (Kg)"}</div>,
                                    attributeName: "kaca",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-orange-300 rounded-md">{"Logam (Kg)"}</div>,
                                    attributeName: "logam",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-orange-300 rounded-md">{"Plastik PET (Kg)"}</div>,
                                    attributeName: "plastik_PET",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-orange-300 rounded-md">{"Plastik Lainnya (Kg)"}</div>,
                                    attributeName: "plastik_lain",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-red-300 rounded-md">{"Kresek (Kg)"}</div>,
                                    attributeName: "kresek",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: <div className="p-2 bg-red-300 rounded-md">{"Multilayer Plastic (Kg)"}</div>,
                                    attributeName: "multilayer_plastic",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "Total Daur Ulang (Kg)",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="p-2 bg-slate-300 rounded-md">{"Residu (Kg)"}</div>,
                                    attributeName: "residu",
                                    canBeOrdered: true
                                }, 
                                {
                                    name: "Total Residu (Kg)",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Kompos %",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Daur Ulang %",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Residu %",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Total (Kg)",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, {
                                    name: <SlidersHorizontal size={24} />,
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                            ]}
                            rows={
                                data?.data.data.map((sampahResidu, i) => {
                                    const kompos = sampahResidu.sampah_kebun+sampahResidu.sampah_makanan
                                    const daur = sampahResidu.kertas+sampahResidu.kaca+sampahResidu.logam+sampahResidu.plastik_lain+sampahResidu.kresek+sampahResidu.multilayer_plastic+sampahResidu.plastik_PET
                                    const total = kompos+daur+sampahResidu.residu
                                    const pKompos = kompos/total*100
                                    const pDaur = daur/total*100
                                    const pResidu = sampahResidu.residu/total*100
                                    
                                    return [i + 1, moment(sampahResidu.date).format("MMMM"), sampahResidu.sampah_kebun, sampahResidu.sampah_makanan, kompos, 
                                    sampahResidu.kertas, sampahResidu.kaca, sampahResidu.logam, sampahResidu.plastik_PET, sampahResidu.plastik_lain, sampahResidu.kresek, sampahResidu.multilayer_plastic, 
                                    daur, 
                                    sampahResidu.residu, sampahResidu.residu, intl.formatNumber(pKompos,{minimumFractionDigits:2,maximumFractionDigits: 2}), intl.formatNumber(pDaur,{minimumFractionDigits:2,maximumFractionDigits: 2}), intl.formatNumber(pResidu,{minimumFractionDigits:2,maximumFractionDigits: 2}), total,
                                    <Popover
                                        trigger={
                                            <button><DotsThreeVertical size={24} /></button>
                                        }
                                        children={
                                            <>
                                                <DialogEditSampahResidu data={sampahResidu} refetch={refetch} />
                                                <ConfirmationDialog
                                                    title="Apakah anda yakin ingin menghapus data Sampah Residu ini?"
                                                    trigger={
                                                        <button className="flex mt-2">
                                                            <Trash className="mr-2" size={24} /> Hapus Data Sampah Residu
                                                        </button>
                                                    }
                                                    onConfirm={async () => {
                                                        try {
                                                            await deleteTrashMutate(sampahResidu.id)
                                                            refetch()
                                                            toast.success("Berhasil menghapus data Sampah Residu")
                                                        }
                                                        catch {
                                                            toast.error("Gagal menghapus data Sampah Residu")
                                                        }
                                                    }}
                                                />
                                            </>
                                        }
                                    />
                                    ]
                                })
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

export default HasilPengangkutanSampahResidu