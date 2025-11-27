'use server';

import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IAddVehicleRequest,
    IUpdateVehicleRequest,
    VehicleApi,
    ISendVehicleToVerificationRequest,
    ISetVehicleVerificationRequest,
    ICreateUploadUrlForVehicleFilesRequest,
    ICompleteUploadVehicleFilesRequest,
    ICreatePublicUploadUrlForVehiclePhotosRequest, ICompletePublicUploadVehiclePhotosRequest, IGetVehiclesRequest
} from "@/src/api/vehicleApi";
import type {
    VehiclePublicUploadSasUrlResponseDto,
    VehicleResponseDto
} from "@/src/api/openapi";
import {handleActionCall} from "@/src/server-actions/baseAction";
import {UploadVehicleFilesSasUrlResponseDto} from "@/src/api/openapi/models/UploadVehicleFilesSasUrlResponseDto";

export async function setVehicleVerification(req: ISetVehicleVerificationRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.setVehicleVerification(req);
    });
}

export async function getPublicVehicle(vehicleId: number): Promise<VehicleResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.getPublicVehicle({
            vehicleId: vehicleId
        });
    });
}

export async function getVehicle(vehicleId: number): Promise<VehicleResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.getVehicle({
            vehicleId: vehicleId
        });
    });
}

export async function getVehicles(req: IGetVehiclesRequest): Promise<VehicleResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.getVehicles(req);
    });
}

export async function addVehicle(req: IAddVehicleRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.addVehicle(req);
    });
}

export async function updateVehicle(req: IUpdateVehicleRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.updateVehicle(req);
    });
}

export async function sendVehicleToVerificationRequest(req: ISendVehicleToVerificationRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.sendVehicleToVerification(req);
    });
}

export async function createUploadUrlForVehicleFiles(req: ICreateUploadUrlForVehicleFilesRequest): Promise<UploadVehicleFilesSasUrlResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.createUploadUrlForVehicleFiles(req);
    });
}

export async function completeUploadVehicleFiles(req: ICompleteUploadVehicleFilesRequest): Promise<void> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.completeUploadVehicleFiles(req);
    });
}

export async function createPublicUploadUrlForVehiclePhotos(req: ICreatePublicUploadUrlForVehiclePhotosRequest): Promise<VehiclePublicUploadSasUrlResponseDto> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.createPublicUploadUrlForVehiclePhotos(req);
    });
}

export async function completePublicUploadVehiclePhotos(req: ICompletePublicUploadVehiclePhotosRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.completePublicUploadVehiclePhotos(req);
    });
}