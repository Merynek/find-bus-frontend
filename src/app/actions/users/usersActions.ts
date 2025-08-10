'use server';

import {IUpdateTransportRequirementsPhotosRequest, UsersApi} from "@/src/api/usersApi";
import {AdminUserDetailResponseDto, UserSettingsRequestDto, type UserSettingsResponseDto} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {LOCALES} from "@/src/utils/locale";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

export async function getAllUsers(offset: number, limit: number, locale: LOCALES): Promise<AdminUserDetailResponseDto[]> {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    try {
        return await usersApi.getAllUsers({
            limit: limit,
            offset: offset
        });
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, locale);
    }
}

export async function setUserVerification(userId: number, verified: boolean) {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    return await usersApi.setUserVerification({
        userId: userId,
        verified: verified
    });
}

export async function changeSettings(settings: UserSettingsRequestDto) {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    return await usersApi.changeSettings({
        settings: settings
    });
}

export async function getSettings(locale: LOCALES): Promise<UserSettingsResponseDto> {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    try {
        return await usersApi.getSettings();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, locale);
    }
}

export async function updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest) {
    const accessToken = await getAccessToken();
    const usersApi = new UsersApi(accessToken);

    await usersApi.updateTransportRequirementsPhotos(req);
}