import { z } from 'zod'
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {LOCALES} from "@/src/enums/locale";
import {ImageFileSchema, PlaceSchema} from "@/src/forms-action/Schemas";

const VehiclePhotoSchema = z.object({
    frontPhoto: ImageFileSchema.nullable().optional(),
    rearPhoto: ImageFileSchema.nullable().optional(),
    leftSidePhoto: ImageFileSchema.nullable().optional(),
    rightSidePhoto: ImageFileSchema.nullable().optional(),
    interierPhoto1: ImageFileSchema.nullable().optional(),
    interierPhoto2: ImageFileSchema.nullable().optional(),
    technicalCertificate1: ImageFileSchema.nullable().optional(),
    technicalCertificate2: ImageFileSchema.nullable().optional(),
    insurance: ImageFileSchema.nullable().optional()
}).strict();

const VehicleCoreSchema = z.object({
    vehicleId: z.coerce.number(),
    name: z.string().optional(),
    personsCapacity: z.coerce.number().optional(),
    euro: z.enum(EuroStandard, { message: "Neplatný Euro standard." }).optional(),
    amenities: z.array(z.enum(Amenities, { message: "Neplatné vybavení." })).optional(),
    handicappedUserCount: z.coerce.number().optional(),
    vin: z.string().optional(),
    registrationSign: z.string().optional(),
    stkExpired: z.date({ message: "Datum expirace STK je vyžadováno." }).min(new Date(), "Datum expirace STK nesmí být v minulosti.").optional(),
    yearOfManufacture: z.number().int().min(1900, "Neplatný rok výroby.").max(new Date().getFullYear() + 1, "Rok výroby nesmí být v budoucnosti.").optional(),
    departureStation: PlaceSchema.optional()
}).strict();

export const VehicleSchema = z.object({
    locale: z.enum(LOCALES)
})
    .extend(VehicleCoreSchema.shape)
    .extend(VehiclePhotoSchema.shape)
    .strict();