'use server';

import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {getAccessToken} from "@/src/app/actions/token";
import {cookies} from "next/headers";
import type {CheckTokenResponseDto} from "@/src/api/openapi";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";

export async function getAuthenticatedUser(): Promise<CheckTokenResponseDto|null> {
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

export async function loginAction(formData: FormData): Promise<{ error?: string } | void> {
    const email = formData.get(FormDataEnum.email) as string;
    const password = formData.get(FormDataEnum.password) as string;
    const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

    if (!email || !password) {
        return { error: 'Prosím, zadejte email a heslo.' };
    }

    try {
        const authApi = new AuthorizeApi(undefined);
        const response = await authApi.login({ email, password });
        const cookieStore = await cookies();

        if (!response || !response.token || !response.token.token) {
            return { error: 'Přihlášení se nezdařilo: Chybí token v odpovědi z API.' };
        }

        cookieStore.set(HeaderCookieName.sessionid, response.token.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: SESSION_MAX_AGE, // Platnost cookie
            path: '/',
            sameSite: 'lax'
        });

        redirect('/');

    } catch (error: any) {
        console.error('Chyba při přihlášení:', error);
        return { error: error.message || 'Došlo k neočekávané chybě během přihlašování.' };
    }
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
        redirect('/login');
    }
}