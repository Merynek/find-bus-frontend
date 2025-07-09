import {autowired} from "ironbean";
import {IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {User} from "../data/users/user";
import {AdminConverter} from "../converters/admin-converter";
import {UsersConverter} from "../converters/users-converter";
import {AppConfiguration} from "../singletons/AppConfiguration";
import {CurrentUser} from "../singletons/current-user";
import {ApiConfiguration} from "@/src/api/apiConfiguration";

export interface IForgotPasswordRequest extends IApiRequest {
    email: string;
}

export interface IResetPasswordRequest extends IApiRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ILogoutRequest extends IApiRequest {
}

export interface ILoginRequest extends IApiRequest {
    email: string;
    password: string;
}

export class AuthorizeApi {
    @autowired private _currentUser: CurrentUser;
    private _configuration: AppConfiguration;
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._configuration = AppConfiguration.instance;
        this._token = token;
    }

    private get _api() {
        return new OpenApi.AuthorizeApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async checkToken(): Promise<User|null> {
        try {
            const response = await this._api.apiAuthorizeCheckTokenPost({});
            this._configuration.appBusinessConfig = AdminConverter.appBusinessConfigToClient(response.appBusinessConfig);
            return UsersConverter.currentUserToClient(response.user);
        } catch (e) {
            return null;
        }
    }

    public async login(req: ILoginRequest): Promise<void> {
        const response = await this._api.apiAuthorizeLoginPost({
            loginRequestDto: {
                email: req.email,
                password: req.password
            }
        }, req.initOverrides);
        this._configuration.appBusinessConfig = AdminConverter.appBusinessConfigToClient(response.appBusinessConfig);
        const user = UsersConverter.currentUserToClient(response.user);
        this._currentUser.login(user, response.token.token, "");
    }

    public async logout(req: ILogoutRequest): Promise<void> {
        this._currentUser.logout();
    }

    public async forgotPassword(req: IForgotPasswordRequest): Promise<void> {
        await this._api.apiAuthorizeForgetPasswordPost({
            forgetPasswordRequestDto: {
                email: req.email
            }
        }, req.initOverrides);
    }

    public async resetPassword(req: IResetPasswordRequest): Promise<void> {
        await this._api.apiAuthorizeChangePasswordPost({
            changePasswordRequestDto: {
                token: req.token,
                confirmPassword: req.confirmPassword,
                newPassword: req.password
            }
        }, req.initOverrides)
    }
}