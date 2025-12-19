import {handleApiCall, IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {Locales, UserRole} from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";

export interface IRegistrationRequest extends IApiRequest {
    email: string;
    password: string;
    role: UserRole;
    locale: Locales
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
                locale: req.locale
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