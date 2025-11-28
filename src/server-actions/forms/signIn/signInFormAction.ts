'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {SignInFormAction} from "@/src/forms-action/sign-in/SignInFormAction";
import {SignInFormSchema} from "@/src/forms-action/sign-in/SignInSchema";

const signInFormActionHandler = new SignInFormAction();

export async function signInFormAction(
    state: TFormActionState<typeof SignInFormSchema>,
    formData: FormData
): Promise<TFormActionState<typeof SignInFormSchema>> {
    return await signInFormActionHandler.handle(formData);
}