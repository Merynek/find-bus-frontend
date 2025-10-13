import { z } from 'zod'
import { NotificationsEnum } from "@/src/api/openapi";
import {ImageFileSchema, UserAddressSchema} from "@/src/forms-action/Schemas";

export const UserSettingsSchema = z.object({
    name: z.string().min(2, "Name je vyžadováno.").optional(),
    surname: z.string().optional(),
    phoneNumber: z.string().optional(),
    ico: z.string().optional(),
    dic: z.string().optional(),
    companyName: z.string().optional(),
    isCompany: z.boolean().optional(),
    notifications: z.array(z.enum(NotificationsEnum)).optional(),
    address: UserAddressSchema.partial().optional(),
    mailingAddress: UserAddressSchema.partial().optional(),
    iban: z.string().optional(),
    swift: z.string().optional(),
    concessionNumber: z.string().optional(),
    businessRiskInsurance: ImageFileSchema.nullable().optional(),
    concessionDocuments: ImageFileSchema.nullable().optional()
});