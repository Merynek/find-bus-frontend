import React from "react";
import styles from "./page-tabs.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {User} from "@/src/data/users/user";
import {useTranslate} from "@/src/hooks/translateHook";
import {useCurrentRoute} from "@/src/hooks/routesHook";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {FlexGap} from "@/src/enums/layout.enum";

interface IPageTabsProps {
    user: User|null;
}

export const PageTabs = (props: IPageTabsProps) => {
    const {user} = props;
    const {t} = useTranslate("component.pageNames");
    const route = useCurrentRoute();
    const isNotAdmin = user ? user.role !== UserRole.ADMIN : true;

    return <nav className={styles.layout}>
        <LayoutFlexRow htmlTag={"ul"} style={{width: "100%"}} gap={FlexGap.LARGE_32}>
            <li>
                <ButtonLink
                    route={{route: ROUTES.HOME}}
                    label={t("home")}
                    type={route === ROUTES.HOME ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </li>
            {isNotAdmin && <ButtonLink
                route={{route: ROUTES.CREATE_TRIP}}
                label={t("createTrip")}
                type={route === ROUTES.CREATE_TRIP ? ButtonType.YELLOW : ButtonType.BASE}
                size={ButtonSize.BUTTON_SIZE_M}
            />}
            {isNotAdmin && <li>
                <ButtonLink
                    route={{route: ROUTES.TRIP_LIST}}
                    label={t("tripList")}
                    type={route === ROUTES.TRIP_LIST ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </li>}
            {user?.role === UserRole.ADMIN && <li>
                <ButtonLink
                    route={{route: ROUTES.ADMIN_TRIPS}}
                    label={t("adminTrips")}
                    type={route === ROUTES.ADMIN_TRIPS ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </li>}
            {user?.role === UserRole.ADMIN && <li>
                <ButtonLink
                    route={{route: ROUTES.ADMIN_USERS}}
                    label={t("adminUsers")}
                    type={route === ROUTES.ADMIN_USERS ? ButtonType.YELLOW : ButtonType.BASE}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </li>}
        </LayoutFlexRow>
    </nav>
};