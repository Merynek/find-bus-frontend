'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ForgotPasswordSchema} from "@/src/app/actions/forms/forgotPassword/forgotPasswordSchema";

export type TForgotPasswordFormState = {
    errors?: {
        email?: string[];
    };
    message?: string;
    success?: boolean;
    error?: string;
} | undefined;


export async function forgotPasswordFormAction(state: TForgotPasswordFormState, formData: FormData): Promise<TForgotPasswordFormState> {
    const validatedFields = ForgotPasswordSchema.safeParse({
        email: formData.get(FormDataEnum.email)
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false
        }
    }

    try {
        await AuthorizationService.forgotPassword(validatedFields.data.email);
        return {
            success: true
        }
    } catch (error: any) {
        console.error('Chyba při forgot password:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během forgot password.',
            success: false
        }
    }
}