import api from "../../utils/api";
import { CreateKolaborator, Kolaborator } from "./types";

export const createKolaborator = (data: CreateKolaborator) => api.post("/kolaborator-qurban", data)
export const editKolaborator = (data: Kolaborator) => api.put("/kolaborator-qurban", data)
export const deleteKolaborator = (id: string) => api.delete(`/kolaborator-qurban/${id}`)