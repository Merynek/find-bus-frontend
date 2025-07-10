'use client'

import {useTranslate} from "@/src/hooks/translateHook";
import React, {useRef} from "react";
import {Form} from "../../../components/form/form";
import {ValidationTooltip} from "../../../components/validation-tooltip/validation-tooltip";
import {ValidationState} from "../../../components/inputs/inputEnum";
import {TextBox, TextBoxType} from "../../../components/inputs/text-box/text-box";
import signStyles from "../sign.module.scss";
import {ButtonClick, ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {observer} from "mobx-react";
import {LoginPageStore} from "./login.page.store";
import {ROUTES} from "@/src/enums/router.enum";
import { useRouter } from 'next/navigation';
import { useActionState } from "react";
import {signInFormAction} from "@/src/app/actions/auth/signIn/signInFormAction";

const LoginPage = observer(() => {
    const _locKey = "page.sign.login."
    const _locKeySign = "page.sign."
    const _storeRef = useRef<LoginPageStore>(new LoginPageStore());
    const {t} = useTranslate();
    const router = useRouter();
    const [state, action, pending] = useActionState(signInFormAction, undefined)

    const submit = async () => {
        if (_storeRef.current.changed) {
            if (await _storeRef.current.login()) {
                router.push(ROUTES.HOME);
            }
        }
    }

    return <div>
        <ButtonLink
            route={{route: ROUTES.SIGN_UP}}
            label={"Přejit na registraci"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" placeholder="Email"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"/>
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
});

export default LoginPage;