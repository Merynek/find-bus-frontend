import {usePathname} from "next/navigation";
import {getBaseRouteFromLocalizedPathname} from "@/src/i18n/localizedRoutes";
import {useCurrentLocale} from "@/src/hooks/translateHook";
import {ROUTES} from "@/src/enums/router.enum";

export const useCurrentRoute = (): ROUTES|null => {
    const pathname = usePathname();
    const locale = useCurrentLocale();
    let currentRoute = null;
    if (pathname) {
        currentRoute = getBaseRouteFromLocalizedPathname(pathname, locale);
    }
    return currentRoute;
}