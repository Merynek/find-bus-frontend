import React from "react";
import styles from "./header.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {HeaderLogout} from "@/src/components/compositions/header/header-logout";
import {CurrentUserDto} from "@/src/api/openapi";
import {auth} from "@/src/auth/auth";
import {LocaleSwitcherSelect} from "@/src/components/components/locale-switcher-select/LocaleSwitcherSelect";

export const Header = async () => {
    const session = await auth();
    const userDto: CurrentUserDto|null = session?.user || null;

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
        {userDto === null ? _renderLoginButton() : _renderLogoutButton()}
        {userDto !== null && <PageTabs userDto={userDto}/>}
    </header>
};