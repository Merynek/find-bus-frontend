"use client";

import React from "react";
import {ButtonSize, ButtonType, ButtonLink, ButtonClick} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {LocaleSwitcherSelect} from "@/src/components/components/locale-switcher-select/LocaleSwitcherSelect";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {useRouter} from "@/src/i18n/navigation";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useTranslate} from "@/src/hooks/translateHook";

export const Header = () => {
    const router = useRouter();
    const {user} = useLoggedUser();
    const {t} = useTranslate("page.sign");

    const _renderLogoutButton = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={"Logout"}
            onClick={async () => {
                await AuthorizationService.logout();
                router.push(ROUTES.SIGN_IN);
                router.refresh();
            }}
            type={ButtonType.YELLOW}
        />
    }

    const _renderLoginButton = () => {
        return <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={"Login"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    return <header>
        <LocaleSwitcherSelect/>
        {user === null ? _renderLoginButton() : _renderLogoutButton()}
        {user !== null && <PageTabs user={user}/>}
        {user !== null && <div>{t("emailPlaceholder")}: {user?.email} as a {user?.role.toString()}</div>}
    </header>
};