import React from "react";
import {ButtonClick, ButtonLink, ButtonSize, ButtonType} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {useRouter} from "@/src/i18n/navigation";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useTranslate} from "@/src/hooks/translateHook";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ContextMenu, IContextItem} from "@/src/components/components/context-menu/context-menu";
import {UserRole} from "@/src/api/openapi";
import {UserName} from "@/src/components/compositions/user/user-name";
import {IconType} from "@/src/enums/icon.enum";
import {Icon} from "@/src/components/components/icon/icon";
import {User} from "@/src/data/users/user";
import {FlexGap} from "@/src/enums/layout.enum";
import {LocaleSwitcherSelect} from "@/src/components/components/locale-switcher-select/locale-switcher-select";
import {useSession} from "next-auth/react"

export const HeaderUserSection = () => {
    const router = useRouter();
    const {user} = useLoggedUser();
    const {t} = useTranslate("component.pageNames");
    const {t: tHeader} = useTranslate("component.header");
    const { update } = useSession();

    const createContextItems = (): IContextItem[] => {
        const items: IContextItem[] = [
            {
                label: t("userSettings"),
                onClick: () => {
                    router.push(ROUTES.USER_SETTINGS);
                }
            }
        ]
        items.push({
            label: t("tripDraftList"),
            onClick: () => {
                router.push(ROUTES.TRIP_DRAFT_LIST);
            }
        })
        if (user?.role === UserRole.TRANSPORTER) {
            items.push({
                label: t("vehicles"),
                onClick: () => {
                    router.push(ROUTES.VEHICLES);
                }
            })
        }
        if (user?.role === UserRole.ADMIN) {
            items.push({
                label: t("appConfig"),
                onClick: () => {
                    router.push(ROUTES.APP_CONFIG);
                }
            })
        }
        if (user?.role === UserRole.ADMIN) {
            items.push({
                label: t("emailConfig"),
                onClick: () => {
                    router.push(ROUTES.EMAIL_CONFIG);
                }
            })
        }

        return items;
    }

    const _renderLogoutButton = () => {
        return <ButtonClick
            controlled={true}
            size={ButtonSize.BY_CONTENT}
            label={tHeader("logoutButton")}
            onClick={async () => {
                await AuthorizationService.logout();
                await update();
                router.push(ROUTES.SIGN_IN);
            }}
            type={ButtonType.BASE}
        />
    }

    const _renderUserName = (user: User) => {
        return <ButtonLink
            route={{
                route: ROUTES.USER_SETTINGS
            }}
            type={ButtonType.BASE}
            size={ButtonSize.BY_CONTENT}
        >
            <UserName user={user} />
        </ButtonLink>
    }

    return <LayoutFlexRow gap={FlexGap.LARGE_32}>
        <LocaleSwitcherSelect />
        {user !== null && _renderUserName(user)}
        {user !== null && _renderLogoutButton()}
        {user !== null && <ContextMenu
            opener={<Icon icon={IconType.MENU}/>}
            items={createContextItems()}
        />}
    </LayoutFlexRow>
};