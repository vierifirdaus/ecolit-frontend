import { z } from "zod";
import { QuickCountThinwalSchema } from "./schemas";

export type QuickCountThinwalData = z.infer<typeof QuickCountThinwalSchema>