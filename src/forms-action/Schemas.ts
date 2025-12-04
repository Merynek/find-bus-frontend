import {z} from "zod";
import {Country} from "@/src/api/openapi";

export const RequiredStringSchema = z.string().min(1, {message: "required"});

export const RequiredBooleanSchema = z.boolean({message: "required"});

export const GeoPointSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

export const PlaceSchema = z.object({
    placeId: RequiredStringSchema,
    point: GeoPointSchema,
    country: z.enum(Country, { message: "Neplatná země." }), // Použijte z.enum pro validaci enum
    name: RequiredStringSchema,
    city: RequiredStringSchema,
    placeFormatted: RequiredStringSchema,
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ImageFileSchema = z.instanceof(File, { message: "Soubor je vyžadován." })
    .refine((file) => file.size > 0, { message: "Soubor nemůže být prázdný." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `Velikost souboru musí být menší než ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Podporovány jsou pouze formáty .jpg, .png a .webp.",
    });

export const UserAddressSchema = z.object({
    country: z.enum(Country),
    city: RequiredStringSchema,
    psc: RequiredStringSchema,
    street: RequiredStringSchema,
    houseNumber: RequiredStringSchema
});

export const UserFinancialSettingsSchema = z.object({
    name: RequiredStringSchema,
    surname: RequiredStringSchema,
    ico: RequiredStringSchema,
    dic: RequiredStringSchema,
    companyName: RequiredStringSchema,
    isCompany: RequiredBooleanSchema,
    address: UserAddressSchema,
    mailingAddress: UserAddressSchema,
    iban: z.string().optional(),
    swift: z.string().optional(),
});