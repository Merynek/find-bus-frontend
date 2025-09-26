'use server';

import {IUpdateTransportRequirementsPhotosRequest, UsersApi} from "@/src/api/usersApi";
import {AdminUserDetailResponseDto, UserSettingsRequestDto, type UserSettingsResponseDto} from "@/src/api/openapi";
import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function getAllUsers(offset: number, limit: number): Promise<AdminUserDetailResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.getAllUsers({
            limit: limit,
            offset: offset
        });
    });
}

export async function setUserVerification(userId: number, verified: boolean) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.setUserVerification({
            userId: userId,
            verified: verified
        });
    });
}

export async function changeSettings(settings: UserSettingsRequestDto) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.changeSettings({
            settings: settings
        });
    });
}

export async function getSettings(): Promise<UserSettingsResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.getSettings();
    });
}

export async function updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        await usersApi.updateTransportRequirementsPhotos(req);
    });
}