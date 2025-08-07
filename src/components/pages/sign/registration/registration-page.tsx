'use client'

import React from "react";
import styles from "./registration.page.module.scss";
import {observer} from "mobx-react";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {signupFormAction} from "@/src/app/actions/forms/signUp/signupFormAction";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";

const RegistrationPage = observer(() => {
    const [state, action, pending] = useFormActionState(signupFormAction, undefined)
    const locale = useCurrentLocale();

    return <div className={styles.layout}>
        <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={"Přejit na přihlášení"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <FormStatus state={state} />
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
            <div>
                <label htmlFor={FormDataEnum.email}>Email</label>
                <input id={FormDataEnum.email} name={FormDataEnum.email} type={"email"} placeholder="Email"/>
            </div>

            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} type={"password"}
                       placeholder="password"/>
            </div>
            <div>
                <label htmlFor={FormDataEnum.password_confirm}>Password Confirm</label>
                <input id={FormDataEnum.password_confirm} name={FormDataEnum.password_confirm} type={"password"}
                       placeholder="password confirm"/>
            </div>
            <div>
                <label htmlFor={UserRole.TRANSPORTER}>Transporter</label>
                <input
                    type="radio"
                    id={UserRole.TRANSPORTER}
                    name={FormDataEnum.role}
                    value={UserRole.TRANSPORTER}
                />
            </div>

            <div>
                <label htmlFor={UserRole.DEMANDER}>Zadavatel</label>
                <input
                    type="radio"
                    id={UserRole.DEMANDER}
                    name={FormDataEnum.role}
                    value={UserRole.DEMANDER}
                />
            </div>

            <button disabled={pending} type="submit">
                Sign Up
            </button>

        </form>
    </div>
});

export default RegistrationPage;