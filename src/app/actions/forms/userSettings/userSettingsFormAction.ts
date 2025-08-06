'use server';

import { z } from 'zod';
import {UsersService} from "@/src/services/UsersService";
import {
    CreateUserSettingsData, UserSettingsSchema
} from "@/src/app/actions/forms/userSettings/userSettingsSchema";

type UserSettingsSchemaFieldErrors = z.inferFlattenedErrors<typeof UserSettingsSchema>['fieldErrors'];

export type TUserSettingsFormState = {
    success?: boolean;
    message?: string;
    errors?: UserSettingsSchemaFieldErrors;
    data?: Partial<z.infer<typeof UserSettingsSchema>>;
} | undefined;

export async function userSettingsFormAction(state: TUserSettingsFormState, formData: FormData): Promise<TUserSettingsFormState> {
    const data=  CreateUserSettingsData(formData);
    const validatedFields = UserSettingsSchema.partial().safeParse(data);

    if (!validatedFields.success) {
        console.error('Chyby validace:', validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Některá zadaná data nejsou platná.',
            data: data as Partial<z.infer<typeof UserSettingsSchema>>,
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
            address: validatedFields.data.address || undefined,
            mailingAddress: validatedFields.data.mailingAddress || undefined,
            transferInfo: validatedFields.data.transferInfo || undefined,
            concessionNumber: validatedFields.data.concessionNumber
        });
        if (validatedFields.data.businessRiskInsurance || validatedFields.data.concessionDocuments) {
            await UsersService.updateTransportRequirementsPhotos({
                businessRiskInsurance: validatedFields.data.businessRiskInsurance || undefined,
                concessionDocuments: validatedFields.data.concessionDocuments || undefined
            });
        }
        return {
            success: true,
            message: 'Nastavení bylo úspěšně uloženo.',
            data: data as Partial<z.infer<typeof UserSettingsSchema>>
        };
    } catch (error: any) {
        let errorMessage = 'Došlo k neočekávané chybě během přidání vozidla.';
        if (error.response?.json) {
            const xx = await error.response.json();
            errorMessage = xx.message || errorMessage;
        }
        return {
            success: false,
            message: errorMessage,
            data: data as Partial<z.infer<typeof UserSettingsSchema>>
        };
    }
}
