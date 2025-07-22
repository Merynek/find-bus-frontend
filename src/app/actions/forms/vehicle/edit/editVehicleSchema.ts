import { z } from 'zod'
import {
    VehicleCoreSchema,
    VehiclePhotoSchema
} from "@/src/app/actions/forms/vehicle/add/addVehicleSchema";

export const EditVehicleSchema = z.object({
    vehicleId: z.number().int().min(1, "ID vozidla je vyžadováno."),
})
    .extend(VehicleCoreSchema.shape)
    .extend(VehiclePhotoSchema.partial().shape)
    .strict();