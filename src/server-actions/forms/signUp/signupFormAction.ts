'use server';

import { redirect } from "@/src/i18n/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import {TFormActionState} from "@/src/forms-action/BaseFormAction";
import {SignUpFormAction} from "@/src/forms-action/sign-up/SignUpFormAction";
import {SignupFormSchema} from "@/src/forms-action/sign-up/SignUpSchema";

const signUpFormActionHandler = new SignUpFormAction();

export async function signupFormAction(
    state: TFormActionState<typeof SignupFormSchema>,
    formData: FormData
): Promise<TFormActionState<typeof SignupFormSchema>> {
    const result = await signUpFormActionHandler.handle(formData);

    if (result?.success && result.data && result.data.locale && result.data.redirectToSingIn) {
        redirect({
            locale: result.data.locale,
            href: {
                pathname: ROUTES.SIGN_IN
            }
        });
    }

    return result;
}