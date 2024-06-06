import { Eye, NotePencil } from "phosphor-react"
import Dialog from "../../../components/dialog"
import * as RadixDialog from "@radix-ui/react-dialog"
import { Controller, useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import Select from "../../../components/select"
import { ReportWadah } from "../types"

type DialogDetailProps = {
    data: ReportWadah
}

function DialogDetail({ data }: DialogDetailProps) {

    return (
        <Dialog
            trigger={
                <button className="flex">
                    <Eye className="mr-2" size={24} /> Detail
                </button>
            }
            title="Detail Report Wadah"
        >
            <div>
                <h3>Lembaga: {"namaOrganisasi"}</h3>
                <h3>Besek</h3>
                <p>Ukuran 12: {data.ukuran_12}</p>
                <p>Ukuran 14: {data.ukuran_14}</p>
                <p>Ukuran 16: {data.ukuran_16}</p>
                <p>Ukuran 18: {data.ukuran_18}</p>
                <p>{`Ukuran >20: `} {data.ukuran_20}</p>
                <p>Tidak Sesuai Ukuran: {data.tidak_ukuran_panjang}</p>
                <p>Rusak: {data.rusak_panjang}</p>
                <p>Hanya Wadah: {data.hanya_wadah_panjang}</p>
                <p>Hanya Tutup: {data.hanya_tutup_panjang}</p>

                <h3>Thinwall</h3>
                <p>Ukuran 650: {data.ukuran_650}</p>
                <p>Ukuran 700: {data.ukuran_700}</p>
                <p>Ukuran 750: {data.ukuran_750}</p>
                <p>Ukuran 800: {data.ukuran_800}</p>
                <p>Ukuran 900: {data.ukuran_900}</p>
                <p>Ukuran 1000: {data.ukuran_1000}</p>
                <p>Ukuran 1500: {data.ukuran_1500}</p>
                <p>Ukuran 2000: {data.ukuran_2000}</p>
                <p>Ukuran 3000: {data.ukuran_3000}</p>
                <p>Tidak Sesuai Ukuran: {data.tidak_ukuran_ml}</p>
                <p>Rusak: {data.rusak_ml}</p>
                <p>Hanya Wadah: {data.hanya_wadah_ml}</p>
                <p>Hanya Tutup: {data.hanya_tutup_ml}</p>
            </div>
        </Dialog>
    )
}

export default DialogDetail