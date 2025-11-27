import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import React from "react";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {useFormActionState} from "@/src/hooks/formHook";
import {userSettingsFormAction} from "@/src/server-actions/forms/signIn/signInFormAction";

export const SignInForm = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useFormActionState(userSettingsFormAction, undefined);
    const locale = useCurrentLocale();

    return <LayoutFlexColumn gap={FlexGap.BIG_40}>
        <Heading text={t("loginHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
        <form action={action}>
            <input type={"hidden"} id={FormDataEnum.locale} name={FormDataEnum.locale} value={locale}/>
            <LayoutFlexColumn gap={FlexGap.LARGE_32}>
                <FormStatus state={state} locKey={"page.sign"} />
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
                        autoComplete={"current-password"}
                        placeholder={t("passwordPlaceholder")}
                        defaultValue={state?.data?.password}
                    />
                    <ButtonClick
                        controlled={false}
                        type={ButtonType.BLACK}
                        size={ButtonSize.BUTTON_SIZE_M}
                        isDisabled={pending}
                        label={t("login")}
                    />
                </LayoutFlexColumn>
            </LayoutFlexColumn>
        </form>
        <LayoutFlexColumn gap={FlexGap.TINY_8}>
            <ButtonLink
                route={{route: ROUTES.FORGOT_PASSWORD}}
                label={t("forgetPassword")}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            <ButtonLink
                route={{route: ROUTES.SIGN_UP}}
                label={t("registration")}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </LayoutFlexColumn>
    </LayoutFlexColumn>
}