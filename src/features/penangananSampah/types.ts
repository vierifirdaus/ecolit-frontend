import { z } from "zod";
import { CreateTrashSchema, TrashSchema } from "./schemas";

export type Trash = z.infer<typeof TrashSchema>

export type CreateTrash =z.infer<typeof CreateTrashSchema>