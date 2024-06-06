import { z } from "zod";
import { CreateKolaboratorSchema, KolaboratorSchema } from "./schemas";

export type CreateKolaborator = z.infer<typeof CreateKolaboratorSchema>
export type Kolaborator = z.infer<typeof KolaboratorSchema>