import { z } from "zod";
import { TagihanSchema, CreateTagihanSchema } from "./schemas";

export type TagihanData = z.infer<typeof TagihanSchema>
export type CreateTagihan = z.infer<typeof CreateTagihanSchema>