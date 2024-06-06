import api from "../../utils/api";
import { CreateUser, User } from "./types";

export const createUser = (data: CreateUser) => api.post("/register", data)

export const editUser = (data: User) => api.put("/update", data)

export const deleteUser = (id: string) => api.delete(`/delete/${id}`)