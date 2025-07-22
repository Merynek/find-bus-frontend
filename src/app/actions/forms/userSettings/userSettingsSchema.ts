import { z } from 'zod'
import {NotificationsEnum} from "@/src/api/openapi";
import {TransferInfoSchema, UserAddressSchema} from "@/src/app/actions/forms/schemas";

export const UserSettingsSchema = z.object({
    name: z.string().nullable().optional(),
    surname: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    ico: z.string().nullable().optional(),
    dic: z.string().nullable().optional(),
    companyName: z.string().nullable().optional(),
    isCompany: z.boolean().optional(),
    notifications: z.array(z.nativeEnum(NotificationsEnum)).nullable().optional(),
    address: UserAddressSchema.partial().optional(),
    mailingAddress: UserAddressSchema.partial().optional(),
    transferInfo: TransferInfoSchema.partial().optional(),
    concessionNumber: z.string().nullable().optional(),
});