import api from "../../utils/api";
import { CreatePihakKetiga, PihakKetiga } from "./types";

export const createPihakKetiga = (data: CreatePihakKetiga) => api.post("/pihak-ketiga", data)
export const editPihakKetiga = (data: PihakKetiga) => api.put("/pihak-ketiga", data)
export const deletePihakKetiga = (id: string) => api.delete(`/pihak-ketiga/${id}`)