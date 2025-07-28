import React from "react";
import styles from "./header.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {PageTabs} from "@/src/components/compositions/page-tabs/page-tabs";
import {CheckTokenResponseDto} from "@/src/api/openapi";
import {HeaderLogout} from "@/src/components/compositions/header/header-logout";

interface IHeaderProps {
    user: CheckTokenResponseDto|null;
}

export const Header = (props: IHeaderProps) => {
    const {user} = props;

    const _renderLogoutButton = () => {
        return <HeaderLogout />
    }

    const _renderLoginButton = () => {
        return <ButtonLink
            route={{route: ROUTES.SIGN_IN}}
            label={"Login"}
            type={ButtonType.YELLOW}
            size={ButtonSize.BUTTON_SIZE_M}
        />
    }

    const _renderLanguages = () => {
        return <></>
        // return <></> <ComboBox
        //     items={_languageItemsRef.current}
        //     value={{
        //         value: i18n.language as LOCALES,
        //         label: languages[i18n.language as LOCALES]
        //     }}
        //     onChange={(item) => {
        //         i18n.changeLanguage(item.value);
        //     }}
        // />
    }

    return <header className={styles.layout}>
        {_renderLanguages()}
        {user === null ? _renderLoginButton() : _renderLogoutButton()}
        {user !== null && <PageTabs user={user} />}
    </header>
};