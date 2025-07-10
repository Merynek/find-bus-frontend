'use server';

import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {getAccessToken} from "@/src/app/actions/token";
import {cookies} from "next/headers";
import {CheckTokenResponseDto, UserRole} from "@/src/api/openapi";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";

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