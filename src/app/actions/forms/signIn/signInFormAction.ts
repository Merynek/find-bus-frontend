'use server';

import { redirect } from "@/src/i18n/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import { Locale } from "next-intl";
import {TFormActionState} from "@/src/forms/BaseFormAction";
import {SignInFormAction} from "@/src/forms/sign-in/SignInFormAction";
import {SignInFormSchema} from "@/src/forms/sign-in/SignInSchema";


const signInFormActionHandler = new SignInFormAction();

export async function userSettingsFormAction(
    state: TFormActionState<typeof SignInFormSchema>,
    formData: FormData
): Promise<TFormActionState<typeof SignInFormSchema>> {
    const result = await signInFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.HOME
        });
    }

    return result;
}