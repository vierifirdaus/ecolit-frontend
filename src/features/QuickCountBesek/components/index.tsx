import Table from "../../../components/table"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from "../../../assets/ui/Navbar"
import { useState } from "react"
import { QuickCountBesekData } from "../types"
import { getBeseks, seed } from "../queries"
import { useMutation, useQuery } from "@tanstack/react-query"
import { ArrowsClockwise } from "phosphor-react"
import toast from "react-hot-toast"

function QuickCountBesek() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("date")

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-beseks", page, orderAttribute, isAsc],
        queryFn: () => getBeseks(page, 10, orderAttribute, isAsc)
    })

    const { mutateAsync: seedMutate } = useMutation({
        mutationFn: seed
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
                        <h1 className="text-3xl font-bold">Quick Count Setor Besek</h1>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#967c55] hover:opacity-80 text-white p-2 rounded-md" onClick={
                            async () => {
                                try {
                                    await seedMutate()
                                    toast.success("Berhasil sinkronisasi data")
                                } catch (e) {
                                    toast.error("Gagal sinkronisasi data")
                                }
                            }
                        }><ArrowsClockwise /></button>
                    </div>
                    {
                        isSuccess &&
                        <Table
                            className="mt-2"
                            headers={[
                                {
                                    name: "No",
                                    attributeName: "no",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Lembaga",
                                    attributeName: "lembaga",
                                    canBeOrdered: false
                                },
                                {
                                    name: "12 cm",
                                    attributeName: "cm12",
                                    canBeOrdered: false
                                },
                                {
                                    name: "14 cm",
                                    attributeName: "cm14",
                                    canBeOrdered: false
                                },
                                {
                                    name: "16 cm",
                                    attributeName: "cm16",
                                    canBeOrdered: false
                                },
                                {
                                    name: "18 cm",
                                    attributeName: "cm18",
                                    canBeOrdered: false
                                },
                                {
                                    name: ">20 cm",
                                    attributeName: "cm20",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Tidak Sesuai",
                                    attributeName: "tidak_sesuai",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Total Setor",
                                    attributeName: "total_setor",
                                    canBeOrdered: false
                                }
                            ]}
                            rows={
                                data?.data.data.map((besek:any, i:any) => [
                                    (page-1)*10+i+1, besek.lembaga, besek.ukuran_12, besek.ukuran_14, besek.ukuran_16, besek.ukuran_18, besek.ukuran_20, besek.tidak_ukuran_panjang, besek.ukuran_12+besek.ukuran_14+besek.ukuran_16+besek.ukuran_18+besek.ukuran_20
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

export default QuickCountBesek
