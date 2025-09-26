'use server';

import {getUserSession} from "@/src/server-actions/auth/authActions";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function getAccessToken(): Promise<string|undefined> {
    return await handleActionCall(async () => {
        const session = await getUserSession();
        return session?.accessToken;
    })
}