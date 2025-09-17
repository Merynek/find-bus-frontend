'use server';

import {
    AppBusinessConfigResponseDto,
    type EmailConfigResponseDto,
    EmailType,
    Languages,
    UpdateAppBusinessConfigRequestDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {AdminApi} from "@/src/api/adminApi";
import {handleActionCall} from "@/src/app/actions/baseAction";

export async function getEmailConfig(): Promise<EmailConfigResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const adminApi = new AdminApi(accessToken);
        return await adminApi.getEmailConfig();
    })
}

export async function setEmailConfig(type: EmailType, language: Languages, templateId: number) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const adminApi = new AdminApi(accessToken);
        await adminApi.setEmailConfig({
            type: type,
            language: language,
            templateId: templateId
        });
    })
}

export async function getAppBusinessConfig(): Promise<AppBusinessConfigResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const adminApi = new AdminApi(accessToken);
        return await adminApi.getAppBusinessConfig();
    })
}

export async function changeAppBusinessConfig(cfg: UpdateAppBusinessConfigRequestDto) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const adminApi = new AdminApi(accessToken);
        await adminApi.changeAppBusinessConfig({
            cfg: cfg
        });
    })
}