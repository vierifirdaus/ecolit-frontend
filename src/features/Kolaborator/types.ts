import { z } from "zod";
import { ReportWadahSchema } from "./schemas";

export type ReportWadah = z.infer<typeof ReportWadahSchema>