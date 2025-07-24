import {defineRouting} from 'next-intl/routing';

export enum ROUTES {
    HOME = "/",
    SIGN_IN = "/sign/in",
    SIGN_UP = "/sign/up",
    ACTIVE_USER = "/active-user",
    RESET_PASSWORD = "/reset-password",
    FORGOT_PASSWORD = "/forgot-password",
    USER_SETTINGS = "/user-settings",
    VEHICLES = "/vehicles",
    CREATE_TRIP = "/create-trip",
    TRIPS = "/trips",
    TRIP = "/trip",
    ADMIN_TRIPS = "/admin/trips",
    ADMIN_CONFIG = "/admin/config",
    ADMIN_EMAILS = "/admin/emails",
    ADMIN_USERS = "/admin/users",
    ADMIN_TRIP = "/admin/trip"
}

export const routing = defineRouting({
    locales: ['cs', 'en'],
    defaultLocale: 'cs',
    localePrefix: {
        mode: 'always'
    },
    pathnames: {
        '/': '/',
        '/sign/in': {
            cs: '/prihlaseni'
        },
        '/sign/up': {
            cs: '/registrace'
        },
        '/active-user': {
            cs: '/aktivace-uctu'
        },
        '/reset-password': {
            cs: '/obnoveni-hesla'
        },
        '/forgot-password': {
            cs: '/zapomenute-heslo'
        },
        '/user-settings': {
            cs: '/nastaveni-uzivatele'
        },
        '/vehicles': {
            cs: '/vozidla'
        },
        '/create-trip': {
            cs: '/nova-cesta'
        },
        '/trips': {
            cs: '/cesty'
        },
        '/trip/[tripId]': {
            cs: '/cesta/[tripId]'
        },
        '/admin/trips': {
            cs: '/admin/cesty'
        },
        '/admin/config': {
            cs: '/admin/nastaveni'
        },
        '/admin/emails': {
            cs: '/admin/emaily'
        },
        '/admin/users': {
            cs: '/admin/uzivatele'
        },
        '/admin/trip/[tripId]': {
            cs: '/admin/cesta/[tripId]'
        }
    }
});