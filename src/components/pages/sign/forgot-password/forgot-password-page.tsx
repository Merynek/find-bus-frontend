'use client'

import React from "react";
import styles from "./forgot-password.page.module.scss";
import {observer} from "mobx-react";
import {forgotPasswordFormAction} from "@/src/app/actions/forms/forgotPassword/forgotPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";

const ForgotPasswordPage = observer(() => {
    const [state, action, pending] = useFormActionState(forgotPasswordFormAction, undefined);

    const _renderBody = () => {
        return <div className={styles.layout}>
            <form action={action}>
                <FormStatus state={state} />
                <div>
                    <label htmlFor={FormDataEnum.email}>Email</label>
                    <input id={FormDataEnum.email} name={FormDataEnum.email} placeholder="Email"/>
                </div>
                <button disabled={pending} type="submit">
                    Send Forgot Password
                </button>
            </form>
        </div>
    }

    const _renderRequestSentBody = () => {
        return <div>Request Sent</div>
    }

    return <div className={styles.layout}>
        {state?.success ? _renderRequestSentBody() : _renderBody()}
    </div>
});

export default ForgotPasswordPage;