import { z } from 'zod'
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {LOCALES} from "@/src/utils/locale";
import {ImageFileSchema, PlaceSchema} from "@/src/forms/Schemas";

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
    vehicleId: z.number().int().min(1, "ID vozidla je vyžadováno.").optional(),
    name: z.string().min(2, "Název vozidla musí mít alespoň 2 znaky.").optional(),
    personsCapacity: z.coerce.number().int().min(1, "Kapacita osob musí být alespoň 1.").optional(),
    euro: z.nativeEnum(EuroStandard, { message: "Neplatný Euro standard." }).optional(),
    amenities: z.array(z.nativeEnum(Amenities, { message: "Neplatné vybavení." })).default([]).optional(),
    handicappedUserCount: z.coerce.number().int().min(0, "Počet handicapovaných uživatelů nesmí být záporný.").optional(),
    vin: z.string().length(17, "VIN musí mít přesně 17 znaků.").regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Neplatný formát VIN.").optional(),
    registrationSign: z.string().min(5, "Registrační značka je vyžadována.").max(10, "Registrační značka je příliš dlouhá.").optional(),
    stkExpired: z.coerce.date({ message: "Datum expirace STK je vyžadováno." }).min(new Date(), "Datum expirace STK nesmí být v minulosti.").optional(),
    yearOfManufacture: z.coerce.number().int().min(1900, "Neplatný rok výroby.").max(new Date().getFullYear() + 1, "Rok výroby nesmí být v budoucnosti.").optional(),
    departureStation: PlaceSchema.optional()
}).strict();

export const VehicleSchema = z.object({
    locale: z.nativeEnum(LOCALES)
})
    .extend(VehicleCoreSchema.shape)
    .extend(VehiclePhotoSchema.shape)
    .strict();