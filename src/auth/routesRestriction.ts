import {ROUTES} from "@/src/enums/router.enum";
import {routing} from "@/src/i18n/routing";
import {getBaseRouteFromLocalizedPathname} from "@/src/i18n/localizedRoutes";
import {UserRole} from "@/src/api/openapi";
import {NextAuthRequest} from "next-auth";

export const AdminRoutes = [
    ROUTES.ADMIN_VEHICLE,
    ROUTES.ADMIN_TRIP_DETAIL,
    ROUTES.ADMIN_TRIPS,
    ROUTES.APP_CONFIG,
    ROUTES.EMAIL_CONFIG,
    ROUTES.ADMIN_USERS
]

export const PublicRoutes = [
    ROUTES.SIGN_IN,
    ROUTES.SIGN_UP,
    ROUTES.ACTIVE_USER,
    ROUTES.FORGOT_PASSWORD,
    ROUTES.RESET_PASSWORD,
    ROUTES.HOME,
    ROUTES.CREATE_TRIP,
    ROUTES.TRIP_LIST
]

export const getRedirectUrlIfNeeded = (request: NextAuthRequest): string|null => {
    const currentLocale = (request.nextUrl.locale || routing.defaultLocale).toLocaleLowerCase();
    const localizedPathname = request.nextUrl.pathname;
    const baseRoute = getBaseRouteFromLocalizedPathname(localizedPathname, currentLocale);
    const isAuthenticated = request.auth !== null;
    const isAdmin = request.auth?.user?.role === UserRole.ADMIN;

    if (baseRoute) {
        const isPublicRoute = PublicRoutes.includes(baseRoute);
        const isAdminRoute = AdminRoutes.includes(baseRoute);

        if (isAdminRoute && !isAdmin) {
            const homePath = routing.pathnames[ROUTES.HOME];
            const redirectPath = homePath[currentLocale as keyof typeof homePath];
            return `/${currentLocale}${redirectPath}`;
        }

        if (!isPublicRoute && !isAuthenticated) {
            const signInPath = routing.pathnames[ROUTES.SIGN_IN];
            const redirectPath = signInPath[currentLocale as keyof typeof signInPath];
            return `/${currentLocale}${redirectPath}`;
        }
    }
    return null;
}