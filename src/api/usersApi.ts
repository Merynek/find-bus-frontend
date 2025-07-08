import {autowired, component} from "ironbean";
import {IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";
import {UsersConverter} from "../converters/users-converter";
import {UserSettings} from "../data/users/userSettings";
import {Photo} from "../data/media/photo";
import {UserAdminDetail} from "../data/users/user-admin-detail";
import {AdminConverter} from "../converters/admin-converter";

export interface IUpdateTransportRequirementsPhotosRequest extends IApiRequest {
    concessionDocuments: Photo|null;
    businessRiskInsurance: Photo|null;
}

export interface IChangeSettingsRequest extends IApiRequest {
    settings: UserSettings;
}

export interface IGetSettingsRequest extends IApiRequest {
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

@component
export class UsersApi {
    @autowired private _apiConfiguration: ApiConfiguration;

    private get _api() {
        return new OpenApi.UsersApi(this._apiConfiguration.config);
    }

    public async changeSettings(req: IChangeSettingsRequest): Promise<void> {
        await this._api.apiUsersSettingsPost({
            userSettingsRequestDto: UsersConverter.userSettingsToServer(req.settings)
        }, req.initOverrides);
    }

    public async getSettings(req: IGetSettingsRequest): Promise<UserSettings> {
        const response = await this._api.apiUsersSettingsGet(req.initOverrides)
        return UsersConverter.userSettingsToClient(response);
    }

    public async updateTransportRequirementsPhotos(req: IUpdateTransportRequirementsPhotosRequest): Promise<void> {
        const businessRiskInsurance = req.businessRiskInsurance;
        const concessionDocuments = req.concessionDocuments;
        await this._api.apiUsersTransportRequirementsPhotosPost({
            businessRiskInsurance: businessRiskInsurance ? (businessRiskInsurance.path ? undefined : businessRiskInsurance.file) : undefined,
            concessionDocuments: concessionDocuments ? (concessionDocuments.path ? undefined : concessionDocuments.file) : undefined
        }, req.initOverrides);
    }

    public async setUserVerification(req: ISetUserVerificationRequest): Promise<void> {
        await this._api.apiUsersUserTransportVerificationPost({
            userTransportVerificationRequestDto: {
                id: req.userId,
                isVerifiedForTransporting: req.verified
            }
        }, req.initOverrides)
    }

    public async getAllUsers(req: IGetAdminUsersRequest): Promise<UserAdminDetail[]> {
        const response = await this._api.apiUsersUsersGet({
            limit: req.limit,
            offset: req.offset
        }, req.initOverrides);

        return response.map(AdminConverter.userAdminDetailToClient);
    }
}
