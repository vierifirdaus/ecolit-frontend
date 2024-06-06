import { useState } from "react";
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from '../../../assets/ui/Navbar';
import { Button, Flowbite } from "flowbite-react";
import { GrCloudDownload } from "react-icons/gr";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { getReportKolaborator } from "../queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowsClockwise, DotsThreeVertical, SlidersHorizontal } from "phosphor-react";
import Table from "../../../components/table";
import Popover from "../../../components/popover";
import DialogDetail from "./dialogDetail";
import DialogEdit from "./dialogEdit";
import { seed } from "../../QuickCountBesek/queries";
import toast from "react-hot-toast";



export default function LaporanWadahKolaborator() {
    const [name, setName] = useState("")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("date")

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-report-kolaborator", name, page, orderAttribute, isAsc],
        queryFn: () => getReportKolaborator(name, page, 10, orderAttribute, isAsc)
    })

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
                    base: "bg-gray-200 px-10 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700"
                }
            }
        },
    };

    const { mutateAsync: seedMutate } = useMutation({
        mutationFn: seed
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
                            <h1 className="text-3xl font-bold">Report Wadah Kolaborator</h1>
                        </section>
                        <section className="flex justify-end space-x-5">
                            <button className="bg-[#967c55] hover:opacity-80 text-white px-4 rounded-md" onClick={
                                async () => {
                                    try {
                                        await seedMutate()
                                        toast.success("Berhasil sinkronisasi data")
                                    }catch(e){
                                        toast.error("Gagal sinkronisasi data")
                                    }
                                }
                            }><ArrowsClockwise/></button>
                            <Flowbite theme={{ theme: customTheme }}>
                            <a href={`${import.meta.env.VITE_API_URL}/download-excel-qurban`}>
                                <Button color="secondary" className="rounded-lg">
                                    <GrCloudDownload className="mr-3 h-4 w-4" />
                                    EXPORT
                                </Button>
                            </a>
                            </Flowbite>
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
                                        name: "Tanggal Report",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Lembaga",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Besek Sesuai",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Besek Tidak Sesuai",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Thinwal Sesuai",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Thinwal Tidak Sesuai",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Dokumentasi",
                                        attributeName: "",
                                        canBeOrdered: false
                                    },
                                    {
                                        name: "Status",
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
                                    data.data.data.map((wadah, i) => [
                                        (page - 1) * 10 + i + 1,
                                        wadah.tanggal_report as any as string,
                                        wadah.email,
                                        wadah.ukuran_12 + wadah.ukuran_14 + wadah.ukuran_16 + wadah.ukuran_18 + wadah.ukuran_20,
                                        wadah.tidak_ukuran_panjang + wadah.rusak_panjang + wadah.hanya_wadah_panjang + wadah.hanya_tutup_panjang,
                                        wadah.ukuran_650 + wadah.ukuran_700 + wadah.ukuran_750 + wadah.ukuran_800 + wadah.ukuran_900 + wadah.ukuran_1000 + wadah.ukuran_1500 + wadah.ukuran_2000 + wadah.ukuran_3000,
                                        wadah.tidak_ukuran_ml + wadah.rusak_ml + wadah.hanya_wadah_ml + wadah.hanya_tutup_ml,
                                        <a href={wadah.dokumentasi}>Dokumentasi</a>,
                                        wadah.status == "REVISION" ? 
                                            <span className="block px-4 py-2 rounded-md bg-red-300">REVISE</span>
                                            :
                                            wadah.status == "WAITING" ? 
                                                <span className="block px-4 py-2 rounded-md bg-slate-300">WAITING</span>
                                                :
                                                <span className="block px-4 py-2 rounded-md bg-green-300">VERIFIED</span>,
                                        <Popover
                                            trigger={
                                                <button><DotsThreeVertical size={24} /></button>
                                            }
                                            children={
                                                <>
                                                    <DialogDetail data={wadah} />
                                                    <DialogEdit data={wadah} refetch={refetch}/>
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
