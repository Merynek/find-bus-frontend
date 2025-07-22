import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {IApiRequest} from "./toolsApi";
import {Amenities, EuroStandard, PlaceRequestDto, VehicleResponseDto} from "./openapi";

export interface IAddVehiclePhotosRequest extends IApiRequest {
    vehicleId: number;
    frontPhoto: File;
    rearPhoto: File;
    leftSidePhoto: File;
    rightSidePhoto: File;
    interierPhoto1: File;
    interierPhoto2: File;
    technicalCertificate1: File;
    technicalCertificate2: File;
    insurance: File;
}
export interface IUpdateVehicleRequest extends IApiRequest {
    vehicleId: number;
    name: string;
    personsCapacity: number;
    euro: EuroStandard;
    amenities: Amenities[];
    handicappedUserCount: number;
    vin: string;
    registrationSign: string;
    stkExpired: Date;
    yearOfManufacture: number;
    departureStation: PlaceRequestDto|undefined;
}

export interface IUpdateVehiclePhotosRequest extends IApiRequest {
    vehicleId: number;
    frontPhoto: File|undefined;
    rearPhoto: File|undefined;
    leftSidePhoto: File|undefined;
    rightSidePhoto: File|undefined;
    interierPhoto1: File|undefined;
    interierPhoto2: File|undefined;
    technicalCertificate1: File|undefined;
    technicalCertificate2: File|undefined;
    insurance: File|undefined;
}

export interface ISetVehicleVerificationRequest extends IApiRequest {
    vehicleId: number;
    verified: boolean;
}
export interface IAddVehicleRequest extends IApiRequest {
    name: string;
    personsCapacity: number;
    euro: EuroStandard;
    amenities: Amenities[];
    handicappedUserCount: number;
    vin: string;
    registrationSign: string;
    stkExpired: Date;
    yearOfManufacture: number;
    departureStation: PlaceRequestDto|undefined;
}
export interface IGetVehicleRequest extends IApiRequest {
    vehicleId: number;
}
export interface IGetVehiclesRequest extends IApiRequest {
}

export class VehicleApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.VehiclesApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async getVehicle(req: IGetVehicleRequest): Promise<VehicleResponseDto> {
        return await this._api.apiVehiclesVehicleGet({
            idVehicle: req.vehicleId
        }, req.initOverrides);
    }

    public async getVehicles(req: IGetVehiclesRequest): Promise<VehicleResponseDto[]> {
        return await this._api.apiVehiclesGet(req.initOverrides);
    }

    public async addVehicle(req: IAddVehicleRequest): Promise<number> {
        return await this._api.apiVehiclesVehiclePost({
            addVehicleRequestDto: {
                name: req.name,
                personsCapacity: req.personsCapacity,
                euro: req.euro,
                amenities: req.amenities,
                handicappedUserCount: req.handicappedUserCount,
                vin: req.vin,
                registrationSign: req.registrationSign,
                stkExpired: req.stkExpired || new Date(),
                yearOfManufacture: req.yearOfManufacture,
                departureStation: req.departureStation
            }
        }, req.initOverrides);
    }

    public async addVehiclePhotos(req: IAddVehiclePhotosRequest): Promise<void> {
        await this._api.apiVehiclesPhotosPost({
            id: req.vehicleId,
            frontPhoto: req.frontPhoto,
            rearPhoto: req.rearPhoto,
            leftSidePhoto: req.leftSidePhoto,
            rightSidePhoto: req.rightSidePhoto,
            interierPhoto1: req.interierPhoto1,
            interierPhoto2: req.interierPhoto2,
            technicalCertificate1: req.technicalCertificate1,
            technicalCertificate2: req.technicalCertificate2,
            insurance: req.insurance
        }, req.initOverrides);
    }

    public async updateVehicle(req: IUpdateVehicleRequest): Promise<void> {
        await this._api.apiVehiclesVehiclePut({
            updateVehicleRequestDto: {
                id: req.vehicleId,
                name: req.name,
                personsCapacity: req.personsCapacity,
                euro: req.euro,
                amenities: req.amenities,
                handicappedUserCount: req.handicappedUserCount,
                vin: req.vin,
                registrationSign: req.registrationSign,
                stkExpired: req.stkExpired || new Date(),
                yearOfManufacture: req.yearOfManufacture,
                departureStation: req.departureStation
            },
        }, req.initOverrides);
    }

    public async updateVehiclePhotos(req: IUpdateVehiclePhotosRequest): Promise<void> {
        return await this._api.apiVehiclesPhotosPut({
            id: req.vehicleId,
            frontPhoto: req.frontPhoto,
            rearPhoto: req.rearPhoto,
            leftSidePhoto: req.leftSidePhoto,
            rightSidePhoto: req.rightSidePhoto,
            interierPhoto1: req.interierPhoto1,
            interierPhoto2: req.interierPhoto2,
            technicalCertificate1: req.technicalCertificate1,
            technicalCertificate2: req.technicalCertificate2,
            insurance: req.insurance
        }, req.initOverrides);
    }

    public async setVehicleVerification(req: ISetVehicleVerificationRequest): Promise<void> {
        await this._api.apiVehiclesTransportVerificationPost({
            vehicleTransportVerificationRequestDto: {
                id: req.vehicleId,
                isVerifiedForTransporting: req.verified
            }
        }, req.initOverrides)
    }
}