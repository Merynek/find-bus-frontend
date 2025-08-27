import React from "react";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ButtonLink, ButtonSize, ButtonType} from "@/src/components/components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {FlexGap} from "@/src/enums/layout.enum";
import {Heading} from "@/src/components/components/texts/heading";
import {FontWeight} from "@/src/components/components/texts/textStyles";
import { LayoutFlexColumn } from "@/src/components/components/layout/layout-flex-column/layout-flex-column";
import {getTranslations} from 'next-intl/server';
import {SignLayout} from "@/src/components/components/layout/page-wrapper/sign-layout";

interface ActiveUserPageProps {
    code?: string;
}

export default async function ActiveUserPage(props: ActiveUserPageProps) {
    const { code } = props;
    const t = await getTranslations("page.sign");

    let activationResult = false;
    let messageKey = t("activeAccountMessageInvalidCode");
    let headingKey = t("activeAccountHeadingError");

    if (code) {
        try {
            await AuthorizationService.activeUser(code);
            activationResult = true;
            headingKey = t("activeAccountHeadingSuccess");
            messageKey = t("activeAccountMessageSuccess");
        } catch (error) {
            console.error('Došlo k chybě při aktivaci:', error);
        }
    }

    return (
        <SignLayout>
            <LayoutFlexColumn gap={FlexGap.BIG_40}>
                <Heading text={headingKey} fontWeight={FontWeight.SEMIBOLD} headingLevel={3} />
                <div className="flex flex-col items-center justify-center p-5 text-center max-w-2xl mx-auto border border-gray-200 rounded-lg shadow-md bg-white">
                    <div className={`text-4xl font-bold mb-4 ${activationResult ? "text-green-600" : "text-red-600"}`}>
                        {activationResult ? "✅" : "❌"}
                    </div>
                    <p className="text-lg leading-relaxed text-gray-700">{messageKey}</p>
                    <div className="mt-8">
                        <ButtonLink
                            route={{ route: ROUTES.SIGN_IN }}
                            label={t("loginAfterActivation")}
                            type={ButtonType.YELLOW}
                            size={ButtonSize.BUTTON_SIZE_M}
                        />
                    </div>
                </div>
            </LayoutFlexColumn>
        </SignLayout>
    );
}