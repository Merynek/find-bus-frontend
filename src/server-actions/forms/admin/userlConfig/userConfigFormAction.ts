'use server';

import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {UserConfigFormAction} from "@/src/forms-action/admin/user-config/UserConfigFormAction";
import {UserConfigSchema} from "@/src/forms-action/admin/user-config/UserConfigSchema";

const userConfigFormActionHandler = new UserConfigFormAction();

export async function userConfigFormAction(
    state: TFormActionState<typeof UserConfigSchema>,
    formData: FormData
): Promise<TFormActionState<typeof UserConfigSchema>> {
    return await userConfigFormActionHandler.handle(formData);
}