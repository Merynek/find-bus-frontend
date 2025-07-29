'use server';

import {getUserSession} from "@/src/app/actions/auth/authActions";

export async function getAccessToken(): Promise<string|undefined> {
    const session = await getUserSession();
    return session?.accessToken;
}