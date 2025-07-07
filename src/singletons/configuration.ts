import {component} from "ironbean";
import {AppBusinessConfig} from "../data/appBusinessConfig";

@component
export class Configuration {
    private readonly _isDevelopment: boolean;
    private readonly _localHost: string = "https://localhost:44359";
    public appBusinessConfig: AppBusinessConfig;

    constructor() {
        this._isDevelopment = process.env.NODE_ENV !== 'production';
        this.appBusinessConfig = new AppBusinessConfig({
            minEndOrderFromNowInHours: 24,
            minDateToAcceptOfferInHours: 24,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: 600,
            minDiffBetweenStartTripAndEndOrderInHours: 480,
            payRestOfPriceWarningBeforeStartTripInHours: 480,
            payInvoiceWarningAfterAcceptOfferInHours: 72,
            tripCancelFeePercentageForDemander: 5,
            tripCancelFeeAfterLimitPercentageForDemander: 60,
            tripCancelPenaltyLimitInDays: 21,
            tripCancelPenaltyPercentageForTransporterFromCompany: 10,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: 5000,
            tripCancelPenaltyPercentageForTransporterFromDemander: 20,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: 5000,
            tripDepositInPercentage: 25,
            tripOfferCommissionPercentage: 10,
            tripCancelPenaltyAfterLimitPercentageForTransporter: 30
        });
    }

    public getApiUrl(): string {
        if (this._isDevelopment) {
            return this._localHost //"https://www.find-bus.com" <-- production url
        }
        return this.getOriginPath();
    }

    public getResourcePath(): string {
        if (this._isDevelopment) {
            return this._localHost + "/Public/";
        }
        return this.getOriginPath() + "/Public/";
    }

    get siteUrl() {
        return this.getOriginPath() + this.getBasePath()
    }

    get locale() {
        return "cs-CZ";
    }

    public getBasePath(): string {
        return "/";
    }

    public getOriginPath(): string {
        return window.location.origin;
    }
}