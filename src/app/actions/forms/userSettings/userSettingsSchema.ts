import { z } from 'zod'
import {NotificationsEnum} from "@/src/api/openapi";
import {
    imageFileSchema, optionalImageFileSchema,
    TransferInfoSchema,
    UserAddressSchema
} from "@/src/app/actions/forms/schemas";

const UserSettingsSchema = z.object({
    name: z.string(),
    surname: z.string(),
    phoneNumber: z.string(),
    ico: z.string(),
    dic: z.string(),
    iban: z.string(),
    swift: z.string(),
    companyName: z.string(),
    isCompany: z.boolean(),
    notifications: z.array(z.nativeEnum(NotificationsEnum)),
    address: UserAddressSchema,
    mailingAddress: UserAddressSchema,
    transferInfo: TransferInfoSchema,
    concessionNumber: z.string(),
    businessRiskInsurance: imageFileSchema,
    concessionDocuments: imageFileSchema
});

export const OptionalUserSettingsSchema = UserSettingsSchema
    .partial()
    .extend({
        businessRiskInsurance: optionalImageFileSchema,
        concessionDocuments: optionalImageFileSchema,
    });