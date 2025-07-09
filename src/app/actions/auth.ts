'use server';

import {User} from "@/src/data/users/user";
import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {getAccessTokenServer} from "@/src/app/actions/token";
import {cookies} from "next/headers";

export async function getAuthenticatedUser(): Promise<User|null> {
    const accessToken = await getAccessTokenServer();

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