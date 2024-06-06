import Table from "../../../../components/table"
import Sidebar from "../../../../assets/ui/sidebar"
import Navbar from "../../../../assets/ui/Navbar"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getTrashesSalman } from "../queries";
import { useIntl } from "react-intl";

function HasilPemilahanMandiri() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("kaca")

    const intl = useIntl()

    const { data, isSuccess } = useQuery({
        queryKey: ["trashes-by-month", page, orderAttribute, isAsc],
        queryFn: () => getTrashesSalman(page, 10, orderAttribute, isAsc)
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
                <div className="flex flex-col shadow-md bg-white rounded-md text-center m-5 p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Hasil Pemilahan Mandiri</h1>
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
                                    name: <div className="min-w-32 p-2 bg-green-300 rounded-md text-center">{`Label Hijau (Kg)`}</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: <div className="min-w-36 p-2 bg-yellow-300 rounded-md text-center">{`Label Kuning (Kg)`}</div>, 
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: <div className="min-w-32 p-2 bg-blue-300 rounded-md text-center">{`Label Biru (Kg)`}</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: <div className="min-w-32 p-2 bg-red-300 rounded-md text-center">{`Label Merah (Kg)`}</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="min-w-32 p-2 bg-slate-300 rounded-md text-center">{`Label Hitam (Kg)`}</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="w-28 text-center">Kompos %</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="w-28 text-center">Daur Ulang %</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: <div className="w-28 text-center">Residu %</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Total (Kg)",
                                    attributeName: "",
                                    canBeOrdered: false
                                }
                            ]}
                            rows={
                                data?.data.data.map((pemilahanMandiri, i) => {
                                    return [i + 1, 
                                        pemilahanMandiri.bulan, 
                                        intl.formatNumber(pemilahanMandiri.label_hijau), 
                                        intl.formatNumber(pemilahanMandiri.label_kuning), 
                                        intl.formatNumber(pemilahanMandiri.label_biru), 
                                        intl.formatNumber(pemilahanMandiri.label_merah), 
                                        intl.formatNumber(pemilahanMandiri.label_hitam), 
                                        intl.formatNumber(pemilahanMandiri.kompos_persentase, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(pemilahanMandiri.daur_ulang_persentase, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(pemilahanMandiri.residu_persentase, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(pemilahanMandiri.total)
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

export default HasilPemilahanMandiri
