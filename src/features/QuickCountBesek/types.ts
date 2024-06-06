import { z } from "zod";
import { QuickCountBesekSchema } from "./schemas";

export type QuickCountBesekData = z.infer<typeof QuickCountBesekSchema>