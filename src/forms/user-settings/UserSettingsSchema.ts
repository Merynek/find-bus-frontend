import { z } from 'zod'
import { NotificationsEnum } from "@/src/api/openapi";
import {ImageFileSchema, TransferInfoSchema, UserAddressSchema} from "@/src/forms/Schemas";

export const UserSettingsSchema = z.object({
    name: z.string().min(2, "Name je vyžadováno.").optional(),
    surname: z.string().optional(),
    phoneNumber: z.string().optional(),
    ico: z.string().optional(),
    dic: z.string().optional(),
    companyName: z.string().optional(),
    isCompany: z.boolean().optional(),
    notifications: z.array(z.nativeEnum(NotificationsEnum)).optional(),
    address: UserAddressSchema.partial().optional(),
    mailingAddress: UserAddressSchema.partial().optional(),
    transferInfo: TransferInfoSchema.partial().optional(),
    concessionNumber: z.string().optional(),
    businessRiskInsurance: ImageFileSchema.nullable().optional(),
    concessionDocuments: ImageFileSchema.nullable().optional()
});