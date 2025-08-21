import {handleApiCall, IApiRequest} from "./toolsApi";
import * as OpenApi from "./openapi";
import {ApiConfiguration} from "@/src/api/apiConfiguration";
import {AccessTokenDto, LoginResponseDto} from "./openapi";

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

export interface IRefreshTokenRequest extends IApiRequest {
    token: string;
}

export class AuthorizeApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.AuthorizeApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async login(req: ILoginRequest): Promise<LoginResponseDto> {
        return await handleApiCall(this._api.apiAuthorizeLoginPost({
            loginRequestDto: {
                email: req.email,
                password: req.password
            }
        }, req.initOverrides));
    }

    public async refreshToken(req: IRefreshTokenRequest): Promise<AccessTokenDto> {
        return await handleApiCall(this._api.apiAuthorizeRefreshPost({
            refreshTokenRequestDto: {
                refreshToken: req.token
            }
        }, req.initOverrides));
    }

    public async forgotPassword(req: IForgotPasswordRequest): Promise<void> {
        await handleApiCall(this._api.apiAuthorizeForgetPasswordPost({
            forgetPasswordRequestDto: {
                email: req.email
            }
        }, req.initOverrides));
    }

    public async resetPassword(req: IResetPasswordRequest): Promise<void> {
        await handleApiCall(this._api.apiAuthorizeChangePasswordPost({
            changePasswordRequestDto: {
                token: req.token,
                confirmPassword: req.confirmPassword,
                newPassword: req.password
            }
        }, req.initOverrides));
    }
}