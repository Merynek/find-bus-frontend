import {usePathname} from "next/navigation";
import {getBaseRouteFromLocalizedPathname, getLocalizedRouteUrl} from "@/src/i18n/localizedRoutes";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {ROUTES} from "@/src/enums/router.enum";
import { useState } from "react";

export const useCurrentRoute = (): ROUTES|null => {
    const pathname = usePathname();
    const locale = useCurrentLocale();
    let currentRoute = null;
    if (pathname) {
        currentRoute = getBaseRouteFromLocalizedPathname(pathname, locale);
    }
    return currentRoute;
}

export const useCurrentFullUrl = (): string => {
    const [fullUrl] = useState<string>(() => {
        if (typeof window !== "undefined") {
            return window.location.href;
        }
        return "";
    });

    return fullUrl;
}

export const useCreateFullUrl = (route: ROUTES): string => {
    const locale = useCurrentLocale();

    if (typeof window !== "undefined") {
        if (typeof window !== "undefined") {
            const protocol = window.location.protocol;
            const host = window.location.host;
            return getLocalizedRouteUrl(route, locale, protocol, host);
        }
    }

    return "";
}