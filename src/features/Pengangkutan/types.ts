import { z } from "zod";
import { PengangkutanSchema, CreatePengangkutanSchema, EditPengangkutanSchema } from "./schemas";

export type Pengangkutan = z.infer<typeof PengangkutanSchema>

export type CreatePengangkutan = z.infer<typeof CreatePengangkutanSchema> & {surat_jalan: FileList}
export type EditPengangkutan = z.infer<typeof EditPengangkutanSchema>