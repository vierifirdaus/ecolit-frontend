import { z } from "zod";
import { TotalPenangananSchema } from "./schemas";

export type TotalPenanganan = z.infer<typeof TotalPenangananSchema>