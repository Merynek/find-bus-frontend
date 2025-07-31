'use server';

import {
    type EmailConfigResponseDto,
    EmailType,
    Language,
    UpdateAppBusinessConfigRequestDto
} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {AdminApi} from "@/src/api/adminApi";
import {LOCALES} from "@/src/utils/locale";
import {handleApiUnauthorizedError} from "@/src/utils/handleApiErrors";

export async function getEmailConfig(locale: LOCALES): Promise<EmailConfigResponseDto> {
    const accessToken = await getAccessToken();
    const adminApi = new AdminApi(accessToken);

    try {
        return await adminApi.getEmailConfig();
    } catch (e: unknown) {
        handleApiUnauthorizedError(e, locale);
    }
}

export async function setEmailConfig(type: EmailType, language: Language, templateId: number) {
    const accessToken = await getAccessToken();
    const adminApi = new AdminApi(accessToken);

    return await adminApi.setEmailConfig({
        type: type,
        language: language,
        templateId: templateId
    });
}

export async function getAppBusinessConfig() {
    const accessToken = await getAccessToken();
    const adminApi = new AdminApi(accessToken);

    return await adminApi.getAppBusinessConfig();
}

export async function changeAppBusinessConfig(cfg: UpdateAppBusinessConfigRequestDto) {
    const accessToken = await getAccessToken();
    const adminApi = new AdminApi(accessToken);

    return await adminApi.changeAppBusinessConfig({
        cfg: cfg
    });
}