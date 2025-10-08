import { z } from 'zod'
import {LOCALES} from "@/src/enums/locale";
import {ImageFileSchema} from "@/src/forms-action/Schemas";

const VehicleCoreSchema = z.object({
    vehicleId: z.coerce.number(),
    photoFiles: z.array(ImageFileSchema).optional(),
    photoIds: z.array(z.number()).optional(),
    photoIdsToDelete: z.array(z.number()).optional(),
}).strict();

export const AdminVehicleSchema = z.object({
    locale: z.enum(LOCALES)
})
    .extend(VehicleCoreSchema.shape)
    .strict();