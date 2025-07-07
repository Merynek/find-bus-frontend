import {useTranslate} from "@/src/hooks/translateHook";
import React, {useRef} from "react";
import styles from "./reset-password.page.module.scss";
import signStyles from "../sign.module.scss";
import {Form} from "../../../components/form/form";
import {ValidationTooltip} from "../../../components/validation-tooltip/validation-tooltip";
import {ValidationState} from "../../../components/inputs/inputEnum";
import {TextBox, TextBoxType} from "../../../components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "../../../components/button/button";
import {observer} from "mobx-react";
import ResetPasswordStore from "./reset-password.store";
import {useNavigate, useParams} from "react-router-dom";
import {ROUTES} from "@/src/enums/router.enum";

export interface IResetPasswordPageProps {
}

const ResetPasswordPage = observer((props: IResetPasswordPageProps) => {
    const { token } = useParams();
    const _storeRef = useRef<ResetPasswordStore>(new ResetPasswordStore(token + ""));
    const _locKey = "page.sign.resetPassword."
    const _locKeySign = "page.sign."
    const navigate = useNavigate();
    const {t} = useTranslate();

    const submit = async () => {
        if (_storeRef.current.changed) {
            if (await _storeRef.current.resetPassword()) {
                navigate(ROUTES.LOGIN)
            }
        }
    }

    return <div className={styles.layout}>
        {!_storeRef.current.tokenIsValid && <span>{t(_locKey + "tokenInvalid")}</span>}
        <Form onSubmit={submit}>
            <ValidationTooltip
                placement={'right'}
                state={ValidationState.ERROR}
                open={!_storeRef.current.passwordIsValid}
                message={t(_locKeySign + _storeRef.current.invalidPasswordMessage)}
            >
                <div className={signStyles.input}>
                    <TextBox
                        value={_storeRef.current.password}
                        onChange={(val) => _storeRef.current.password = val}
                        type={TextBoxType.PASSWORD}
                        placeholder={t(_locKeySign + "passwordPlaceholder")}
                    />
                </div>
            </ValidationTooltip>
            <ValidationTooltip
                placement={'right'}
                state={ValidationState.ERROR}
                open={!_storeRef.current.passwordConfirmIsValid}
                message={t(_locKeySign + _storeRef.current.invalidConfirmPasswordMessage)}
            >
                <div className={signStyles.input}>
                    <TextBox
                        value={_storeRef.current.passwordConfirm}
                        onChange={(val) => _storeRef.current.passwordConfirm = val}
                        type={TextBoxType.PASSWORD}
                        placeholder={t(_locKeySign + "passwordConfirmPlaceholder")}
                    />
                </div>
            </ValidationTooltip>
            <ButtonClick
                onClick={() => {}}
                isDisabled={!_storeRef.current.changed}
                type={ButtonType.BLACK}
                label={t(_locKey + "submit")}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </Form>
    </div>
});

export default ResetPasswordPage;