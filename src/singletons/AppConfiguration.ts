import {AppBusinessConfig} from "../data/appBusinessConfig";

export class AppConfiguration {
    private static _instance: AppConfiguration | null = null;
    public appBusinessConfig: AppBusinessConfig;

    constructor() {
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

    public static get instance(): AppConfiguration {
        if (!AppConfiguration._instance) {
            AppConfiguration._instance = new AppConfiguration();
        }
        return AppConfiguration._instance;
    }

    public getApiUrl(): string {
        if (process.env.NEXT_PUBLIC_API_URL) {
            return process.env.NEXT_PUBLIC_API_URL;
        }
        throw new Error('Environment variable API_URL is not defined.');
    }

    public getResourcePath(): string {
        return this.getApiUrl() + "/Public/";
    }

    get locale() {
        return "cs-CZ";
    }
}