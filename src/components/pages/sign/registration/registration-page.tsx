import {useTranslate} from "@/src/hooks/translateHook";
import React, {useActionState, useRef} from "react";
import styles from "./registration.page.module.scss";
import {observer} from "mobx-react";
import {Form} from "../../../components/form/form";
import {ValidationTooltip} from "../../../components/validation-tooltip/validation-tooltip";
import {ValidationState} from "../../../components/inputs/inputEnum";
import {RegistrationStore} from "./registration.store";
import {TextBox, TextBoxType} from "../../../components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType, ButtonLink} from "../../../components/button/button";
import signStyles from "../sign.module.scss";
import {CheckBox} from "../../../components/inputs/check-box/check-box";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {CheckBoxSize} from "@/src/enums/check-box.enum";
import { useRouter } from 'next/navigation';
import {signupFormAction} from "@/src/app/actions/auth/signUp/signupFormAction";

const RegistrationPage = observer(() => {
    const [state, action, pending] = useActionState(signupFormAction, undefined)
    const _storeRef = useRef<RegistrationStore>(new RegistrationStore());
    const _locKey = "page.sign.registration."
    const _locKeySign = "page.sign."
    const router = useRouter();
    const {t} = useTranslate();

    const submit = async () => {
        if (_storeRef.current.changed) {
            if (await _storeRef.current.registration()) {
                router.push(ROUTES.LOGIN);
            }
        }
    }

    return <div className={styles.layout}>
        <ButtonLink
            route={{route: ROUTES.LOGIN}}
            label={"Přejit na přihlášení"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <form action={action}>
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
            <CheckBox
                value={_storeRef.current.userRole === UserRole.TRANSPORTER}
                onChange={() => {
                    _storeRef.current.userRole = UserRole.TRANSPORTER;
                }}
                size={CheckBoxSize.MEDIUM}
                label={"Přepravce"}
            />
            <CheckBox
                value={_storeRef.current.userRole === UserRole.DEMANDER}
                onChange={() => {
                    _storeRef.current.userRole = UserRole.DEMANDER
                }}
                size={CheckBoxSize.MEDIUM}
                label={"Zadavatel"}
            />
            <ButtonClick
                size={ButtonSize.BUTTON_SIZE_M}
                onClick={() => {
                }}
                isDisabled={pending}
                type={ButtonType.BLACK}
                label={t(_locKey + "registrationButton")}
            />
        </form>
    </div>
});

export default RegistrationPage;