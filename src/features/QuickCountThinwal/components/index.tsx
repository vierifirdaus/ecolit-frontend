import Table from "../../../components/table"
import Sidebar from "../../../assets/ui/sidebar"
import Navbar from "../../../assets/ui/Navbar"
import { useState } from "react"
import { getThinwals } from "../queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ArrowsClockwise } from "phosphor-react";
import { seed } from "../../QuickCountBesek/queries";

function QuickCountThinwal() {
    const [filter, setFilter] = useState("")
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("date")

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-trashes", page, orderAttribute, isAsc],
        queryFn: () => getThinwals(page, 10, orderAttribute, isAsc)
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
                        <h1 className="text-3xl font-bold">Quick Count Setor Thinwal</h1>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#967c55] hover:opacity-80 text-white p-2 rounded-md" onClick={
                            async () => {
                                try {
                                    await seedMutate()
                                    toast.success("Berhasil sinkronisasi data")
                                }catch(e){
                                    toast.error("Gagal sinkronisasi data")
                                }
                            }
                        }><ArrowsClockwise/></button>
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
                                    name: "Lembaga",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "650 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "700 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "750 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "800 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "900 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "1000 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "1500 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "2000 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "3000 ml",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Tidak Sesuai",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                                {
                                    name: "Total Setor",
                                    attributeName: "",
                                    canBeOrdered: false
                                }, 
                            ]}
                            rows={
                                data?.data.data.map((besek:any, i:any) => [
                                    (page-1)*10+i+1, besek.lembaga, besek.ukuran_650, besek.ukuran_700, besek.ukuran_750, besek.ukuran_800, besek.ukuran_900, besek.ukuran_1000, besek.ukuran_1500, besek.ukuran_2000, besek.ukuran_3000, besek.tidak_ukuran_ml, besek.ukuran_650+besek.ukuran_700+besek.ukuran_750+besek.ukuran_800+besek.ukuran_900+besek.ukuran_1000+besek.ukuran_1500+besek.ukuran_2000+besek.ukuran_3000
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

export default QuickCountThinwal