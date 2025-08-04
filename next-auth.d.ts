import {AccessTokenDto, CurrentUserDto} from "@/src/api/openapi";
import {DefaultJWT} from "@auth/core/jwt";
import {DefaultSession} from "next-auth";
import {DefaultUser} from "@auth/core/types";

interface AccessTokenDto {
    token: string;
    expireDate: string;
}

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