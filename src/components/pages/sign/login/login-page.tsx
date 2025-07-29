'use client'

import React, {useEffect} from "react";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import { useActionState } from "react";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {signInFormAction} from "@/src/app/actions/forms/signIn/signInFormAction";
import {useTranslate} from "@/src/hooks/translateHook";
import {useRouter} from "next/navigation";

const LoginPage = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useActionState(signInFormAction, undefined)
    const {push} = useRouter();

    useEffect(() => {
        console.log("state", state)
        debugger;
        if (state && state.success) {
            push(ROUTES.HOME);
        } else if (state && state.errors) {
            console.error("Chyby z akce:", state.errors);
        }
    }, [state]);

    return <div>
        <ButtonLink
            route={{route: ROUTES.SIGN_UP}}
            label={t("registration.registrationButton") as string}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <div>
                <label htmlFor={FormDataEnum.email}>Email</label>
                <input id={FormDataEnum.email} name={FormDataEnum.email} placeholder="Email"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} type={"password"} placeholder="password"/>
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