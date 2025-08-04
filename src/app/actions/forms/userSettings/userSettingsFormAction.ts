'use server';

import { z } from 'zod';
import {Country, NotificationsEnum} from "@/src/api/openapi";
import {UserSettingsSchema} from "@/src/app/actions/forms/userSettings/userSettingsSchema";
import {
    parseAndNormalizeFormData
} from "@/src/app/actions/forms/schemas";
import {UsersService} from "@/src/services/UsersService";
import {FormDataEnum} from "@/src/enums/form-data.enum";

type UserSettingsSchemaFieldErrors = z.inferFlattenedErrors<typeof UserSettingsSchema>['fieldErrors'];

export type TUserSettingsFormState = {
    errors?: UserSettingsSchemaFieldErrors;
    message?: string;
    error?: string;
    data?: Partial<z.infer<typeof UserSettingsSchema>>;
} | undefined;

export async function userSettingsFormAction(state: TUserSettingsFormState, formData: FormData): Promise<TUserSettingsFormState> {
    const normalizedData = parseAndNormalizeFormData(formData, [FormDataEnum.notifications]);
    const dataToValidate: Partial<z.infer<typeof UserSettingsSchema>> = {
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

    const validatedFields = UserSettingsSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.error('Chyby validace:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Některá zadaná data nejsou platná.',
            data: dataToValidate as Partial<z.infer<typeof UserSettingsSchema>>,
        };
    }
    try {
        await UsersService.changeSettings({
            name: validatedFields.data.name,
            surname: validatedFields.data.surname,
            phoneNumber: validatedFields.data.phoneNumber,
            ico: validatedFields.data.ico,
            dic: validatedFields.data.dic,
            companyName: validatedFields.data.companyName,
            isCompany: validatedFields.data.isCompany,
            notifications: validatedFields.data.notifications,
            address: validatedFields.data.address,
            mailingAddress: validatedFields.data.mailingAddress,
            transferInfo: validatedFields.data.transferInfo,
            concessionNumber: validatedFields.data.concessionNumber
        });
        if (validatedFields.data.businessRiskInsurance || validatedFields.data.concessionDocuments) {
            await UsersService.updateTransportRequirementsPhotos({
                businessRiskInsurance: validatedFields.data.businessRiskInsurance,
                concessionDocuments: validatedFields.data.concessionDocuments
            });
        }
        return {
            message: 'cajk',
            data: dataToValidate as Partial<z.infer<typeof UserSettingsSchema>>,
        };
    } catch (error: any) {
        console.error('Chyba při pridani vozidla:', error);
        const xx = await error.response.json();
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přidání vozidla.',
        }
    }
}
