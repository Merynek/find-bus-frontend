'use server';

import {
    IBanUserRequest,
    ICompleteUploadTransportRequirementsDocumentsRequest,
    ICreateUploadUrlForTransportRequirementsFilesRequest,
    ISendTransportRequirementsToVerificationRequest, ISetTransportRequirementsVerificationRequest,
    IUpdateTransportRequirementsRequest,
    UsersApi
} from "@/src/api/usersApi";
import {
    AdminUserDetailResponseDto, type TransporterRequirementsResponseDto,
    type TransportRequirementsUploadSasUrlResponseDto,
    UserSettingsRequestDto,
    type UserSettingsResponseDto
} from "@/src/api/openapi";
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

export async function getUserDetail(userId: number): Promise<AdminUserDetailResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.getUserDetail({
            userId: userId
        });
    });
}

export async function banUser(req: IBanUserRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.banUser(req);
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

export async function getUserTransportRequirements(userId: number): Promise<TransporterRequirementsResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.getUserTransportRequirements({userId: userId});
    });
}

export async function getTransportRequirements(): Promise<TransporterRequirementsResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.getTransportRequirements();
    });
}

export async function sendTransportRequirementsToVerification(req: ISendTransportRequirementsToVerificationRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.sendTransportRequirementsToVerification(req);
    });
}

export async function updateTransportRequirements(req: IUpdateTransportRequirementsRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.updateTransportRequirements(req);
    });
}

export async function createUploadUrlForTransportRequirementDocuments(req: ICreateUploadUrlForTransportRequirementsFilesRequest):
    Promise<TransportRequirementsUploadSasUrlResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.createUploadUrlForTransportRequirementDocuments(req);
    });
}

export async function completeUploadTransportRequirementsDocuments(req: ICompleteUploadTransportRequirementsDocumentsRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.completeUploadTransportRequirementsDocuments(req);
    });
}

export async function transportRequirementsVerification(req: ISetTransportRequirementsVerificationRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const usersApi = new UsersApi(accessToken);
        return await usersApi.transportRequirementsVerification(req);
    });
}