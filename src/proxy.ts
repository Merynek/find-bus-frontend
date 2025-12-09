import {NextResponse} from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {auth} from "@/src/auth/auth";
import {getRedirectUrlIfNeeded} from "@/src/auth/routesRestriction";
import { NextAuthRequest } from "next-auth";
import {getLocaleFromPathname} from "@/src/i18n/localizedRoutes";
import {LOCALES} from "@/src/enums/locale";

const nextIntlMiddleware = createMiddleware(routing);

export default auth((request) => {
    const { pathname } = request.nextUrl;
    const { locales, defaultLocale } = routing;
    const localePrefixes = locales.map(locale => `/${locale.toLowerCase()}`);
    const isMissingLocalePrefix = !localePrefixes.some(prefix => pathname.startsWith(prefix));

    if (pathname === '/') {
        return redirectToLocale(defaultLocale, pathname, request);
    }
    if (isMissingLocalePrefix) {
        const detectedLocale = getLocaleFromPathname(pathname);
        if (detectedLocale) {
            return redirectToLocale(detectedLocale, pathname, request);
        }
        return redirectToLocale(defaultLocale, pathname, request);
    }

    const response = nextIntlMiddleware(request);
    const headers = new Headers(response.headers);

    const redirectUrl = getRedirectUrlIfNeeded(request);
    if (redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next({ headers });
});

const redirectToLocale = (locale: LOCALES, pathname: string, request: NextAuthRequest) => {
    const targetUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(targetUrl);
}

export const config = {
    matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};