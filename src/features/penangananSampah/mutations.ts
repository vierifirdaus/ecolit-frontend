import api from "../../utils/api";
import { CreateTrash, Trash } from "./types";

export const createTrash = (data: CreateTrash) => api.post("/sampah", data)
export const editTrash = (data: Trash) => api.put("/sampah", data)
export const deleteTrash = (id: string) => api.delete(`/sampah/${id}`)