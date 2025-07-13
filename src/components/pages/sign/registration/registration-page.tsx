'use client'

import React, {useActionState} from "react";
import styles from "./registration.page.module.scss";
import {observer} from "mobx-react";
import {ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {signupFormAction} from "@/src/app/actions/forms/signUp/signupFormAction";

const RegistrationPage = observer(() => {
    const [state, action, pending] = useActionState(signupFormAction, undefined)

    return <div className={styles.layout}>
        <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={"Přejit na přihlášení"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
            <div>
                <label htmlFor={FormDataEnum.email}>Email</label>
                <input id={FormDataEnum.email} name={FormDataEnum.email} type={"email"} placeholder="Email"/>
            </div>
            {state?.errors?.email && <p>{state.errors.email}</p>}

            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} type={"password"} placeholder="password"/>
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}


            <div>
                <label htmlFor={FormDataEnum.password_confirm}>Password Confirm</label>
                <input id={FormDataEnum.password_confirm} name={FormDataEnum.password_confirm} type={"password"} placeholder="password confirm"/>
            </div>
            {state?.errors?.passwordConfirm && <p>{state.errors.passwordConfirm}</p>}

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