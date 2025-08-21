import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {Amenities, EuroStandard, PlaceRequestDto, type VehicleRequestDto, VehicleResponseDto} from "./openapi";

export interface IUpdateVehicleRequest extends IApiRequest {
    vehicleId: number;
    vehicle: IVehicleRequest;
}

export interface IUploadVehicleFilesRequest extends IApiRequest {
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
    vehicle: IVehicleRequest;
}

export interface IVehicleRequest {
    name?: string;
    personsCapacity?: number;
    euro?: EuroStandard;
    amenities?: Amenities[];
    handicappedUserCount?: number;
    vin?: string;
    registrationSign?: string;
    stkExpired?: Date;
    yearOfManufacture?: number;
    departureStation?: PlaceRequestDto;
}

export interface IGetVehicleRequest extends IApiRequest {
    vehicleId: number;
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
        return await handleApiCall(this._api.apiVehiclesVehicleGet({
            idVehicle: req.vehicleId
        }, req.initOverrides));
    }

    public async getVehicles(): Promise<VehicleResponseDto[]> {
        return await handleApiCall(this._api.apiVehiclesGet());
    }

    public async addVehicle(req: IAddVehicleRequest): Promise<number> {
        return await handleApiCall(this._api.apiVehiclesVehiclePost({
            addVehicleRequestDto: {
                info: this._createVehicleRequest(req.vehicle)
            }
        }, req.initOverrides));
    }

    public async updateVehicle(req: IUpdateVehicleRequest): Promise<void> {
        await handleApiCall(this._api.apiVehiclesVehiclePut({
            updateVehicleRequestDto: {
                id: req.vehicleId,
                info: this._createVehicleRequest(req.vehicle)
            },
        }, req.initOverrides));
    }

    private _createVehicleRequest(req: IVehicleRequest): VehicleRequestDto {
        return {
            name: req.name,
            personsCapacity: req.personsCapacity,
            euro: req.euro,
            amenities: req.amenities,
            handicappedUserCount: req.handicappedUserCount,
            vin: req.vin,
            registrationSign: req.registrationSign,
            stkExpired: req.stkExpired,
            yearOfManufacture: req.yearOfManufacture,
            departureStation: req.departureStation
        }
    }

    public async uploadVehicleFiles(req: IUploadVehicleFilesRequest): Promise<void> {
        return await handleApiCall(this._api.apiVehiclesFilesPost({
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
        }, req.initOverrides));
    }


    public async setVehicleVerification(req: ISetVehicleVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiVehiclesTransportVerificationPost({
            vehicleTransportVerificationRequestDto: {
                id: req.vehicleId,
                isVerifiedForTransporting: req.verified
            }
        }, req.initOverrides));
    }
}