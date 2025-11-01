import { z } from 'zod'
import {LOCALES} from "@/src/enums/locale";

export const AdminTransportRequirementsVerificationSchema = z.object({
    locale: z.enum(LOCALES),
    requirementsId: z.coerce.number(),
    description: z.string(),
    verified: z.boolean()
}).strict();