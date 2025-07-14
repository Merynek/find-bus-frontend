import {IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {ApiConfiguration} from "@/src/api/apiConfiguration";
import {CheckTokenResponseDto, LoginResponseDto} from "./openapi";

export interface IForgotPasswordRequest extends IApiRequest {
    email: string;
}

export interface IResetPasswordRequest extends IApiRequest {
    token: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginRequest extends IApiRequest {
    email: string;
    password: string;
}

export class AuthorizeApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.AuthorizeApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async checkToken(): Promise<CheckTokenResponseDto|null> {
        try {
            return await this._api.apiAuthorizeCheckTokenPost({});
        } catch (e) {
            return null;
        }
    }

    public async login(req: ILoginRequest): Promise<LoginResponseDto> {
        return await this._api.apiAuthorizeLoginPost({
            loginRequestDto: {
                email: req.email,
                password: req.password
            }
        }, req.initOverrides);
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