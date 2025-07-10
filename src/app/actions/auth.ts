'use server';

import {HeaderCookieName} from "@/src/enums/cookies.enum";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import {getAccessToken} from "@/src/app/actions/token";
import {cookies} from "next/headers";
import {CheckTokenResponseDto, UserRole} from "@/src/api/openapi";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";
import {FormState, SignInFormSchema} from "@/src/app/lib/auth/definitions";
import {RegistrationApi} from "@/src/api/registrationApi";
import {ROUTES} from "@/src/enums/router.enum";

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

export async function signupAction(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignInFormSchema.safeParse({
        email: formData.get(FormDataEnum.email),
        password: formData.get(FormDataEnum.password),
        confirmPassword: formData.get(FormDataEnum.password_confirm),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const registrationApi = new RegistrationApi(undefined);
    try {
        await registrationApi.registration({
            email: validatedFields.data.email,
            password: validatedFields.data.password,
            role: UserRole.DEMANDER
        });
        redirect('/sign/in');
    } catch (error: any) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }

}

export async function loginAction(state: FormState, formData: FormData) {
    const email = formData.get(FormDataEnum.email) as string;
    const password = formData.get(FormDataEnum.password) as string;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    if (!email || !password) {
        return { errors: 'Prosím, zadejte email a heslo.' };
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