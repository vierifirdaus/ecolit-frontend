import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavbarLandingPage from "../../../assets/ui/Navbar_Landing_Page";
import { Button } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import { getAllKolaborator, getAllSampah, getQurban } from '../queries';

export default function LandingPage() {
    const reportSampah = {
        totalSampah:-1,
        totalTrashBag:-1,
        sampahMaxHaria:-1,
        sampahDaurUlang:-1
    }
    const reportQurban = {
        totalWadahQurban:-1,
        totalWadahBesek:-1,
        totalWadahThinwall:-1,
        totalKolaborator:-1
    }
    const {data:dataSampah, isSuccess:isDataSampahSuccess} = useQuery({
        queryKey: ["sampah"],
        queryFn: () => getAllSampah()
    })

    const {data:dataQurban, isSuccess:isDataQurbanSuccess} = useQuery({
        queryKey: ["qurban"],
        queryFn: () => getQurban()
    })

    const {data:dataKolaborator, isSuccess:isDataKolaboratorSuccess} = useQuery({
        queryKey: ["kolaborator"],
        queryFn: () => getAllKolaborator()
    })

    if(isDataQurbanSuccess){
        console.log("a",dataQurban.data.data)
        reportQurban.totalWadahBesek=0
        reportQurban.totalWadahThinwall=0
        for(let i=0 ; i<dataQurban.data.data.length; i++){
            // console.log("ini data qurban",dataQurban.data.data[i])
            reportQurban.totalWadahBesek += (dataQurban.data.data[i].ukuran_12+dataQurban.data.data[i].ukuran_14+dataQurban.data.data[i].ukuran_16+dataQurban.data.data[i].ukuran_18+dataQurban.data.data[i].ukuran_20)
            reportQurban.totalWadahThinwall += dataQurban.data.data[i].ukuran_650+dataQurban.data.data[i].ukuran_700+dataQurban.data.data[i].ukuran_750+dataQurban.data.data[i].ukuran_800+dataQurban.data.data[i].ukuran_900+dataQurban.data.data[i].ukuran_1000+dataQurban.data.data[i].ukuran_1500+dataQurban.data.data[i].ukuran_2000+dataQurban.data.data[i].ukuran_3000
        }
        reportQurban.totalWadahQurban = reportQurban.totalWadahBesek + reportQurban.totalWadahThinwall
    }

    if(isDataSampahSuccess){
        console.log("b",dataSampah.data.data)
        reportSampah.totalSampah = 0
        reportSampah.totalTrashBag = 0
        reportSampah.sampahMaxHaria = 0
        reportSampah.sampahDaurUlang = 0
        for(let i=0 ; i<dataSampah.data.data.length; i++){
            reportSampah.totalSampah += dataSampah.data.data[i].total
            reportSampah.totalTrashBag += dataSampah.data.data[i].trashbag

            if(reportSampah.sampahMaxHaria < dataSampah.data.data[i].total){
                reportSampah.sampahMaxHaria = dataSampah.data.data[i].total
            }
            reportSampah.sampahDaurUlang += (dataSampah.data.data[i].organik_sisa+dataSampah.data.data[i].organik_kebun+dataSampah.data.data[i].organik_cacah)
        }
    }

    if(isDataKolaboratorSuccess){
        reportQurban.totalKolaborator = dataKolaborator.data.data.length
    }

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div className="flex flex-col min-w-screen h-screen">
            <nav className="w-screen h-max">
                <NavbarLandingPage />
            </nav>
            <main className="w-screen h-full">
                <section className="flex flex-col h-full justify-between bg-[url('../../../../public/FotoLandingPage.svg')] bg-cover bg-no-repeat px-20 pt-20 pb-40">
                    <div className="flex flex-col gap-8 ">
                        <h1 className="text-[#967C55] font-bold text-4xl">Pengelolaan Sampah dan Pengelolaan Wadah Qurban</h1>
                        <h2 className="text-[#967C55] font-semibold text-3xl">Masjid Salman ITB</h2>
                        <span className="text-white font-normal text-2xl">Jl. Ganesha No. 7 Bandung - 401322</span>
                    </div>
                    <div>
                        <Button color="primary" className="text-white px-4 py-2">Daftar Sebagai Kolaborator</Button>
                    </div>
                </section>
                <section id="pengelolaan-sampah" className="h-screen p-20">
                    <div className="flex flex-col gap-4 w-full h-full">
                        <div className="flex flex-col justify-center items-center gap-7 text-center h-[50%] rounded-xl bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                            <h1 className="font-semibold text-3xl">Pengelolaan Sampah</h1>
                            <span className="max-w-2xl">Mendata dan mengelola sampah di sekitar Masjid Salman ITB secara komprehensif dapat membantu pihak pengelola merancang strategi penanganan sampah yang efektif demi mewujudkan lingkungan masjid yang bersih dan lestari.</span>
                            <Button color="primary" className="text-white px-4 py-2">Daftar Sebagai Kolaborator</Button>
                        </div>
                        <div className="flex justify-between gap-4 w-full h-[50%]">
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataSampahSuccess ? reportSampah.totalSampah+"Kg" : "Loading..."
                                }
                                </h1>
                                <span className="text-md max-w-40 text-center">Total Sampah Dikelola</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataSampahSuccess ? reportSampah.totalTrashBag : "Loading..."
                                }
                                </h1>
                                <span className="text-md max-w-40 text-center">Total Trash bag Diangkut</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataSampahSuccess ? reportSampah.sampahMaxHaria+"Kg" : "Loading..."
                                
                                }</h1>
                                <span className="text-md max-w-40 text-center">Sampah Harian Terbanyak</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataSampahSuccess ? reportSampah.sampahDaurUlang+"Kg" : "Loading..."
                                }</h1>
                                <span className="text-md max-w-40 text-center">Sampah Daur Ulang yang Dikelola</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="wadah-qurban" className="h-screen p-20">
                    <div className="flex flex-col gap-4 w-full h-full">
                        <div className="flex flex-col justify-center items-center gap-7 text-center h-[50%] rounded-xl bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                            <h1 className="font-semibold text-3xl">Pengelolaan Wadah Qurban</h1>
                            <span className="max-w-2xl">Mendata dan mengelola wadah qurban Masjid Salman ITB secara komprehensif. Bekerjasama dengan para kolaborator, pengelolaan wadah qurban dapat membantu sedekah daging qurban pada saat idul adha nanti.</span>
                            <Button color="primary" className="text-white px-4 py-2">Daftar Sebagai Kolaborator</Button>
                        </div>
                        <div className="flex justify-between gap-4 w-full h-[50%]">
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataQurbanSuccess ? reportQurban.totalWadahQurban+" Pcs" : "Loading..."
                                }</h1>
                                <span className="text-md max-w-40 text-center">Total Wadah Qurban yang Terdata</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataQurbanSuccess ? reportQurban.totalWadahBesek+" Pcs" : "Loading..."
                                }</h1>
                                <span className="text-md max-w-40 text-center">Total Wadah Besek Terdata</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataQurbanSuccess ? reportQurban.totalWadahThinwall+" Pcs" : "Loading..."
                                }</h1>
                                <span className="text-md max-w-40 text-center">Total Wadah Thinwall Terdata</span>
                            </div>
                            <div className="flex flex-col py-16 justify-between items-center rounded-xl w-full bg-gradient-to-r from-[#967C55] to-[#F1D2A5]">
                                <h1 className="font-semibold text-3xl">{
                                    isDataKolaboratorSuccess ? reportQurban.totalKolaborator : "Loading..."
                                }</h1>
                                <span className="text-md max-w-40 text-center">Total Kolaborator Wadah Qurban</span>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="flex flex-col justify-between min-h-80 border-2 border-black w-screen bg-[#282828]">
                    <div className="h-full"></div>
                    <div className="bg-[#151515] min-h-10"></div>
                </footer>
            </main>
        </div>
    );
}
