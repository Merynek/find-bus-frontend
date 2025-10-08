'use server';

import {getAccessToken} from "@/src/server-actions/auth/accessTokenActions";
import {
    IAddVehicleRequest,
    IUploadVehicleFilesRequest,
    IUpdateVehicleRequest,
    VehicleApi, ISendVehicleToVerificationRequest, IUploadVehiclePublicPhotosRequest
} from "@/src/api/vehicleApi";
import type {VehicleResponseDto} from "@/src/api/openapi";
import {handleActionCall} from "@/src/server-actions/baseAction";

export async function setVehicleVerification(vehicleId: number, verified: boolean) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.setVehicleVerification({
            vehicleId: vehicleId,
            verified: verified
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

export async function updateVehicleFiles(req: IUploadVehicleFilesRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.uploadVehicleFiles(req);
    });
}

export async function uploadVehiclePublicPhotos(req: IUploadVehiclePublicPhotosRequest) {
    await handleActionCall(async () => {
        const accessToken = await getAccessToken();
        const vehicleApi = new VehicleApi(accessToken);
        await vehicleApi.uploadVehiclePublicPhotos(req);
    });
}

