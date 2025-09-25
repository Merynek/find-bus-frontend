import {ErrorCode} from "@/src/api/openapi";
import {FrontendErrorEnum} from "@/src/enums/frontend-error.enum";

export interface IFindBusError {
    name: string;
    errorCode: ErrorCode|FrontendErrorEnum;
    message: string;
    url?: string;
    statusCode?: number;
}

export class FindBusError extends Error {
    public readonly errorCode: ErrorCode|FrontendErrorEnum;
    public readonly url?: string;
    public readonly statusCode?: number;
    public readonly name: string;

    constructor(error: IFindBusError) {
        super(error.message);
        this.name = error.name;
        this.errorCode = error.errorCode;
        this.url = error.url;
        this.statusCode = error.statusCode;
    }

    get isUnauthorizedError(): boolean {
        return this.statusCode === 401;
    }

    public toJson(): IFindBusError {
        return {
            name: this.name,
            errorCode: this.errorCode,
            message: this.message,
            url: this.url,
            statusCode: this.statusCode
        };
    }

    public static fromError(error: unknown): FindBusError|null {
        if (error instanceof Error) {
            try {
                const parsedError = JSON.parse(error.message);
                if ('message' in parsedError && 'errorCode' in parsedError && 'name' in parsedError) {
                    return new FindBusError({
                        name: parsedError.name,
                        errorCode: parsedError.errorCode as (ErrorCode|FrontendErrorEnum),
                        message: parsedError.message,
                        url: parsedError.url || "",
                        statusCode: parsedError.statusCode ? Number(parsedError.statusCode) : 0
                    });
                }
            } catch (e) {
                console.error("Error:", JSON.stringify(error));
                console.error("Chyba při parsování chyby:", JSON.stringify(e));
                return null;
            }
        }
        return null;
    }
}