'use server';

import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {VehicleApi} from "@/src/api/vehicleApi";

export async function setVehicleVerification(vehicleId: number, verified: boolean) {
    const accessToken = await getAccessToken();
    const vehicleApi = new VehicleApi(accessToken);

    await vehicleApi.setVehicleVerification({
        vehicleId: vehicleId,
        verified: verified
    });
}