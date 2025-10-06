import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {
    Amenities,
    EuroStandard,
    PlaceRequestDto, VehicleDocumentType,
    VehiclePhotoType,
    type VehicleRequestDto,
    VehicleResponseDto
} from "./openapi";

export interface IVehiclePhotoRequest {
    type: VehiclePhotoType;
    file: File;
}

export interface IVehicleDocumentRequest {
    type: VehicleDocumentType;
    file: File;
}

export interface IUpdateVehicleRequest extends IApiRequest {
    vehicleId: number;
    vehicle: IVehicleRequest;
}

export interface ISendVehicleToVerificationRequest extends IApiRequest {
    vehicleId: number;
}

export interface IUploadVehicleFilesRequest extends IApiRequest {
    vehicleId: number;
    photoFiles: File[];
    documentFiles: File[];
    photoTypes: VehiclePhotoType[];
    documentTypes: VehicleDocumentType[];
    photoIdsToDelete: number[];
    documentIdsToDelete: number[];
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

    public async sendVehicleToVerification(req: ISendVehicleToVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiVehiclesSendVehicleToVerificationPost({
            vehicleVerificationRequestDto: {
                vehicleId: req.vehicleId
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
            photoFiles: req.photoFiles,
            documentFiles: req.documentFiles,
            photoTypes: req.photoTypes,
            documentTypes: req.documentTypes,
            photoIdsToDelete: req.photoIdsToDelete,
            documentIdsToDelete: req.documentIdsToDelete
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