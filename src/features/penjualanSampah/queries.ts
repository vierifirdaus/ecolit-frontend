import api from "../../utils/api";
import { Penjualan } from "./types";

export const getPenjualans = (date: string, page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data:Penjualan[]}>("/penjualan-sampah", {
    params: {
        date, page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})