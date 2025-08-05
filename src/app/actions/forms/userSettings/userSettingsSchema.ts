import { z } from 'zod'
import {Country, NotificationsEnum} from "@/src/api/openapi";
import {
    imageFileSchema,
    parseAndNormalizeFormData,
    TransferInfoSchema,
    UserAddressSchema
} from "@/src/app/actions/forms/schemas";
import {FormDataEnum} from "@/src/enums/form-data.enum";

export const UserSettingsSchema = z.object({
    name: z.string().nullable().optional(),
    surname: z.string().nullable().optional(),
    phoneNumber: z.string().nullable().optional(),
    ico: z.string().nullable().optional(),
    dic: z.string().nullable().optional(),
    iban: z.string().nullable().optional(),
    swift: z.string().nullable().optional(),
    companyName: z.string().nullable().optional(),
    isCompany: z.boolean().optional(),
    notifications: z.array(z.nativeEnum(NotificationsEnum)).nullable().optional(),
    address: UserAddressSchema.partial().optional(),
    mailingAddress: UserAddressSchema.partial().optional(),
    transferInfo: TransferInfoSchema.partial().optional(),
    concessionNumber: z.string().nullable().optional(),
    businessRiskInsurance: imageFileSchema.optional(),
    concessionDocuments: imageFileSchema.optional(),
});

export const GetNormalizedData = (): Partial<z.infer<typeof UserSettingsSchema>> => {
    const normalizedData = parseAndNormalizeFormData(formData, [FormDataEnum.notifications]);
    return {
        name: normalizedData[FormDataEnum.name] as string,
        surname: normalizedData[FormDataEnum.surname] as string,
        phoneNumber: normalizedData[FormDataEnum.phoneNumber] as string,
        ico: normalizedData[FormDataEnum.ico] as string,
        dic: normalizedData[FormDataEnum.dic] as string,
        companyName: normalizedData[FormDataEnum.companyName] as string,
        concessionNumber: normalizedData[FormDataEnum.concessionNumber] as string,

        isCompany: (normalizedData[FormDataEnum.isCompany] === 'on' || normalizedData[FormDataEnum.isCompany] === 'true'),
        notifications: normalizedData.notifications as NotificationsEnum[],
        businessRiskInsurance: normalizedData[FormDataEnum.businessRiskInsurance] as File,
        concessionDocuments: normalizedData[FormDataEnum.concessionDocuments] as File,

        address: {
            country: normalizedData[FormDataEnum.address_country] as Country,
            city: normalizedData[FormDataEnum.address_city] as string,
            psc: normalizedData[FormDataEnum.address_psc] as string,
            street: normalizedData[FormDataEnum.address_street] as string,
            houseNumber: normalizedData[FormDataEnum.address_houseNumber] as string,
        },
        mailingAddress: {
            country: normalizedData[FormDataEnum.mailingAddress_country] as Country,
            city: normalizedData[FormDataEnum.mailingAddress_city] as string,
            psc: normalizedData[FormDataEnum.mailingAddress_psc] as string,
            street: normalizedData[FormDataEnum.mailingAddress_street] as string,
            houseNumber: normalizedData[FormDataEnum.mailingAddress_houseNumber] as string,
        },
        transferInfo: {
            iban: normalizedData[FormDataEnum.transferInfo_iban] as string,
            swift: normalizedData[FormDataEnum.transferInfo_swift] as string,
        },
    };
}