import {NextResponse} from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {auth} from "@/src/auth/auth";
import {getRedirectUrlIfNeeded} from "@/src/auth/routesRestriction";

const nextIntlMiddleware = createMiddleware(routing);

export default auth((request) => {
    const { pathname } = request.nextUrl;

    if (pathname === '/') {
        const defaultLocale = routing.defaultLocale;
        const targetUrl = new URL(`/${defaultLocale}`, request.url);
        return NextResponse.redirect(targetUrl);
    }
    const response = nextIntlMiddleware(request);
    const headers = new Headers(response.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    const redirectUrl = getRedirectUrlIfNeeded(request);
    if (redirectUrl) {
        return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    return NextResponse.next({ headers });
});

export const config = {
    matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};