import { z } from 'zod'
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {imageFileSchema, placeSchema} from "@/src/app/actions/forms/schemas";

export const VehiclePhotoSchema = z.object({
    frontPhoto: imageFileSchema,
    rearPhoto: imageFileSchema,
    leftSidePhoto: imageFileSchema,
    rightSidePhoto: imageFileSchema,
    interierPhoto1: imageFileSchema,
    interierPhoto2: imageFileSchema,
    technicalCertificate1: imageFileSchema,
    technicalCertificate2: imageFileSchema,
    insurance: imageFileSchema,
}).strict();

export const VehicleCoreSchema = z.object({
    name: z.string().min(2, "Název vozidla musí mít alespoň 2 znaky."),
    personsCapacity: z.number().int().min(1, "Kapacita osob musí být alespoň 1."),
    euro: z.nativeEnum(EuroStandard, { message: "Neplatný Euro standard." }),
    amenities: z.array(z.nativeEnum(Amenities, { message: "Neplatné vybavení." })).default([]),
    handicappedUserCount: z.number().int().min(0, "Počet handicapovaných uživatelů nesmí být záporný."),
    vin: z.string().length(17, "VIN musí mít přesně 17 znaků.").regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Neplatný formát VIN."),
    registrationSign: z.string().min(5, "Registrační značka je vyžadována.").max(10, "Registrační značka je příliš dlouhá."),
    stkExpired: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
    }, z.date({ message: "Datum expirace STK je vyžadováno." }).min(new Date(), "Datum expirace STK nesmí být v minulosti.")),
    yearOfManufacture: z.number().int().min(1900, "Neplatný rok výroby.").max(new Date().getFullYear() + 1, "Rok výroby nesmí být v budoucnosti."),
    departureStation: placeSchema.optional()
}).strict();

export const AddVehicleSchema = VehicleCoreSchema.extend(
    VehiclePhotoSchema.shape
).strict();