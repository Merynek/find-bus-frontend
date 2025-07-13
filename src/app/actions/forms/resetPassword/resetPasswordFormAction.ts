'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ResetPasswordSchema} from "@/src/app/actions/forms/resetPassword/resetPasswordSchema";

export type TResetPasswordFormState = {
    errors?: {
        password?: string[];
        passwordConfirm?: string[];
        token?: string[];
    };
    message?: string;
    success?: boolean;
    error?: string;
} | undefined;


export async function resetPasswordFormAction(state: TResetPasswordFormState, formData: FormData): Promise<TResetPasswordFormState> {
    const validatedFields = ResetPasswordSchema.safeParse({
        password: formData.get(FormDataEnum.email),
        passwordConfirm: formData.get(FormDataEnum.password_confirm),
        token: formData.get(FormDataEnum.token)
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false
        }
    }

    try {
        await AuthorizationService.resetPassword(validatedFields.data.token, validatedFields.data.password, validatedFields.data.passwordConfirm);
        return {
            success: true
        }
    } catch (error: any) {
        console.error('Chyba při reset password:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během reset password.',
            success: false
        }
    }
}