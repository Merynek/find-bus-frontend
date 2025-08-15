import Credentials from "next-auth/providers/credentials";
import {AuthorizeApi} from "@/src/api/authorizeApi";
import NextAuth, {DefaultSession, Session, User} from "next-auth";
import type { JWT } from "next-auth/jwt";
import type {AdapterUser} from "@auth/core/adapters";
import {DefaultUser} from "@auth/core/types";
import {AccessTokenDto, CurrentUserDto} from "@/src/api/openapi";
import {DefaultJWT} from "@auth/core/jwt";

declare module "next-auth" {
    export interface User extends DefaultUser {
        user: CurrentUserDto;
        token: AccessTokenDto;
        refreshToken: AccessTokenDto;
    }

    export interface Session extends DefaultSession {
        user: CurrentUserDto;
        token: AccessTokenDto;
    }
}

declare module "next-auth/jwt" {
    export interface JWT extends DefaultJWT {
        data: {
            user: CurrentUserDto;
            token: AccessTokenDto;
            refreshToken: AccessTokenDto;
        };
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                try {
                    const api = new AuthorizeApi(undefined);
                    const loginResponse= await api.login({
                        email: credentials.email as string,
                        password: credentials.password as string,
                    });

                    return {
                        token: loginResponse.token,
                        user: loginResponse.user,
                        refreshToken: loginResponse.refreshToken
                    };
                } catch (error: unknown) {
                    const errorMessage = 'AUTH: authorize.';
                    if (error && typeof error === 'object' && 'response' in error) {
                        const apiError = (error as { response: { json: () => Promise<{ message?: string }> } });
                        if (apiError.response?.json) {
                            const jsonError = await apiError.response.json();
                            console.error("Došlo k chybě:", jsonError.message || errorMessage);
                        }
                    }
                    if (error instanceof Error) {
                        console.error("Došlo k chybě:", error.message);
                    } else {
                        console.error("Došlo k neznámé chybě:", error);
                    }
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        jwt: async (params: { token: JWT; user?: User | AdapterUser }): Promise<JWT | null> => {
            const { token, user } = params;
            if (user) {
                token.data = {
                    user: user.user,
                    token: user.token,
                    refreshToken: user.refreshToken
                };
                return token;
            }
            if (Date.now() < new Date(token.data.token.expireDate).getTime()) {
                return token;
            }

            try {
                const api = new AuthorizeApi(undefined);
                const newTokens = await api.refreshToken({ token: token.data.refreshToken.token });

                token.data.token.token = newTokens.token;
                token.data.token.expireDate = newTokens.expireDate;
                return token;
            } catch (error: unknown) {
                const errorMessage = 'AUTH: jwt.';
                if (error && typeof error === 'object' && 'response' in error) {
                    const apiError = (error as { response: { json: () => Promise<{ message?: string }> } });
                    if (apiError.response?.json) {
                        const jsonError = await apiError.response.json();
                        console.error("Došlo k chybě:", jsonError.message || errorMessage);
                    }
                }
                if (error instanceof Error) {
                    console.error("Došlo k chybě:", error.message);
                } else {
                    console.error("Došlo k neznámé chybě:", error);
                }
                return null;
            }
        },
        session: async ({ session, token }: { session: Session; token: JWT }): Promise<Session> => {
            if (token.data && token.data.user && token.data.token) {
                session.user = token.data.user;
                session.token = token.data.token;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    }
})