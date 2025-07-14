import { z } from 'zod'

export const AppConfigSchema = z.object({
    minEndOrderFromNowInHours: z.number().min(0),
    minDateToAcceptOfferInHours: z.number().min(0),
    minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: z.number().min(0),
    minDiffBetweenStartTripAndEndOrderInHours: z.number().min(0),
    payRestOfPriceWarningBeforeStartTripInHours: z.number().min(0),
    payInvoiceWarningAfterAcceptOfferInHours: z.number().min(0),
    tripDepositInPercentage: z.number().min(0),
    tripCancelFeePercentageForDemander: z.number().min(0),
    tripCancelFeeAfterLimitPercentageForDemander: z.number().min(0),
    tripOfferCommissionPercentage: z.number().min(0),
    tripCancelPenaltyPercentageForTransporterFromCompany: z.number().min(0),
    tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: z.number().min(0),
    tripCancelPenaltyPercentageForTransporterFromDemander: z.number().min(0),
    tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: z.number().min(0),
    tripCancelPenaltyLimitInDays: z.number().min(0),
    tripCancelPenaltyAfterLimitPercentageForTransporter: z.number().min(0),
})