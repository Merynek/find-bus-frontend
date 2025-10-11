import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {
    Amenities,
    EuroStandard,
    PlaceRequestDto, VehicleDocumentType,
    VehiclePhotoType, type VehiclePublicUploadSasUrlResponseDto,
    type VehicleRequestDto,
    VehicleResponseDto
} from "./openapi";
import {UploadVehicleFilesSasUrlResponseDto} from "@/src/api/openapi/models/UploadVehicleFilesSasUrlResponseDto";

export interface IUpdateVehicleRequest extends IApiRequest {
    vehicleId: number;
    vehicle: IVehicleRequest;
}

export interface ISendVehicleToVerificationRequest extends IApiRequest {
    vehicleId: number;
}

export interface ICompleteUploadVehicleFilesRequest extends IApiRequest {
    vehicleId: number;
    photoIdsToDelete: number[];
    documentIdsToDelete: number[];
    photos: IPhotoCompleteUploadItem[];
    documents: IDocumentCompleteUploadItem[];
}

export interface ICompletePublicUploadVehiclePhotosRequest extends IApiRequest {
    vehicleId: number;
    photoIdsToDelete: number[];
    photos: IPublicPhotoCompleteUploadItem[];
}

export interface IPublicPhotoCompleteUploadItem extends IFileCompleteUploadItem {
    id: number;
}

export interface IDocumentCompleteUploadItem extends IFileCompleteUploadItem {
    type: VehicleDocumentType;
}

export interface IPhotoCompleteUploadItem extends IFileCompleteUploadItem {
    type: VehiclePhotoType;
}

interface IFileCompleteUploadItem {
    blobName: string;
    contentType: string;
    fileSize: number;
    originalFileName: string;
}

export interface ICreateUploadUrlForVehicleFilesRequest extends IApiRequest {
    vehicleId: number;
    photos: IPhotoUploadItem[];
    documents: IDocumentUploadItem[];
}

export interface ICreatePublicUploadUrlForVehiclePhotosRequest extends IApiRequest {
    vehicleId: number;
    photos: IPublicPhotoUploadItem[];
}

interface IPublicPhotoUploadItem extends IUploadItem {
    id: number
}

interface IPhotoUploadItem extends IUploadItem {
    type: VehiclePhotoType;
}

interface IDocumentUploadItem extends IUploadItem {
    type: VehicleDocumentType;
}

interface IUploadItem {
    clientFileId: string;
    fileName: string;
}

export interface IUploadVehiclePublicPhotosRequest extends IApiRequest {
    vehicleId: number;
    photoFiles: File[];
    photoIds: number[];
    photoIdsToDelete: number[];
}

export interface ISetVehicleVerificationRequest extends IApiRequest {
    vehicleId: number;
    verified: boolean;
    description: string;
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

export interface IGetVehiclesRequest extends IApiRequest {
    verified?: boolean;
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

    public async getVehicles(req: IGetVehiclesRequest): Promise<VehicleResponseDto[]> {
        return await handleApiCall(this._api.apiVehiclesGet({
            verified: req.verified
        }));
    }

    public async addVehicle(req: IAddVehicleRequest): Promise<number> {
        return await handleApiCall(this._api.apiVehiclesVehiclePost({
            addVehicleRequestDto: {
                info: this._createVehicleRequest(req.vehicle)
            }
        }, req.initOverrides));
    }

    public async updateVehicle(req: IUpdateVehicleRequest): Promise<number> {
        return await handleApiCall(this._api.apiVehiclesVehiclePut({
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

    public async createUploadUrlForVehicleFiles(req: ICreateUploadUrlForVehicleFilesRequest): Promise<UploadVehicleFilesSasUrlResponseDto> {
        return await handleApiCall(this._api.apiVehiclesCreateUploadFilesPost({
            vehicleCreateUploadUrlFilesRequestDto: {
                vehicleId: req.vehicleId,
                photos: req.photos,
                documents: req.documents
            }
        }, req.initOverrides));
    }

    public async completeUploadVehicleFiles(req: ICompleteUploadVehicleFilesRequest): Promise<number> {
        return await handleApiCall(this._api.apiVehiclesCompleteFileUploadPost({
            vehicleCompleteUploadFilesRequestDto: {
                vehicleId: req.vehicleId,
                photos: req.photos,
                documents: req.documents,
                photoIdsToDelete: req.photoIdsToDelete,
                documentIdsToDelete: req.documentIdsToDelete
            }
        }, req.initOverrides));
    }

    public async setVehicleVerification(req: ISetVehicleVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiVehiclesTransportVerificationPost({
            vehicleTransportVerificationRequestDto: {
                id: req.vehicleId,
                isVerified: req.verified,
                description: req.description
            }
        }, req.initOverrides));
    }

    public async createPublicUploadUrlForVehiclePhotos(req: ICreatePublicUploadUrlForVehiclePhotosRequest): Promise<VehiclePublicUploadSasUrlResponseDto> {
        return await handleApiCall(this._api.apiVehiclesCreatePublicUploadPhotosPost({
            vehicleCreatePublicUploadUrlPhotosRequestDto: {
                vehicleId: req.vehicleId,
                photos: req.photos
            }
        }, req.initOverrides));
    }

    public async completePublicUploadVehiclePhotos(req: ICompletePublicUploadVehiclePhotosRequest): Promise<void> {
        return await handleApiCall(this._api.apiVehiclesCompletePublicPhotosUploadPost({
            vehicleCompletePublicUploadPhotosRequestDto: {
                vehicleId: req.vehicleId,
                photos: req.photos,
                photoIdsToDelete: req.photoIdsToDelete,
            }
        }, req.initOverrides));
    }
}