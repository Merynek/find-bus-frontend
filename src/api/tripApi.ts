import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {
    ApiTripListGetRequest,
    CreateTripRequestDto,
    type TripItemResponseDto,
    TripRecommendationRequestDto, type TripRecommendationResponseDto,
    type TripResponseDto
} from "./openapi";

export interface ICreateTripRequest extends IApiRequest {
    trip: CreateTripRequestDto;
}

export interface IGetTripsRequest extends IApiRequest {
    limit: number;
    offset: number;
    start?: Date;
    maxNumberOfPersons?: number;
    dietForTransporter?: boolean;
    onlyMine?: boolean;
    meOffered?: boolean;
    distanceFromInKm?: number;
    distanceToInKm?: number;
    maxDistanceInMeters?: number;
}

export interface IGetTrip extends IApiRequest {
    id: number;
}

export interface IGetTripRecommendation extends IApiRequest {
    trip: TripRecommendationRequestDto;
}

export interface IPostStopTripOrderRequest extends IApiRequest {
    tripId: number;
}

export class TripApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.TripApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async createTrip(req: ICreateTripRequest): Promise<void> {
        await handleApiCall(this._api.apiTripPost({
            createTripRequestDto: req.trip
        }, req.initOverrides));
    }

    public async getTrips(req: IGetTripsRequest): Promise<TripItemResponseDto[]> {
        const params: ApiTripListGetRequest = {
            dietForTransporter: req.dietForTransporter,
            limit: req.limit,
            offset: req.offset,
            distanceFromInMeters: req.distanceFromInKm ? (req.distanceFromInKm * 1000) : undefined,
            distanceToInMeters: req.distanceToInKm ? (req.distanceToInKm * 1000) : undefined,
            start: req.start || undefined,
            maxNumberOfPersons: req.maxNumberOfPersons,
            onlyMine: req.onlyMine,
            meOffered: req.meOffered,
            maxDistanceInMeters: req.maxDistanceInMeters
        }
        return await handleApiCall(this._api.apiTripListGet(params, req.initOverrides));
    }

    public async getTrip(req: IGetTrip): Promise<TripResponseDto> {
        return await handleApiCall(this._api.apiTripTripGet({
            tripId: req.id
        }, req.initOverrides));
    }

    public async getTripRecommendation(req: IGetTripRecommendation): Promise<TripRecommendationResponseDto> {
        return await handleApiCall(this._api.apiTripRecommendationPost({
            tripRecommendationRequestDto: req.trip
        }));
    }
}