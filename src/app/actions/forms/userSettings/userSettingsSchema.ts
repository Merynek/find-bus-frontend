import { z } from 'zod'
import {NotificationsEnum} from "@/src/api/openapi";
import {
    imageFileSchema,
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

export const CreateUserSettingsData = (formData: FormData) => {
    const addressObject = {
        country: getFormValue(formData, FormDataEnum.address_country) || undefined,
        city: getFormValue(formData, FormDataEnum.address_city),
        psc: getFormValue(formData, FormDataEnum.address_psc),
        street: getFormValue(formData, FormDataEnum.address_street),
        houseNumber: getFormValue(formData, FormDataEnum.address_houseNumber),
    }
    const mailingAddressObject = {
        country: getFormValue(formData, FormDataEnum.mailingAddress_country) || undefined,
        city: getFormValue(formData, FormDataEnum.mailingAddress_city),
        psc: getFormValue(formData, FormDataEnum.mailingAddress_psc),
        street: getFormValue(formData, FormDataEnum.mailingAddress_street),
        houseNumber: getFormValue(formData, FormDataEnum.mailingAddress_houseNumber),
    }
    const transferInfoObject = {
        iban: getFormValue(formData, FormDataEnum.transferInfo_iban),
        swift: getFormValue(formData, FormDataEnum.transferInfo_swift),
    }
    return {
        name: getFormValue(formData, FormDataEnum.name),
        surname: getFormValue(formData, FormDataEnum.surname),
        phoneNumber: getFormValue(formData, FormDataEnum.phoneNumber),
        ico: getFormValue(formData, FormDataEnum.ico),
        dic: getFormValue(formData, FormDataEnum.dic),
        companyName: getFormValue(formData, FormDataEnum.companyName),
        isCompany: getFormValue(formData, FormDataEnum.isCompany) === 'on',
        notifications: formData.getAll(FormDataEnum.notifications),
        address: addressObject,
        mailingAddress: mailingAddressObject,
        transferInfo: transferInfoObject,
        concessionNumber: getFormValue(formData, FormDataEnum.concessionNumber),
        businessRiskInsurance: getFormValue(formData, FormDataEnum.businessRiskInsurance),
        concessionDocuments: getFormValue(formData, FormDataEnum.concessionDocuments),
    };
};

const getFormValue = (formData: FormData, key: FormDataEnum) => {
    const value = formData.get(key);
    if (value === null || (value instanceof File && value.size === 0)) {
        return undefined;
    }
    return value;
};