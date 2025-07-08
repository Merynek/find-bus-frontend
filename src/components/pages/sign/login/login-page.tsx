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
import { useRouter } from 'next/navigation';;

const LoginPage = observer(() => {
    const _locKey = "page.sign.login."
    const _locKeySign = "page.sign."
    const _storeRef = useRef<LoginPageStore>(new LoginPageStore());
    const {t} = useTranslate();
    const router = useRouter();

    const submit = async () => {
        if (_storeRef.current.changed) {
            if (await _storeRef.current.login()) {
                router.push(ROUTES.HOME);
            }
        }
    }

    return <div>
        <ButtonLink
            route={{route: ROUTES.REGISTRATION}}
            label={"Přejit na registraci"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
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
            <ButtonClick
                size={ButtonSize.BUTTON_SIZE_M}
                onClick={() => {}}
                isDisabled={!_storeRef.current.changed}
                type={ButtonType.BLACK}
                label={t(_locKey + "loginButton")}
            />
        </Form>
        <ButtonLink
            route={{route: ROUTES.FORGOT_PASSWORD}}
            label={"FORGET PASSWORD"}
            type={ButtonType.BLACK}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    </div>
});

export default LoginPage;