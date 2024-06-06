import api from "../../utils/api";
import { ReportWadah } from "./types";

export const getReportKolaborator = (nama: string, page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data: ReportWadah[]}>("/qurban", {
    params: {
        nama, page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})