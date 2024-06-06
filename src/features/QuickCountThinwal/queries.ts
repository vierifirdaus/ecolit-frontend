import api from "../../utils/api";
import { QuickCountThinwalData } from "./types";

export const getThinwals = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{
    data: any;values: QuickCountThinwalData[]
}>("/qurban", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})