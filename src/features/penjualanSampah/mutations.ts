import api from "../../utils/api";
import { CreatePenjualan, Penjualan } from "./types";

export const createPenjualan = (data: CreatePenjualan) => api.post("/penjualan-sampah", data)
export const editPenjualan = (data: Penjualan) => api.put("/penjualan-sampah", data)
export const deletePenjualan = (id: string) => api.delete(`/penjualan-sampah/${id}`)
