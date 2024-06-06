import api from "../../utils/api";
import { User } from "./types";

export const getAllUsers = (nama: string, page: number, limit: number, orderBy: string, typeOfOrder: boolean) => api.get<{data: User[]}>("/users", {
    params: {
        nama, page, limit, orderBy, typeOfOrder: typeOfOrder ? "asc" : "desc"
    }
})