'use server';

import {AuthorizeApi} from "@/src/api/authorizeApi";
import {type CurrentUserDto, UserRole} from "@/src/api/openapi";
import {RegistrationApi} from "@/src/api/registrationApi";
import {signIn, signOut, auth} from "@/src/auth/auth";
import {handleActionCall} from "@/src/server-actions/baseAction";

interface CustomSession {
    user?: CurrentUserDto;
    accessToken?: string;
}

export async function getUserSession(): Promise<CustomSession|null> {
    return await handleActionCall(async () => {
        const session = await auth();
        if (!session?.user || !session?.token.token) {
            return null;
        }
        return {
            user: session.user,
            accessToken: session.token.token
        };
    })
}

export async function getLoggerUserSession(): Promise<CurrentUserDto|null> {
    return await handleActionCall(async () => {
        const session = await auth();
        return session?.user || null;
    })
}

export async function loginAction(email: string, password: string) {
    await handleActionCall(async () => {
        await signIn('credentials', {
            email: email,
            password: password,
            redirect: false
        });
    })
}

export async function logoutAction(): Promise<void> {
    await handleActionCall(async () => {
        await signOut({
            redirect: false
        });
    })
}

export const signUpAction = async (email: string, password: string, role: UserRole, clientUrl: string) => {
    await handleActionCall(async () => {
        const registrationApi = new RegistrationApi(undefined);

        await registrationApi.registration({
            email: email,
            password: password,
            role: role,
            clientUrl: clientUrl
        });
    })
}

export const activeUserAction = async (token: string) => {
    await handleActionCall(async () => {
        const registrationApi = new RegistrationApi(undefined);
        await registrationApi.activeUser({
            token: token
        });
    })
}

export const forgotPasswordAction = async (email: string) => {
    await handleActionCall(async () => {
        const authApi = new AuthorizeApi(undefined);
        await authApi.forgotPassword({
            email: email
        });
    })
}

export const resetPasswordAction = async (token: string, password: string, confirmPassword: string) => {
    await handleActionCall(async () => {
        const authApi = new AuthorizeApi(undefined);
        await authApi.resetPassword({
            token: token,
            password: password,
            confirmPassword: confirmPassword
        });
    })
}