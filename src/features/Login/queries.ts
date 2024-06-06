import api from "../../utils/api";

export const getUserByToken = () => api.get("/user-token")

export const getNotif = () => api.get("/log-activity")

