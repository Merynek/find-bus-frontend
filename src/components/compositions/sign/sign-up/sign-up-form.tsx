import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {RadioInput} from "@/src/components/components/inputs/radio-input/radio-input";
import {UserRole} from "@/src/api/openapi";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import React from "react";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useCreateFullUrl} from "@/src/hooks/routesHook";
import {ROUTES} from "@/src/enums/router.enum";
import {useFormActionState} from "@/src/hooks/formHook";
import {signupFormAction} from "@/src/server-actions/forms/signUp/signupFormAction";

export const SignUpForm = () => {
    const {t} = useTranslate("page.sign");
    const {t: commonT} = useTranslate("common");
    const locale = useCurrentLocale();
    const activeLink = useCreateFullUrl(ROUTES.ACTIVE_USER);
    const [state, action, pending] = useFormActionState(signupFormAction, undefined);

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("registrationHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
        <form action={action}>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state} locKey={"page.sign"} />
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.activeUrl} value={activeLink}/>
                <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.email}
                        id={FormDataEnum.email}
                        type={TextBoxType.EMAIL}
                        autoComplete={"username"}
                        placeholder={t("emailPlaceholder")}
                        defaultValue={state?.data?.email}
                    />
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.password}
                        id={FormDataEnum.password}
                        type={TextBoxType.PASSWORD}
                        placeholder={t("passwordPlaceholder")}
                        autoComplete={"new-password"}
                        defaultValue={state?.data?.password}
                    />
                    <TextBox
                        controlled={false}
                        name={FormDataEnum.password_confirm}
                        id={FormDataEnum.password_confirm}
                        type={TextBoxType.PASSWORD}
                        placeholder={t("passwordConfirmPlaceholder")}
                        autoComplete={"new-password"}
                        defaultValue={state?.data?.passwordConfirm}
                    />
                    <RadioInput
                        id={UserRole.TRANSPORTER}
                        name={FormDataEnum.role}
                        value={UserRole.TRANSPORTER}
                        label={commonT("transporter")}
                    />
                    <RadioInput
                        id={UserRole.DEMANDER}
                        name={FormDataEnum.role}
                        value={UserRole.DEMANDER}
                        label={commonT("demander")}
                    />
                </LayoutFlexColumn>
                <ButtonClick
                    controlled={false}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                    isDisabled={pending}
                    label={t("registrationButton")}
                />
            </LayoutFlexColumn>
        </form>
    </LayoutFlexColumn>
}