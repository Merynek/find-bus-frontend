'use client'

import React, {useActionState} from "react";
import styles from "./reset-password.page.module.scss";
import {resetPasswordFormAction} from "@/src/app/actions/forms/resetPassword/resetPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";

interface ResetPasswordPageProps {
    token: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {
    const {token} = props;
    const [state, action, pending] = useActionState(resetPasswordFormAction, undefined);

    return <div className={styles.layout}>
        <form action={action}>
            <input type="hidden" name={FormDataEnum.token} value={token + ""}/>
            {state?.errors?.token && <p>{state.errors.token}</p>}
            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} placeholder="Password"
                       type={"password"}/>
            </div>
            {state?.errors?.password && <p>{state.errors.password}</p>}
            <div>
                <label htmlFor={FormDataEnum.password_confirm}>Password</label>
                <input id={FormDataEnum.password_confirm} name={FormDataEnum.password_confirm}
                       placeholder="Confirm Password" type={"password"}/>
            </div>
            {state?.errors?.passwordConfirm && <p>{state.errors.passwordConfirm}</p>}
            <button disabled={pending} type="submit">
                Reset Password
            </button>
        </form>
    </div>
};

export default ResetPasswordPage;