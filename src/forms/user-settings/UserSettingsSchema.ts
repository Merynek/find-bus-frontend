import { z } from 'zod'
import { NotificationsEnum } from "@/src/api/openapi";
import {
    imageFileSchema,
    TransferInfoSchema,
    UserAddressSchema
} from "@/src/app/actions/forms/schemas";

export const UserSettingsSchema = z.object({
    name: z.string().min(2, "Name je vyžadováno.").nullable().optional(),
    surname: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    ico: z.string().nullable().optional(),
    dic: z.string().nullable().optional(),
    companyName: z.string().nullable().optional(),
    isCompany: z.boolean().nullable().optional(),
    notifications: z.array(z.nativeEnum(NotificationsEnum)).nullable().optional(),
    address: UserAddressSchema.partial().nullable().optional(),
    mailingAddress: UserAddressSchema.partial().nullable().optional(),
    transferInfo: TransferInfoSchema.partial().nullable().optional(),
    concessionNumber: z.string().nullable().optional(),
    businessRiskInsurance: imageFileSchema.nullable().optional(),
    concessionDocuments: imageFileSchema.nullable().optional()
});