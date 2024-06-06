import api from "../../utils/api";
import { ReportWadah } from "./types";

export const editReportWadah = (data: ReportWadah) => api.put(`/qurban/${data.id}`, data)