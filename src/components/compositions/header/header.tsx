"use client";

import React from "react";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useTranslate} from "@/src/hooks/translateHook";
import {HeaderUserSection} from "@/src/components/compositions/header/header-user-section";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";
import {Logo} from "@/src/components/components/logo/logo";
import {useGa} from "@/src/hooks/gaEventHook";
import {GA_STORAGE} from "@/src/enums/ga.enums";

export const Header = () => {
    const {user} = useLoggedUser();
    const {t} = useTranslate("component.header");
    const {toggleStorageConsent} = useGa();

    const _signButtons = () => {
        return <LayoutFlexRow gap={FlexGap.SMALL_16}>
            <ButtonLink
                route={{route: ROUTES.SIGN_IN}}
                label={t("loginButton")}
                type={ButtonType.YELLOW}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            <ButtonLink
                route={{route: ROUTES.SIGN_UP}}
                label={t("registrationButton")}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </LayoutFlexRow>
    }

    const _gtmPermissions = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={"GTM permissions"}
            onClick={async () => {
                toggleStorageConsent(GA_STORAGE.ANALYTICS_STORAGE, true);
                toggleStorageConsent(GA_STORAGE.AD_STORAGE, true);
            }}
            type={ButtonType.BASE}
        />
    }

    return <header>
        <LayoutFlexRow>
            <Logo />
            <LayoutFlexRow justifyContent={"flex-end"} style={{width: "100%"}} gap={FlexGap.LARGE_32}>
                <PageTabs user={user}/>
                <div>|</div>
                {user === null && _signButtons()}
                {_gtmPermissions()}
                {user !== null && <HeaderUserSection/>}
            </LayoutFlexRow>
        </LayoutFlexRow>
    </header>
};