import { z } from "zod";
import { PemilihanMandiriSchema } from "./schemas";

export type PemilihanMandiri = z.infer<typeof PemilihanMandiriSchema>