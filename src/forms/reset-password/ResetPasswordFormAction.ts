import {BaseFormAction} from "@/src/forms/BaseFormAction";
import {FormDataEnum} from "@/src/enums/form-data.enum";
import {z} from "zod";
import {AuthorizationService} from "@/src/services/AuthorizationService";
import {ResetPasswordSchema} from "@/src/forms/reset-password/ResetPasswordSchema";

type ResetPasswordData = {
    token?: string;
    password?: string;
    passwordConfirm?: string;
}

type ResetPasswordApiResult = void;

export class ResetPasswordFormAction extends BaseFormAction<typeof ResetPasswordSchema, ResetPasswordData, ResetPasswordApiResult> {

    constructor() {
        super(ResetPasswordSchema);
    }

    protected createDataFromFormData(formData: FormData): ResetPasswordData {
        return {
            token: this.getStringFormValue(formData, FormDataEnum.token),
            password: this.getStringFormValue(formData, FormDataEnum.password),
            passwordConfirm: this.getStringFormValue(formData, FormDataEnum.password_confirm)
        };
    }

    protected async callApi(validatedData: z.infer<typeof ResetPasswordSchema>): Promise<ResetPasswordApiResult> {
        await AuthorizationService.resetPassword(validatedData.token, validatedData.password, validatedData.passwordConfirm);
    }
}