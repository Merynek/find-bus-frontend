import {defineRouting} from 'next-intl/routing';
import {LOCALES} from "@/src/enums/locale";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";

export const getSingleRoutePathname = (route: ROUTES) => {
    let cs_CZ_path: string;

    switch (route) {
        case ROUTES.HOME:
            cs_CZ_path = ROUTES.HOME;
            break;
        case ROUTES.SIGN_IN:
            cs_CZ_path = '/prihlaseni';
            break;
        case ROUTES.SIGN_UP:
            cs_CZ_path = '/registrace';
            break;
        case ROUTES.ACTIVE_USER:
            cs_CZ_path = `/aktivace-uctu/[${URL_PARAMS.TOKEN}]`;
            break;
        case ROUTES.RESET_PASSWORD:
            cs_CZ_path = '/obnoveni-hesla';
            break;
        case ROUTES.FORGOT_PASSWORD:
            cs_CZ_path = '/zapomenute-heslo';
            break;
        case ROUTES.USER_SETTINGS:
            cs_CZ_path = '/nastaveni-uzivatele';
            break;
        case ROUTES.TRANSPORT_REQUIREMENTS:
            cs_CZ_path = `/transport-pozadavky`;
            break;
        case ROUTES.VEHICLES:
            cs_CZ_path = '/vozidla';
            break;
        case ROUTES.VEHICLE_EDIT:
            cs_CZ_path = `/nastaveni-vozidla/[${URL_PARAMS.VEHICLE_ID}]`;
            break;
        case ROUTES.DRAFT_TRIP:
            cs_CZ_path = `/nova-cesta/[${URL_PARAMS.TRIP_ID}]`;
            break;
        case ROUTES.CREATE_TRIP:
            cs_CZ_path = `/nova-cesta`;
            break;
        case ROUTES.TRIP_LIST:
            cs_CZ_path = '/cesty';
            break;
        case ROUTES.TRIP_DRAFT_LIST:
            cs_CZ_path = '/koncepty';
            break;
        case ROUTES.TRIP:
            cs_CZ_path = `/cesta/[${URL_PARAMS.TRIP_ID}]`;
            break;
        case ROUTES.ADMIN_TRIPS:
            cs_CZ_path = '/admin/cesty';
            break;
        case ROUTES.APP_CONFIG:
            cs_CZ_path = '/admin/nastaveni';
            break;
        case ROUTES.EMAIL_CONFIG:
            cs_CZ_path = '/admin/emaily';
            break;
        case ROUTES.ADMIN_USERS:
            cs_CZ_path = '/admin/uzivatele';
            break;
        case ROUTES.ADMIN_USER:
            cs_CZ_path = `/admin/uzivatel/[${URL_PARAMS.USER_ID}]`;
            break;
        case ROUTES.ADMIN_TRIP_DETAIL:
            cs_CZ_path = `/admin/cesta/[${URL_PARAMS.TRIP_ID}]`;
            break;
        case ROUTES.ADMIN_VEHICLE:
            cs_CZ_path = `/admin/vozidlo/[${URL_PARAMS.VEHICLE_ID}]`;
            break;
        case ROUTES.ADMIN_TRANSPORT_REQUIREMENTS:
            cs_CZ_path = `/admin/transport-pozadavky/[${URL_PARAMS.USER_ID}]`;
            break;
        default:
            cs_CZ_path = route;
            break;
    }
    return {
        [route]: {
            [LOCALES.cs_CZ]: cs_CZ_path,
            [LOCALES.en_US]: route
        }
    }
};

export const createPathNames = () => {
    return {
        ...getSingleRoutePathname(ROUTES.HOME),
        ...getSingleRoutePathname(ROUTES.SIGN_IN),
        ...getSingleRoutePathname(ROUTES.SIGN_UP),
        ...getSingleRoutePathname(ROUTES.ACTIVE_USER),
        ...getSingleRoutePathname(ROUTES.RESET_PASSWORD),
        ...getSingleRoutePathname(ROUTES.FORGOT_PASSWORD),
        ...getSingleRoutePathname(ROUTES.USER_SETTINGS),
        ...getSingleRoutePathname(ROUTES.TRANSPORT_REQUIREMENTS),
        ...getSingleRoutePathname(ROUTES.VEHICLES),
        ...getSingleRoutePathname(ROUTES.VEHICLE_EDIT),
        ...getSingleRoutePathname(ROUTES.DRAFT_TRIP),
        ...getSingleRoutePathname(ROUTES.CREATE_TRIP),
        ...getSingleRoutePathname(ROUTES.TRIP_LIST),
        ...getSingleRoutePathname(ROUTES.TRIP_DRAFT_LIST),
        ...getSingleRoutePathname(ROUTES.TRIP),
        ...getSingleRoutePathname(ROUTES.ADMIN_TRIPS),
        ...getSingleRoutePathname(ROUTES.APP_CONFIG),
        ...getSingleRoutePathname(ROUTES.EMAIL_CONFIG),
        ...getSingleRoutePathname(ROUTES.ADMIN_USERS),
        ...getSingleRoutePathname(ROUTES.ADMIN_USER),
        ...getSingleRoutePathname(ROUTES.ADMIN_TRIP_DETAIL),
        ...getSingleRoutePathname(ROUTES.ADMIN_VEHICLE),
        ...getSingleRoutePathname(ROUTES.ADMIN_TRANSPORT_REQUIREMENTS),
    }
};

export const routing = defineRouting({
    locales: [LOCALES.cs_CZ, LOCALES.en_US],
    defaultLocale: LOCALES.cs_CZ,
    localePrefix: {
        mode: 'always'
    },
    pathnames: createPathNames()
});