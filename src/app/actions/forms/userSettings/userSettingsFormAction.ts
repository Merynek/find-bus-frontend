'use server';

import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { z } from 'zod';
import {Country} from "@/src/api/openapi";
import {UserSettingsSchema} from "@/src/app/actions/forms/userSettings/userSettingsSchema";
import {TransferInfoSchema, UserAddressSchema} from "@/src/app/actions/forms/schemas";
import {UsersService} from "@/src/services/UsersService";
import {FormDataEnum} from "@/src/enums/form-data.enum";

type UserSettingsSchemaFieldErrors = z.inferFlattenedErrors<typeof UserSettingsSchema>['fieldErrors'];

export type TUserSettingsFormState = {
    errors?: UserSettingsSchemaFieldErrors;
    message?: string;
    error?: string;
} | undefined;

export async function userSettingsFormAction(state: TUserSettingsFormState, formData: FormData): Promise<TUserSettingsFormState> {
    const dataToValidate = {
        name: formData.get(FormDataEnum.name),
        surname: formData.get(FormDataEnum.surname),
        phoneNumber: formData.get(FormDataEnum.phoneNumber),
        ico: formData.get(FormDataEnum.ico),
        dic: formData.get(FormDataEnum.ico),
        companyName: formData.get(FormDataEnum.companyName),
        isCompany: formData.get(FormDataEnum.isCompany) === 'on' || formData.get(FormDataEnum.isCompany) === 'true',
        notifications: formData.getAll(FormDataEnum.notifications),
        concessionNumber: formData.get(FormDataEnum.concessionNumber),
        address: ((): z.infer<typeof UserAddressSchema> | undefined => {
            const country = formData.get(FormDataEnum.address_country);
            const city = formData.get(FormDataEnum.address_city);
            const psc = formData.get(FormDataEnum.address_psc);
            const street = formData.get(FormDataEnum.address_street);
            const houseNumber = formData.get(FormDataEnum.address_houseNumber);

            if (country || city || psc || street || houseNumber) {
                return {
                    country: country ? (country as Country) : Country.CZ,
                    city: city ? (city as string) : null,
                    psc: psc ? (psc as string) : null,
                    street: street ? (street as string) : null,
                    houseNumber: houseNumber ? (houseNumber as string) : null,
                };
            }
            return undefined;
        })(),
        mailingAddress: ((): z.infer<typeof UserAddressSchema> | undefined => {
            const country = formData.get(FormDataEnum.mailingAddress_country);
            const city = formData.get(FormDataEnum.mailingAddress_city);
            const psc = formData.get(FormDataEnum.mailingAddress_psc);
            const street = formData.get(FormDataEnum.mailingAddress_street);
            const houseNumber = formData.get(FormDataEnum.mailingAddress_houseNumber);

            if (country || city || psc || street || houseNumber) {
                return {
                    country: country ? (country as Country) : Country.CZ,
                    city: city ? (city as string) : null,
                    psc: psc ? (psc as string) : null,
                    street: street ? (street as string) : null,
                    houseNumber: houseNumber ? (houseNumber as string) : null,
                };
            }
            return undefined;
        })(),
        transferInfo: ((): z.infer<typeof TransferInfoSchema> | undefined => {
            const iban = formData.get(FormDataEnum.transferInfo_iban);
            const swift = formData.get(FormDataEnum.transferInfo_swift);

            if (iban || swift) {
                return {
                    iban: iban ? (iban as string) : null,
                    swift: swift ? (swift as string) : null,
                };
            }
            return undefined;
        })(),
        businessRiskInsurance: formData.get(FormDataEnum.businessRiskInsurance),
        concessionDocuments: formData.get(FormDataEnum.concessionDocuments),
    };

    const validatedFields = UserSettingsSchema.safeParse(dataToValidate);

    if (!validatedFields.success) {
        console.error('Chyby validace:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Některá zadaná data nejsou platná.',
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
    } catch (error: any) {
        console.error('Chyba při pridani vozidla:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přidání vozidla.',
        }
    }
    redirect(ROUTES.USER_SETTINGS);
}
