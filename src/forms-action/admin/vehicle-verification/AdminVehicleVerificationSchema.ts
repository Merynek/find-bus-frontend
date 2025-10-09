import { z } from 'zod'
import {LOCALES} from "@/src/enums/locale";

export const AdminVehicleVerificationSchema = z.object({
    locale: z.enum(LOCALES),
    vehicleId: z.coerce.number(),
    feedback: z.string(),
    isApproved: z.boolean()
}).strict();