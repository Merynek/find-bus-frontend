export interface IAppBusinessConfigSettings {
    minEndOrderFromNowInHours: number;
    minDateToAcceptOfferInHours: number;
    minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: number;
    minDiffBetweenStartTripAndEndOrderInHours: number;
    payRestOfPriceWarningBeforeStartTripInHours: number;
    payInvoiceWarningAfterAcceptOfferInHours: number;
    tripDepositInPercentage: number;
    tripCancelFeePercentageForDemander: number;
    tripCancelFeeAfterLimitPercentageForDemander: number;
    tripOfferCommissionPercentage: number;
    tripCancelPenaltyPercentageForTransporterFromCompany: number;
    tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: number;
    tripCancelPenaltyPercentageForTransporterFromDemander: number;
    tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: number;
    tripCancelPenaltyLimitInDays: number;
    tripCancelPenaltyAfterLimitPercentageForTransporter: number;
}

export class AppBusinessConfig {
    public minEndOrderFromNowInHours: number;
    public minDateToAcceptOfferInHours: number;
    public minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: number;
    public minDiffBetweenStartTripAndEndOrderInHours: number;
    public payRestOfPriceWarningBeforeStartTripInHours: number;
    public payInvoiceWarningAfterAcceptOfferInHours: number;
    public tripDepositInPercentage: number;

    public tripCancelFeePercentageForDemander: number;
    public tripCancelFeeAfterLimitPercentageForDemander: number;
    public tripOfferCommissionPercentage: number;
    public tripCancelPenaltyPercentageForTransporterFromCompany: number;
    public tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: number;
    public tripCancelPenaltyPercentageForTransporterFromDemander: number;
    public tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: number;
    public tripCancelPenaltyLimitInDays: number;
    public tripCancelPenaltyAfterLimitPercentageForTransporter: number;

    constructor(settings: IAppBusinessConfigSettings) {
        this.minEndOrderFromNowInHours = settings.minEndOrderFromNowInHours;
        this.minDateToAcceptOfferInHours = settings.minDateToAcceptOfferInHours;
        this.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours = settings.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours;
        this.minDiffBetweenStartTripAndEndOrderInHours = settings.minDiffBetweenStartTripAndEndOrderInHours;
        this.payRestOfPriceWarningBeforeStartTripInHours = settings.payRestOfPriceWarningBeforeStartTripInHours;
        this.payInvoiceWarningAfterAcceptOfferInHours = settings.payInvoiceWarningAfterAcceptOfferInHours;
        this.tripDepositInPercentage = settings.tripDepositInPercentage;
        this.tripCancelFeePercentageForDemander = settings.tripCancelFeePercentageForDemander;
        this.tripCancelFeeAfterLimitPercentageForDemander = settings.tripCancelFeeAfterLimitPercentageForDemander;
        this.tripOfferCommissionPercentage = settings.tripOfferCommissionPercentage;
        this.tripCancelPenaltyPercentageForTransporterFromCompany = settings.tripCancelPenaltyPercentageForTransporterFromCompany;
        this.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany = settings.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany;
        this.tripCancelPenaltyPercentageForTransporterFromDemander = settings.tripCancelPenaltyPercentageForTransporterFromDemander;
        this.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander = settings.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander;
        this.tripCancelPenaltyLimitInDays = settings.tripCancelPenaltyLimitInDays;
        this.tripCancelPenaltyAfterLimitPercentageForTransporter = settings.tripCancelPenaltyAfterLimitPercentageForTransporter;
    }
}