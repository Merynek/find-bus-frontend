import {routing} from "@/src/i18n/routing";
import {ROUTES} from "@/src/enums/router.enum";
import {LOCALES} from "@/src/enums/locale";

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

export function getLocalizedRouteUrl(route: ROUTES, locale: LOCALES, protocol: string, host: string): string {
    const defaultLocale = routing.defaultLocale.toLowerCase();
    const currentLocaleLower = locale.toLowerCase();
    const pathNamesMap = routing.pathnames[route];
    let localizedPathCandidate = pathNamesMap?.[currentLocaleLower as keyof typeof pathNamesMap];

    if (!localizedPathCandidate) {
        localizedPathCandidate = pathNamesMap?.[defaultLocale as keyof typeof pathNamesMap];
    }
    let localizedPath: string = (localizedPathCandidate || route) as string;
    if (localizedPath && !localizedPath.startsWith('/')) {
        localizedPath = `/${localizedPath}`;
    }

    const localePrefix = `/${currentLocaleLower}`;

    let pathSegment = localizedPath.startsWith('/') ? localizedPath.substring(1) : localizedPath;

    if (route === ROUTES.HOME) {
        pathSegment = '';
    }

    let fullUrl = `${protocol}//${host}${localePrefix}`;

    if (pathSegment.length > 0) {
        fullUrl += `/${pathSegment}`;
    } else if (fullUrl.slice(-1) !== '/') {
        fullUrl += '/';
    }

    return fullUrl;
}

export function getLocaleFromPathname(pathname: string): LOCALES|null {
    const allPathNames = routing.pathnames;
    const allLocales = routing.locales;

    const normalizedPathname = pathname.toLowerCase().startsWith('/')
        ? pathname.toLowerCase().substring(1)
        : pathname.toLowerCase();

    if (normalizedPathname === '' || normalizedPathname === '/') {
        return routing.defaultLocale;
    }

    const firstSegment = normalizedPathname.split('/')[0];

    for (const locale of allLocales) {
        if (firstSegment.toLowerCase() === locale.toLowerCase()) {
            return locale as LOCALES;
        }
    }

    for (const routeKey in allPathNames) {
        const localizedPathDefinition = allPathNames[routeKey as ROUTES];
        for (const localeKey of allLocales) {
            const locale = localeKey.toLowerCase();
            const localizedPath = localizedPathDefinition[locale as keyof typeof localizedPathDefinition];

            if (localizedPath && typeof localizedPath === 'string') {
                const pathSegment = localizedPath.toLowerCase().startsWith('/')
                    ? localizedPath.toLowerCase().substring(1).split('/')[0]
                    : localizedPath.toLowerCase().split('/')[0];

                const segmentToCompare = pathSegment.includes('[')
                    ? pathSegment.substring(0, pathSegment.indexOf('['))
                    : pathSegment;

                if (firstSegment === segmentToCompare) {
                    return localeKey as LOCALES;
                }
            }
        }
    }
    return null;
}