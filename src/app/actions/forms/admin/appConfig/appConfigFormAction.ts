'use server';

import {FormDataEnum} from "@/src/enums/form-data.enum";
import {redirect} from "next/navigation";
import {AppConfigSchema} from "@/src/app/actions/forms/admin/appConfig/appConfigSchema";
import {ROUTES} from "@/src/enums/router.enum";
import {AdminService} from "@/src/services/AdminService";
import {AppBusinessConfig} from "@/src/data/appBusinessConfig";

export type TAppConfigFormState = {
    errors?: {
        minEndOrderFromNowInHours?: string[];
        minDateToAcceptOfferInHours?: string[];
        minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours?: string[];
        minDiffBetweenStartTripAndEndOrderInHours?: string[];
        payRestOfPriceWarningBeforeStartTripInHours?: string[];
        payInvoiceWarningAfterAcceptOfferInHours?: string[];
        tripDepositInPercentage?: string[];
        tripCancelFeePercentageForDemander?: string[];
        tripCancelFeeAfterLimitPercentageForDemander?: string[];
        tripOfferCommissionPercentage?: string[];
        tripCancelPenaltyPercentageForTransporterFromCompany?: string[];
        tripCancelPenaltyMinAmountInCzkForTransporterFromCompany?: string[];
        tripCancelPenaltyPercentageForTransporterFromDemander?: string[];
        tripCancelPenaltyMinAmountInCzkForTransporterFromDemander?: string[];
        tripCancelPenaltyLimitInDays?: string[];
        tripCancelPenaltyAfterLimitPercentageForTransporter?: string[];
    };
    message?: string;
    error?: string;
} | undefined;

export async function appConfigFormAction(state: TAppConfigFormState, formData: FormData): Promise<TAppConfigFormState> {
    const validatedFields = AppConfigSchema.safeParse({
        minEndOrderFromNowInHours: formData.get(FormDataEnum.minEndOrderFromNowInHours),
        minDateToAcceptOfferInHours: formData.get(FormDataEnum.minDateToAcceptOfferInHours),
        minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: formData.get(FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours),
        minDiffBetweenStartTripAndEndOrderInHours: formData.get(FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours),
        payRestOfPriceWarningBeforeStartTripInHours: formData.get(FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours),
        payInvoiceWarningAfterAcceptOfferInHours: formData.get(FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours),
        tripDepositInPercentage: formData.get(FormDataEnum.tripDepositInPercentage),
        tripCancelFeePercentageForDemander: formData.get(FormDataEnum.tripCancelFeePercentageForDemander),
        tripCancelFeeAfterLimitPercentageForDemander: formData.get(FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander),
        tripOfferCommissionPercentage: formData.get(FormDataEnum.tripOfferCommissionPercentage),
        tripCancelPenaltyPercentageForTransporterFromCompany: formData.get(FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany),
        tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: formData.get(FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany),
        tripCancelPenaltyPercentageForTransporterFromDemander: formData.get(FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander),
        tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: formData.get(FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander),
        tripCancelPenaltyLimitInDays: formData.get(FormDataEnum.tripCancelPenaltyLimitInDays),
        tripCancelPenaltyAfterLimitPercentageForTransporter: formData.get(FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter),
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    try {
        await AdminService.updateAppBusinessConfig(new AppBusinessConfig({
            minEndOrderFromNowInHours: validatedFields.data.minEndOrderFromNowInHours,
            minDateToAcceptOfferInHours: validatedFields.data.minDateToAcceptOfferInHours,
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: validatedFields.data.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours,
            minDiffBetweenStartTripAndEndOrderInHours: validatedFields.data.minDiffBetweenStartTripAndEndOrderInHours,
            payRestOfPriceWarningBeforeStartTripInHours: validatedFields.data.payRestOfPriceWarningBeforeStartTripInHours,
            payInvoiceWarningAfterAcceptOfferInHours: validatedFields.data.payInvoiceWarningAfterAcceptOfferInHours,
            tripDepositInPercentage: validatedFields.data.tripDepositInPercentage,
            tripCancelFeePercentageForDemander: validatedFields.data.tripCancelFeePercentageForDemander,
            tripCancelFeeAfterLimitPercentageForDemander: validatedFields.data.tripCancelFeeAfterLimitPercentageForDemander,
            tripOfferCommissionPercentage: validatedFields.data.tripOfferCommissionPercentage,
            tripCancelPenaltyPercentageForTransporterFromCompany: validatedFields.data.tripCancelPenaltyPercentageForTransporterFromCompany,
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: validatedFields.data.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany,
            tripCancelPenaltyPercentageForTransporterFromDemander: validatedFields.data.tripCancelPenaltyPercentageForTransporterFromDemander,
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: validatedFields.data.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander,
            tripCancelPenaltyLimitInDays: validatedFields.data.tripCancelPenaltyLimitInDays,
            tripCancelPenaltyAfterLimitPercentageForTransporter: validatedFields.data.tripCancelPenaltyAfterLimitPercentageForTransporter
        }))
    } catch (error: any) {
        console.error('Chyba při update appconfigu:', error);
        return {
            errors: error.message || 'Došlo k neočekávané chybě během update configu.',
        }
    }
    redirect(ROUTES.APP_CONFIG);
}