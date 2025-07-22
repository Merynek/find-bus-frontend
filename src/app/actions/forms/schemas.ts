import {z} from "zod";
import {Country} from "@/src/api/openapi";

export const geoPointSchema = z.object({
    lat: z.number(),
    lng: z.number(),
});

export const placeSchema = z.object({
    placeId: z.string().min(1, "ID místa je vyžadováno."),
    point: geoPointSchema, // Validace pro GeoPoint
    country: z.nativeEnum(Country, { message: "Neplatná země." }), // Použijte z.nativeEnum pro validaci enum
    name: z.string().min(1, "Název místa je vyžadován."),
    placeFormatted: z.string().min(1, "Formátovaný název místa je vyžadován."),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const imageFileSchema = z.instanceof(File, { message: "Soubor je vyžadován." })
    .refine((file) => file.size > 0, { message: "Soubor nemůže být prázdný." })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `Velikost souboru musí být menší než ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Podporovány jsou pouze formáty .jpg, .png a .webp.",
    });


export const UserAddressSchema = z.object({
    country: z.nativeEnum(Country),
    city: z.string().nullable(),
    psc: z.string().nullable(),
    street: z.string().nullable(),
    houseNumber: z.string().nullable()
});

export const TransferInfoSchema = z.object({
    iban: z.string().nullable(),
    swift: z.string().nullable()
});