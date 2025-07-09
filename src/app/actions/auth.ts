'use server';

import { cookies } from 'next/headers';
import {User} from "@/src/data/users/user";
import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";

export async function getAuthenticatedUser(): Promise<User|null> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(HeaderCookieName.sessionid)?.value;

    if (!accessToken) {
        return null;
    }

    try {
        const authApi = new AuthorizeApi(accessToken);
        return await authApi.checkToken();
    } catch (error) {
        console.error('Token check failed:', error);
        cookieStore.delete(HeaderCookieName.sessionid);
        return null;
    }
}