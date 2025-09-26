import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AppConfigSchema} from "@/src/forms-action/admin/app-config/AppConfigSchema";
import {AdminService} from "@/src/services/AdminService";
import {AppBusinessConfig, IAppBusinessConfigSettings} from "@/src/data/appBusinessConfig";

type AppConfigData = Partial<IAppBusinessConfigSettings>

type AppConfigApiResult = void;

export class AppConfigFormAction extends BaseFormAction<typeof AppConfigSchema, AppConfigData, AppConfigApiResult> {

    constructor() {
        super(AppConfigSchema);
    }

    protected createDataFromFormData(formData: FormData): AppConfigData {
        return {
            minEndOrderFromNowInHours: this.getNumberFormValue(formData, FormDataEnum.minEndOrderFromNowInHours),
            minDateToAcceptOfferInHours: this.getNumberFormValue(formData, FormDataEnum.minDateToAcceptOfferInHours),
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: this.getNumberFormValue(formData, FormDataEnum.minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours),
            minDiffBetweenStartTripAndEndOrderInHours: this.getNumberFormValue(formData, FormDataEnum.minDiffBetweenStartTripAndEndOrderInHours),
            payRestOfPriceWarningBeforeStartTripInHours: this.getNumberFormValue(formData, FormDataEnum.payRestOfPriceWarningBeforeStartTripInHours),
            payInvoiceWarningAfterAcceptOfferInHours: this.getNumberFormValue(formData, FormDataEnum.payInvoiceWarningAfterAcceptOfferInHours),
            tripDepositInPercentage: this.getNumberFormValue(formData, FormDataEnum.tripDepositInPercentage),
            tripCancelFeePercentageForDemander: this.getNumberFormValue(formData, FormDataEnum.tripCancelFeePercentageForDemander),
            tripCancelFeeAfterLimitPercentageForDemander: this.getNumberFormValue(formData, FormDataEnum.tripCancelFeeAfterLimitPercentageForDemander),
            tripOfferCommissionPercentage: this.getNumberFormValue(formData, FormDataEnum.tripOfferCommissionPercentage),
            tripCancelPenaltyPercentageForTransporterFromCompany: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyPercentageForTransporterFromCompany),
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromCompany),
            tripCancelPenaltyPercentageForTransporterFromDemander: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyPercentageForTransporterFromDemander),
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyMinAmountInCzkForTransporterFromDemander),
            tripCancelPenaltyLimitInDays: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyLimitInDays),
            tripCancelPenaltyAfterLimitPercentageForTransporter: this.getNumberFormValue(formData, FormDataEnum.tripCancelPenaltyAfterLimitPercentageForTransporter)
        };
    }

    protected async callApi(validatedData: z.infer<typeof AppConfigSchema>): Promise<AppConfigApiResult> {
        await AdminService.updateAppBusinessConfig(new AppBusinessConfig(validatedData))
    }
}