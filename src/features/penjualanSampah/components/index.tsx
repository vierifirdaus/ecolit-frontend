import * as React from 'react';
import { DotsThreeVertical, SlidersHorizontal, Trash } from "phosphor-react"
import Dialog from "../../../components/dialog"
import Table from "../../../components/table"
import Popover from "../../../components/popover"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from '../../../assets/ui/Navbar';
import { Button, Flowbite } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { GrCloudDownload } from "react-icons/gr";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import toast from 'react-hot-toast';
import { getPenjualans } from '../queries';
import { useForm } from "react-hook-form"
import { CreatePenjualan } from '../types';
import { createPenjualan, deletePenjualan } from '../mutations';
import DialogEditPenjualan from './dialogEditPenjualan';
import ConfirmationDialog from '../../../components/confirmationDialog';
import moment from 'moment';

function PenjualanSampah() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("name")
    const [alignment, setAlignment] = React.useState('penjualan');
    const [filter, setFilter] = useState("")

    const {
        register,
        handleSubmit,
        reset
    } = useForm<CreatePenjualan>({
        defaultValues: {
            date: (new Date()).toDateString(),
            name: "",
            gelas_botol_plastik: undefined,
            kardus: undefined,
            gelas_kaleng_alumunium: undefined,
            bohlam: undefined,
            kabel_dan_tembaga: undefined,
            koran_dan_kertas: undefined,
            botol_kemasan: undefined,
            barang_elektronik: undefined,
            gelas_botol_kaca: undefined,
            barang_lain: undefined,
            harga_gelas_botol_plastik: undefined,
            harga_kardus: undefined,
            harga_gelas_kaleng_alumunium: undefined,
            harga_bohlam: undefined,
            harga_kabel_dan_tembaga: undefined,
            harga_koran_dan_kertas: undefined,
            harga_botol_kemasan: undefined,
            harga_barang_elektronik: undefined,
            harga_gelas_botol_kaca: undefined,
            total_harga_barang_lain: undefined,
            attachment: "",
            keterangan: ""
        }
    })

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ['penjualan-sampah', filter, page, isAsc, orderAttribute],
        queryFn: () => getPenjualans(filter, page, 10, orderAttribute, isAsc)
    })

    const { mutateAsync } = useMutation({
        mutationFn: createPenjualan
    })

    const { mutateAsync: deletePenjualanMutation } = useMutation({
        mutationFn: deletePenjualan
    })

    const onSubmit = handleSubmit(async (data) => {
        const newData = { ...data, data: (new Date(data.date)).toISOString() }
        try {
            console.log(data)
            await mutateAsync({
                ...newData,
                name: String(data.name),
                gelas_botol_plastik: Number(data.gelas_botol_plastik),
                kardus: Number(data.kardus),
                gelas_kaleng_alumunium: Number(data.gelas_kaleng_alumunium),
                bohlam: Number(data.bohlam),
                kabel_dan_tembaga: Number(data.kabel_dan_tembaga),
                koran_dan_kertas: Number(data.koran_dan_kertas),
                botol_kemasan: Number(data.botol_kemasan),
                barang_elektronik: Number(data.barang_elektronik),
                gelas_botol_kaca: Number(data.gelas_botol_kaca),
                barang_lain: Number(data.barang_lain),
                harga_gelas_botol_plastik: Number(data.harga_gelas_botol_plastik),
                harga_kardus: Number(data.harga_kardus),
                harga_gelas_kaleng_alumunium: Number(data.harga_gelas_kaleng_alumunium),
                harga_bohlam: Number(data.harga_bohlam),
                harga_kabel_dan_tembaga: Number(data.harga_kabel_dan_tembaga),
                harga_koran_dan_kertas: Number(data.harga_koran_dan_kertas),
                harga_botol_kemasan: Number(data.harga_botol_kemasan),
                harga_barang_elektronik: Number(data.harga_barang_elektronik),
                harga_gelas_botol_kaca: Number(data.harga_gelas_botol_kaca),
                total_harga_barang_lain: Number(data.total_harga_barang_lain)
            })

            refetch()
            toast.success("Berhasil menambahkan data penjualan")
        }
        catch {
            toast.error("Gagal menambahkan data penjualan")
        }
        reset()
    })

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const customTheme: CustomFlowbiteTheme = {
        button: {
            color: {
                primary: "bg-[#967C55] hover:bg-[#CABDA9] text-white font-semibold",
                secondary: "bg-white border-2 border-[#967C55] text-[#967C55] font-semibold hover:bg-gray-100",
            },
        },
        table: {
            head: {
                base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
                cell: {
                    base: "bg-gray-200 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
                }
            }
        },
    };


    return (
        <div className='flex w-screen'>
            <div className="absolute z-[100]">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full h-screen bg-[#F6F6F6] pl-[5vw]">
                <nav className="flex justify-between items-center p-5">
                    <Navbar />
                </nav>
                <main className="body h-full px-5 pb-5 pt-1">
                    <div className="w-full h-full shadow-md bg-white rounded-xl p-5">
                        <h1 className="text-3xl font-bold">Penjualan Sampah</h1>
                        <div className='flex justify-end'>
                            <ToggleButtonGroup
                                style={{ background: "white", border: "2px solid #967C55", borderRadius: "8px", marginRight: "8px" }}
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                            >
                                <ToggleButton
                                    value="penjualan"
                                    style={{ background: alignment === 'penjualan' ? '#967C55' : 'transparent', color: alignment === 'penjualan' ? 'white' : '#967C55' }}
                                >
                                    Penjualan Sampah
                                </ToggleButton>
                                <ToggleButton
                                    value="skema"
                                    style={{ background: alignment === 'skema' ? '#967C55' : 'transparent', color: alignment === 'skema' ? 'white' : '#967C55' }}
                                >
                                    Skema Harga
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <Flowbite theme={{ theme: customTheme }}>
                                <Button.Group className="space-x-4">
                                    <Button color="secondary" className="rounded-lg">
                                        <a href={`${import.meta.env.VITE_API_URL}/download-excel-penjualan-sampah`} className='flex w-full h-full'>
                                            <GrCloudDownload className="mr-3 h-4 w-4" />
                                            EXPORT
                                        </a>
                                    </Button>
                                    <Dialog
                                        trigger={
                                            <button className="ml-2 p-2 text-sm bg-[#967C55] text-white rounded-md">
                                                TAMBAH PENJUALAN
                                            </button>
                                        }
                                        title="TAMBAH DATA PENJUALAN SAMPAH"
                                    >
                                        <form className="m-2" onSubmit={onSubmit}>

                                            <h3 className="text-sm mb-1 font-bold">{"Tanggal Penjualan Sampah"}</h3>
                                            <input className="rounded-md mb-3" type="date" {...register("date", { required: true })} defaultValue={new Date().toDateString()} />
                                            <h3 className="text-sm mb-1 font-bold">{"Data Sampah (Kg) dan Harga Satuan (Rp/Kg)"}</h3>
                                            <div className="flex justify-between">
                                                <div className="w-full mr-2">
                                                    <input type="number" step={0.01} {...register("gelas_botol_plastik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Plastik" required />
                                                    <input type="number" step={0.01} {...register("kardus", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kardus" required />
                                                    <input type="number" step={0.01} {...register("gelas_kaleng_alumunium", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Aluminium" required />
                                                    <input type="number" step={0.01} {...register("bohlam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bohlam" required />
                                                    <input type="number" step={0.01} {...register("kabel_dan_tembaga", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kabel Tembaga" required />
                                                    <input type="number" step={0.01} {...register("koran_dan_kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Kertas & Koran" required />
                                                    <input type="number" step={0.01} {...register("botol_kemasan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Botol Kemasan" required />
                                                    <input type="number" step={0.01} {...register("barang_elektronik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Elektronik" required />
                                                    <input type="number" step={0.01} {...register("gelas_botol_kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Kaca" required />
                                                    <input type="number" step={0.01} {...register("barang_lain", { required: true })} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Wadah Lainnya" required />
                                                </div>
                                                <div className="w-full">
                                                    <input type="number" step={0.01} {...register("harga_gelas_botol_plastik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Wadah Plastik" required />
                                                    <input type="number" step={0.01} {...register("harga_kardus", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kardus" required />
                                                    <input type="number" step={0.01} {...register("harga_gelas_kaleng_alumunium", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Wadah Aluminium" required />
                                                    <input type="number" step={0.01} {...register("harga_bohlam", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Bohlam" required />
                                                    <input type="number" step={0.01} {...register("harga_kabel_dan_tembaga", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kabel Tembaga" required />
                                                    <input type="number" step={0.01} {...register("harga_koran_dan_kertas", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kertas & Koran" required />
                                                    <input type="number" step={0.01} {...register("harga_botol_kemasan", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Botol Kemasan" required />
                                                    <input type="number" step={0.01} {...register("harga_barang_elektronik", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Elektronik" required />
                                                    <input type="number" step={0.01} {...register("harga_gelas_botol_kaca", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Kaca" required />
                                                    <input type="number" step={0.01} {...register("total_harga_barang_lain", { required: true })} className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Harga Lainnya" required />
                                                </div>
                                            </div>
                                            <h3 className="text-sm mb-(-1) mt-3 font-bold">Dokumentasi</h3>
                                            <input type="text" step={0.01} {...register("attachment", { required: true })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dokumentasi" required />
                                            <textarea {...register("keterangan", { required: false })} className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keterangan" required={false} />
                                            <div className="flex justify-end">
                                                <button type="submit" className="mt-2 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
                                                    SIMPAN
                                                </button>
                                            </div>
                                        </form>
                                    </Dialog>
                                </Button.Group>
                            </Flowbite>
                        </div>
                        {alignment === 'penjualan' ?
                            (
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
                                        name: "Nama",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Tanggal",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Plastik (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kardus (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Aluminium (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Bohlam (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kabel Tembaga (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kertas & Koran (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Botol Kemasan (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Barang Elektronik (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Kaca (Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Lainnya",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Keterangan",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Total Berat",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Harga Jual",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Dokumentasi",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: <SlidersHorizontal size={24} />,
                                        attributeName: "",
                                        canBeOrdered: false
                                    }
                                ]}
                                rows={
                                    data?.data.data.map((sedekah, i) => {
                                        return [
                                            page * 10 + i + 1,
                                            sedekah.name,
                                            moment(sedekah.date).format("dddd, DD MMMM YYYY"),
                                            sedekah.gelas_botol_plastik,
                                            sedekah.kardus,
                                            sedekah.gelas_kaleng_alumunium,
                                            sedekah.bohlam,
                                            sedekah.kabel_dan_tembaga,
                                            sedekah.koran_dan_kertas,
                                            sedekah.botol_kemasan,
                                            sedekah.barang_elektronik,
                                            sedekah.gelas_botol_kaca,
                                            sedekah.barang_lain,
                                            sedekah.keterangan || "",
                                            sedekah.gelas_botol_plastik + sedekah.kardus + sedekah.gelas_kaleng_alumunium + sedekah.bohlam + sedekah.kabel_dan_tembaga + sedekah.koran_dan_kertas + sedekah.botol_kemasan + sedekah.barang_elektronik + sedekah.gelas_botol_kaca + sedekah.barang_lain,
                                            sedekah.barang_elektronik * sedekah.harga_barang_elektronik + sedekah.total_harga_barang_lain + sedekah.harga_bohlam*sedekah.bohlam + sedekah.harga_botol_kemasan * sedekah.botol_kemasan + sedekah.harga_gelas_botol_kaca*sedekah.gelas_botol_kaca + sedekah.harga_gelas_botol_plastik*sedekah.gelas_botol_plastik + sedekah.harga_gelas_kaleng_alumunium*sedekah.gelas_kaleng_alumunium + sedekah.harga_kabel_dan_tembaga*sedekah.kabel_dan_tembaga + sedekah.harga_kardus*sedekah.kardus + sedekah.harga_koran_dan_kertas*sedekah.koran_dan_kertas,
                                            <a href={sedekah.attachment}>Dokumentasi</a>,
                                            <Popover
                                                trigger={
                                                    <button><DotsThreeVertical size={24} /></button>
                                                }
                                                children={
                                                    <>
                                                        <DialogEditPenjualan data={sedekah} refetch={refetch} />
                                                        <ConfirmationDialog
                                                            title="Apakah anda yakin ingin menghapus data Penjualan ini?"
                                                            trigger={
                                                                <button className="flex mt-2">
                                                                    <Trash className="mr-2" size={24} /> Hapus Data Penjualan
                                                                </button>
                                                            }
                                                            onConfirm={async () => {
                                                                try {
                                                                    await deletePenjualanMutation(sedekah.id)
                                                                    refetch()
                                                                    toast.success("Berhasil menghapus data Penjualan")
                                                                }
                                                                catch {
                                                                    toast.error("Gagal menghapus data Penjualan")
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
                            )
                            :
                            (
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
                                        name: "Nama",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Tanggal",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Plastik (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kardus (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Aluminium (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Bohlam (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kabel Tembaga (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Kertas & Koran (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Botol Kemasan (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Barang Elektronik (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Kaca (Rp/Kg)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Wadah Lainnya (Rp)",
                                        attributeName: "",
                                        canBeOrdered: false
                                    }
                                ]}
                                rows={
                                    data?.data.data.map((sedekah, i) => {
                                        return [
                                            page * 10 + i + 1,
                                            sedekah.name,
                                            moment(sedekah.date).format("dddd, DD MMMM YYYY"),
                                            sedekah.harga_gelas_botol_plastik,
                                            sedekah.harga_kardus,
                                            sedekah.harga_gelas_kaleng_alumunium,
                                            sedekah.harga_bohlam,
                                            sedekah.harga_kabel_dan_tembaga,
                                            sedekah.harga_koran_dan_kertas,
                                            sedekah.harga_botol_kemasan,
                                            sedekah.harga_barang_elektronik,
                                            sedekah.harga_gelas_botol_kaca,
                                            sedekah.total_harga_barang_lain,
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
                            )
                        }
                    </div>
                </main>
            </div>

        </div>
    );
}

export default PenjualanSampah;