import React from "react";
import styles from "./page-tabs.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {cn} from "@/src/utils/common";
import {observer} from "mobx-react";
import {CurrentUser} from "@/src/singletons/current-user";
import {UserRole} from "@/src/api/openapi";
import {useBean} from "ironbean-react";
import {useLocation} from "react-router-dom";
import {ROUTES} from "@/src/enums/router.enum";

export interface IPageTabsProps {
}

export const PageTabs = observer((props: IPageTabsProps) => {
    const _currentUser = useBean(CurrentUser);
    const { pathname } = useLocation();

    return <div className={styles.layout}>
        <div className={cn(styles.tab, pathname === ROUTES.HOME && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.HOME}}
                label={"HOME"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>
        <div className={cn(styles.tab, pathname === ROUTES.USER_SETTINGS && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.USER_SETTINGS}}
                label={"USER_SETTINGS"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>
        {_currentUser.role === UserRole.DEMANDER && <div className={cn(styles.tab, pathname === ROUTES.CREATE_TRIP && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.CREATE_TRIP}}
                label={"CREATE_TRIP"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        <div className={cn(styles.tab, pathname === ROUTES.TRIP_LIST && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.TRIP_LIST}}
                label={"TRIP_LIST"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>
        {_currentUser.role === UserRole.TRANSPORTER && <div className={cn(styles.tab, pathname === ROUTES.VEHICLES && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.VEHICLES}}
                label={"VEHICLES"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        <div className={cn(styles.tab, pathname === ROUTES.RESET_PASSWORD && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.RESET_PASSWORD}}
                label={"RESET_PASSWORD"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>
        {_currentUser.role === UserRole.ADMIN && <div className={cn(styles.tab, pathname === ROUTES.ADMIN_TRIPS && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.ADMIN_TRIPS}}
                label={"ADMIN TRIPS"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        {_currentUser.role === UserRole.ADMIN && <div className={cn(styles.tab, pathname === ROUTES.APP_CONFIG && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.APP_CONFIG}}
                label={"APP CONFIG"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        {_currentUser.role === UserRole.ADMIN && <div className={cn(styles.tab, pathname === ROUTES.EMAIL_CONFIG && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.EMAIL_CONFIG}}
                label={"EMAIL CONFIG"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        {_currentUser.role === UserRole.ADMIN && <div className={cn(styles.tab, pathname === ROUTES.ADMIN_USERS && styles.active)}>
            <ButtonLink
                route={{route: ROUTES.ADMIN_USERS}}
                label={"USERS"}
                type={ButtonType.BLACK}
                size={ButtonSize.BUTTON_SIZE_M}
            />
        </div>}
        <div>Logged user: {_currentUser.email} as a {_currentUser.role.toString()}</div>
    </div>
});