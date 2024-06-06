import api from "../../../utils/api";
import { CreatePengangkutanSampahResidu, PengangkutanSampahResidu } from "./types";

export const createSampahResidu = (data: CreatePengangkutanSampahResidu) => api.post("/sampah-residu", data)
export const editSampahResidu = (data: PengangkutanSampahResidu) => api.put("/sampah-residu", data)
export const deleteSampahResidu = (id: string) => api.delete(`/sampah-residu/${id}`)