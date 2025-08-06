'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import {ResetPasswordFormAction} from "@/src/forms/reset-password/ResetPasswordFormAction";
import {ResetPasswordSchema} from "@/src/forms/reset-password/ResetPasswordSchema";

const ResetPasswordFormActionHandler = new ResetPasswordFormAction();

export async function resetPasswordFormAction(
    state: TFormActionState<typeof ResetPasswordSchema>,
    formData: FormData
): Promise<TFormActionState<typeof ResetPasswordSchema>> {
    return await ResetPasswordFormActionHandler.handle(formData);
}