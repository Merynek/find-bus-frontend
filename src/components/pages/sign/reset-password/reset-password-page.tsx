'use client'

import React from "react";
import styles from "./reset-password.page.module.scss";
import {resetPasswordFormAction} from "@/src/app/actions/forms/resetPassword/resetPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";

interface ResetPasswordPageProps {
    token: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {
    const {token} = props;
    const [state, action, pending] = useFormActionState(resetPasswordFormAction, undefined);
    const locale = useCurrentLocale();

    return <div className={styles.layout}>
        <form action={action}>
            <FormStatus state={state} />
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
            <input type="hidden" name={FormDataEnum.token} value={token + ""}/>
            <div>
                <label htmlFor={FormDataEnum.password}>Password</label>
                <input id={FormDataEnum.password} name={FormDataEnum.password} placeholder="Password"
                       type={"password"}/>
            </div>
            <div>
                <label htmlFor={FormDataEnum.password_confirm}>Password</label>
                <input id={FormDataEnum.password_confirm} name={FormDataEnum.password_confirm}
                       placeholder="Confirm Password" type={"password"}/>
            </div>
            <button disabled={pending} type="submit">
                Reset Password
            </button>
        </form>
    </div>
};

export default ResetPasswordPage;