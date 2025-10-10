import * as runtime from "./openapi/runtime";
import {ApiError, IApiError} from "@/src/api/apiError";
import {ErrorCode} from "@/src/api/openapi";

export interface IApiRequest {
    initOverrides?: RequestInit | runtime.InitOverrideFunction;
}

interface IApiErrorResponse {
    errors?: object[];
    title?: string;
    ErrorCode: ErrorCode;
    Message: string;
}

interface IApiSchemaErrorResponse {
    errors?: object[];
    title?: string;
}

interface FetchError {
    response?: {
        json: () => Promise<IApiErrorResponse>;
        url?: string;
        status?: number;
    };
}

function isFetchError(error: unknown): error is FetchError {
    return (
        !!error &&
        typeof error === 'object' &&
        'response' in error &&
        (error as FetchError).response !== null &&
        typeof (error as FetchError).response === 'object' &&
        'json' in (error as FetchError).response! &&
        typeof (error as FetchError).response!.json === 'function'
    );
}

function isSchemaErrorResponse(obj: unknown): obj is IApiSchemaErrorResponse {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'errors' in obj &&
        'title' in obj
    );
}

function isApiErrorResponse(obj: unknown): obj is IApiErrorResponse {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'ErrorCode' in obj && typeof (obj as IApiErrorResponse).ErrorCode === 'string' &&
        'Message' in obj && typeof (obj as IApiErrorResponse).Message === 'string'
    );
}

export async function handleApiCall<T>(apiCall: Promise<T>): Promise<T> {
    try {
        return await apiCall;
    } catch (error: unknown) {
        const errorMessage = "An unexpected error occurred.";
        let apiErrorDetails: IApiError = {
            errorCode: ErrorCode.UNKNOWN,
            message: errorMessage,
            url: undefined,
            statusCode: undefined
        };
        if (isFetchError(error)) {
            try {
                const jsonError = await error.response!.json();
                if (isApiErrorResponse(jsonError)) {
                    apiErrorDetails = {
                        errorCode: jsonError.ErrorCode || ErrorCode.UNKNOWN,
                        message: jsonError.Message || errorMessage,
                        url: error.response?.url,
                        statusCode: error.response?.status
                    };
                }
                if (isSchemaErrorResponse(jsonError)) {
                    let message = jsonError.Message || jsonError.title ||  errorMessage;
                    if (jsonError.errors) {
                        message += ` ${JSON.stringify(jsonError.errors)}`;
                    }
                    apiErrorDetails = {
                        errorCode: ErrorCode.UNKNOWN,
                        message: message,
                        url: error.response?.url,
                        statusCode: error.response?.status
                    };
                }
            } catch (jsonError) {
                apiErrorDetails.url = error.response?.url;
                apiErrorDetails.statusCode = error.response?.status;
                console.error("Failed to parse JSON error response:", jsonError);
            }
        } else if (error instanceof Error) {
            apiErrorDetails.message = error.message;
        }

        throw new ApiError(apiErrorDetails);
    }
}