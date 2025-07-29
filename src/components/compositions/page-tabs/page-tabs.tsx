import React from "react";
import styles from "./page-tabs.module.scss";
import {ButtonSize, ButtonType, ButtonLink} from "../../components/button/button";
import {cn} from "@/src/utils/common";
import {type CurrentUserDto, UserRole} from "@/src/api/openapi";
import {ROUTES} from "@/src/enums/router.enum";
import {headers} from "next/headers";
import {getTranslations} from "next-intl/server";

interface IPageTabsProps {
    userDto: CurrentUserDto|null;
}

export const PageTabs = async (props: IPageTabsProps) => {
    const {userDto} = props;
    const headerList = await headers();
    const messages = await getTranslations("page");
    const pathname = headerList.get("x-current-path");

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
        {userDto?.role === UserRole.DEMANDER &&
            <div className={cn(styles.tab, pathname === ROUTES.CREATE_TRIP && styles.active)}>
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
        {userDto?.role === UserRole.TRANSPORTER &&
            <div className={cn(styles.tab, pathname === ROUTES.VEHICLES && styles.active)}>
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
        {userDto?.role === UserRole.ADMIN &&
            <div className={cn(styles.tab, pathname === ROUTES.ADMIN_TRIPS && styles.active)}>
                <ButtonLink
                    route={{route: ROUTES.ADMIN_TRIPS}}
                    label={"ADMIN TRIPS"}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </div>}
        {userDto?.role === UserRole.ADMIN &&
            <div className={cn(styles.tab, pathname === ROUTES.APP_CONFIG && styles.active)}>
                <ButtonLink
                    route={{route: ROUTES.APP_CONFIG}}
                    label={"APP CONFIG"}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </div>}
        {userDto?.role === UserRole.ADMIN &&
            <div className={cn(styles.tab, pathname === ROUTES.EMAIL_CONFIG && styles.active)}>
                <ButtonLink
                    route={{route: ROUTES.EMAIL_CONFIG}}
                    label={"EMAIL CONFIG"}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </div>}
        {userDto?.role === UserRole.ADMIN &&
            <div className={cn(styles.tab, pathname === ROUTES.ADMIN_USERS && styles.active)}>
                <ButtonLink
                    route={{route: ROUTES.ADMIN_USERS}}
                    label={"USERS"}
                    type={ButtonType.BLACK}
                    size={ButtonSize.BUTTON_SIZE_M}
                />
            </div>}
        <div>{messages("sign.emailPlaceholder")}: {userDto?.email} as a {userDto?.role.toString()}</div>
    </div>
};