import {z} from "zod";
import {Country} from "@/src/api/openapi";

export const parseAndNormalizeFormData = (formData: FormData, arrayFields: string[] = []): Record<string, string | File | (string | File)[] | undefined> => {
    const data: Record<string, string | File | (string | File)[] | undefined> = {};
    const processedKeys = new Set<string>();

    for (const key of arrayFields) {
        data[key] = formData.getAll(key);
        processedKeys.add(key);
    }

    for (const [key, value] of formData.entries()) {
        if (processedKeys.has(key)) {
            continue;
        }

        if (value === null || (typeof value === 'string' && value.trim() === '')) {
            data[key] = undefined;
        } else if (value instanceof File && value.size === 0) {
            data[key] = undefined;
        } else {
            data[key] = value;
        }
    }

    return data;
};

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

export const optionalImageFileSchema = z.preprocess((val) => {
    if (val instanceof File && val.size === 0) {
        return undefined;
    }
    return val;
}, imageFileSchema.optional());

export const UserAddressSchema = z.object({
    country: z.nativeEnum(Country),
    city: z.string(),
    psc: z.string(),
    street: z.string(),
    houseNumber: z.string()
});

export const TransferInfoSchema = z.object({
    iban: z.string(),
    swift: z.string()
});

export const formDataToObject = (formData: FormData) => {
    const data: Record<string, unknown> = {};

    for (const [key, value] of formData.entries()) {
        const isArray = key.endsWith('[]');
        const sanitizedKey = isArray ? key.slice(0, -2) : key;

        if (isArray) {
            data[sanitizedKey] = formData.getAll(key);
        } else {
            data[sanitizedKey] = value;
        }
    }
    return data;
}