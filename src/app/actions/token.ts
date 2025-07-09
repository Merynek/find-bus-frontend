'use server';

import { cookies } from 'next/headers';
import { HeaderCookieName } from "@/src/enums/cookies.enum";

export async function getAccessTokenServer(): Promise<string|undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(HeaderCookieName.sessionid)?.value;
}