import React from "react";
import styles from "./page-tabs.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {User} from "@/src/data/users/user";
import {useTranslate} from "@/src/hooks/translateHook";
import {useCurrentRoute} from "@/src/hooks/routesHook";

interface IPageTabsProps {
    user: User|null;
}

export const PageTabs = (props: IPageTabsProps) => {
    const {user} = props;
    const {t} = useTranslate("page.sign");
    const route = useCurrentRoute();

    return <div className={styles.layout}>
        <ButtonLink
            route={{route: ROUTES.HOME}}
            label={"HOME"}
            type={route === ROUTES.HOME ? ButtonType.YELLOW : ButtonType.BASE}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        <ButtonLink
            route={{route: ROUTES.USER_SETTINGS}}
            label={"USER_SETTINGS"}
            type={route === ROUTES.USER_SETTINGS ? ButtonType.YELLOW : ButtonType.BASE}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        {user?.role === UserRole.DEMANDER &&
            <ButtonLink
                route={{route: ROUTES.CREATE_TRIP}}
                label={"CREATE_TRIP"}
                type={route === ROUTES.CREATE_TRIP ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        <ButtonLink
            route={{route: ROUTES.TRIP_LIST}}
            label={"TRIP_LIST"}
            type={route === ROUTES.TRIP_LIST ? ButtonType.YELLOW : ButtonType.BASE}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        {user?.role === UserRole.TRANSPORTER &&
            <ButtonLink
                route={{route: ROUTES.VEHICLES}}
                label={"VEHICLES"}
                type={route === ROUTES.VEHICLES ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        <ButtonLink
            route={{route: ROUTES.RESET_PASSWORD}}
            label={"RESET_PASSWORD"}
            type={route === ROUTES.RESET_PASSWORD ? ButtonType.YELLOW : ButtonType.BASE}
            size={ButtonSize.BUTTON_SIZE_M}
        />
        {user?.role === UserRole.ADMIN &&
            <ButtonLink
                route={{route: ROUTES.ADMIN_TRIPS}}
                label={"ADMIN TRIPS"}
                type={route === ROUTES.ADMIN_TRIPS ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        {user?.role === UserRole.ADMIN &&
            <ButtonLink
                route={{route: ROUTES.APP_CONFIG}}
                label={"APP CONFIG"}
                type={route === ROUTES.APP_CONFIG ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        {user?.role === UserRole.ADMIN &&
            <ButtonLink
                route={{route: ROUTES.EMAIL_CONFIG}}
                label={"EMAIL CONFIG"}
                type={route === ROUTES.EMAIL_CONFIG ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        {user?.role === UserRole.ADMIN &&
            <ButtonLink
                route={{route: ROUTES.ADMIN_USERS}}
                label={"USERS"}
                type={route === ROUTES.ADMIN_USERS ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        }
        <div>{t("emailPlaceholder")}: {user?.email} as a {user?.role.toString()}</div>
    </div>
};