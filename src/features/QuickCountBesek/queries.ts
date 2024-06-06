import api from "../../utils/api";
import { QuickCountBesekData } from "./types";

export const getBeseks = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{
    data: any;values: QuickCountBesekData[]
}>("/qurban", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})

export const seed = () => api.get("/seed-excel")