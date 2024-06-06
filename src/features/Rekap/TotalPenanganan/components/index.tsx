import Table from "../../../../components/table"
import Sidebar from "../../../../assets/ui/sidebar"
import Navbar from "../../../../assets/ui/Navbar"
import { useQuery } from "@tanstack/react-query";
import { getTrashesByMonth } from "../queries";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Download } from "phosphor-react";

function HasilTotalPenangananSampah() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(false)
    const [orderAttribute, setOrderAttribute] = useState("bulan")

    const intl = useIntl()

    const { data, isSuccess } = useQuery({
        queryKey: ["trashes-by-month", page, orderAttribute, isAsc],
        queryFn: () => getTrashesByMonth(page, 10, orderAttribute, isAsc)
    })

    return (
        <div className="max-w-[100%] flex">
            <div className="absolute z-[100]">
                <Sidebar />
            </div>
            <div className="flex flex-col w-full h-screen bg-[#F6F6F6] pl-[5vw]">
                <div className="flex justify-between items-center p-5">
                    <Navbar />
                </div>
                <div className="flex flex-col shadow-md bg-white rounded-md m-5 p-5">
                    <div className="flex justify-between">
                        <h1 className="text-3xl font-bold">Hasil Total Penanganan Sampah</h1>
                    </div>
                    <div className="flex w-full justify-end">
                        {/* <a href={`${import.meta.env.VITE_API_URL}/download-excel-pengangkutan`}>
                            <button
                                className="flex items-center py-2 px-4 text-[#967C55] border border-[#967C55] rounded-md hover:opacity-80"
                            >
                                <Download className="mr-2" />
                                Export
                            </button>
                        </a> */}
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
                                    attributeName: "bulan",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Total Kompos (Kg)",
                                    attributeName: "total_kompos",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Kompos %",
                                    attributeName: "presentase_kompos",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Kompos Pihak Ketiga %",
                                    attributeName: "presentase_kompos_pihak_ketiga",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Kompos Salman %",
                                    attributeName: "presentase_kompose_salman",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Total Daur Ulang (Kg)",
                                    attributeName: "total_daur_ulang_sampah",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Daur Ulang %",
                                    attributeName: "presentase_daur_ulang_sampah",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Daur Ulang Pihak Ketiga %",
                                    attributeName: "persentase_daur_ulang_sampah_pihak_ketiga",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Daur Ulang Salman %",
                                    attributeName: "persentase_daur_ulang_sampah_salman",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Total Residu (Kg)",
                                    attributeName: "total_residu",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Total (Kg)",
                                    attributeName: "total",
                                    canBeOrdered: false
                                },
                            ]}
                            rows={
                                data?.data.data.map((totalPenanganan, i) => {
                                    return [
                                        i + 1, 
                                        totalPenanganan.bulan, 
                                        intl.formatNumber(totalPenanganan.total_kompos),
                                        intl.formatNumber(totalPenanganan.persentase_kompos, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(totalPenanganan.persentase_kompos_pihak_ketiga, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(totalPenanganan.persentase_kompos_salman, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(totalPenanganan.total_daur_ulang_sampah),
                                        intl.formatNumber(totalPenanganan.persentase_daur_ulang_sampah, {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
                                        intl.formatNumber(totalPenanganan.persentase_daur_ulang_sampah_pihak_ketiga, {minimumFractionDigits: 2, maximumFractionDigits: 2}),  
                                        intl.formatNumber(totalPenanganan.persentase_daur_ulang_sampah_salman, {minimumFractionDigits: 2, maximumFractionDigits: 2}),
                                        intl.formatNumber(totalPenanganan.total_residu),
                                        intl.formatNumber(totalPenanganan.total)]
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

export default HasilTotalPenangananSampah