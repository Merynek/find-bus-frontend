'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {RegistrationApi} from "@/src/api/registrationApi";
import {redirect} from "next/navigation";
import {SignupFormSchema} from "@/src/app/actions/auth/signUp/signUpSchema";
import {ROUTES} from "@/src/enums/router.enum";

export type TSignUpFormState = {
    errors?: {
        email?: string[];
        password?: string[];
        passwordConfirm?: string[];
        role?: string[];
    };
    message?: string;
    error?: string;
} | undefined;

export async function signupFormAction(state: TSignUpFormState, formData: FormData): Promise<TSignUpFormState> {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get(FormDataEnum.email),
        password: formData.get(FormDataEnum.password),
        passwordConfirm: formData.get(FormDataEnum.password_confirm),
        role: formData.get(FormDataEnum.role),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const registrationApi = new RegistrationApi(undefined);
    try {
        await registrationApi.registration({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            role: validatedFields.data.role
        });
    } catch (error: any) {
        console.error('Chyba při registraci:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přihlašování.',
        }
    }
    redirect(ROUTES.SIGN_IN);
}
