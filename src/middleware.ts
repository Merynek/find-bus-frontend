import {NextRequest, NextResponse} from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const nextIntlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
    const response = nextIntlMiddleware(request);

    const headers = new Headers(response.headers);
    headers.set("x-current-path", request.nextUrl.pathname);
    return NextResponse.next({ headers });
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};