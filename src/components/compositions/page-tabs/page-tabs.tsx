import React from "react";
import styles from "./page-tabs.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {User} from "@/src/data/users/user";
import {useTranslate} from "@/src/hooks/translateHook";
import {useCurrentRoute} from "@/src/hooks/routesHook";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";

interface IPageTabsProps {
    user: User|null;
}

export const PageTabs = (props: IPageTabsProps) => {
    const {user} = props;
    const {t} = useTranslate("component.pageTabs");
    const route = useCurrentRoute();

    return <div className={styles.layout}>
        <LayoutFlexRow style={{width: "100%"}}>
            <ButtonLink
                route={{route: ROUTES.HOME}}
                label={t("home")}
                type={route === ROUTES.HOME ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            {user?.role === UserRole.DEMANDER &&
                <ButtonLink
                    route={{route: ROUTES.CREATE_TRIP}}
                    label={t("createTrip")}
                    type={route === ROUTES.CREATE_TRIP ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            }
            <ButtonLink
                route={{route: ROUTES.TRIP_LIST}}
                label={t("tripList")}
                type={route === ROUTES.TRIP_LIST ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />
            {user?.role === UserRole.ADMIN &&
                <ButtonLink
                    route={{route: ROUTES.ADMIN_TRIPS}}
                    label={t("adminTrips")}
                    type={route === ROUTES.ADMIN_TRIPS ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            }
            {user?.role === UserRole.ADMIN &&
                <ButtonLink
                    route={{route: ROUTES.ADMIN_USERS}}
                    label={t("adminUsers")}
                    type={route === ROUTES.ADMIN_USERS ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            }
        </LayoutFlexRow>
    </div>
};