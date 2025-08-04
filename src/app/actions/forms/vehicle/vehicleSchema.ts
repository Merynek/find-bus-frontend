import { z } from 'zod'
import {Amenities, EuroStandard} from "@/src/api/openapi";
import {imageFileSchema, placeSchema} from "@/src/app/actions/forms/schemas";

const vehiclePhotoSchema = z.object({
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

const vehicleCoreSchema = z.object({
    name: z.string().min(2, "Název vozidla musí mít alespoň 2 znaky."),
    personsCapacity: z.coerce.number().int().min(1, "Kapacita osob musí být alespoň 1."),
    euro: z.nativeEnum(EuroStandard, { message: "Neplatný Euro standard." }),
    amenities: z.array(z.nativeEnum(Amenities, { message: "Neplatné vybavení." })).default([]),
    handicappedUserCount: z.coerce.number().int().min(0, "Počet handicapovaných uživatelů nesmí být záporný."),
    vin: z.string().length(17, "VIN musí mít přesně 17 znaků.").regex(/^[A-HJ-NPR-Z0-9]{17}$/, "Neplatný formát VIN."),
    registrationSign: z.string().min(5, "Registrační značka je vyžadována.").max(10, "Registrační značka je příliš dlouhá."),
    // Zod umí sám převést string na Date
    stkExpired: z.coerce.date({ message: "Datum expirace STK je vyžadováno." }).min(new Date(), "Datum expirace STK nesmí být v minulosti."),
    yearOfManufacture: z.coerce.number().int().min(1900, "Neplatný rok výroby.").max(new Date().getFullYear() + 1, "Rok výroby nesmí být v budoucnosti."),
    departureStation: placeSchema
}).strict();

export const VehicleSchema = z.object({}).extend(vehicleCoreSchema.partial().shape)
    .extend(vehiclePhotoSchema.partial().shape)
    .strict();

export const EditVehicleSchema = VehicleSchema.extend({
    vehicleId: z.coerce.number().int().min(1, "ID vozidla je vyžadováno."),
}).strict();