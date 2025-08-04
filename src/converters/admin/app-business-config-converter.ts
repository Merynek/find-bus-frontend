import {AppBusinessConfigResponseDto} from "@/src/api/openapi";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";

export class AppBusinessConfigConverter {
    public static toInstance(response: AppBusinessConfigResponseDto): AppBusinessConfig {
        return new AppBusinessConfig({
            minDateToAcceptOfferInHours: response.minDateToAcceptOfferInHours,
            minEndOrderFromNowInHours: response.minEndOrderFromNowInHours,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: response.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
            minDiffBetweenStartTripAndEndOrderInHours: response.minDiffBetweenStartTripAndEndOrderInHours,
            payRestOfPriceWarningBeforeStartTripInHours: response.payRestOfPriceWarningBeforeStartTripInHours,
            payInvoiceWarningAfterAcceptOfferInHours: response.payInvoiceWarningAfterAcceptOfferInHours,
            tripDepositInPercentage: response.tripDepositInPercentage,
            tripCancelFeePercentageForDemander: response.tripCancelFeePercentageForDemander,
            tripCancelFeeAfterLimitPercentageForDemander: response.tripCancelFeeAfterLimitPercentageForDemander,
            tripOfferCommissionPercentage: response.tripOfferCommissionPercentage,
            tripCancelPenaltyPercentageForTransporterFromCompany: response.tripCancelPenaltyPercentageForTransporterFromCompany,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: response.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
            tripCancelPenaltyPercentageForTransporterFromDemander: response.tripCancelPenaltyPercentageForTransporterFromDemander,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: response.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
            tripCancelPenaltyLimitInDays: response.tripCancelPenaltyLimitInDays,
            tripCancelPenaltyAfterLimitPercentageForTransporter:  response.tripCancelPenaltyAfterLimitPercentageForTransporter
        })
    }

    public static toJson(response: AppBusinessConfig): AppBusinessConfigResponseDto {
        return {
            minDateToAcceptOfferInHours: response.minDateToAcceptOfferInHours,
            minEndOrderFromNowInHours: response.minEndOrderFromNowInHours,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: response.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
            minDiffBetweenStartTripAndEndOrderInHours: response.minDiffBetweenStartTripAndEndOrderInHours,
            payRestOfPriceWarningBeforeStartTripInHours: response.payRestOfPriceWarningBeforeStartTripInHours,
            payInvoiceWarningAfterAcceptOfferInHours: response.payInvoiceWarningAfterAcceptOfferInHours,
            tripDepositInPercentage: response.tripDepositInPercentage,
            tripCancelFeePercentageForDemander: response.tripCancelFeePercentageForDemander,
            tripCancelFeeAfterLimitPercentageForDemander: response.tripCancelFeeAfterLimitPercentageForDemander,
            tripOfferCommissionPercentage: response.tripOfferCommissionPercentage,
            tripCancelPenaltyPercentageForTransporterFromCompany: response.tripCancelPenaltyPercentageForTransporterFromCompany,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: response.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
            tripCancelPenaltyPercentageForTransporterFromDemander: response.tripCancelPenaltyPercentageForTransporterFromDemander,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: response.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
            tripCancelPenaltyLimitInDays: response.tripCancelPenaltyLimitInDays,
            tripCancelPenaltyAfterLimitPercentageForTransporter:  response.tripCancelPenaltyAfterLimitPercentageForTransporter
        }
    }
}