'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {VehicleApi} from "@/src/api/vehicleApi";
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