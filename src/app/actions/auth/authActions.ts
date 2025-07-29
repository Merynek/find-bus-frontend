'use server';

import {AuthorizeApi} from "@/src/api/authorizeApi";
import {type CurrentUserDto, UserRole} from "@/src/api/openapi";
import {RegistrationApi} from "@/src/api/registrationApi";
import {signIn, signOut, auth} from "@/src/auth/auth";

interface CustomSession {
    user?: CurrentUserDto;
    accessToken?: string;
}

export async function getUserSession(): Promise<CustomSession|null> {
    const session = await auth();

    if (!session?.user || !session?.token.token) {
        return null;
    }

    try {
        return {
            user: {
                id: session.user.id,
                email: session.user.email,
                role: session.user.role
            },
            accessToken: session.token.token,

        };
    } catch (error) {
        console.error("Failed to retrieve user session data:", error);
        return null;
    }
}

export async function loginAction(email: string, password: string) {
    await signIn('credentials', {
        email: email,
        password: password,
        redirect: false
    });
}

export async function logoutAction(): Promise<void> {
    await signOut({
        redirect: false
    });
}

export const signUpAction = async (email: string, password: string, role: UserRole) => {
    const registrationApi = new RegistrationApi(undefined);

    await registrationApi.registration({
        email: email,
        password: password,
        role: role
    });
}

export const activeUserAction = async (token: string) => {
    const registrationApi = new RegistrationApi(undefined);

    await registrationApi.activeUser({
        token: token
    });
}

export const forgotPasswordAction = async (email: string) => {
    const authApi = new AuthorizeApi(undefined);

    await authApi.forgotPassword({
        email: email
    });
}

export const resetPasswordAction = async (token: string, password: string, confirmPassword: string) => {
    const authApi = new AuthorizeApi(undefined);

    await authApi.resetPassword({
        token: token,
        password: password,
        confirmPassword: confirmPassword
    });
}