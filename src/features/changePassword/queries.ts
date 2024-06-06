import api from "../../utils/api";

export const getData = (id: string) => api.get("/change-password", {
    params: {
        id
    }
})