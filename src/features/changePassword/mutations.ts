import api from "../../utils/api";
import { DataChangePassword } from "./types";

export const putChangePassword = (data: DataChangePassword) => api.put("/change-password", data)
