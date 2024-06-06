import api from "../../utils/api";

export const createPengangkutan = (data: FormData) => api.post("/pengangkutan", data)
export const editPengangkutan = (data: FormData) => api.put("/pengangkutan", data)
export const deletePengangkutan = (id: string) => api.delete(`/pengangkutan/${id}`)