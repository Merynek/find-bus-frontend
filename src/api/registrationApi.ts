import {autowired, component} from "ironbean";
import {IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {UserRole} from "./openapi";
import {ApiConfiguration} from "./apiConfiguration";

export interface IRegistrationRequest extends IApiRequest {
    email: string;
    password: string;
    role: UserRole;
}

export interface IActiveUserRequest extends IApiRequest {
    token: string;
}

@component
export class RegistrationApi {
    @autowired private _apiConfiguration: ApiConfiguration;

    private get _api() {
        return new OpenApi.RegistrationApi(this._apiConfiguration.config);
    }

    public async registration(req: IRegistrationRequest): Promise<void> {
        await this._api.apiRegistrationUserPost({
            registrationUserRequestDto: {
                email: req.email,
                password: req.password,
                confirmPassword: req.password,
                role: req.role
            }
        }, req.initOverrides);
    }

    public async activeUser(req: IActiveUserRequest): Promise<void> {
        await this._api.apiRegistrationActivePost({
            userActiveRequestDto: {
                token: req.token
            }
        }, req.initOverrides)
    }
}