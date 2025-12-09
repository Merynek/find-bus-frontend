import {defineRouting} from 'next-intl/routing';
import {LOCALES} from "@/src/enums/locale";
import {ROUTES, URL_PARAMS} from "@/src/enums/router.enum";

export const routing = defineRouting({
    locales: [LOCALES.cs_CZ, LOCALES.en_US],
    defaultLocale: LOCALES.cs_CZ,
    localePrefix: {
        mode: 'always'
    },
    pathnames: {
        [ROUTES.HOME]: {
            [LOCALES.cs_CZ]: ROUTES.HOME,
            [LOCALES.en_US]: ROUTES.HOME
        },
        [ROUTES.SIGN_IN]: {
            [LOCALES.cs_CZ]: '/prihlaseni',
            [LOCALES.en_US]: ROUTES.SIGN_IN
        },
        [ROUTES.SIGN_UP]: {
            [LOCALES.cs_CZ]: '/registrace',
            [LOCALES.en_US]: ROUTES.SIGN_UP
        },
        [ROUTES.ACTIVE_USER]: {
            [LOCALES.cs_CZ]: `/aktivace-uctu/[${URL_PARAMS.TOKEN}]`,
            [LOCALES.en_US]: ROUTES.ACTIVE_USER
        },
        [ROUTES.RESET_PASSWORD]: {
            [LOCALES.cs_CZ]: '/obnoveni-hesla',
            [LOCALES.en_US]: ROUTES.RESET_PASSWORD
        },
        [ROUTES.FORGOT_PASSWORD]: {
            [LOCALES.cs_CZ]: '/zapomenute-heslo',
            [LOCALES.en_US]: ROUTES.FORGOT_PASSWORD
        },
        [ROUTES.USER_SETTINGS]: {
            [LOCALES.cs_CZ]: '/nastaveni-uzivatele',
            [LOCALES.en_US]: ROUTES.USER_SETTINGS
        },
        [ROUTES.TRANSPORT_REQUIREMENTS]: {
            [LOCALES.cs_CZ]: `/transport-pozadavky`,
            [LOCALES.en_US]: ROUTES.TRANSPORT_REQUIREMENTS
        },
        [ROUTES.VEHICLES]: {
            [LOCALES.cs_CZ]: '/vozidla',
            [LOCALES.en_US]: ROUTES.VEHICLES
        },
        [ROUTES.VEHICLE_EDIT]: {
            [LOCALES.cs_CZ]: `/nastaveni-vozidla/[${URL_PARAMS.VEHICLE_ID}]`,
            [LOCALES.en_US]: ROUTES.VEHICLE_EDIT
        },
        [ROUTES.DRAFT_TRIP]: {
            [LOCALES.cs_CZ]: `/nova-cesta/[${URL_PARAMS.TRIP_ID}]`,
            [LOCALES.en_US]: ROUTES.DRAFT_TRIP
        },
        [ROUTES.CREATE_TRIP]: {
            [LOCALES.cs_CZ]: `/nova-cesta`,
            [LOCALES.en_US]: ROUTES.CREATE_TRIP
        },
        [ROUTES.TRIP_LIST]: {
            [LOCALES.cs_CZ]: '/cesty',
            [LOCALES.en_US]: ROUTES.TRIP_LIST
        },
        [ROUTES.TRIP_DRAFT_LIST]: {
            [LOCALES.cs_CZ]: '/koncepty',
            [LOCALES.en_US]: ROUTES.TRIP_DRAFT_LIST
        },
        [ROUTES.TRIP]: {
            [LOCALES.cs_CZ]: `/cesta/[${URL_PARAMS.TRIP_ID}]`,
            [LOCALES.en_US]: ROUTES.TRIP
        },
        [ROUTES.ADMIN_TRIPS]: {
            [LOCALES.cs_CZ]: '/admin/cesty',
            [LOCALES.en_US]: ROUTES.ADMIN_TRIPS
        },
        [ROUTES.APP_CONFIG]: {
            [LOCALES.cs_CZ]: '/admin/nastaveni',
            [LOCALES.en_US]: ROUTES.APP_CONFIG
        },
        [ROUTES.EMAIL_CONFIG]: {
            [LOCALES.cs_CZ]: '/admin/emaily',
            [LOCALES.en_US]: ROUTES.EMAIL_CONFIG
        },
        [ROUTES.ADMIN_USERS]: {
            [LOCALES.cs_CZ]: '/admin/uzivatele',
            [LOCALES.en_US]: ROUTES.ADMIN_USERS
        },
        [ROUTES.ADMIN_USER]: {
            [LOCALES.cs_CZ]: `/admin/uzivatel/[${URL_PARAMS.USER_ID}]`,
            [LOCALES.en_US]: ROUTES.ADMIN_USER
        },
        [ROUTES.ADMIN_TRIP_DETAIL]: {
            [LOCALES.cs_CZ]: `/admin/cesta/[${URL_PARAMS.TRIP_ID}]`,
            [LOCALES.en_US]: ROUTES.ADMIN_TRIP_DETAIL
        },
        [ROUTES.ADMIN_VEHICLE]: {
            [LOCALES.cs_CZ]: `/admin/vozidlo/[${URL_PARAMS.VEHICLE_ID}]`,
            [LOCALES.en_US]: ROUTES.ADMIN_VEHICLE
        },
        [ROUTES.ADMIN_TRANSPORT_REQUIREMENTS]: {
            [LOCALES.cs_CZ]: `/admin/transport-pozadavky/[${URL_PARAMS.USER_ID}]`,
            [LOCALES.en_US]: ROUTES.ADMIN_TRANSPORT_REQUIREMENTS
        }
    }
});