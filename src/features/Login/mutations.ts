import api from "../../utils/api";
import { Data, DataLogin } from "./types";

export const postData = (data: Data) => api.post("/login", data)

export const login = (data: DataLogin) => api.post("/login",data)