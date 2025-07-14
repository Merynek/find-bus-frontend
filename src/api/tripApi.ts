import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {IApiRequest} from "./toolsApi";
import {Trip} from "../data/trip/trip";
import {TripConverter} from "../converters/trip/trip-converter";
import {TripRecommendation} from "../data/tripRecommendation";
import {TripItemConverter} from "../converters/trip-item-converter";
import {TripItem} from "../data/tripItem";
import {ApiTripListGetRequest, type TripResponseDto} from "./openapi";

export interface ICreateTripRequest extends IApiRequest {
    trip: Trip;
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
}

export interface IGetTrip extends IApiRequest {
    id: number;
}

export interface IGetTripRecommendation extends IApiRequest {
    trip: Trip;
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
        const data = TripConverter.toServer(req.trip);
        await this._api.apiTripPost({
            createTripRequestDto: data
        }, req.initOverrides)
    }

    public async getTrips(req: IGetTripsRequest): Promise<TripItem[]> {
        const params: ApiTripListGetRequest = {
            dietForTransporter: req.dietForTransporter,
            limit: req.limit,
            offset: req.offset,
            distanceFromInMeters: req.distanceFromInKm ? (req.distanceFromInKm * 1000) : undefined,
            distanceToInMeters: req.distanceToInKm ? (req.distanceToInKm * 1000) : undefined,
            start: req.start || undefined,
            maxNumberOfPersons: req.maxNumberOfPersons,
            onlyMine: req.onlyMine,
            meOffered: req.meOffered
        }
        const response = await this._api.apiTripListGet(params, req.initOverrides);

        return response.map(TripItemConverter.toClient);
    }

    public async getTrip(req: IGetTrip): Promise<TripResponseDto> {
        return await this._api.apiTripTripGet({
            tripId: req.id
        }, req.initOverrides)
    }

    public async getTripRecommendation(req: IGetTripRecommendation): Promise<TripRecommendation> {
        const response = await this._api.apiTripRecommendationPost({
            tripRecommendationRequestDto: TripConverter.tripRecommendationToServer(req.trip)
        });
        return TripConverter.tripRecommendationToClient(response);
    }
}