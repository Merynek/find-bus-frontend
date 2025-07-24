import {defineRouting} from 'next-intl/routing';
import {LOCALES} from "@/src/utils/locale";

export const routing = defineRouting({
    locales: [LOCALES.cs_CZ, LOCALES.en_US],
    defaultLocale: LOCALES.cs_CZ,
    localePrefix: {
        mode: 'always'
    },
    pathnames: {
        '/': '/',
        '/sign/in': {
            [LOCALES.cs_CZ]: '/prihlaseni'
        },
        '/sign/up': {
            [LOCALES.cs_CZ]: '/registrace'
        },
        '/active-user': {
            [LOCALES.cs_CZ]: '/aktivace-uctu'
        },
        '/reset-password': {
            [LOCALES.cs_CZ]: '/obnoveni-hesla'
        },
        '/forgot-password': {
            [LOCALES.cs_CZ]: '/zapomenute-heslo'
        },
        '/user-settings': {
            [LOCALES.cs_CZ]: '/nastaveni-uzivatele'
        },
        '/vehicles': {
            [LOCALES.cs_CZ]: '/vozidla'
        },
        '/create-trip': {
            [LOCALES.cs_CZ]: '/nova-cesta'
        },
        '/trips': {
            [LOCALES.cs_CZ]: '/cesty'
        },
        '/trip/[tripId]': {
            [LOCALES.cs_CZ]: '/cesta/[tripId]'
        },
        '/admin/trips': {
            [LOCALES.cs_CZ]: '/admin/cesty'
        },
        '/admin/config': {
            [LOCALES.cs_CZ]: '/admin/nastaveni'
        },
        '/admin/emails': {
            [LOCALES.cs_CZ]: '/admin/emaily'
        },
        '/admin/users': {
            [LOCALES.cs_CZ]: '/admin/uzivatele'
        },
        '/admin/trip/[tripId]': {
            [LOCALES.cs_CZ]: '/admin/cesta/[tripId]'
        }
    }
});