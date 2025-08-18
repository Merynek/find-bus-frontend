'use client'

import React, {useCallback, useEffect} from "react";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {logoutAction} from "@/src/app/actions/auth/authActions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/i18n/navigation";
import {userSettingsFormAction} from "@/src/app/actions/forms/signIn/signInFormAction";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";

const LoginPage = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useFormActionState(userSettingsFormAction, undefined);
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleUnauthorizedLogout = useCallback(async () => {
        await logoutAction();
        router.push(ROUTES.SIGN_IN);
    }, [router]);

    useEffect(() => {
        const unauthorized = searchParams.get(SEARCH_PARAMS.UNAUTHORIZED);
        if (unauthorized) {
            handleUnauthorizedLogout();
        }
    }, [searchParams, handleUnauthorizedLogout]);


    const locale = useCurrentLocale();

    return <div>
        <ButtonLink
            route={{route: ROUTES.SIGN_UP}}
            label={t("registration.registrationButton")}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <FormStatus state={state} />
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale} />

            <div>
                <label htmlFor={FormDataEnum.email}>Email</label>
                <TextBox
                    controlled={false}
                    name={FormDataEnum.email}
                    id={FormDataEnum.email}
                    type={TextBoxType.EMAIL}
                    placeholder={"Email"}
                />
            </div>

            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <TextBox
                    controlled={false}
                    name={FormDataEnum.password}
                    id={FormDataEnum.password}
                    type={TextBoxType.PASSWORD}
                    placeholder={"password"}
                />
            </div>
            <button disabled={pending} type="submit">
                Sign In
            </button>
        </form>
        <ButtonLink
            route={{route: ROUTES.FORGOT_PASSWORD}}
            label={"FORGET PASSWORD"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
};

export default LoginPage;