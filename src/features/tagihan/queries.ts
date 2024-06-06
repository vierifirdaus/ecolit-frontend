import api from "../../utils/api";
import { TagihanData } from "./types";

export const getTagihans = (page: number, limit: number, orderBy: string, typeOfOrder: boolean, filter: string) => api.get<{data:TagihanData[]}>("/tagihan", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc", status: filter
    }
})