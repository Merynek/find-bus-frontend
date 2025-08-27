'use client'

import React from "react";
import {resetPasswordFormAction} from "@/src/app/actions/forms/resetPassword/resetPasswordFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";
import {FlexGap} from "@/src/enums/layout.enum";
import { LayoutFlexColumn } from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {Heading} from "@/src/components/components/texts/heading";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {ButtonClick, ButtonSize, ButtonType} from "@/src/components/components/button/button";

interface ResetPasswordPageProps {
    token: string;
}

const ResetPasswordPage = (props: ResetPasswordPageProps) => {
    const {token} = props;
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useFormActionState(resetPasswordFormAction, undefined);

    const _renderBody = () => {
        return <LayoutFlexColumn gap={FlexGap.BIG_40}>
            <Heading text={t("resetPasswordHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
            <form action={action}>
                <input type="hidden" name={FormDataEnum.token} value={token + ""} />
                <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                    <FormStatus state={state}/>
                    <LayoutFlexColumn gap={FlexGap.MEDIUM_24}>
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
                    </LayoutFlexColumn>
                    <ButtonClick
                        controlled={false}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                        isDisabled={pending}
                        label={t("resetPasswordButton")}
                    />
                </LayoutFlexColumn>
            </form>
        </LayoutFlexColumn>
    }

    const _renderRequestSentBody = () => {
        return <Heading text={t("resetPasswordSent")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
    }

    return <SignLayout>
        {state?.success ? _renderRequestSentBody() : _renderBody()}
    </SignLayout>
};

export default ResetPasswordPage;