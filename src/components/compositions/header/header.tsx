import {useTranslate} from "@/src/hooks/translateHook";
import React from "react";
import styles from "./header.module.scss";
import {ButtonClick, ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {CurrentUser} from "@/src/singletons/current-user";
import {observer} from "mobx-react";
// import {ComboBox, IComboBoxItem} from "../../components/inputs/combo-box/combo-box";
// import {languages} from "@/src/locales/locales";
// import {LOCALES} from "@/src/utils/locale";
import {useBean} from "ironbean-react";
import { useRouter } from 'next/navigation';
import {ROUTES} from "@/src/enums/router.enum";
// import i18n from "i18next";


export const Header = observer(() => {
    const _currentUser = useBean(CurrentUser);
    const router = useRouter();
    const {t} = useTranslate();
    const _locKey = "component.header.";
    // const _languageItemsRef = useRef<IComboBoxItem<LOCALES>[]>(Object.values(LOCALES).map(key => {
    //     return {
    //         label: languages[key],
    //         value: key
    //     }
    // }));

    const _renderLogoutButton = () => {
        return <ButtonClick
            size={ButtonSize.BY_CONTENT}
            label={t(_locKey + "logoutButton")}
            onClick={() => {
                _currentUser.logout();
                router.push(ROUTES.LOGIN)
            }}
            type={ButtonType.YELLOW}
        />
    }

    const _renderLoginButton = () => {
        return <ButtonLink
            route={{route: ROUTES.LOGIN}}
            label={t(_locKey + "loginButton")}
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
        {_currentUser.isLoggedIn ? _renderLogoutButton() : _renderLoginButton()}
    </header>
});