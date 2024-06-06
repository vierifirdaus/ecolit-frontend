import api from "../../../utils/api";
import { PemilihanMandiri } from "./types";

export const getTrashesSalman = (page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data:PemilihanMandiri[]}>("/total-pemilihan-sampah", {
    params: {
        page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})