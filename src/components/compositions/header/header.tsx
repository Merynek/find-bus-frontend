import React from "react";
import styles from "./header.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {HeaderLogout} from "@/src/components/compositions/header/header-logout";
import {LocaleSwitcherSelect} from "@/src/components/components/locale-switcher-select/LocaleSwitcherSelect";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {UsersConverter} from "@/src/converters/users/users-converter";

export const Header = async () => {
    const user = await AuthorizationService.getLoggerUser();

    const _renderLogoutButton = () => {
        return <HeaderLogout/>
    }

    const _renderLoginButton = () => {
        return <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={"Login"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    return <header className={styles.layout}>
        <LocaleSwitcherSelect />
        {user === null ? _renderLoginButton() : _renderLogoutButton()}
        {user !== null && <PageTabs userDto={UsersConverter.currentUserToJson(user)}/>}
    </header>
};