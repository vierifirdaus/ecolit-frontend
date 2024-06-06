import api from "../../utils/api";
import { Pengangkutan } from "./types";

export const getAllPengangkutan = (page: number, limit: number, orderBy: string, typeOfOrder: boolean, filter: string) => api.get<{data:Pengangkutan[]}>("/pengangkutan",
    {
        params: {
            page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc", status: filter
        }
    }
)