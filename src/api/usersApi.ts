import {handleApiCall, IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";
import {AdminUserDetailResponseDto, UserSettingsRequestDto, type UserSettingsResponseDto} from "./openapi";

export interface IUpdateTransportRequirementsPhotosRequest extends IApiRequest {
    concessionDocuments: File|undefined;
    businessRiskInsurance: File|undefined;
}

export interface IChangeSettingsRequest extends IApiRequest {
    settings: UserSettingsRequestDto;
}

export interface ISendEmailRequest extends IApiRequest {
    email: string;
}

export interface IGetAdminUsersRequest extends IApiRequest {
    limit: number;
    offset: number;
}

export interface ISetUserVerificationRequest extends IApiRequest {
    userId: number;
    verified: boolean;
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

    public async updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest): Promise<void> {
        const businessRiskInsurance = req.businessRiskInsurance;
        const concessionDocuments = req.concessionDocuments;
        await handleApiCall(this._api.apiUsersTransportRequirementsPhotosPost({
            businessRiskInsurance: businessRiskInsurance || undefined,
            concessionDocuments: concessionDocuments || undefined
        }, req.initOverrides));
    }

    public async setUserVerification(req: ISetUserVerificationRequest): Promise<void> {
        await handleApiCall(this._api.apiUsersUserTransportVerificationPost({
            userTransportVerificationRequestDto: {
                id: req.userId,
                isVerifiedForTransporting: req.verified
            }
        }, req.initOverrides));
    }

    public async getAllUsers(req: IGetAdminUsersRequest): Promise<AdminUserDetailResponseDto[]> {
        return await handleApiCall(this._api.apiUsersUsersGet({
            limit: req.limit,
            offset: req.offset
        }, req.initOverrides));
    }
}
