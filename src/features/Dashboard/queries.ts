import api from "../../utils/api";

export const getDataPenangananSampah = () => api.get("/sampah?page=1&limit=5&orderBy=date&typeOfOrder=desc")

export const getDataRekapMitra = () => api.get("/sampah-residu?page=1&limit=5&orderBy=date&typeOfOrder=desc")

export const getHasilPemilahanMandiri = () => api.get("/total-pemilihan-sampah")

export const getWadahKolaborator = () => api.get("/count-wadah")

export const getReportWadah = () => api.get("/report-wadah")

export const getReportWadahReal = () => api.get("/report-wadah?status=real")

export const getDataKolaborator = () => api.get("/kolaborator-qurban")