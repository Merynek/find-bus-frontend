import {handleApiCall, IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {UserRole} from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";

export interface IRegistrationRequest extends IApiRequest {
    email: string;
    password: string;
    role: UserRole;
    clientUrl: string;
}

export interface IActiveUserRequest extends IApiRequest {
    token: string;
}

export class RegistrationApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.RegistrationApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async registration(req: IRegistrationRequest): Promise<void> {
        await handleApiCall(this._api.apiRegistrationUserPost({
            registrationUserRequestDto: {
                email: req.email,
                password: req.password,
                confirmPassword: req.password,
                role: req.role,
                clientUrl: req.clientUrl
            }
        }, req.initOverrides));
    }

    public async activeUser(req: IActiveUserRequest): Promise<void> {
        await handleApiCall(this._api.apiRegistrationActivePost({
            userActiveRequestDto: {
                token: req.token
            }
        }, req.initOverrides));
    }
}