import api from "../../utils/api";
import { CreateSedekahSampah, SedekahSampah } from "./types";

export const createSedekahSampah = (data: CreateSedekahSampah) => api.post("/sedekah-sampah", data)
export const editSedekahSampah = (data: SedekahSampah) => api.put("/sedekah-sampah", data)
export const deleteSedekahSampah = (id: string) => api.delete(`/sedekah-sampah/${id}`)