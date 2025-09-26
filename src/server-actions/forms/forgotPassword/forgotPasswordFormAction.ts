'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {ForgotPasswordFormAction} from "@/src/forms-action/forgot-password/ForgotPasswordFormAction";
import {ForgotPasswordSchema} from "@/src/forms-action/forgot-password/ForgotPasswordSchema";

const ForgotPasswordFormActionHandler = new ForgotPasswordFormAction();

export async function forgotPasswordFormAction(
    state: TFormActionState<typeof ForgotPasswordSchema>,
    formData: FormData
): Promise<TFormActionState<typeof ForgotPasswordSchema>> {
    return await ForgotPasswordFormActionHandler.handle(formData);
}