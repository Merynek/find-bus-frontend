import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AppConfigSchema} from "@/src/forms/admin/app-config/AppConfigSchema";
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
            minEndOrderFromNowInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            minDateToAcceptOfferInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            minDiffBetweenStartTripAndEndOrderForAllPaymentsInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            minDiffBetweenStartTripAndEndOrderInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            payRestOfPriceWarningBeforeStartTripInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            payInvoiceWarningAfterAcceptOfferInHours: this.getNumberFormValue(formData, FormDataEnum.password),
            tripDepositInPercentage: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelFeePercentageForDemander: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelFeeAfterLimitPercentageForDemander: this.getNumberFormValue(formData, FormDataEnum.password),
            tripOfferCommissionPercentage: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyPercentageForTransporterFromCompany: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyMinAmountInCzkForTransporterFromCompany: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyPercentageForTransporterFromDemander: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyMinAmountInCzkForTransporterFromDemander: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyLimitInDays: this.getNumberFormValue(formData, FormDataEnum.password),
            tripCancelPenaltyAfterLimitPercentageForTransporter: this.getNumberFormValue(formData, FormDataEnum.password)
        };
    }

    protected async callApi(validatedData: z.infer<typeof AppConfigSchema>): Promise<AppConfigApiResult> {
        await AdminService.updateAppBusinessConfig(new AppBusinessConfig(validatedData))
    }
}