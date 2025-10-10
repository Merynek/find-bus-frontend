'use server';

import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IAddVehicleRequest,
    IUpdateVehicleRequest,
    VehicleApi,
    ISendVehicleToVerificationRequest,
    IUploadVehiclePublicPhotosRequest,
    ISetVehicleVerificationRequest,
    ICreateUploadUrlForVehicleFilesRequest, ICompleteUploadVehicleFilesRequest
} from "@/src/api/vehicleApi";
import type {UploadVehicleFilesSasUrlResponseDto, VehicleResponseDto} from "@/src/api/openapi";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function setVehicleVerification(req: ISetVehicleVerificationRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.setVehicleVerification(req);
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

export async function getVehicles(): Promise<VehicleResponseDto[]> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.getVehicles();
    });
}

export async function addVehicle(req: IAddVehicleRequest): Promise<number> {
    return await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        return await vehicleApi.addVehicle(req);
    });
}

export async function updateVehicle(req: IUpdateVehicleRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.updateVehicle(req);
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

export async function completeUploadVehicleFiles(req: ICompleteUploadVehicleFilesRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.completeUploadVehicleFiles(req);
    });
}

export async function uploadVehiclePublicPhotos(req: IUploadVehiclePublicPhotosRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.uploadVehiclePublicPhotos(req);
    });
}

