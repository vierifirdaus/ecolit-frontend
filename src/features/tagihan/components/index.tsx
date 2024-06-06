import Sidebar from "../../../assets/ui/sidebar"
import Navbar from '../../../assets/ui/Navbar';
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CreateTagihan } from "../types";
import Table from "../../../components/table";
import { DotsThreeVertical, Download, SlidersHorizontal } from "phosphor-react";
import Popover from "../../../components/popover";
import DialogEditTagihan from "./dialogEditTagihan";
import { getTagihans } from "../queries";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import moment from "moment";
import { useIntl } from "react-intl";
import Select from "../../../components/select";

function TagihanSampah() {
    const [page, setPage] = useState(1)
    const [isAsc, setIsAsc] = useState(true)
    const [orderAttribute, setOrderAttribute] = useState("start")
    const [filter, setFilter] = useState("ALL")

    const intl = useIntl()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<CreateTagihan>()

    const { data, isSuccess, refetch } = useQuery({
        queryKey: ["all-tagihan", page, orderAttribute, isAsc, filter],
        queryFn: () => getTagihans(page, 10, orderAttribute, isAsc, filter)
    })

    // const { mutateAsync } = useMutation({
    //     mutationFn: createSampahResidu
    // })

    // const { mutateAsync: deleteTrashMutate} = useMutation({
    //     mutationFn: deleteSampahResidu
    // })

    const onSubmit = handleSubmit(async (data) => {
        try {
            // await mutateAsync(data)
            // refetch()
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
                    <h1 className="text-3xl font-bold">Tagihan</h1>
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
                                        value: "DONE",
                                        label: "DONE"
                                    },
                                    {
                                        value: "NOT_PAID",
                                        label: "NOT PAID"
                                    },
                                    {
                                        value: "ON_PROGRESS",
                                        label: "ON PROGRESS"
                                    },
                                    {
                                        value: "NOT_STARTED",
                                        label: "NOT STARTED"
                                    },
                                    {
                                        value: "ALL",
                                        label: "ALL"
                                    }
                                ]}
                                onChange={(val) => setFilter(val)}
                            />
                        </div>
                        <a href={`${import.meta.env.VITE_API_URL}/download-excel-tagihan-sampah`}>
                            <button
                                className="flex items-center py-2 px-4 text-[#967C55] border border-[#967C55] rounded-md hover:opacity-80"
                            >
                                <Download className="mr-2" />
                                Export
                            </button>
                        </a>
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
                                    name: <div className="min-w-28 text-center">Start</div>,
                                    attributeName: "start",
                                    canBeOrdered: true
                                },
                                {
                                    name: <div className="min-w-28 text-center">End</div>,
                                    attributeName: "end",
                                    canBeOrdered: true
                                },
                                {
                                    name: "Tb/Bulan",
                                    attributeName: "trash_bag",
                                    canBeOrdered: true
                                },
                                {
                                    name: "Hari Angkut",
                                    attributeName: "hari_angkut",
                                    canBeOrdered: true
                                },
                                {
                                    name: <div className="min-w-28 text-center">Harga Normal</div>,
                                    attributeName: "harga_normal",
                                    canBeOrdered: true
                                },
                                {
                                    name: "Tb Tambahan",
                                    attributeName: "trash_bag_tambahan",
                                    canBeOrdered: true
                                },
                                {
                                    name: <div className="min-w-28 text-center">Harga Tambahan</div>,
                                    attributeName: "harga_tambahan",
                                    canBeOrdered: true
                                },
                                {
                                    name: <div className="min-w-28 text-center">Total</div>,
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Status",
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: "Invoice",
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                                {
                                    name: <SlidersHorizontal size={24} />,
                                    attributeName: "",
                                    canBeOrdered: false
                                },
                            ]}
                            rows={
                                data.data.data.map((tagihan, i) => {
                                    return [
                                        (page - 1) * 10 + i + 1, moment(tagihan.start).format("DD MMMM YYYY"), moment(tagihan.end).format("DD MMMM YYYY"), tagihan.trash_bag, tagihan.hari_angkut,
                                        `Rp ${intl.formatNumber(tagihan.harga_normal)},00`,
                                        tagihan.trash_bag_tambahan,
                                        `Rp ${intl.formatNumber(tagihan.harga_tambahan)},00`,
                                        `Rp ${intl.formatNumber(tagihan.harga_tambahan + tagihan.harga_normal)},00`, 
                                        tagihan.status === "DONE" ? 
                                            <span className="bg-green-300 block min-w-max p-1 rounded-md">DONE</span> : 
                                            tagihan.status === "NOT_PAID" ?
                                                <span className="bg-yellow-300 block min-w-max p-1 rounded-md">NOT PAID</span> :
                                                tagihan.status === "ON_PROGRESS" ?
                                                    <span className="bg-slate-300 block min-w-max p-1 rounded-md">ON PROGRESS</span> :
                                                    <span className="block min-w-max bg-red-300 p-1 rounded-md">NOT STARTED</span>, 
                                        <a href={tagihan.invoice}>Invoice</a>,
                                        <Popover
                                            trigger={
                                                <button><DotsThreeVertical size={24} /></button>
                                            }
                                            children={
                                                <>
                                                    <DialogEditTagihan data={tagihan} refetch={() => { }} />
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
    );
}

export default TagihanSampah;