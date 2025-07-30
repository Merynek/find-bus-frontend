import {routing} from "@/src/i18n/routing";
import {ROUTES} from "@/src/enums/router.enum";

export function getBaseRouteFromLocalizedPathname(localizedPathname: string, currentLocale: string): ROUTES | null {
    for (const routeKey in routing.pathnames) {
        const route = routeKey as ROUTES;
        const localizedPathDefinition = routing.pathnames[route];

        let targetPath: string;

        if (typeof localizedPathDefinition === 'string') {
            targetPath = localizedPathDefinition;
        } else {
            targetPath = localizedPathDefinition[currentLocale as keyof typeof localizedPathDefinition];
        }

        const regexPattern = targetPath.replace(/\[[^\]]+\]/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);

        if (regex.test(localizedPathname)) {
            return route;
        }
    }
    return null;
}