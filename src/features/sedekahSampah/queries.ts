import api from "../../utils/api";
import { SedekahSampah } from "./types";

export const getSedekahSampahs = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data: SedekahSampah[]}>("/sedekah-sampah", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})