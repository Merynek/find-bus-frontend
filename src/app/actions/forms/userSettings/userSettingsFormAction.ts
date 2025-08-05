'use server';

import { z } from 'zod';
import {GetNormalizedData, UserSettingsSchema} from "@/src/app/actions/forms/userSettings/userSettingsSchema";
import {UsersService} from "@/src/services/UsersService";

type UserSettingsSchemaFieldErrors = z.inferFlattenedErrors<typeof UserSettingsSchema>['fieldErrors'];

export type TUserSettingsFormState = {
    errors?: UserSettingsSchemaFieldErrors;
    message?: string;
    error?: string;
    data?: Partial<z.infer<typeof UserSettingsSchema>>;
} | undefined;

export async function userSettingsFormAction(state: TUserSettingsFormState, formData: FormData): Promise<TUserSettingsFormState> {
    const dataToValidate = GetNormalizedData(formData);
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
