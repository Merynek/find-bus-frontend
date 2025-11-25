'use client'

import React from "react";
import {forgotPasswordFormAction} from "@/src/server-actions/forms/forgotPassword/forgotPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {useTranslate} from "@/src/hooks/translateHook";

const ForgotPasswordPage = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useFormActionState(forgotPasswordFormAction, undefined);

    const _renderBody = () => {
        return <LayoutFlexColumn gap={FlexGap.BIG_40}>
            <Heading text={t("forgetPasswordHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
            <form action={action}>
                <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                    <FormStatus state={state} locKey={"page.sign"} />
                    <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
                        <TextBox
                            controlled={false}
                            name={FormDataEnum.email}
                            id={FormDataEnum.email}
                            type={TextBoxType.EMAIL}
                            placeholder={t("emailPlaceholder")}
                            defaultValue={state?.data?.email}
                        />
                        <ButtonClick
                            controlled={false}
                            type={ButtonType.BLACK}
                            size={ButtonSize.BUTTON_SIZE_M}
                            isDisabled={pending}
                            label={t("forgetPasswordButton")}
                        />
                    </LayoutFlexColumn>
                </LayoutFlexColumn>
            </form>
        </LayoutFlexColumn>
    }

    const _renderRequestSentBody = () => {
        return <Heading text={t("forgetPasswordSent")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
    }

    return <SignLayout>
        {state?.success ? _renderRequestSentBody() : _renderBody()}
    </SignLayout>
};

export default ForgotPasswordPage;