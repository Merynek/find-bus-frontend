import {makeObservable, observable} from "mobx";

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
    @observable public minEndOrderFromNowInHours: number;
    @observable public minDateToAcceptOfferInHours: number;
    @observable public minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: number;
    @observable public minDiffBetweenStartTripAndEndOrderInHours: number;
    @observable public payRestOfPriceWarningBeforeStartTripInHours: number;
    @observable public payInvoiceWarningAfterAcceptOfferInHours: number;
    @observable public tripDepositInPercentage: number;

    @observable public tripCancelFeePercentageForDemander: number;
    @observable public tripCancelFeeAfterLimitPercentageForDemander: number;
    @observable public tripOfferCommissionPercentage: number;
    @observable public tripCancelPenaltyPercentageForTransporterFromCompany: number;
    @observable public tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: number;
    @observable public tripCancelPenaltyPercentageForTransporterFromDemander: number;
    @observable public tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: number;
    @observable public tripCancelPenaltyLimitInDays: number;
    @observable public tripCancelPenaltyAfterLimitPercentageForTransporter: number;

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
        makeObservable(this);
    }
}