import {useTranslate} from "@/src/hooks/translateHook";
import React, {useRef} from "react";
import styles from "./forgot-password.page.module.scss";
import {Form} from "../../../components/form/form";
import {ValidationTooltip} from "../../../components/validation-tooltip/validation-tooltip";
import {ValidationState} from "../../../components/inputs/inputEnum";
import {TextBox, TextBoxType} from "../../../components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {observer} from "mobx-react";
import {ForgotPasswordStore} from "./forgot-password.store";
import signStyles from "../sign.module.scss";

export interface IForgotPasswordPageProps {
}

const ForgotPasswordPage = observer((props: IForgotPasswordPageProps) => {
    const _storeRef = useRef<ForgotPasswordStore>(new ForgotPasswordStore());
    const _locKey = "page.sign.forgotPassword."
    const _locKeySign = "page.sign."
    const {t} = useTranslate();

    const submit = async () => {
        if (_storeRef.current.changed) {
            await _storeRef.current.sendForgotPassword();
        }
    }

    const _renderBody = () => {
        return <div className={styles.layout}>
            <Form onSubmit={submit}>
                <ValidationTooltip
                    placement={'right'}
                    state={ValidationState.ERROR}
                    open={!_storeRef.current.emailIsValid}
                    message={t(_locKeySign + _storeRef.current.emailInvalidMessage)}
                >
                    <div className={signStyles.input}>
                        <TextBox
                            value={_storeRef.current.email}
                            onChange={(val) => _storeRef.current.email = val}
                            type={TextBoxType.EMAIL}
                            placeholder={t(_locKeySign + "emailPlaceholder")}
                        />
                    </div>
                </ValidationTooltip>
                <ButtonClick
                    size={ButtonSize.BUTTON_SIZE_M}
                    onClick={() => {}}
                    isDisabled={!_storeRef.current.changed}
                    type={ButtonType.BLACK}
                    label={t(_locKey + "sendForgotPasswordButton")}
                />
            </Form>
        </div>
    }

    const _renderRequestSentBody = () => {
        return <div>{t(_locKey + "textRequestSent")}</div>
    }

    return <div className={styles.layout}>
        {_storeRef.current.requestSent ? _renderRequestSentBody() : _renderBody()}
    </div>
});

export default ForgotPasswordPage;