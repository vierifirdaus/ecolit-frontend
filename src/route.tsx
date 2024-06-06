import { Outlet, Route, createBrowserRouter } from "react-router-dom";
import Login from "./features/Login/components";
import Dashboard from "./features/Dashboard/components";
import ManagemenPengguna from "./features/managemenPengguna/components";
import PenangananSampah from "./features/penangananSampah/components";
import ChangePassword from "./features/changePassword/components";
import Tagihan from "./features/tagihan/components";
import PenjualanSampah from "./features/penjualanSampah/components";
import SedekahSampah from "./features/sedekahSampah/components";
import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "./features/Login/queries";
import PihakKetiga from "./features/PihakKetiga/components";
import PengangkutanSampah from "./features/Pengangkutan/components";
import HasilPemilahanMandiri from "./features/Rekap/HasilPemilahanMandiri/components";
import HasilTotalPenangananSampah from "./features/Rekap/TotalPenanganan/components";
import HasilPengangkutanSampahResidu from "./features/Rekap/HasilPengangkutan/components";
import DataKolaborator from "./features/DataKolaborator/components";
import QuickCountBesek from "./features/QuickCountBesek/components";
import QuickCountThinwal from "./features/QuickCountThinwal/components";
import LandingPage from "./features/LandingPage/components";
import LaporanWadahKolaborator from "./features/Kolaborator/components";
import {LineChart,BarChart} from "./features/chart/components";
import PengelolaanSampah from "./features/pengelolaanSampah/components";
import DropPoint from "./features/dropPoint/component";
import ReportKolaborator from "./features/Report/component";
import WadahQurban from "./features/wadahQurban/components";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        children: [
            {
                path: "",
                element: <LandingPage/>,
            },
            {
                path: "pengelolaan-sampah",
                element: <Outlet />,
                children: [
                    {
                        path: "detail",
                        element: <PengelolaanSampah/>
                    }
                ]
            },
            {
                path: "wadah-qurban",
                element: <Outlet />,
                children: [
                    {
                        path: "detail",
                        element: <WadahQurban/>
                    },
                    {
                        path: "dropt-point",
                        element: <DropPoint/>
                    },
                    {
                        path: "report",
                        element: <ReportKolaborator/>
                    }
                ]
            },
            {
                path: "auth",
                element: <Outlet />,
                children: [
                    {
                        path: "login",
                        element: <Login />,
                    },
                ],
            },
            {
                path: "app",
                element: <Root role="PEGAWAI"/>,
                children: [
                    {
                        path: "dashboard",
                        element: <Dashboard />
                    },
                    {
                        path: "rekap",
                        element: <Outlet />,
                        children: [
                            {
                                path: "hasil-total-penanganan-sampah",
                                element: <HasilTotalPenangananSampah/>
                            },
                            {
                                path: "hasil-pengangkutan-sampah-residu",
                                element: <HasilPengangkutanSampahResidu/>
                            },
                            {
                                path: "hasil-pemilahan-mandiri",
                                element: <HasilPemilahanMandiri/>
                            }
                        ]
                    },
                    {
                        path: "",
                        element: <Root role="ADMIN"/>,
                        children: [
                            {
                                path: "managemen-pengguna",
                                element: <ManagemenPengguna/>
                            }
                        ]
                    },
                    {
                        path: "penanganan-sampah",
                        element: <PenangananSampah />
                    },
                    {
                        path: "pengangkutan-sampah",
                        element: <PengangkutanSampah />
                    },
                    {
                        path: "penjualan-sampah",
                        element: <PenjualanSampah />
                    },
                    {
                        path: "pihak-ketiga",
                        element: <PihakKetiga />
                    },
                    {
                        path: "tagihan",
                        element: <Tagihan />
                    },
                    {
                        path: "sedekah-sampah",
                        element: <SedekahSampah />
                    },
                    {
                        path: "change-password",
                        element: <ChangePassword />
                    },
                    {
                        path: "laporan-wadah-kolaborator",
                        element: <LaporanWadahKolaborator />,
                    },
                    {
                        path: "data-kolaborator",
                        element: <DataKolaborator />,
                    },
                    {
                        path: "quick-count",
                        element: <Outlet/>,
                        children: [
                            {
                                path: "besek",
                                element: <QuickCountBesek />
                            },
                            {
                                path: "thinwal",
                                element: <QuickCountThinwal />
                            }
                        ]
                    },
                ]
            },
        ]
    },
])

function Root({role} : any) {

    const {data,isSuccess,error}=useQuery({
        queryKey: ["user-data"],
        queryFn: getUserByToken
    }) 

    
    if(isSuccess){
        if(data.data.data.role=="ADMIN" || data.data.data.role==role ){
            return <Outlet />
        }
        else{
            return <h1>Anda tidak memiliki akses</h1>
        }
    }
    else{
        if(error){
            return <Login />
        }

    }
}
