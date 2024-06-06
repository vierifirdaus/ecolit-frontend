import { LineChart } from "../../chart/components";
import { useQuery } from "@tanstack/react-query";
import { getDataPenangananSampah, getDataRekapMitra, getHasilPemilahanMandiri } from "../queries";
import NavbarLandingPage from "../../../assets/ui/Navbar_Landing_Page";

function PengelolaanSampah() {
    const { data: dataPenangananSalman, isSuccess: isSalmanSuccess } = useQuery({
        queryKey: ["penanganan-sampah"],
        queryFn: getDataPenangananSampah
    });

    const { data: dataMitra, isSuccess: isMitraSuccess } = useQuery({
        queryKey: ["rekap-mitra"],
        queryFn: getDataRekapMitra
    });

    const { data: dataPemilahanMandiri, isSuccess: isPemilahanMandiriSuccess } = useQuery({
        queryKey: ["pemilahan-mandiri"],
        queryFn: getHasilPemilahanMandiri
    });

    // Debugging: Log the data to ensure it's being fetched correctly
    console.log('Salman Data:', dataPenangananSalman);
    console.log('Mitra Data:', dataMitra);
    console.log('Pemilahan Mandiri Data:', dataPemilahanMandiri);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="w-full">
                <NavbarLandingPage />
            </nav>
            <main className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className="body h-full px-5 pb-5 pt-1">
                    <div className="container flex flex-col w-full shadow-md bg-white rounded-md p-5">
                        <div className="w-[80vw]">
                            {isSalmanSuccess && (
                                <LineChart 
                                    title="Data Penanganan Harian Salman"
                                    data={dataPenangananSalman?.data.data} 
                                    type="salman"
                                    format="hari"
                                />
                            )}
                        </div>
                        <div className="w-[80vw]">
                            {isMitraSuccess && (
                                <LineChart 
                                    title="Rekap Pengangkutan Sampah Residu Waste 4 Change"
                                    data={dataMitra?.data.data} 
                                    type="mitra"
                                    format="hari"
                                />
                            )}
                        </div>
                        <div className="w-[80vw]">
                            {isPemilahanMandiriSuccess && (
                                <LineChart 
                                    title="Penanganan Hasil Pemilahan Mandiri di Salman"
                                    data={dataPemilahanMandiri?.data.data} 
                                    type="pemilahan"
                                    format="bulan"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default PengelolaanSampah;
