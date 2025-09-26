'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import {EmailConfigFormAction} from "@/src/forms/admin/email-config/EmailConfigFormAction";
import {EmailConfigSchema} from "@/src/forms/admin/email-config/EmailConfigSchema";

const emailConfigFormActionHandler = new EmailConfigFormAction();

export async function emailConfigFormAction(
    state: TFormActionState<typeof EmailConfigSchema>,
    formData: FormData
): Promise<TFormActionState<typeof EmailConfigSchema>> {
    return await emailConfigFormActionHandler.handle(formData);
}