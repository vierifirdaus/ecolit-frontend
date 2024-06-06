import api from "../../../utils/api";
import { PengangkutanSampahResidu } from "./types";

export const getAllSampahResidu = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data:PengangkutanSampahResidu[]}>("/sampah-residu",
    {
        params: {
            page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
        }
    }
)