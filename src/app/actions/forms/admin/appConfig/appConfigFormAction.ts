'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import {AppConfigSchema} from "@/src/forms/admin/app-config/AppConfigSchema";
import {AppConfigFormAction} from "@/src/forms/admin/app-config/AppConfigFormAction";

const appConfigFormActionHandler = new AppConfigFormAction();

export async function appConfigFormAction(
    state: TFormActionState<typeof AppConfigSchema>,
    formData: FormData
): Promise<TFormActionState<typeof AppConfigSchema>> {
    return await appConfigFormActionHandler.handle(formData);
}