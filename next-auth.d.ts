import type { User as NextAuthUser } from "next-auth";
import {AccessTokenDto, CurrentUserDto} from "@/src/api/openapi";

declare module "next-auth" {
    export interface User extends NextAuthUser {
        user: CurrentUserDto;
        token: AccessTokenDto;
    }

    export interface Session {
        user: CurrentUserDto;
        token: AccessTokenDto;
    }
}

declare module "next-auth/jwt" {
    export interface JWT {
        data: {
            user: CurrentUserDto;
            token: AccessTokenDto;
        };
    }
}