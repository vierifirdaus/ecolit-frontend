import api from "../../utils/api";
import { Kolaborator } from "./types";

export const getKolaborators = (nama: string, page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data: Kolaborator[]}>("/kolaborator-qurban", {
    params: {
        nama, page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})