import api from "../../utils/api";

export const editTagihan = (data: FormData) => api.put("/tagihan", data)
