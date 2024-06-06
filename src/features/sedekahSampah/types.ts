import { z } from "zod";
import { CreateSedekahSampahSchema, SedekahSampahSchema } from "./schemas";

export type SedekahSampah = z.infer<typeof SedekahSampahSchema>
export type CreateSedekahSampah =z.infer<typeof CreateSedekahSampahSchema>