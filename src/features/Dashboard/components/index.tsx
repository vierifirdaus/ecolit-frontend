import Sidebar from "../../../assets/ui/sidebar"
import dashboard from '../../../assets/icon/dashboard.svg';
import Navbar from '../../../assets/ui/Navbar';
import Tagihan from '../../../assets/icon/invoice.svg';
import Olah from '../../../assets/icon/process.svg';
import Penanganan from '../../../assets/icon/distribution.svg';
import Pembuangan from '../../../assets/icon/pembuangan.svg';
import Pengangkutan from '../../../assets/icon/truck.svg';
import Manajemen from '../../../assets/icon/manajemen.svg';
import Kolaborator from '../../../assets/icon/kolaborator.svg';
import Penjualan from '../../../assets/icon/penjualan.svg';
import Sedekah from '../../../assets/icon/sedekah.svg';
import PihakKetiga from '../../../assets/icon/pihakKetiga.svg';
import { BarChart, LineChart } from "../../chart/components";
import { useQuery } from "@tanstack/react-query";
import { getDataKolaborator, getDataPenangananSampah, getDataRekapMitra, getHasilPemilahanMandiri, getReportWadah, getWadahKolaborator } from "../queries";
import Map from "../../Map/components";
import { getReportWadahReal } from "../../wadahQurban/queries";

function Dashboard(){

    const { data:dataPenangananSalman, isSuccess:isSalmanSuccess } = useQuery({
        queryKey: ["penanganan-sampah"],
        queryFn: () => getDataPenangananSampah()
    })

    const {data:dataMitra, isSuccess:isMitraSuccess} = useQuery({
        queryKey: ["rekap-mitra"],
        queryFn: () => getDataRekapMitra()
    })

    const {data:dataPemilahanMandiri, isSuccess:isPemilahanMandiriSuccess} = useQuery({
        queryKey: ["pemilahan-mandiri"],
        queryFn: () => getHasilPemilahanMandiri()
    })

    const {data:dataWadahKolaborator, isSuccess:isWadahKolaboratorSuccess} = useQuery({
        queryKey: ["wadah-kolaborator"],
        queryFn: () => getWadahKolaborator()
    })

    const {data:dataReportWadahReal, isSuccess:isReportWadahRealSuccess} = useQuery({
        queryKey: ["report-wadah-real"],
        queryFn: () => getReportWadahReal()
    })

    const {data:dataReportWadah, isSuccess:isReportWadahSuccess} = useQuery({
        queryKey: ["report-wadah"],
        queryFn: () => getReportWadah()
    })

    const {data:dataKolaborator, isSuccess:isKolaboratorSuccess} = useQuery({
        queryKey: ["kolaborator"],
        queryFn: () => getDataKolaborator()
    })

    return (
        <div className='flex w-screen'>
            <div className='absolute z-[999]'>
                <Sidebar/>
            </div>
            <div className="flex flex-col w-full h-screen right-0 bg-[#F6F6F6] pl-[5vw]">
                <div className="flex justify-between items-center p-5">
                    <Navbar/>
                </div>
                <div className="body h-full px-5 pb-5 pt-1">
                    <div className="container flex flex-col w-full shadow-md bg-white rounded-md p-5">
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <div className=" w-[80vw]">
                            {
                                isSalmanSuccess &&
                                <LineChart 
                                    title="Data Penanganan Harian Salman"
                                    data={dataPenangananSalman?.data.data} 
                                    type="salman"
                                    format="hari"
                                />
                            }
                        </div>
                        <div className=" w-[80vw]">
                            {
                                isSalmanSuccess &&
                                <LineChart 
                                    title="Data Penanganan Harian Salman"
                                    data={dataPenangananSalman?.data.data} 
                                    type="salman"
                                    format="hari"
                                />
                            }
                        </div>
                        <div className=" w-[80vw]">
                            {
                                isMitraSuccess &&
                                <LineChart 
                                    title="Rekap Pengangkutan Sampah Residu Waste 4 Change"
                                    data={dataMitra?.data.data} 
                                    type="mitra"
                                    format="hari"
                                />
                            }
                        </div>
                        <div className=" w-[80vw]">
                            {
                                isPemilahanMandiriSuccess &&
                                <LineChart 
                                    title="Penanganan Hasil Pemilahan Mandiri di Salman"
                                    data={dataPemilahanMandiri?.data.data} 
                                    type="pemilahan"
                                    format="bulan"
                                />
                            }
                        </div>

                        <div className=" w-[80vw]">
                            {
                                isWadahKolaboratorSuccess &&
                                <BarChart 
                                    title="Data Wadah Kolaborator"
                                    labelX="Data Kolaborator"
                                    labelY="Total Report"
                                    dataWadah={dataWadahKolaborator?.data.dataWadah}
                                    dataKolaborator={dataWadahKolaborator?.data.kolaboratorQurban}
                                    type="report-wadah"
                                />
                            }
                        </div>
                    
                        <div className=" w-[80vw]">
                            {
                                isReportWadahRealSuccess &&
                                <BarChart 
                                    title="Real Count - Besek"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadahReal?.data.dataWadah}
                                    dataKolaborator={dataReportWadahReal?.data.kolaboratorQurban}
                                    type="report-besek"
                                />
                            }
                        </div>

                        <div className=" w-[80vw]">
                            {
                                isReportWadahRealSuccess &&
                                <BarChart 
                                    title="Real Count - Thinwall"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadahReal?.data.dataWadah}
                                    dataKolaborator={dataReportWadahReal?.data.kolaboratorQurban}
                                    type="report-thinwall"
                                />
                            }
                        </div>

                        <div className=" w-[80vw]">
                            {
                                isReportWadahRealSuccess &&
                                <BarChart 
                                    title="Real Count - Wadah Tidak Sesuai"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadahReal?.data.dataWadah}
                                    dataKolaborator={dataReportWadahReal?.data.kolaboratorQurban}
                                    type="report-wadah-tidak-sesuai"
                                />
                            }
                        </div>

                        <div className=" w-[80vw]">
                            {
                                isReportWadahSuccess &&
                                <BarChart 
                                    title="Quick Count - Besek"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadah?.data.dataWadah}
                                    dataKolaborator={dataReportWadah?.data.kolaboratorQurban}
                                    type="report-besek"
                                />
                            }
                        </div>

                        <div className=" w-[80vw]">
                            {
                                isReportWadahSuccess &&
                                <BarChart 
                                    title="Quick Count - Thinwall"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadah?.data.dataWadah}
                                    dataKolaborator={dataReportWadah?.data.kolaboratorQurban}
                                    type="report-thinwall"
                                />
                            }
                        </div>


                        <div className=" w-[80vw]">
                            {
                                isReportWadahSuccess &&
                                <BarChart 
                                    title="Quick Count - Wadah Tidak Sesuai"
                                    labelX="Ukuran Besek"
                                    labelY="Total"
                                    dataWadah={dataReportWadah?.data.dataWadah}
                                    dataKolaborator={dataReportWadah?.data.kolaboratorQurban}
                                    type="report-wadah-tidak-sesuai"
                                />
                            }
                        </div>

                        <div>
                            {
                                isKolaboratorSuccess &&
                                <Map 
                                    data={dataKolaborator?.data}
                                />
                            }
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard