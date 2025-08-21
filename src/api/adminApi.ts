import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {handleApiCall, IApiRequest} from "./toolsApi";
import {
    AppBusinessConfigResponseDto,
    type EmailConfigResponseDto,
    EmailType,
    Language,
    UpdateAppBusinessConfigRequestDto
} from "./openapi";

export interface ISetEmailConfigRequest extends IApiRequest {
    type: EmailType;
    language: Language;
    templateId: number;
}

export interface IPostChangeAppBusinessConfigRequest extends IApiRequest {
    cfg: UpdateAppBusinessConfigRequestDto;
}

export class AdminApi {
    private readonly _token: string|undefined;

    constructor(token: string|undefined) {
        this._token = token;
    }

    private get _api() {
        return new OpenApi.AdminApi(ApiConfiguration.createOpenApiConfig(this._token));
    }

    public async getEmailConfig(): Promise<EmailConfigResponseDto> {
        return await this._api.apiAdminEmailConfigGet();
    }

    public async setEmailConfig(req: ISetEmailConfigRequest): Promise<void> {
        await handleApiCall(this._api.apiAdminEmailConfigPost({
            updateEmailConfig: {
                type: req.type,
                templateId: req.templateId,
                language: req.language
            }
        }, req.initOverrides));
    }

    public async getAppBusinessConfig(): Promise<AppBusinessConfigResponseDto> {
        return await handleApiCall(this._api.apiAdminAppConfigGet());
    }

    public async changeAppBusinessConfig(req: IPostChangeAppBusinessConfigRequest): Promise<void> {
        await handleApiCall(this._api.apiAdminAppConfigPost({
            updateAppBusinessConfigRequestDto: {
                minDateToAcceptOfferInHours: req.cfg.minDateToAcceptOfferInHours,
                minEndOrderFromNowInHours: req.cfg.minEndOrderFromNowInHours,
                minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: req.cfg.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
                minDiffBetweenStartTripAndEndOrderInHours: req.cfg.minDiffBetweenStartTripAndEndOrderInHours,
                payRestOfPriceWarningBeforeStartTripInHours: req.cfg.payRestOfPriceWarningBeforeStartTripInHours,
                payInvoiceWarningAfterAcceptOfferInHours: req.cfg.payInvoiceWarningAfterAcceptOfferInHours,
                tripCancelFeePercentageForDemander: req.cfg.tripCancelFeePercentageForDemander,
                tripCancelFeeAfterLimitPercentageForDemander: req.cfg.tripCancelFeeAfterLimitPercentageForDemander,
                tripCancelPenaltyLimitInDays: req.cfg.tripCancelPenaltyLimitInDays,
                tripCancelPenaltyPercentageForTransporterFromCompany: req.cfg.tripCancelPenaltyPercentageForTransporterFromCompany,
                tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: req.cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
                tripCancelPenaltyPercentageForTransporterFromDemander: req.cfg.tripCancelPenaltyPercentageForTransporterFromDemander,
                tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: req.cfg.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
                tripDepositInPercentage: req.cfg.tripDepositInPercentage,
                tripOfferCommissionPercentage: req.cfg.tripOfferCommissionPercentage,
                tripCancelPenaltyAfterLimitPercentageForTransporter: req.cfg.tripCancelPenaltyAfterLimitPercentageForTransporter
            }
        }, req.initOverrides));
    }
}