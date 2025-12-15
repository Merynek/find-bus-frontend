import { z } from 'zod'
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";
import {PlaceSchema} from "@/src/forms-action/Schemas";
import {FormActionEnum} from "@/src/enums/form-action.enum";

export const VehicleSchema = z.object({
    locale: z.enum(LOCALES),
    vehicleId: z.coerce.number(),
    name: z.string().optional(),
    personsCapacity: z.coerce.number().optional(),
    euro: z.enum(EuroStandard, { message: "Neplatný Euro standard." }).optional(),
    amenities: z.array(z.enum(Amenities, { message: "Neplatné vybavení." })).optional(),
    handicappedUserCount: z.coerce.number().optional(),
    vin: z.string().optional(),
    registrationSign: z.string().optional(),
    stkExpired: z.date().optional(),
    yearOfManufacture: z.number().int().min(1900, "Neplatný rok výroby.").max(new Date().getFullYear() + 1, "Rok výroby nesmí být v budoucnosti.").optional(),
    departureStation: PlaceSchema.optional(),
    formActionType: z.enum(FormActionEnum)
}).strict();