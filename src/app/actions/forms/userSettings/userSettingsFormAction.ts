'use server';

import {UserSettingsFormAction} from "@/src/forms/UserSettingsFormAction";
import {UserSettingsSchema} from "@/src/app/actions/forms/userSettings/userSettingsSchema";
import {TFormActionState} from "@/src/forms/BaseFormAction";

const userSettingsFormActionHandler = new UserSettingsFormAction();

export async function userSettingsFormAction(
    state: TFormActionState<typeof UserSettingsSchema>,
    formData: FormData
): Promise<TFormActionState<typeof UserSettingsSchema>> {
    return userSettingsFormActionHandler.handle(formData);
}