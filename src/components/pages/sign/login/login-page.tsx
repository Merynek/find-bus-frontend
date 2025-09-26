'use client'

import React, {useCallback, useEffect} from "react";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "../../../components/button/button";
import {ROUTES, SEARCH_PARAMS} from "@/src/enums/router.enum";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {useCurrentLocale, useTranslate} from "@/src/hooks/translateHook";
import {logoutAction} from "@/src/server-actions/auth/authActions";
import {useSearchParams} from "next/navigation";
import {useRouter} from "@/src/i18n/navigation";
import {userSettingsFormAction} from "@/src/server-actions/forms/signIn/signInFormAction";
import {useFormActionState} from "@/src/hooks/formHook";
import {FormStatus} from "@/src/components/components/form-status/form-status";
import {TextBox, TextBoxType} from "@/src/components/components/inputs/text-box/text-box";
import {FlexGap} from "@/src/enums/layout.enum";
import {LayoutFlexColumn} from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";

const LoginPage = () => {
    const {t} = useTranslate("page.sign");
    const [state, action, pending] = useFormActionState(userSettingsFormAction, undefined);
    const searchParams = useSearchParams();
    const router = useRouter();
    const locale = useCurrentLocale();

    const handleUnauthorizedLogout = useCallback(async () => {
        await logoutAction();
        router.push(ROUTES.SIGN_IN);
    }, [router]);

    useEffect(() => {
        const unauthorized = searchParams.get(SEARCH_PARAMS.UNAUTHORIZED);
        if (unauthorized) {
            handleUnauthorizedLogout();
        }
    }, [searchParams, handleUnauthorizedLogout]);

    return <SignLayout>
            <LayoutFlexColumn gap={FlexGap.BIG_40}>
                <Heading text={t("loginHeading")} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
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
    </SignLayout>
};

export default LoginPage;