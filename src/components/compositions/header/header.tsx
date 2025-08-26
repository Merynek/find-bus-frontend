"use client";

import React from "react";
import {ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {LocaleSwitcherSelect} from "@/src/components/components/locale-switcher-select/LocaleSwitcherSelect";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useTranslate} from "@/src/hooks/translateHook";
import {HeaderUserSection} from "@/src/components/compositions/header/header-user-section";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {Logo} from "@/src/components/components/logo/logo";

export const Header = () => {
    const {user} = useLoggedUser();
    const {t} = useTranslate("component.header");

    const _renderLoginButton = () => {
        return <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={t("loginButton")}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    return <header>
        <LayoutFlexRow>
            <Logo />
            <LocaleSwitcherSelect/>
            {user === null && _renderLoginButton()}
            <LayoutFlexRow justifyContent={"flex-end"} style={{width: "100%"}} gap={FlexGap.LARGE_32}>
                {user !== null && <PageTabs user={user}/>}
                <div>|</div>
                {user !== null && <HeaderUserSection />}
            </LayoutFlexRow>
        </LayoutFlexRow>
    </header>
};