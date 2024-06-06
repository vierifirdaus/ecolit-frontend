import api from "../../../utils/api";
import { TotalPenanganan } from "./types";

export const getTrashesByMonth = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data:TotalPenanganan[]}>("/total-penanganan-sampah", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})