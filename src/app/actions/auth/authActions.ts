'use server';

import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {cookies} from "next/headers";
import {CheckTokenResponseDto, UserRole} from "@/src/api/openapi";
import {redirect} from "next/navigation";
import {ROUTES} from "@/src/enums/router.enum";
import {RegistrationApi} from "@/src/api/registrationApi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";

export async function getUserAction(): Promise<CheckTokenResponseDto|null> {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return null;
    }

    try {
        const authApi = new AuthorizeApi(accessToken);
        return await authApi.checkToken();
    } catch (error) {
        console.error('Token check failed:', error);
        const cookieStore = await cookies();
        cookieStore.delete(HeaderCookieName.sessionid);
        return null;
    }
}

export async function loginAction(email: string, password: string) {
    const authApi = new AuthorizeApi(undefined);
    const response = await authApi.login({
        email: email,
        password: password
    });
    const cookieStore = await cookies();

    if (!response || !response.token || !response.token.token) {
        throw new Error('Přihlášení se nezdařilo: Chybí token v odpovědi z API.');
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    cookieStore.set(HeaderCookieName.sessionid, response.token.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        path: '/',
        sameSite: 'lax'
    });
    return response;
}

export async function logoutAction(): Promise<void> {
    const accessToken = await getAccessToken();

    try {
        const authApi = new AuthorizeApi(accessToken);
        await authApi.logout({});

    } catch (error) {
        console.error('Chyba při volání logout API:', error);
    } finally {
        const cookieStore = await cookies();
        cookieStore.delete(HeaderCookieName.sessionid);
        redirect(ROUTES.SIGN_IN);
    }
}

export const signUpAction = async (email: string, password: string, role: UserRole) => {
    const registrationApi = new RegistrationApi(undefined);

    await registrationApi.registration({
        email: email,
        password: password,
        role: role
    });
}