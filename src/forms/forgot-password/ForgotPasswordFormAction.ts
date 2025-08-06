import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ForgotPasswordSchema} from "@/src/forms/forgot-password/ForgotPasswordSchema";

type ForgotPasswordData = {
    email?: string;
}

type ForgotPasswordApiResult = void;

export class ForgotPasswordFormAction extends BaseFormAction<typeof ForgotPasswordSchema, ForgotPasswordData, ForgotPasswordApiResult> {

    constructor() {
        super(ForgotPasswordSchema);
    }

    protected createDataFromFormData(formData: FormData): ForgotPasswordData {
        return {
            email: this.getStringFormValue(formData, FormDataEnum.email)
        };
    }

    protected async callApi(validatedData: z.infer<typeof ForgotPasswordSchema>): Promise<ForgotPasswordApiResult> {
        await AuthorizationService.forgotPassword(validatedData.email);
    }
}