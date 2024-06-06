import api from "../../utils/api";

export const getAllSampah = () => api.get("/sampah?page=1&limit=10000000")

export const getQurban = () => api.get("/qurban?page=1&limit=10000000")

export const getAllKolaborator = () => api.get("/kolaborator-qurban")