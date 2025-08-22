import {ErrorCode} from "@/src/api/openapi";

export interface IApiError {
    errorCode: ErrorCode;
    message: string;
    url?: string;
    statusCode?: number;
}

export class ApiError extends Error {
    public readonly errorCode: ErrorCode;
    public readonly url?: string;
    public readonly statusCode?: number;

    constructor(details: IApiError) {
        super(details.message);
        this.name = "ApiError";
        this.errorCode = details.errorCode;
        this.url = details.url;
        this.statusCode = details.statusCode;
    }

    public toJson(): IApiError {
        return {
            errorCode: this.errorCode,
            message: this.message,
            url: this.url,
            statusCode: this.statusCode
        };
    }
}