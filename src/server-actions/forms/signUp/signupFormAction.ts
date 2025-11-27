'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {SignUpFormAction} from "@/src/forms-action/sign-up/SignUpFormAction";
import {SignupFormSchema} from "@/src/forms-action/sign-up/SignUpSchema";

const signUpFormActionHandler = new SignUpFormAction();

export async function signupFormAction(
    state: TFormActionState<typeof SignupFormSchema>,
    formData: FormData
): Promise<TFormActionState<typeof SignupFormSchema>> {
    return await signUpFormActionHandler.handle(formData);
}