'use client'

import React from "react";
import {UserRole} from "@/src/api/openapi";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {signupFormAction} from "@/src/app/actions/forms/signUp/signupFormAction";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {RadioInput} from "@/src/components/components/inputs/radio-input/radio-input";
import {PageWrapper} from "@/src/components/components/layout/page-wrapper/page-wrapper";

const RegistrationPage = () => {
    const {t} = useTranslate("page.sign");
    const {t: commonT} = useTranslate("common");
    const [state, action, pending] = useFormActionState(signupFormAction, undefined)
    const locale = useCurrentLocale();

    return <PageWrapper>
        <LayoutFlexColumn gap={FlexGap.BIG_40}>
            <Heading text={t("registrationHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3}/>
            <form action={action}>
                <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
                <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                    <FormStatus state={state}/>
                    <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                        <TextBox
                            controlled={false}
                            name={FormDataEnum.email}
                            id={FormDataEnum.email}
                            type={TextBoxType.EMAIL}
                            placeholder={t("emailPlaceholder")}
                            defaultValue={state?.data?.email}
                        />
                        <TextBox
                            controlled={false}
                            name={FormDataEnum.password}
                            id={FormDataEnum.password}
                            type={TextBoxType.PASSWORD}
                            placeholder={t("passwordPlaceholder")}
                            defaultValue={state?.data?.password}
                        />
                        <TextBox
                            controlled={false}
                            name={FormDataEnum.password_confirm}
                            id={FormDataEnum.password_confirm}
                            type={TextBoxType.PASSWORD}
                            placeholder={t("passwordConfirmPlaceholder")}
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
    </PageWrapper>
};

export default RegistrationPage;