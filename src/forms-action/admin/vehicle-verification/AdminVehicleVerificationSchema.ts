import { z } from 'zod'
import {LOCALES} from "@/src/enums/locale";

export const AdminVehicleVerificationSchema = z.object({
    locale: z.enum(LOCALES),
    vehicleId: z.coerce.number(),
    description: z.string(),
    verified: z.boolean()
}).strict();