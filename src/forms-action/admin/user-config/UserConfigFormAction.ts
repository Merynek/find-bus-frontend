import {BaseFormAction} from "@/src/forms-action/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AdminService} from "@/src/services/AdminService";
import {UserConfigSchema} from "@/src/forms-action/admin/user-config/UserConfigSchema";

type UserConfigData = {
    userId?: number;
    tripOfferCommissionPercentage?: number;
}

type UserConfigApiResult = void;

export class UserConfigFormAction extends BaseFormAction<typeof UserConfigSchema, UserConfigData, UserConfigApiResult> {

    constructor() {
        super(UserConfigSchema);
    }

    protected createDataFromFormData(formData: FormData): UserConfigData {
        return {
            userId: this.getNumberFormValue(formData, FormDataEnum.userId),
            tripOfferCommissionPercentage: this.getNumberFormValue(formData, FormDataEnum.tripOfferCommissionPercentage)
        };
    }

    protected async callApi(validatedData: z.infer<typeof UserConfigSchema>): Promise<UserConfigApiResult> {
        await AdminService.setUserConfig({
            userId: validatedData.userId,
            tripOfferCommissionPercentage: validatedData.tripOfferCommissionPercentage
        });
    }
}