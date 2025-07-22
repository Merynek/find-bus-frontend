'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {
    IAddVehiclePhotosRequest,
    IAddVehicleRequest,
    IUpdateVehiclePhotosRequest,
    IUpdateVehicleRequest,
    VehicleApi
} from "@/src/api/vehicleApi";
import type {VehicleResponseDto} from "@/src/api/openapi";

export async function setVehicleVerification(vehicleId: number, verified: boolean) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    await vehicleApi.setVehicleVerification({
        vehicleId: vehicleId,
        verified: verified
    });
}

export async function getVehicle(vehicleId: number): Promise<VehicleResponseDto> {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.getVehicle({
        vehicleId: vehicleId
    });
}

export async function getVehicles(): Promise<VehicleResponseDto[]> {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.getVehicles({});
}

export async function addVehicle(req: IAddVehicleRequest) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.addVehicle(req);
}

export async function addVehiclePhotos(req: IAddVehiclePhotosRequest) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.addVehiclePhotos(req);
}

export async function updateVehicle(req: IUpdateVehicleRequest) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.updateVehicle(req);
}

export async function updateVehiclePhotos(req: IUpdateVehiclePhotosRequest) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    return await vehicleApi.updateVehiclePhotos(req);
}