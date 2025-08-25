import {routing} from "@/src/i18n/routing";
import {ROUTES} from "@/src/enums/router.enum";

export function getBaseRouteFromLocalizedPathname(localizedPathname: string, currentLocale: string): ROUTES | null {
    const normalizedLocalizedPathname = localizedPathname.toLowerCase();
    const normalizedCurrentLocale = currentLocale.toLowerCase();

    let pathWithoutLocalePrefix = normalizedLocalizedPathname;
    const localesArray = routing.locales;

    for (const locale of localesArray) {
        const prefixInUrl = locale.toLowerCase();
        if (normalizedLocalizedPathname.startsWith(`/${prefixInUrl}`)) {
            pathWithoutLocalePrefix = normalizedLocalizedPathname.substring(`/${prefixInUrl}`.length);
            break;
        }
    }
    if (pathWithoutLocalePrefix === '') {
        pathWithoutLocalePrefix = '/';
    }

    if (pathWithoutLocalePrefix === '/') {
        return ROUTES.HOME;
    }

    for (const routeKey in routing.pathnames) {
        const route = routeKey as ROUTES;
        const localizedPathDefinition = routing.pathnames[route];
        const targetPath = localizedPathDefinition[normalizedCurrentLocale as keyof typeof localizedPathDefinition];

        if (!targetPath) {
            const defaultTargetPath = localizedPathDefinition[routing.defaultLocale.toLowerCase() as keyof typeof localizedPathDefinition];
            if (defaultTargetPath) {
                if (typeof defaultTargetPath === 'string') {
                    const regexPattern = defaultTargetPath.replace(/\[[^\]]+\]/g, '([^/]+)');
                    const regex = new RegExp(`^${regexPattern}$`);
                    if (regex.test(pathWithoutLocalePrefix)) {
                        return route;
                    }
                }
            }
            continue;
        }

        const regexPattern = targetPath.replace(/\[[^\]]+\]/g, '([^/]+)');
        const regex = new RegExp(`^${regexPattern}$`);

        if (regex.test(pathWithoutLocalePrefix)) {
            return route;
        }
    }
    return null;
}