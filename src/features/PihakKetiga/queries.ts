import api from "../../utils/api";
import { PihakKetiga } from "./types";

export const getAllPihakKetiga = (page: number, limit: number, orderBy: string, typeOfOrder: boolean, filter: string) => api.get<{data:PihakKetiga[]}>("/pihak-ketiga",
    {
        params: {
            page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc", name: filter
        }
    }
)