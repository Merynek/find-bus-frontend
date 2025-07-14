'use server';

import type {TripResponseDto} from "@/src/api/openapi";
import {getAccessToken} from "@/src/app/actions/auth/accessTokenActions";
import {TripApi} from "@/src/api/tripApi";

export async function getTrip(id: number): Promise<TripResponseDto> {
    const accessToken = await getAccessToken();
    const tripApi = new TripApi(accessToken);

    return await tripApi.getTrip({
        id
    })
}