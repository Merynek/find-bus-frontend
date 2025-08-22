'use server';

import {getUserSession} from "@/src/app/actions/auth/authActions";
import {handleActionCall} from "@/src/app/actions/baseAction";

export async function getAccessToken(): Promise<string|undefined> {
    return await handleActionCall(async () => {
        const session = await getUserSession();
        return session?.accessToken;
    })
}