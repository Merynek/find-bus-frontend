'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {cookies} from "next/headers";
import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {redirect} from "next/navigation";
import {SignInFormSchema} from "@/src/app/actions/auth/signIn/signInSchema";

export type TSignInFormState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string;
    error?: string;
} | undefined;

export async function signInFormAction(state: TSignInFormState, formData: FormData): Promise<TSignInFormState> {
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get(FormDataEnum.email),
        password: formData.get(FormDataEnum.password)
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    try {
        const authApi = new AuthorizeApi(undefined);
        const response = await authApi.login({
            email: validatedFields.data.email,
            password: validatedFields.data.password
        });
        const cookieStore = await cookies();

        if (!response || !response.token || !response.token.token) {
            return { error: 'Přihlášení se nezdařilo: Chybí token v odpovědi z API.' };
        }

        cookieStore.set(HeaderCookieName.sessionid, response.token.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiresAt,
            path: '/',
            sameSite: 'lax'
        });
    } catch (error: any) {
        console.error('Chyba při přihlášení:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během přihlašování.',
        }
    }
    redirect("/");
}