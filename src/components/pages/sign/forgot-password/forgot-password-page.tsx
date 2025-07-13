import React, {useActionState} from "react";
import styles from "./forgot-password.page.module.scss";
import {observer} from "mobx-react";
import {forgotPasswordFormAction} from "@/src/app/actions/forms/forgotPassword/forgotPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";

const ForgotPasswordPage = observer(() => {
    const [state, action, pending] = useActionState(forgotPasswordFormAction, undefined);

    const _renderBody = () => {
        return <div className={styles.layout}>
            <form action={action}>
                <div>
                    <label htmlFor={FormDataEnum.email}>Email</label>
                    <input id={FormDataEnum.email} name={FormDataEnum.email} placeholder="Email"/>
                </div>
                {state?.errors?.email && <p>{state.errors.email}</p>}
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