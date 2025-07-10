'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {RegistrationApi} from "@/src/api/registrationApi";
import {redirect} from "next/navigation";
import {SignupFormSchema, TSignUpFormState} from "@/src/app/actions/auth/signUp/signUpSchema";

export async function signupAction(state: TSignUpFormState, formData: FormData) {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get(FormDataEnum.email),
        password: formData.get(FormDataEnum.password),
        confirmPassword: formData.get(FormDataEnum.password_confirm),
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
        return {
            message: 'An error occurred while creating your account.',
        }
    }
    redirect('/sign/in');
}
