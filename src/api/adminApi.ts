import {autowired, component} from "ironbean";
import {ApiConfiguration} from "./apiConfiguration";
import * as OpenApi from "./openapi";
import {IApiRequest} from "./toolsApi";
import {EmailType, Language} from "./openapi";
import {AppBusinessConfig} from "../data/appBusinessConfig";
import {AdminConverter} from "../converters/admin-converter";
import {EmailConfig} from "../data/emailConfig";

export interface IGetEmailConfigRequest extends IApiRequest {
}

export interface ISetEmailConfigRequest extends IApiRequest {
    type: EmailType;
    language: Language;
    templateId: number;
}

export interface IPostChangeAppBusinessConfigRequest extends IApiRequest {
    cfg: AppBusinessConfig;
}

@component
export class AdminApi {
    @autowired private _apiConfiguration: ApiConfiguration;

    private get _api() {
        return new OpenApi.AdminApi(this._apiConfiguration.config);
    }

    public async getEmailConfig(req: IGetEmailConfigRequest): Promise<EmailConfig> {
        const response = await this._api.apiAdminEmailConfigGet(req.initOverrides);
        return AdminConverter.emailConfigToClient(response);
    }

    public async setEmailConfig(req: ISetEmailConfigRequest): Promise<void> {
        await this._api.apiAdminEmailConfigPost({
            updateEmailConfig: {
                type: req.type,
                templateId: req.templateId,
                language: req.language
            }
        }, req.initOverrides);
    }

    public async changeAppBusinessConfig(req: IPostChangeAppBusinessConfigRequest): Promise<void> {
        await this._api.apiAdminAppConfigPost({
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
        }, req.initOverrides)
    }
}