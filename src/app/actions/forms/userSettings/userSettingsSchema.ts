import { z } from 'zod'
import {
    ApiUsersTransportRequirementsPhotosPostRequest,
    NotificationsEnum,
    UserSettingsRequestDto
} from "@/src/api/openapi";
import {
    imageFileSchema,
    TransferInfoSchema,
    UserAddressSchema
} from "@/src/app/actions/forms/schemas";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {
    getBooleanFormValue,
    getEnumArrayFormValue,
    getEnumFormValue, getFileFormValue,
    getStringFormValue
} from "@/src/app/actions/forms/formGetters";

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

export const CreateUserSettingsData = (formData: FormData): Partial<UserSettingsRequestDto & ApiUsersTransportRequirementsPhotosPostRequest> => {
    const transferInfoObject = {
        iban: getStringFormValue(formData, FormDataEnum.transferInfo_iban),
        swift: getStringFormValue(formData, FormDataEnum.transferInfo_swift),
    }
    return {
        name: getStringFormValue(formData, FormDataEnum.name),
        surname: getStringFormValue(formData, FormDataEnum.surname),
        phoneNumber: getStringFormValue(formData, FormDataEnum.phoneNumber),
        ico: getStringFormValue(formData, FormDataEnum.ico),
        dic: getStringFormValue(formData, FormDataEnum.dic),
        companyName: getStringFormValue(formData, FormDataEnum.companyName),
        isCompany: getBooleanFormValue(formData, FormDataEnum.isCompany),
        notifications: getEnumArrayFormValue(formData, FormDataEnum.notifications),
        address: {
            country: getEnumFormValue(formData, FormDataEnum.address_country),
            city: getStringFormValue(formData, FormDataEnum.address_city),
            psc: getStringFormValue(formData, FormDataEnum.address_psc),
            street: getStringFormValue(formData, FormDataEnum.address_street),
            houseNumber: getStringFormValue(formData, FormDataEnum.address_houseNumber),
        },
        mailingAddress: {
            country: getEnumFormValue(formData, FormDataEnum.mailingAddress_country),
            city: getStringFormValue(formData, FormDataEnum.mailingAddress_city),
            psc: getStringFormValue(formData, FormDataEnum.mailingAddress_psc),
            street: getStringFormValue(formData, FormDataEnum.mailingAddress_street),
            houseNumber: getStringFormValue(formData, FormDataEnum.mailingAddress_houseNumber),
        },
        transferInfo: transferInfoObject,
        concessionNumber: getStringFormValue(formData, FormDataEnum.concessionNumber),
        businessRiskInsurance: getFileFormValue(formData, FormDataEnum.businessRiskInsurance),
        concessionDocuments: getFileFormValue(formData, FormDataEnum.concessionDocuments),
    };
};
