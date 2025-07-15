'use server';

import {UsersApi} from "@/src/api/usersApi";
import type {AdminUserDetailResponseDto} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";

export async function getAllUsers(offset: number, limit: number): Promise<AdminUserDetailResponseDto[]> {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    return await usersApi.getAllUsers({
        limit: limit,
        offset: offset
    });
}

export async function setUserVerification(userId: number, verified: boolean) {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    return await usersApi.setUserVerification({
        userId: userId,
        verified: verified
    });
}