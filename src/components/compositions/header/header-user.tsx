import React from "react";
import {ButtonSize, ButtonType, ButtonClick} from "../../components/button/button";
import {ROUTES} from "@/src/enums/router.enum";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {useRouter} from "@/src/i18n/navigation";
import {useLoggedUser} from "@/src/hooks/authenticationHook";
import {useTranslate} from "@/src/hooks/translateHook";
import {LayoutFlexRow} from "@/src/components/components/layout/layout-flex-row/layout-flex-row";
import {ContextMenu, IContextItem} from "@/src/components/components/context-menu/context-menu";
import {UserRole} from "@/src/api/openapi";

export const HeaderUserSection = () => {
    const router = useRouter();
    const {user} = useLoggedUser();
    const {t} = useTranslate("component.pageNames");
    const {t: tHeader} = useTranslate("component.header");

    const createContextItems = (): IContextItem[] => {
        const items: IContextItem[] = [
            {
                label: t("userSettings"),
                onClick: () => {
                    router.push(ROUTES.USER_SETTINGS);
                }
            }
        ]
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
            size={ButtonSize.BUTTON_SIZE_M}
            label={tHeader("logoutButton")}
            onClick={async () => {
                await AuthorizationService.logout();
                router.push(ROUTES.SIGN_IN);
                router.refresh();
            }}
            type={ButtonType.YELLOW}
        />
    }

    return <LayoutFlexRow>
        {user !== null && _renderLogoutButton()}
        {user !== null && <ContextMenu
            opener={<div>{"USER"}: {user.email} as a {user.role.toString()}</div>}
            items={createContextItems()}
        />}
    </LayoutFlexRow>
};