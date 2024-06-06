import api from "../../utils/api";
import { Trash } from "./types";

export const getAllTrashes = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data:Trash[]}>("/sampah", {
    params: {
        page, limit, orderBy, typeOfOrder: (typeOfOrder ? "asc" : "desc")
    }
})

export const getExcelTrashes = () => api.get("/download-excel-sampah")

