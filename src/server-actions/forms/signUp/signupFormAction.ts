'use server';

import { redirect } from "@/src/i18n/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import {TFormActionState} from "@/src/forms/BaseFormAction";
import {Locale} from "next-intl";
import {SignUpFormAction} from "@/src/forms/sign-up/SignUpFormAction";
import {SignupFormSchema} from "@/src/forms/sign-up/SignUpSchema";

const signUpFormActionHandler = new SignUpFormAction();

export async function signupFormAction(
    state: TFormActionState<typeof SignupFormSchema>,
    formData: FormData
): Promise<TFormActionState<typeof SignupFormSchema>> {
    const result = await signUpFormActionHandler.handle(formData);

    if (result?.success && result?.data) {
        redirect({
            locale: result.data.locale as Locale,
            href: ROUTES.SIGN_IN
        });
    }

    return result;
}