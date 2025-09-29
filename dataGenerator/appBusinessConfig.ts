import {AppBusinessConfig} from "@/src/data/appBusinessConfig";
import {getRandomNumber} from "@/src/utils/common";

export function getRandomAppBusinessConfig(): AppBusinessConfig {
    return new AppBusinessConfig({
        minDateToAcceptOfferInHours: getRandomNumber(1, 500),
        minEndOrderFromNowInHours: getRandomNumber(1, 500),
        minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: getRandomNumber(1, 500),
        minDiffBetweenStartTripAndEndOrderInHours: getRandomNumber(1, 500),
        payRestOfPriceWarningBeforeStartTripInHours: getRandomNumber(1, 500),
        payInvoiceWarningAfterAcceptOfferInHours: getRandomNumber(1, 500),
        tripDepositInPercentage: getRandomNumber(1, 25),
        tripCancelFeePercentageForDemander: getRandomNumber(1, 20),
        tripCancelFeeAfterLimitPercentageForDemander: getRandomNumber(1, 20),
        tripOfferCommissionPercentage: getRandomNumber(1, 10),
        tripCancelPenaltyPercentageForTransporterFromCompany: getRandomNumber(1, 30),
        tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: getRandomNumber(1, 5000),
        tripCancelPenaltyPercentageForTransporterFromDemander: getRandomNumber(1, 30),
        tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: getRandomNumber(1, 5000),
        tripCancelPenaltyLimitInDays: getRandomNumber(1, 10),
        tripCancelPenaltyAfterLimitPercentageForTransporter:  getRandomNumber(1, 30)
    })
}