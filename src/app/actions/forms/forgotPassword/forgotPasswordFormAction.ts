'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import {ForgotPasswordFormAction} from "@/src/forms/forgot-password/ForgotPasswordFormAction";
import {ForgotPasswordSchema} from "@/src/forms/forgot-password/ForgotPasswordSchema";

const ForgotPasswordFormActionHandler = new ForgotPasswordFormAction();

export async function forgotPasswordFormAction(
    state: TFormActionState<typeof ForgotPasswordSchema>,
    formData: FormData
): Promise<TFormActionState<typeof ForgotPasswordSchema>> {
    return await ForgotPasswordFormActionHandler.handle(formData);
}