'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {SignInFormSchema} from "@/src/app/actions/forms/signIn/signInSchema";
import {ROUTES} from "@/src/enums/router.enum";

export type TSignInFormState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
    error?: string;
} | undefined;

export async function signInFormAction(state: TSignInFormState, formData: FormData): Promise<TSignInFormState> {
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get(FormDataEnum.email),
        password: formData.get(FormDataEnum.password)
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        await AuthorizationService.login(validatedFields.data.email, validatedFields.data.password);
    } catch (error: any) {
        console.error('Chyba při přihlášení:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přihlašování.',
        }
    }
    redirect(ROUTES.HOME);
}