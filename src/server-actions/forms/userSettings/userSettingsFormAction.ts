'use server';

import {TFormActionState} from "@/src/forms/BaseFormAction";
import { UserSettingsFormAction } from "@/src/forms/user-settings/UserSettingsFormAction";
import {UserSettingsSchema} from "@/src/forms/user-settings/UserSettingsSchema";

const userSettingsFormActionHandler = new UserSettingsFormAction();

export async function userSettingsFormAction(
    state: TFormActionState<typeof UserSettingsSchema>,
    formData: FormData
): Promise<TFormActionState<typeof UserSettingsSchema>> {
    return userSettingsFormActionHandler.handle(formData);
}