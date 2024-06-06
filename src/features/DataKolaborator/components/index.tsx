import React, { useState } from "react";
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from '../../../assets/ui/Navbar';
import { Button, Flowbite } from "flowbite-react";
import { GrCloudDownload } from "react-icons/gr";
import type { CustomFlowbiteTheme } from "flowbite-react";
import Table from "../../../components/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getKolaborators } from "../queries";
import { DotsThreeVertical, Download, SlidersHorizontal, Trash } from "phosphor-react";
import Popover from "../../../components/popover";
import clsx from "clsx";
import Search from "../../../components/search";
import Dialog from "../../../components/dialog";
import { Controller, useForm } from "react-hook-form";
import { CreateKolaborator } from "../types";
import { createKolaborator, deleteKolaborator } from "../mutations";
import toast from "react-hot-toast";
import Select from "../../../components/select";
import ConfirmationDialog from "../../../components/confirmationDialog";
import DialogEditKolaborator from "./dialogEditPengguna";
export default function DataKolaborator() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("nama_lengkap")

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-kolaborator", name, page, orderAttribute, isAsc],
        queryFn: () => getKolaborators(name, page, 10, orderAttribute, isAsc)
    })

    const {
        control,
        register,
        handleSubmit,
        reset
    } = useForm<CreateKolaborator>({
        defaultValues: {}
    })

    const { mutateAsync } = useMutation({
        mutationFn: createKolaborator
    })

    const { mutateAsync: deleteKolaboratorMutate } = useMutation({
        mutationFn: deleteKolaborator
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            console.log(data)
            await mutateAsync({...data, longitude: parseFloat(data.longitude as any as string), latitude: parseFloat(data.latitude as any as string)})
            toast.success("Berhasil menambahkan kolaborator")
            refetch()
        }
        catch {
            toast.error("Gagal menambahkan kolaborator")
        }
        reset()
    })


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
                        <section className="container flex flex-col h-max">
                            <h1 className="text-3xl font-bold">Data Kolaborator</h1>
                        </section>
                        <section className="flex justify-between space-x-10">
                            <Search value={name} onChange={(val: string) => setName(val)} placeholder="Cari Nama Kolaborator" />
                            <div className="flex">
                                <a href={`${import.meta.env.VITE_API_URL}/download-excel-kolaborator-qurban`}>
                                    <button 
                                        className="flex items-center py-2 px-4 text-[#967C55] border border-[#967C55] rounded-md hover:opacity-80"
                                    >
                                        <Download className="mr-2"/>
                                        Export
                                    </button>
                                </a>
                                <Dialog
                                trigger={
                                    <button className="ml-2 p-2 text-sm bg-[#967C55] text-white rounded-md">
                                        TAMBAH KOLABORATOR
                                    </button>
                                }
                                title="TAMBAH KOLABORATOR"
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
                                                    options={[{value:"pribadi", label: "Pribadi"}, {value:"lembaga", label: "Lembaga"}]}
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
                                                    options={[{value:"publikasi", label: "Publikasi"}, {value:"pengumpul wadah", label: "Pengumpul Wadah"}]}
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
                                        <button type="submit" className="mt-2 p-2 px-4 text-sm bg-[#967C55] text-white rounded-md">
                                            SIMPAN
                                        </button>
                                    </div>
                                </form>
                            </Dialog>
                            </div>
                        </section>
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
                                            name: "Nama Lengkap",
                                            attributeName: "nama_lengkap",
                                            canBeOrdered: true
                                        },
                                        {
                                            name: "Nama Organisasi",
                                            attributeName: "nama_organisasi",
                                            canBeOrdered: true
                                        },
                                        {
                                            name: "Bentuk Kolaborasi",
                                            attributeName: "",
                                            canBeOrdered: false
                                        },
                                        {
                                            name: "No HP",
                                            attributeName: "",
                                            canBeOrdered: false
                                        },
                                        {
                                            name: "Instagram",
                                            attributeName: "akun_instagram",
                                            canBeOrdered: true
                                        },
                                        {
                                            name: "Jenis Kolaborasi",
                                            attributeName: "",
                                            canBeOrdered: false
                                        },
                                        {
                                            name: "Alamat",
                                            attributeName: "alamat",
                                            canBeOrdered: true
                                        },
                                        {
                                            name: "Alamat Drop Point",
                                            attributeName: "alamat_drop_point",
                                            canBeOrdered: true
                                        },
                                        {
                                            name: <SlidersHorizontal size={24} />,
                                            attributeName: "",
                                            canBeOrdered: false
                                        }
                                    ]}
                                    rows={
                                        data?.data.data.map((kolaborator, i) => [
                                            (page - 1) * 10 + i + 1, kolaborator.nama_lengkap, kolaborator.nama_organisasi, kolaborator.bentuk_kolab, kolaborator.nomor_wa, kolaborator.akun_instagram, kolaborator.jenis_kolab, kolaborator.alamat, kolaborator.alamat_drop_point,
                                            <Popover
                                                trigger={
                                                    <button><DotsThreeVertical size={24} /></button>
                                                }
                                                children={
                                                    <>
                                                        <DialogEditKolaborator data={kolaborator} refetch={refetch} />
                                                        <ConfirmationDialog
                                                            title="Apakah anda yakin ingin menghapus kolaborator ini?"
                                                            trigger={
                                                                <button className="flex mt-2">
                                                                    <Trash className="mr-2" size={24} /> Hapus Data Pengangkutan
                                                                </button>
                                                            }
                                                            onConfirm={async () => {
                                                                try {
                                                                    await deleteKolaboratorMutate(kolaborator.id)
                                                                    refetch()
                                                                    toast.success("Berhasil menghapus kolaborator")
                                                                }
                                                                catch {
                                                                    toast.error("Gagal menghapus kolaborator")
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

                </main>
            </div>

        </div>
    );
}
