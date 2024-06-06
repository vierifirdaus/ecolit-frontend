import { BarChart } from "../../chart/components";
import { useQuery } from "@tanstack/react-query";
import { getReportWadah, getReportWadahReal } from "../queries";
import NavbarLandingPage from "../../../assets/ui/Navbar_Landing_Page";
import { getWadahKolaborator } from "../../Dashboard/queries";

function WadahQurban() {

    const {data:dataWadahKolaborator, isSuccess:isWadahKolaboratorSuccess} = useQuery({
        queryKey: ["wadah-kolaborator"],
        queryFn: () => getWadahKolaborator()
    })

    const {data:dataReportWadah, isSuccess:isReportWadahSuccess} = useQuery({
        queryKey: ["report-wadah"],
        queryFn: () => getReportWadah()
    })

    const {data:dataReportWadahReal, isSuccess:isReportWadahRealSuccess} = useQuery({
        queryKey: ["report-wadah-real"],
        queryFn: () => getReportWadahReal()
    })

    // Debugging: Log the data to ensure it's being fetched correctly

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="w-full">
                <NavbarLandingPage />
            </nav>
            <main className="flex-grow flex flex-col items-center justify-center space-y-6">
                <div className="body h-full px-5 pb-5 pt-1">
                    <div className="container flex flex-col w-full shadow-md bg-white rounded-md p-5">
                        
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
                    </div>
                </div>
            </main>
        </div>
    );
}

export default WadahQurban;
