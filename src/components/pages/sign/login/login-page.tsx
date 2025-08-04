'use client'

import React, {useCallback, useEffect} from "react";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import { useActionState } from "react";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {signInFormAction} from "@/src/app/actions/forms/signIn/signInFormAction";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {logoutAction} from "@/src/app/actions/auth/authActions";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/src/i18n/navigation";

const LoginPage = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useActionState(signInFormAction, undefined);
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
            label={t("registration.registrationButton") as string}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale} />

            <div>
                <label htmlFor={FormDataEnum.email}>Email</label>
                <input id={FormDataEnum.email} name={FormDataEnum.email} placeholder="Email"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} type={"password"}
                       placeholder="password"/>
            </div>
            {state?.errors?.password && (
                <div>
                    <p>Password must:</p>
                    <ul>
                        {state.errors.password.map((error: string) => (
                            <li key={error}>- {error}</li>
                        ))}
                    </ul>
                </div>
            )}
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