import {handleApiCall, IApiRequest, IFileCompleteUploadItem, IUploadItem} from "./toolsApi";
import * as OpenApi from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";
import {
    AdminUserDetailResponseDto,
    type TransporterRequirementsResponseDto,
    TransportRequirementsType,
    type TransportRequirementsUploadSasUrlResponseDto,
    UserSettingsRequestDto,
    type UserSettingsResponseDto
} from "./openapi";

export interface IChangeSettingsRequest extends IApiRequest {
    settings: UserSettingsRequestDto;
}

export interface IGetUserTransportRequirementsRequest extends IApiRequest {
    userId: number;
}

export interface ISendTransportRequirementsToVerificationRequest extends IApiRequest {
    transportRequirementsId: number;
}

export interface IUpdateTransportRequirementsRequest extends IApiRequest {
    concessionNumber: string;
}

export interface ICreateUploadUrlForTransportRequirementsFilesRequest extends IApiRequest {
    transportRequirementsId: number;
    documents: ITransportDocumentUploadItem[];
}

interface ITransportDocumentUploadItem extends IUploadItem {
    type: TransportRequirementsType;
}

export interface ICompleteUploadTransportRequirementsDocumentsRequest extends IApiRequest {
    transportRequirementsId: number;
    documentIdsToDelete: number[];
    documents: ITransportDocumentCompleteUploadItem[];
}

export interface ITransportDocumentCompleteUploadItem extends IFileCompleteUploadItem {
    type: TransportRequirementsType;
}

export interface ISetTransportRequirementsVerificationRequest extends IApiRequest {
    transportRequirementsId: number;
    verified: boolean;
    description: string;
}

export interface IGetAdminUsersRequest extends IApiRequest {
    limit: number;
    offset: number;
}

export interface IGetUserDetailRequest extends IApiRequest {
    userId: number;
}

export interface IBanUserRequest extends IApiRequest {
    userId: number;
    ban: boolean;
}

export class UsersApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.UsersApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async changeSettings(req: IChangeSettingsRequest): Promise<void> {
        await handleApiCall(this._api.apiUsersSettingsPost({
            userSettingsRequestDto: req.settings
        }, req.initOverrides));
    }

    public async getSettings(): Promise<UserSettingsResponseDto> {
        return await handleApiCall(this._api.apiUsersSettingsGet());
    }

    public async getUserTransportRequirements(req: IGetUserTransportRequirementsRequest): Promise<TransporterRequirementsResponseDto> {
        return await handleApiCall(this._api.apiUsersUserTransportRequirementsGet(req));
    }

    public async getTransportRequirements(): Promise<TransporterRequirementsResponseDto> {
        return await handleApiCall(this._api.apiUsersTransportRequirementsGet());
    }

    public async sendTransportRequirementsToVerification(req: ISendTransportRequirementsToVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiUsersSendTransportRequirementsToVerificationPost({
            transportRequirementsSendToVerificationRequestDto: {
                requirementsId: req.transportRequirementsId
            },
        }, req.initOverrides));
    }

    public async updateTransportRequirements(req: IUpdateTransportRequirementsRequest): Promise<number> {
        return await handleApiCall(this._api.apiUsersTransportRequirementsPost({
            transportRequirementsRequestDto: {
                concessionNumber: req.concessionNumber
            },
        }, req.initOverrides));
    }

    public async createUploadUrlForTransportRequirementDocuments(req: ICreateUploadUrlForTransportRequirementsFilesRequest): Promise<TransportRequirementsUploadSasUrlResponseDto> {
        return await handleApiCall(this._api.apiUsersTransportRequirementsCreateUploadDocumentPost({
            transportRequirementsCreateUploadUrlFilesRequestDto: {
                requirementsId: req.transportRequirementsId,
                documents: req.documents
            }
        }, req.initOverrides));
    }

    public async completeUploadTransportRequirementsDocuments(req: ICompleteUploadTransportRequirementsDocumentsRequest): Promise<void> {
        return await handleApiCall(this._api.apiUsersTransportRequirementsCompleteDocumentUploadPost({
            transportDocumentsCompleteUploadFilesRequestDto: {
                requirementsId: req.transportRequirementsId,
                documents: req.documents,
                documentIdsToDelete: req.documentIdsToDelete
            }
        }, req.initOverrides));
    }

    public async transportRequirementsVerification(req: ISetTransportRequirementsVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiUsersTransportRequirementsVerificationPost({
            transportRequirementsVerificationRequestDto: {
                requirementsId: req.transportRequirementsId,
                isVerified: req.verified,
                description: req.description
            }
        }, req.initOverrides));
    }

    public async getAllUsers(req: IGetAdminUsersRequest): Promise<AdminUserDetailResponseDto[]> {
        return await handleApiCall(this._api.apiUsersUsersGet({
            limit: req.limit,
            offset: req.offset
        }, req.initOverrides));
    }

    public async getUserDetail(req: IGetUserDetailRequest): Promise<AdminUserDetailResponseDto> {
        return await handleApiCall(this._api.apiUsersUserGet({
            userId: req.userId
        }, req.initOverrides));
    }

    public async banUser(req: IBanUserRequest): Promise<void> {
        return await handleApiCall(this._api.apiUsersBanPost({
            banUserRequestDto: {
                ban: req.ban,
                idUser: req.userId
            }
        }, req.initOverrides));
    }
}
